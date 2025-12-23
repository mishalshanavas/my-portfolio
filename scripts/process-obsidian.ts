#!/usr/bin/env npx tsx
/**
 * Obsidian → Next.js Blog Preprocessor
 * 
 * Extracts blog posts from an Obsidian vault and processes them for Next.js:
 * - Converts [[wikilinks]] to standard Markdown links
 * - Transforms ![[image.png]] to ![](/blog-images/slug-image.png)
 * - Converts Obsidian callouts to <Callout> components
 * - Copies images with slug prefixes to prevent conflicts
 * - Validates required frontmatter fields
 * - Excludes draft posts
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, existsSync, rmSync } from "fs";
import { join, basename, extname } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";
import type { Node, Parent } from "unist";
import type { Link, Image, Text, Paragraph, Blockquote } from "mdast";

// ============================================================================
// Configuration
// ============================================================================

interface Config {
  vaultPath: string;           // Path to Obsidian vault (cloned repo)
  blogFolder: string;          // Folder containing blog posts within vault
  assetsFolder: string;        // Folder containing images within vault
  outputContentDir: string;    // Output directory for processed .md files
  outputImagesDir: string;     // Output directory for images
}

const config: Config = {
  vaultPath: process.env.VAULT_PATH || "./obsidian-vault",
  blogFolder: "Blog",
  assetsFolder: "Blog/assets",
  outputContentDir: "./content",
  outputImagesDir: "./public/blog-images",
};

// ============================================================================
// Types
// ============================================================================

interface Frontmatter {
  title?: string;
  date?: string;
  publishedAt?: string;
  summary?: string;
  description?: string;
  tags?: string | string[];
  slug?: string;
  draft?: boolean;
  image?: string;
}

interface ProcessedPost {
  slug: string;
  filename: string;
  frontmatter: Frontmatter;
  content: string;
  images: string[];
}

interface ProcessingResult {
  processed: string[];
  skipped: { file: string; reason: string }[];
  errors: { file: string; error: string }[];
}

// ============================================================================
// Frontmatter Parsing
// ============================================================================

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterBlock = match[1];
  const body = content.slice(match[0].length);
  const frontmatter: Frontmatter = {};

  // Parse YAML-like frontmatter
  const lines = frontmatterBlock.split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Remove quotes
    value = value.replace(/^["'](.*)["']$/, "$1");
    
    // Handle arrays (tags: ["a", "b"])
    if (value.startsWith("[")) {
      try {
        const parsed = JSON.parse(value.replace(/'/g, '"'));
        (frontmatter as Record<string, unknown>)[key] = parsed;
      } catch {
        (frontmatter as Record<string, unknown>)[key] = value;
      }
    } else if (value === "true") {
      (frontmatter as Record<string, unknown>)[key] = true;
    } else if (value === "false") {
      (frontmatter as Record<string, unknown>)[key] = false;
    } else {
      (frontmatter as Record<string, unknown>)[key] = value;
    }
  }

  return { frontmatter, body };
}

function serializeFrontmatter(fm: Frontmatter): string {
  const lines: string[] = ["---"];
  
  // Normalize to expected format
  const normalized = {
    title: fm.title,
    publishedAt: fm.publishedAt || fm.date,
    summary: fm.summary || fm.description,
    tags: Array.isArray(fm.tags) ? fm.tags.join(", ") : fm.tags,
    ...(fm.image && { image: fm.image }),
    ...(fm.slug && { slug: fm.slug }),
  };

  for (const [key, value] of Object.entries(normalized)) {
    if (value !== undefined && value !== null && value !== "") {
      lines.push(`${key}: "${value}"`);
    }
  }
  
  lines.push("---");
  return lines.join("\n");
}

// ============================================================================
// Validation
// ============================================================================

function validateFrontmatter(fm: Frontmatter, filename: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!fm.title) {
    errors.push("Missing required field: title");
  }
  if (!fm.date && !fm.publishedAt) {
    errors.push("Missing required field: date or publishedAt");
  }
  if (!fm.summary && !fm.description) {
    errors.push("Missing required field: summary or description");
  }
  if (!fm.tags) {
    errors.push("Missing required field: tags");
  }

  return { valid: errors.length === 0, errors };
}

// ============================================================================
// Obsidian Syntax Conversion (using unified/remark)
// ============================================================================

/**
 * Convert Obsidian image embeds to standard Markdown (string-level, before remark)
 * ![[image.png]] → ![image](/blog-images/slug-image.png)
 * ![[image.png|alt text]] → ![alt text](/blog-images/slug-image.png)
 */
