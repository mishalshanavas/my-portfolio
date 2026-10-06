import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getBlogPosts } from "../app/lib/posts";
import { metaData } from "../app/lib/config";

async function generateFeeds() {
  try {
    const { Feed } = await import("feed");
    const BaseUrl = metaData.baseUrl.endsWith("/")
      ? metaData.baseUrl
      : `${metaData.baseUrl}/`;

    const allPosts = getBlogPosts().sort((a, b) =>
      b.metadata.publishedAt.localeCompare(a.metadata.publishedAt)
    );
    const latestPostDate = allPosts.reduce<Date>(
      (latest, post) => {
        const modifiedAt = new Date(post.metadata.updatedAt ?? post.metadata.publishedAt);
        return modifiedAt > latest ? modifiedAt : latest;
      },
      new Date(0)
    );

    const feed = new Feed({
      title: metaData.name,
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
      updated: latestPostDate,
    });

    if (!allPosts || allPosts.length === 0) {
      console.log("⚠️  No blog posts found. Generating empty feeds.");
    }

    const revisedItems = new Map<string, string>();
    allPosts.forEach((post) => {
      const postUrl = `${BaseUrl}blog/${post.slug}`;
      if (post.metadata.updatedAt) {
        revisedItems.set(postUrl, new Date(post.metadata.updatedAt).toISOString());
      }
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
        date: new Date(post.metadata.updatedAt ?? post.metadata.publishedAt),
        published: new Date(post.metadata.publishedAt),
      });
    });

    // Create public/feed directory if it doesn't exist
    const feedDir = join(process.cwd(), "public");
    mkdirSync(feedDir, { recursive: true });

    // Write feed files
    const atom = feed.atom1();
    const json = feed.json1();
    for (const item of feed.items) {
      const revisedAt = item.id ? revisedItems.get(item.id) : undefined;
      if (revisedAt) {
        item.extensions = [...(item.extensions ?? []), {
          name: "atom:updated",
          objects: { _text: revisedAt },
        }];
      }
    }
    writeFileSync(join(feedDir, "rss.xml"), feed.rss2());
    writeFileSync(join(feedDir, "atom.xml"), atom);
    writeFileSync(join(feedDir, "feed.json"), json);

    console.log(`✅ RSS feeds generated successfully! (${allPosts.length} posts)`);
  } catch (error) {
    console.error("❌ Failed to generate RSS feeds:", error);
    process.exit(1);
  }
}

generateFeeds().catch((error) => {
  console.error("❌ Unhandled error:", error);
  process.exit(1);
});
