import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FiChevronRight } from "react-icons/fi";
import { metaData, projects } from "../lib/config";

const description =
  "Selected backend, infrastructure, open-source, automation, and interactive projects by Mishal Shanavas.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${metaData.name}`,
    description,
    url: "/projects",
    type: "website",
    siteName: metaData.name,
    locale: "en_US",
    images: [`/og?title=${encodeURIComponent("Projects & open-source work")}`],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${metaData.name}`,
    description,
    images: [`/og?title=${encodeURIComponent("Projects & open-source work")}`],
  },
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Projects | ${metaData.name}`,
            description,
            url: `${metaData.baseUrl}/projects`,
            isPartOf: { "@id": `${metaData.baseUrl}/#website` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: project.name,
                url: project.slug
                  ? `${metaData.baseUrl}/projects/${project.slug}`
                  : project.url.startsWith("http")
                    ? project.url
                    : `${metaData.baseUrl}${project.url}`,
              })),
            },
          }),
        }}
      />
      <div className="mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Projects</h1>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
        {projects.map((project, index) => {
          const isExternal = project.url.startsWith("http");
          const initial = project.name.charAt(0).toUpperCase();
          const meta = [getProjectSource(project.url), formatListDate(project.date)]
            .filter(Boolean)
            .join(" · ");
          return (
          <article
            key={index}
            className="group flex gap-4 py-4 -mx-2 px-2 rounded-md transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <div className="w-10 h-10 flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `${project.name} preview`}
                  width={40}
                  height={40}
                  className={`object-cover ${project.imageAlignment ?? ""}`}
                  sizes="40px"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                  {initial}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-medium leading-snug">
                {project.caseStudy ? (
                  <Link href={`/projects/${project.slug}`} className="text-gray-900 hover:underline dark:text-gray-100">
                    {project.name}
                  </Link>
                ) : (
                  <Link
                    href={project.url}
                    className="text-gray-900 hover:underline dark:text-gray-100"
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {project.name}
                  </Link>
                )}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <span>{meta}</span>
                {project.isContributor && (
                  <><span aria-hidden="true">·</span><span>Contributor</span></>
                )}
                {project.isSideQuest && (
                  <><span aria-hidden="true">·</span><span>Side Quest</span></>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {project.description}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs">
                {project.caseStudy && (
                  <Link href={`/projects/${project.slug}`} className="font-medium text-[color:var(--accent)] hover:underline">
                    Case study →
                  </Link>
                )}
                {isExternal && (
                  <Link href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:underline">
                    {getProjectSource(project.url)} ↗
                  </Link>
                )}
              </div>
            </div>
            <FiChevronRight
              aria-hidden="true"
              className="mt-1 flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-all duration-150 group-hover:translate-x-0.5"
            />
          </article>
          );
        })}
      </div>
    </section>
  );
}