function convertObsidianImageEmbeds(content: string, slug: string, collectedImages: string[]): string {
  const imageEmbedRegex = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  
  return content.replace(imageEmbedRegex, (match, imageName, altText) => {
    const trimmedName = imageName.trim();
    const alt = altText?.trim() || trimmedName.replace(/\.[^.]+$/, "");
    collectedImages.push(trimmedName);
    return `![${alt}](/blog-images/${slug}-${trimmedName})`;
  });
}

/**
 * Convert Obsidian wikilinks to standard Markdown (string-level, before remark)
 * [[Page Name]] → [Page Name](/blog/page-name)
 * [[Page Name|Display Text]] → [Display Text](/blog/page-name)
 */
function convertWikilinks(content: string): string {
  const wikilinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  
  return content.replace(wikilinkRegex, (match, pageName, displayText) => {
    const trimmedPage = pageName.trim();
    const display = displayText?.trim() || trimmedPage;
    const slug = trimmedPage.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    return `[${display}](/blog/${slug})`;
  });
}

// Callout emoji mapping
const calloutEmojis: Record<string, string> = {
  note: "📝",
  tip: "💡",
  info: "ℹ️",
  warning: "⚠️",
  danger: "🚨",
  error: "❌",
  success: "✅",
  question: "❓",
  quote: "💬",
  example: "📋",
  bug: "🐛",
  abstract: "📄",
  todo: "☑️",
  important: "❗",
  caution: "⚠️",
};

/**
 * Remark plugin to convert Obsidian wikilinks to standard Markdown links
 * [[Page Name]] → [Page Name](/blog/page-name)
 * [[Page Name|Display Text]] → [Display Text](/blog/page-name)
 */
function remarkWikilinks() {
  return (tree: Node) => {
    visit(tree, "text", (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      
      const wikilinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
      const text = node.value;
      
      if (!wikilinkRegex.test(text)) return;
      
      // Reset regex
      wikilinkRegex.lastIndex = 0;
      
      const newNodes: (Text | Link)[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = wikilinkRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          });
        }
        
        const pageName = match[1].trim();
        const displayText = match[2]?.trim() || pageName;
        const slug = pageName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        
        // Create link node
        newNodes.push({
          type: "link",
          url: `/blog/${slug}`,
          children: [{ type: "text", value: displayText }],
        } as Link);
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (lastIndex < text.length) {
        newNodes.push({
          type: "text",
          value: text.slice(lastIndex),
        });
      }
      
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}

/**
 * Remark plugin to convert Obsidian image embeds
 * ![[image.png]] → ![](/blog-images/slug-image.png)
 */
function remarkObsidianImages(slug: string, collectedImages: string[]) {
  return (tree: Node) => {
    visit(tree, "text", (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      
      const imageEmbedRegex = /!\[\[([^\]]+)\]\]/g;
      const text = node.value;
      
      if (!imageEmbedRegex.test(text)) return;
      
      imageEmbedRegex.lastIndex = 0;
      
      const newNodes: (Text | Paragraph)[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = imageEmbedRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          });
        }
        
        const imageName = match[1].trim();
        const newImageName = `${slug}-${imageName}`;
        collectedImages.push(imageName);
        
        // Create image wrapped in paragraph
        newNodes.push({
          type: "paragraph",
          children: [{
            type: "image",
            url: `/blog-images/${newImageName}`,
            alt: imageName.replace(/\.[^.]+$/, ""),
          } as Image],
        } as Paragraph);
        
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < text.length) {
        newNodes.push({
          type: "text",
          value: text.slice(lastIndex),
        });
      }
      
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
    
    // Also handle standard markdown images to add slug prefix
    visit(tree, "image", (node: Image) => {
      if (node.url && !node.url.startsWith("http") && !node.url.startsWith("/")) {
        const imageName = basename(node.url);
        collectedImages.push(imageName);
        node.url = `/blog-images/${slug}-${imageName}`;
      }
    });
  };
}

