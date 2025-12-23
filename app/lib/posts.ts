import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string;
  image?: string;
  slug?: string;
  draft?: boolean;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  if (!match) {
    return { metadata: {} as Metadata, content: fileContent };
  }
  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    if (!key || valueArr.length === 0) return;
    let value = valueArr.join(": ").trim();
    // Remove quotes
    value = value.replace(/^['"](.*)['"]$/, "$1");
    
    const trimmedKey = key.trim();
    
    // Handle Obsidian field aliases
    if (trimmedKey === "date") {
      metadata.publishedAt = value;
    } else if (trimmedKey === "description") {
      metadata.summary = value;
    } else if (trimmedKey === "draft") {
      metadata.draft = value === "true";
    } else if (trimmedKey === "tags") {
      // Handle both array format ["tag1", "tag2"] and comma-separated "tag1, tag2"
      if (value.startsWith("[")) {
        try {
          const tagsArray = JSON.parse(value.replace(/'/g, '"'));
          metadata.tags = Array.isArray(tagsArray) ? tagsArray.join(", ") : value;
        } catch {
          metadata.tags = value.replace(/[\[\]"']/g, "");
        }
      } else {
        metadata.tags = value;
      }
    } else {
      (metadata as Record<string, unknown>)[trimmedKey] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMarkdownFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => {
    const ext = path.extname(file);
    return ext === ".mdx" || ext === ".md";
  });
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMarkdownData(dir: string) {
  let mdFiles = getMarkdownFiles(dir);
  return mdFiles
    .map((file) => {
      let { metadata, content } = readMDXFile(path.join(dir, file));
      // Use slug from frontmatter if provided, otherwise use filename
      let slug = metadata.slug || path.basename(file, path.extname(file));

      return {
        metadata,
        slug,
        content,
      };
    })
    // Filter out drafts
    .filter((post) => !post.metadata.draft);
}

export function getBlogPosts() {
  return getMarkdownData(path.join(process.cwd(), "content"));
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
