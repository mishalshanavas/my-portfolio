"use client";

import { useState } from "react";
import Link from "next/link";
import { VscGitCommit } from "react-icons/vsc";
import type { TimelineEvent } from "../lib/activity";

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

const INITIAL_SHOW = 3;

function getLabel(event: TimelineEvent): string {
  if (event.type === "contribution") {
    return event.openSource ? "Open source" : "Contribution";
  }
  const labels: Record<TimelineEvent["type"], string> = {
    experience: "Started role",
    launch: "Launch",
    contribution: "Contribution",
  };
  return labels[event.type];
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

export default function ActivityTimeline({ events }: ActivityTimelineProps) {
  const [expanded, setExpanded] = useState(false);

  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-400 dark:text-gray-600">
        No activity yet.
      </p>
    );
  }

  const visible = expanded ? events : events.slice(0, INITIAL_SHOW);
  const hasMore = events.length > INITIAL_SHOW;

  return (
    <div>
      {visible.map((event, i) => {
        const isExternal = event.url?.startsWith("http") ?? false;
        const isLast = i === visible.length - 1;

        return (
          <div key={i} className="relative flex gap-3">
            {/* Left: icon + connecting line */}
            <div className="relative flex flex-col items-center flex-shrink-0 w-6">
              <div className="relative z-10 flex items-center justify-center w-6 h-6 mt-2.5">
                <VscGitCommit className="text-lg text-gray-400 dark:text-gray-500" />
              </div>
              {(!isLast || hasMore) && (
                <div className="flex-1 w-px bg-gray-300 dark:bg-gray-700 mt-0.5" />
              )}
            </div>

            {/* Right: content row */}
            <div
              className={`flex-1 flex items-start justify-between gap-4 min-w-0 pb-5 ${
                !isLast || hasMore
                  ? "border-b border-gray-300 dark:border-gray-700"
                  : ""
              }`}
            >
              <div className="min-w-0 pt-2.5">
                <p className="text-sm leading-snug">
                  <span className="text-gray-500 dark:text-gray-400">
                    {getLabel(event)} ·{" "}
                  </span>
                  {event.url ? (
                    <Link
                      href={event.url}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[#122C4F] dark:text-[#5b8fd0] hover:underline"
                    >
                      {event.title}
                    </Link>
                  ) : (
                    <span className="text-black dark:text-white">
                      {event.title}
                    </span>
                  )}
                </p>
                {event.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 leading-relaxed">
                    {event.description}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-600 whitespace-nowrap flex-shrink-0 mt-3">
                {getRelativeTime(event.date)}
              </span>
            </div>
          </div>
        );
      })}

      {hasMore && (
        <div className="relative flex gap-3">
          <div className="flex-shrink-0 w-6" />
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 pt-1"
          >
            {expanded
              ? "Show less ↑"
              : `Show ${events.length - INITIAL_SHOW} more ↓`}
          </button>
        </div>
      )}
    </div>
  );
}