/**
 * Convert Obsidian callouts to JSX Callout components
 * > [!note] Title
 * > Content
 * 
 * →
 * 
 * <Callout emoji="📝">
 * **Title**
 * Content
 * </Callout>
 */
function convertCallouts(content: string): string {
  const calloutRegex = /^>\s*\[!(\w+)\]\s*(.*)$/gm;
  
  // First pass: identify callout blocks
  const lines = content.split("\n");
  const result: string[] = [];
  let inCallout = false;
  let calloutType = "";
  let calloutTitle = "";
  let calloutContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const calloutMatch = line.match(/^>\s*\[!(\w+)\]\s*(.*)$/);
    
    if (calloutMatch) {
      // Start new callout
      if (inCallout) {
        // Close previous callout
        result.push(renderCallout(calloutType, calloutTitle, calloutContent));
      }
      inCallout = true;
      calloutType = calloutMatch[1].toLowerCase();
      calloutTitle = calloutMatch[2].trim();
      calloutContent = [];
    } else if (inCallout && line.startsWith(">")) {
      // Continue callout
      calloutContent.push(line.replace(/^>\s?/, ""));
    } else if (inCallout) {
      // End callout
      result.push(renderCallout(calloutType, calloutTitle, calloutContent));
      inCallout = false;
      result.push(line);
    } else {
      result.push(line);
    }
  }

  // Handle callout at end of file
  if (inCallout) {
    result.push(renderCallout(calloutType, calloutTitle, calloutContent));
  }

  return result.join("\n");
}

function renderCallout(type: string, title: string, content: string[]): string {
  const emoji = calloutEmojis[type] || "📝";
  const titleLine = title ? `**${title}**\n` : "";
  const contentText = content.join("\n").trim();
  
  return `<Callout emoji="${emoji}">\n${titleLine}${contentText}\n</Callout>`;
}

// ============================================================================
// Main Processing Pipeline
// ============================================================================

async function processPost(filePath: string, config: Config): Promise<ProcessedPost | null> {
  const filename = basename(filePath);
  const rawContent = readFileSync(filePath, "utf-8");
  
  // Parse frontmatter
  const { frontmatter, body } = parseFrontmatter(rawContent);
  
  // Determine slug
  const slug = frontmatter.slug || basename(filename, extname(filename))
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  
  // Check if draft
  if (frontmatter.draft === true) {
    return null; // Skip drafts
  }
  
  // Validate frontmatter
  const validation = validateFrontmatter(frontmatter, filename);
  if (!validation.valid) {
    throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
  }
  
  // Collect images during processing
  const images: string[] = [];
  
  // String-level transformations (before remark parsing)
  // 1. Convert Obsidian image embeds: ![[image.png]] → ![](/blog-images/slug-image.png)
  let processedBody = convertObsidianImageEmbeds(body, slug, images);
  
  // 2. Convert wikilinks: [[Page]] → [Page](/blog/page)
  processedBody = convertWikilinks(processedBody);
  
  // 3. Convert Obsidian callouts: > [!note] → <Callout>
  processedBody = convertCallouts(processedBody);
  
  // 4. Convert local image paths in standard markdown syntax
  processedBody = processedBody.replace(
    /!\[([^\]]*)\]\((?!http|\/blog-images)([^)]+)\)/g,
    (match, alt, src) => {
      const imageName = basename(src);
      images.push(imageName);
      return `![${alt}](/blog-images/${slug}-${imageName})`;
    }
  );
  
  // Build final content with normalized frontmatter
  const finalContent = `${serializeFrontmatter({ ...frontmatter, slug })}\n\n${processedBody}`;
  
  return {
    slug,
    filename: `${slug}.mdx`,
    frontmatter,
    content: finalContent,
    images,
  };
}

