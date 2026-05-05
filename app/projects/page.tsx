import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FiChevronRight } from "react-icons/fi";
import { projects } from "../lib/config";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and open source contributions by Mishal Shanavas — backend tools, automation, and web apps.",
};

function formatListDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(
    dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`
  );
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getProjectSource(url: string): string {
  if (!url.startsWith("http")) {
    if (url.startsWith("/blog/")) return "Case study";
    return "Internal";
  }
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "github.com") return "GitHub";
    return host;
  } catch {
    return "External";
  }
}

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Projects</h1>
      <div className="border-t border-gray-300 dark:border-gray-800 divide-y divide-gray-300 dark:divide-gray-800">
        {projects.map((project, index) => {
          const isExternal = project.url.startsWith("http");
          const initial = project.name.charAt(0).toUpperCase();
          const meta = [getProjectSource(project.url), formatListDate(project.date)]
            .filter(Boolean)
            .join(" · ");
          return (
          <Link
            key={index}
            href={project.url}
            className="group flex gap-4 py-4 -mx-2 px-2 rounded transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 dark:focus-visible:ring-gray-400"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  width={40}
                  height={40}
                  className={`object-cover ${project.imageAlignment ?? ""}`}
                  sizes="40px"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {initial}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-black dark:text-white leading-snug">
                {project.name}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <span>{meta}</span>
                {project.isContributor && (
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-black/[0.07] text-black border border-black/30 rounded dark:bg-white/[0.07] dark:text-white dark:border-white/30">
                    Contributor
                  </span>
                )}
                {project.isSideQuest && (
                  <span className="px-1.5 py-0.5 text-xs font-light bg-transparent text-black border border-dashed border-black/40 rounded dark:text-white dark:border-white/40">
                    Side Quest
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
            <FiChevronRight
              aria-hidden="true"
              className="mt-1 flex-shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          );
        })}
      </div>
    </section>
  );
}
