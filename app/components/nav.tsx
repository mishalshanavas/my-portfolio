"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../lib/config";

const navItems = {
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="py-3 mb-8 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-light text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          {metaData.title}
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`
                  text-base font-light transition-colors relative
                  ${
                    isActive
                      ? "text-black dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-black dark:after:bg-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-200 hover:after:w-full"
                  }
                `}
              >
                {name}
              </Link>
            );
          })}
          <div className="ml-2">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Mobile Menu Component (if you want mobile functionality)
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 dark:bg-white/10 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50">
            <div className="py-2">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = pathname === path;
                return (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      block px-4 py-2 text-sm font-light transition-colors
                      ${
                        isActive
                          ? "text-black dark:text-white bg-gray-50 dark:bg-gray-950"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
                      }
                    `}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
