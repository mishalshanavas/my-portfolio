"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Project } from "../lib/config";
import ProjectCard from "./project-card";

type TabId = "open-source" | "featured";

const tabs: { id: TabId; label: string; href: string }[] = [
  { id: "open-source", label: "Open Source", href: "/projects#open-source" },
  { id: "featured", label: "Projects", href: "/projects#featured" },
];

export default function ProjectTabs({
  openSource,
  featured,
}: {
  openSource: Project[];
  featured: Project[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>("open-source");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = tabs.find((tab) => tab.id === activeTab)!;
  const visibleProjects = activeTab === "open-source" ? openSource : featured;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section aria-label="Selected work">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div role="tablist" aria-label="Selected work" className="flex gap-5 border-b border-gray-200 dark:border-gray-800">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              type="button"
              id={`home-tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="home-project-panel"
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`border-b-2 pb-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] ${
                activeTab === tab.id
                  ? "border-[color:var(--accent)] text-gray-900 dark:text-gray-100"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Link
          href={active.href}
          className="pb-2 text-xs font-normal text-gray-500 transition-colors duration-150 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          View all →
        </Link>
      </div>
      <div
        id="home-project-panel"
        role="tabpanel"
        aria-labelledby={`home-tab-${activeTab}`}
        tabIndex={0}
        className="divide-y divide-gray-200 border-t border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] dark:divide-gray-800 dark:border-gray-800"
      >
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug ?? project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
