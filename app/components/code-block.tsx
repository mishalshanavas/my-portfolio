"use client";

import { useEffect, useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrapper = (e.currentTarget as HTMLElement).closest(
      "[data-code-wrapper]"
    );
    const raw = wrapper?.querySelector("pre")?.textContent ?? "";
    navigator.clipboard?.writeText(raw).catch(() => {});
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      title={copied ? "Copied" : "Copy code"}
      className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-transparent px-2 text-[11px] font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:focus-visible:ring-gray-600"
    >
      {copied ? (
        <><FiCheck size={13} className="text-emerald-600 dark:text-emerald-400" /><span>Copied</span></>
      ) : (
        <><FiCopy size={13} /><span>Copy</span></>
      )}
    </button>
  );
}
