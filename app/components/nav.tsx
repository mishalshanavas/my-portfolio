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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-3 sm:py-4 mb-6 sm:mb-10 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-150"
        >
          {metaData.title}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`
                  text-sm font-normal transition-colors duration-150 rounded-sm
                  ${
                    isActive
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }
                `}
              >
                {name}
              </Link>
            );
          })}
          <ThemeSwitch />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeSwitch />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-white/10 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden pt-3 pb-2 px-4 sm:px-6 space-y-0.5 relative z-50">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-3 py-2 rounded-md text-sm font-normal transition-colors duration-150
                    ${
                      isActive
                        ? "text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                    }
                  `}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
}
