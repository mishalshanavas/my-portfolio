import Link from "next/link";
import { VscGitCommit } from "react-icons/vsc";
import { TimelineEvent, getRelativeTime } from "../lib/activity";

const ACTION_LABELS: Record<TimelineEvent["type"], string> = {
  blog: "Published post",
  project: "Added project",
  experience: "Started role",
};

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

export default function ActivityTimeline({ events }: ActivityTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-400 dark:text-gray-600">
        No activity yet.
      </p>
    );
  }

  return (
    <div>
      {events.map((event, i) => {
        const isExternal = event.url?.startsWith("http") ?? false;
        const isLast = i === events.length - 1;

        return (
          <div key={i} className="relative flex gap-3">
            {/* Left: icon + connecting line */}
            <div className="relative flex flex-col items-center flex-shrink-0 w-6">
              <div className="relative z-10 flex items-center justify-center w-6 h-6 mt-2.5">
                <VscGitCommit className="text-lg text-gray-400 dark:text-gray-500" />
              </div>
              {!isLast && (
                <div className="flex-1 w-px bg-gray-200 dark:bg-gray-800 mt-0.5" />
              )}
            </div>

            {/* Right: content row */}
            <div
              className={`flex-1 flex items-start justify-between gap-4 min-w-0 pb-5 ${
                !isLast
                  ? "border-b border-gray-100 dark:border-gray-900"
                  : ""
              }`}
            >
              <div className="min-w-0 pt-2.5">
                <p className="text-sm leading-snug">
                  <span className="text-gray-500 dark:text-gray-400">
                    {ACTION_LABELS[event.type]} ·{" "}
                  </span>
                  {event.url ? (
                    <Link
                      href={event.url}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[#554ef1] dark:text-[#6b6bfc] hover:underline"
                    >
                      {event.title}
                    </Link>
                  ) : (
                    <span className="text-black dark:text-white">
                      {event.title}
                    </span>
                  )}
                </p>
                {event.type === "experience" && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
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
    </div>
  );
}

