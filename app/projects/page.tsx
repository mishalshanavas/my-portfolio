import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FiChevronRight } from "react-icons/fi";
import { metaData, projectCategories, projects, type Project } from "../lib/config";

const description =
  "Backend projects, Hyperledger contributions, AUR package maintenance, and experiments by Mishal Shanavas.";

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
    if (host === "aur.archlinux.org") return "AUR package";
    return host;
  } catch {
    return "External";
  }
}

const categorizedProjects = projectCategories.map((category) => ({
  ...category,
  projects: projects.filter((project) => project.category === category.id),
}));

const orderedProjects = categorizedProjects.flatMap((category) => category.projects);

function ProjectRow({ project }: { project: Project }) {
  const isExternal = project.url.startsWith("http");
  const initial = project.name.charAt(0).toUpperCase();
  const meta = [getProjectSource(project.url), formatListDate(project.date)]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group -mx-2 flex gap-4 rounded-md px-2 py-4 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-900">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
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
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">{initial}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium leading-snug">
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
        </h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{meta}</span>
          <span aria-hidden="true">·</span>
          <span>{projectCategories.find((category) => category.id === project.category)?.label}</span>
          {project.role ? <><span aria-hidden="true">·</span><span>{project.role}</span></> : null}
          {project.result ? <><span aria-hidden="true">·</span><span>{project.result}</span></> : null}
        </div>
        <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
        <p className="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400">
          {project.tech.slice(0, 4).join(" · ")}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {project.caseStudy ? (
            <Link href={`/projects/${project.slug}`} className="font-medium text-[color:var(--accent)] hover:underline">
              Case study →
            </Link>
          ) : null}
          {isExternal ? (
            <Link href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline dark:text-gray-300">
              {getProjectSource(project.url)} ↗
            </Link>
          ) : null}
          {project.contributionUrl ? (
            <Link href={project.contributionUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline dark:text-gray-300">
              Merged PR ↗
            </Link>
          ) : null}
        </div>
      </div>
      <FiChevronRight
        aria-hidden="true"
        className="mt-1 flex-shrink-0 text-gray-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-400"
      />
    </article>
  );
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
              itemListElement: orderedProjects.map((project, index) => ({
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
      <div className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Projects</h1>
      </div>
      <nav aria-label="Project categories" className="mb-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {categorizedProjects.map((category) => (
          <a key={category.id} href={`#${category.id}`} className="text-[color:var(--accent)] underline-offset-4 hover:underline focus-visible:underline">
            {category.label}
          </a>
        ))}
      </nav>
      <div className="space-y-9">
        {categorizedProjects.map((category) => (
          <section key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`} className="scroll-mt-8">
            <h2 id={`${category.id}-heading`} className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {category.label}
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{category.description}</p>
            <div className="mt-4 divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-800 dark:border-gray-800">
              {category.projects.map((project) => <ProjectRow key={project.slug ?? project.name} project={project} />)}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
