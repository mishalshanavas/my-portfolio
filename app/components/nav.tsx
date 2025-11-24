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
    <nav className="py-3 mb-8 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-light text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
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

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeSwitch />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block px-3 py-2 rounded text-base font-light transition-colors
                  ${
                    isActive
                      ? "text-black dark:text-white bg-gray-100 dark:bg-gray-900"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
                  }
                `}
              >
                {name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
