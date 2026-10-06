import fs from "fs";
import path from "path";
import YAML from "yaml";

export type PostMetadata = {
  title: string;
  seoTitle?: string;
  publishedAt: string;
  updatedAt?: string;
  summary: string;
  seoDescription?: string;
  tags: string;
  image?: string;
  imageAlt?: string;
};

export function parseFrontmatter(fileContent: string, filePath: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(fileContent);
  if (!match) throw new Error(`${filePath}: missing YAML frontmatter`);

  let parsed: unknown;
  try {
    parsed = YAML.parse(match[1], { uniqueKeys: true });
  } catch (error) {
    throw new Error(`${filePath}: invalid YAML frontmatter`, { cause: error });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${filePath}: frontmatter must be a mapping`);
  }

  const fields = parsed as Record<string, unknown>;
  for (const key of ["title", "publishedAt", "summary", "tags"] as const) {
    if (typeof fields[key] !== "string" || !fields[key].trim()) {
      throw new Error(`${filePath}: ${key} must be a non-empty string`);
    }
  }
  for (const key of ["seoTitle", "updatedAt", "seoDescription", "image", "imageAlt"] as const) {
    if (fields[key] !== undefined && typeof fields[key] !== "string") {
      throw new Error(`${filePath}: ${key} must be a string`);
    }
  }
  for (const key of ["publishedAt", "updatedAt"] as const) {
    const value = fields[key];
    if (value === undefined) continue;
    const date = typeof value === "string" ? new Date(`${value}T00:00:00Z`) : null;
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      !date || Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value
    ) {
      throw new Error(`${filePath}: ${key} must be a valid YYYY-MM-DD date`);
    }
  }

  return {
    metadata: fields as PostMetadata,
    content: fileContent.slice(match[0].length).trim(),
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => [".mdx", ".md"].includes(path.extname(file))).sort();
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent, filePath);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

let postsCache: ReturnType<typeof getMDXData> | null = null;

export function getBlogPosts() {
  if (!postsCache) {
    postsCache = getMDXData(path.join(process.cwd(), "content"));
  }
  return [...postsCache];
}

export function invalidatePostsCache() {
  postsCache = null;
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return `${readingTime} min read`;
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
