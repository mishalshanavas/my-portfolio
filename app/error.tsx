"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="font-light text-2xl mb-4 text-gray-900 dark:text-gray-100">
        Something went wrong
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Please try again. If the problem persists, contact me by email.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-gray-50 dark:text-gray-950 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
      >
        Try again
      </button>
    </section>
  );
}
