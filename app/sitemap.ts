import { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/posts";
import { metaData, projects } from "./lib/config";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL);
  }
  
  if (process.env.VERCEL_URL) {
    return trimTrailingSlash(`https://${process.env.VERCEL_URL}`);
  }
  
  return trimTrailingSlash(metaData.baseUrl);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const blogPosts = getBlogPosts();
  const latestPostDate = blogPosts.reduce(
    (latest, post) =>
      new Date(post.metadata.publishedAt) > latest
        ? new Date(post.metadata.publishedAt)
        : latest,
    new Date(0)
  );
  const latestProjectDate = projects.reduce(
    (latest, project) =>
      new Date(project.date) > latest ? new Date(project.date) : latest,
    new Date(0)
  );
  const lastModified = new Date(
    Math.max(latestPostDate.getTime(), latestProjectDate.getTime())
  ).toISOString();

  const blogs = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectPages = projects
    .filter((project) => project.slug && project.caseStudy)
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.date).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const routes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [...routes, ...projectPages, ...blogs].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );
}
