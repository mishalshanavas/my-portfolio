import { Feed } from "feed";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getBlogPosts } from "../app/lib/posts";
import { metaData } from "../app/lib/config";

async function generateFeeds() {
  const BaseUrl = metaData.baseUrl.endsWith("/")
    ? metaData.baseUrl
    : `${metaData.baseUrl}/`;

  const feed = new Feed({
    title: metaData.title,
    description: metaData.description,
    id: BaseUrl,
    link: BaseUrl,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${metaData.title}`,
    generator: "Feed for Node.js",
    feedLinks: {
      json: `${BaseUrl}feed.json`,
      atom: `${BaseUrl}atom.xml`,
      rss: `${BaseUrl}rss.xml`,
    },
  });

  const allPosts = await getBlogPosts();

  allPosts.forEach((post) => {
    const postUrl = `${BaseUrl}blog/${post.slug}`;
    const categories = post.metadata.tags
      ? post.metadata.tags.split(",").map((tag) => tag.trim())
      : [];

    feed.addItem({
      title: post.metadata.title,
      id: postUrl,
      link: postUrl,
      description: post.metadata.summary,
      category: categories.map((tag) => ({
        name: tag,
        term: tag,
      })),
      date: new Date(post.metadata.publishedAt),
    });
  });

  // Create public/feed directory if it doesn't exist
  const feedDir = join(process.cwd(), "public");
  mkdirSync(feedDir, { recursive: true });

  // Write feed files
  writeFileSync(join(feedDir, "rss.xml"), feed.rss2());
  writeFileSync(join(feedDir, "atom.xml"), feed.atom1());
  writeFileSync(join(feedDir, "feed.json"), feed.json1());

  console.log("✅ RSS feeds generated successfully!");
}

generateFeeds().catch(console.error);
