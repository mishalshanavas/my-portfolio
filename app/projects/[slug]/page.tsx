import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaData, projects } from "../../lib/config";

type Props = { params: Promise<{ slug: string }> };

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug && project.caseStudy);
}

export async function generateStaticParams() {
  return projects
    .filter((project) => project.slug && project.caseStudy)
    .map((project) => ({ slug: project.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} case study`;
  const image = `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;
  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description, type: "article", images: [image] },
    twitter: { card: "summary_large_image", title, description: project.description, images: [image] },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const isExternal = project.url.startsWith("http");
  const study = project.caseStudy;

  return (
    <article className="max-w-2xl">
      <Link href="/projects" className="mb-6 inline-flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        ← Projects
      </Link>
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Case study</p>
      <h1 className="text-balance text-2xl font-medium leading-tight text-gray-900 dark:text-gray-100">{project.name}</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>

      <dl className="mt-10 space-y-8 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold text-gray-900 dark:text-gray-100">Context</dt>
          <dd className="mt-2 text-gray-600 dark:text-gray-400">{study.context}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-900 dark:text-gray-100">My contribution</dt>
          <dd className="mt-2 text-gray-600 dark:text-gray-400">{study.contribution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-900 dark:text-gray-100">Outcome</dt>
          <dd className="mt-2 text-gray-600 dark:text-gray-400">{study.outcome}</dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        {project.tech.map((tech, index) => (
          <span key={tech} className="contents">
            {index > 0 && <span aria-hidden="true">·</span>}
            <span>{tech}</span>
          </span>
        ))}
      </div>

      <Link
        href={project.url}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-flex mt-10 text-sm font-medium text-[color:var(--accent)] hover:underline"
      >
        Visit project {isExternal ? "↗" : "→"}
      </Link>
    </article>
  );
}
