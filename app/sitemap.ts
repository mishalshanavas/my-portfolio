import { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/posts";
import { metaData, projects } from "./lib/config";

function getPostModifiedDate(post: ReturnType<typeof getBlogPosts>[number]) {
  return new Date(post.metadata.updatedAt ?? post.metadata.publishedAt);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = metaData.baseUrl;
  const blogPosts = getBlogPosts();
  const buildDate = new Date().toISOString();

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
      lastModified: buildDate,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: buildDate,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: buildDate,
    },
  ];

  return [...routes, ...projectPages, ...blogs];
}
