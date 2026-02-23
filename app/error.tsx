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
      <h1 className="font-light text-2xl mb-4 text-black dark:text-white">
        Something went wrong
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
      >
        Try again
      </button>
    </section>
  );
}
