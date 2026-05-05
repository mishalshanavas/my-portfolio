"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrapper = (e.currentTarget as HTMLElement).closest(
      "[data-code-wrapper]"
    );
    const raw = wrapper?.querySelector("pre")?.textContent ?? "";
    navigator.clipboard.writeText(raw).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150"
    >
      {copied ? (
        <FiCheck size={14} className="text-green-500 dark:text-green-400" />
      ) : (
        <FiCopy size={14} />
      )}
    </button>
  );
}
