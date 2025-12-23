import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Nextfolio Blog",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-light">Blog</h1>
      <div className="space-y-4">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="block group hover:bg-gray-50 dark:hover:bg-gray-900 -mx-2 px-2 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              href={`/blog/${post.slug}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <h2 className="text-base font-light text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                  {post.metadata.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-xs tabular-nums flex-shrink-0">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                {post.metadata.summary}
              </p>
            </Link>
          ))}
      </div>
    </section>
  );
}
