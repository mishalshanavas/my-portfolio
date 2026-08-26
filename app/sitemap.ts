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

function getPostModifiedDate(post: ReturnType<typeof getBlogPosts>[number]) {
  return new Date(post.metadata.updatedAt ?? post.metadata.publishedAt);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const blogPosts = getBlogPosts();
  const latestPostDate = blogPosts.reduce(
    (latest, post) =>
      getPostModifiedDate(post) > latest
        ? getPostModifiedDate(post)
        : latest,
    new Date(0)
  );
  const latestProjectDate = projects.reduce(
    (latest, project) =>
      new Date(project.updatedAt ?? project.date) > latest
        ? new Date(project.updatedAt ?? project.date)
        : latest,
    new Date(0)
  );
  const lastModified = new Date(
    Math.max(latestPostDate.getTime(), latestProjectDate.getTime())
  ).toISOString();

  const blogs = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: getPostModifiedDate(post).toISOString(),
  }));

  const projectPages = projects
    .filter((project) => project.slug && project.caseStudy)
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt ?? project.date).toISOString(),
    }));

  const routes = [
    {
      url: baseUrl,
      lastModified,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate.toISOString(),
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: latestProjectDate.toISOString(),
    },
  ];

  return [...routes, ...projectPages, ...blogs];
}
