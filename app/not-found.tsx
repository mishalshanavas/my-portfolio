import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404",
};

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="font-light text-2xl mb-4 text-gray-900 dark:text-gray-100">
        404 - Page not found
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Oops! The page you&rsquo;re looking for doesn&rsquo;t seem to exist.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-gray-50 dark:text-gray-950 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
        >
          View Blog
        </Link>
      </div>
    </section>
  );
}
