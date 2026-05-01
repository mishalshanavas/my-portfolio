import { getBlogPosts } from "./posts";
import { projects, experiences } from "./config";

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  type: "blog" | "project" | "experience";
  url?: string;
};

export function getTimelineEvents(): TimelineEvent[] {
  const blogEvents: TimelineEvent[] = getBlogPosts().map((post) => ({
    date: post.metadata.publishedAt,
    title: post.metadata.title,
    description: post.metadata.summary,
    type: "blog" as const,
    url: `/blog/${post.slug}`,
  }));

  const projectEvents: TimelineEvent[] = (
    projects as (typeof projects[number] & { date?: string })[]
  )
    .filter((p) => !!p.date)
    .map((p) => ({
      date: p.date!,
      title: p.name,
      description: p.description,
      type: "project" as const,
      url: p.url,
    }));

  const experienceEvents: TimelineEvent[] = (
    experiences as (typeof experiences[number] & { startDate?: string })[]
  ).map((exp) => ({
    date: exp.startDate ?? `${exp.period.split(" ")[0]}-01-01`,
    title: exp.role,
    description: `${exp.company} · ${exp.period}`,
    type: "experience" as const,
    url: exp.companyUrl,
  }));

  return [...blogEvents, ...projectEvents, ...experienceEvents].sort(
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
