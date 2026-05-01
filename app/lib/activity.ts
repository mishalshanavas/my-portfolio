import { experiences, contributionHighlights, launches } from "./config";

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  type: "experience" | "contribution" | "launch";
  url?: string;
  openSource?: boolean;
};

export function getTimelineEvents(): TimelineEvent[] {
  const experienceEvents: TimelineEvent[] = (
    experiences as (typeof experiences[number] & { startDate?: string })[]
  ).map((exp) => ({
    date: exp.startDate ?? `${exp.period.split(" ")[0]}-01-01`,
    title: exp.role,
    description: `${exp.company} · ${exp.period}`,
    type: "experience" as const,
    url: exp.companyUrl,
  }));

  const launchEvents: TimelineEvent[] = launches.map((item) => ({
    date: item.date,
    title: item.title,
    description: item.description,
    type: "launch" as const,
    url: item.url,
  }));

  const contributionEvents: TimelineEvent[] = contributionHighlights.map(
    (item) => ({
      date: item.date,
      title: item.title,
      description: item.description,
      type: "contribution" as const,
      url: item.url,
      openSource: (item as { openSource?: boolean }).openSource ?? false,
    })
  );

  return [
    ...contributionEvents,
    ...launchEvents,
    ...experienceEvents,
  ].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date.includes("T") ? date : `${date}T00:00:00`);
  const diffDays = Math.floor(
    (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}
