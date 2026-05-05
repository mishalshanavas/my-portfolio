import Link from "next/link";
import { formatDate, getBlogPosts, getReadingTime } from "../lib/posts";

export const metadata = {
  title: "Blog",
  description: "Posts about backend development, Linux, open source, and things I find interesting.",
};

const COVER_GRADIENTS: [string, string][] = [
  ["#0f172a", "#1e1b4b"], // indigo
  ["#0f1f13", "#052e16"], // emerald
  ["#1c0a0f", "#2d1515"], // rose
  ["#1c1309", "#292008"], // amber
  ["#0c1827", "#082040"], // sky
  ["#1a0a2e", "#190f35"], // violet
];

function getCover(slug: string): [string, string] {
  const index =
    [...slug].reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    COVER_GRADIENTS.length;
  return COVER_GRADIENTS[index];
}

export default function BlogPosts() {
  const sortedBlogs = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <section className="max-w-2xl">
      <h1 className="mb-8 text-2xl font-medium">Blog</h1>
      <div className="flex flex-col gap-10">
        {sortedBlogs.map((post) => {
          const [from, to] = getCover(post.slug);
          return (
            <Link
              key={post.slug}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 dark:focus-visible:ring-gray-400 rounded-lg"
              href={`/blog/${post.slug}`}
            >
              <div
                className="w-full rounded-lg mb-4 overflow-hidden"
                style={{
                  aspectRatio: "5 / 2",
                  backgroundImage: [
                    "radial-gradient(ellipse at 20% 60%, rgba(255,255,255,0.06) 0%, transparent 55%)",
                    "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
                  ].join(", "),
                  backgroundSize: "60% 80%, 22px 22px, 100% 100%",
                }}
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                <span>{formatDate(post.metadata.publishedAt, false)}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{getReadingTime(post.content)}</span>
              </div>
              <div className="text-base font-medium text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-150 leading-snug mb-1">
                {post.metadata.title}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                {post.metadata.summary}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

