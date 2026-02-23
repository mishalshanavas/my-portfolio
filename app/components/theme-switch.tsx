"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export const ThemeSwitch: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      id="theme-toggle"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer"
    >
      {/* Moon shown in light mode, hidden in dark */}
      <FiMoon className="h-[16px] w-[16px] dark:hidden" />
      {/* Sun shown in dark mode, hidden in light */}
      <FiSun className="h-[16px] w-[16px] hidden dark:block" />
    </button>
  );
};
