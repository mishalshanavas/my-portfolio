"use client";

import { useEffect, useRef, useState } from "react";

interface ContributionChartProps {
  data: { date: string; count: number }[];
}

const LEVEL_COLORS = [
  "var(--chart-0)",
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function formatTooltip(date: Date, count: number): string {
  const label = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (count === 0) return `No contributions on ${label}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${label}`;
}

export default function ContributionChart({ data }: ContributionChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWeeks, setMaxWeeks] = useState<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const CELL = 13, GAP = 3, DAY_LABEL_WIDTH = 26;
    const calc = (width: number) => {
      const available = width - DAY_LABEL_WIDTH;
      return Math.max(1, Math.floor((available + GAP) / (CELL + GAP)));
    };
    setMaxWeeks(calc(el.clientWidth));
    const ro = new ResizeObserver((entries) => {
      setMaxWeeks(calc(entries[0].contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build a map of date string -> count
  const dataMap = new Map(data.map((d) => [d.date, d.count]));

  // Determine date range: from ~364 days ago aligned to Sunday
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  // Align start to the preceding Sunday
  start.setDate(start.getDate() - start.getDay());

  // Build array of all days
  const days: { date: Date; count: number }[] = [];
  const cursor = new Date(start);
  while (cursor <= today) {
    const key = cursor.toISOString().split("T")[0];
    days.push({ date: new Date(cursor), count: dataMap.get(key) ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  // Group into weeks (columns of 7)
  const weeks: { date: Date; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Month labels: track which week each month starts
  const monthLabels: (string | null)[] = weeks.map((week) => {
    for (const day of week) {
      if (day.date.getDate() === 1) {
        return day.date.toLocaleString("en-US", { month: "short" });
      }
    }
    return null;
  });

  // Trim to only as many weeks as fit — drop oldest from start
  const visibleWeeks = weeks.slice(-maxWeeks);
  const visibleMonthLabels = monthLabels.slice(-maxWeeks);

  const totalContributions = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="w-full" ref={containerRef}>
      {maxWeeks === 0 ? (
        <div className="w-full overflow-hidden" aria-hidden>
          {/* skeleton month label row */}
          <div className="flex mb-1" style={{ paddingLeft: 26 }}>
            {Array.from({ length: 53 }).map((_, i) => (
              <div key={i} style={{ width: 13, marginRight: 3, flexShrink: 0, height: 10 }} />
            ))}
          </div>
          <div className="flex">
            {/* day label placeholder */}
            <div style={{ width: 22, marginRight: 4, flexShrink: 0 }} />
            {/* skeleton cell columns — overflow clipped to container width */}
            <div className="flex" style={{ gap: 3 }}>
              {Array.from({ length: 53 }).map((_, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: 3 }}>
                  {Array.from({ length: 7 }).map((_, di) => (
                    <div
                      key={di}
                      className="animate-pulse bg-gray-200 dark:bg-gray-800"
                      style={{ width: 13, height: 13, borderRadius: 2, flexShrink: 0 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : <div>
        {/* CELL=13px, GAP=3px → col-slot=16px; day-label-col=22px + gap(4) = paddingLeft 26 */}
        <div style={{ paddingBottom: 2 }}>
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: 26 }}>
            {visibleWeeks.map((_, wi) => (
              <div
                key={wi}
                className="text-[10px] text-gray-400 dark:text-gray-600"
                style={{ width: 13, marginRight: 3, flexShrink: 0 }}
              >
                {visibleMonthLabels[wi] ?? ""}
              </div>
            ))}
          </div>

          {/* Grid: day labels + week columns */}
          <div className="flex">
            {/* Day-of-week labels: single chars M/W/F */}
            <div
              className="flex flex-col"
              style={{ width: 22, marginRight: 4, gap: 3, flexShrink: 0 }}
            >
              {["", "M", "", "W", "", "F", ""].map((label, i) => (
                <div
                  key={i}
                  className="text-[10px] text-gray-400 dark:text-gray-600 flex items-center justify-end"
                  style={{ height: 13 }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex" style={{ gap: 3 }}>
              {visibleWeeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: 3 }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={formatTooltip(day.date, day.count)}
                      className="cursor-default"
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: 2,
                        backgroundColor: LEVEL_COLORS[getLevel(day.count)],
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>}

      {/* Footer outside scroll — never clips */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center" style={{ gap: 3 }}>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              style={{ width: 13, height: 13, borderRadius: 2, backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-[11px] text-gray-400 dark:text-gray-500">
          Issues, merge requests, pushes, and comments.
        </span>
      </div>
    </div>
  );
}