async function processVault(config: Config): Promise<ProcessingResult> {
  const result: ProcessingResult = {
    processed: [],
    skipped: [],
    errors: [],
  };
  
  const blogPath = join(config.vaultPath, config.blogFolder);
  const assetsPath = join(config.vaultPath, config.assetsFolder);
  
  // Check if blog folder exists
  if (!existsSync(blogPath)) {
    console.error(`❌ Blog folder not found: ${blogPath}`);
    process.exit(1);
  }
  
  // Create output directories
  mkdirSync(config.outputContentDir, { recursive: true });
  mkdirSync(config.outputImagesDir, { recursive: true });
  
  // Get all markdown files
  const files = readdirSync(blogPath).filter(f => 
    f.endsWith(".md") || f.endsWith(".mdx")
  );
  
  console.log(`📂 Found ${files.length} markdown files in ${blogPath}`);
  
  // Process each file
  for (const file of files) {
    const filePath = join(blogPath, file);
    
    try {
      const processed = await processPost(filePath, config);
      
      if (processed === null) {
        result.skipped.push({ file, reason: "Draft post" });
        console.log(`⏭️  Skipped (draft): ${file}`);
        continue;
      }
      
      // Write processed content
      const outputPath = join(config.outputContentDir, processed.filename);
      writeFileSync(outputPath, processed.content, "utf-8");
      console.log(`✅ Processed: ${file} → ${processed.filename}`);
      
      // Copy images with slug prefix
      for (const image of processed.images) {
        const sourcePath = join(assetsPath, image);
        const destPath = join(config.outputImagesDir, `${processed.slug}-${image}`);
        
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, destPath);
          console.log(`   📷 Copied: ${image} → ${processed.slug}-${image}`);
        } else {
          console.warn(`   ⚠️  Image not found: ${sourcePath}`);
        }
      }
      
      result.processed.push(file);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push({ file, error: errorMessage });
      console.error(`❌ Error processing ${file}: ${errorMessage}`);
    }
  }
  
  return result;
}

// ============================================================================
// CLI Entry Point
// ============================================================================

async function main() {
  console.log("🚀 Obsidian → Next.js Blog Preprocessor\n");
  console.log(`   Vault Path: ${config.vaultPath}`);
  console.log(`   Blog Folder: ${config.blogFolder}`);
  console.log(`   Assets Folder: ${config.assetsFolder}`);
  console.log(`   Output Content: ${config.outputContentDir}`);
  console.log(`   Output Images: ${config.outputImagesDir}\n`);
  
  const result = await processVault(config);
  
  console.log("\n📊 Summary:");
  console.log(`   ✅ Processed: ${result.processed.length}`);
  console.log(`   ⏭️  Skipped: ${result.skipped.length}`);
  console.log(`   ❌ Errors: ${result.errors.length}`);
  
  if (result.skipped.length > 0) {
    console.log("\n⏭️  Skipped files:");
    for (const { file, reason } of result.skipped) {
      console.log(`   - ${file}: ${reason}`);
    }
  }
  
  if (result.errors.length > 0) {
    console.log("\n❌ Errors:");
    for (const { file, error } of result.errors) {
      console.log(`   - ${file}: ${error}`);
    }
    process.exit(1);
  }
  
  console.log("\n✨ Done!");
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
