import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaData, projects } from "../../lib/config";
import { formatDate } from "../../lib/posts";

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

  const title = project.seoTitle ?? `${project.name} case study`;
  const description = project.seoDescription ?? project.description;
  const image = project.coverImage ?? project.image ?? `/og?title=${encodeURIComponent(title)}`;
  const canonicalUrl = `${metaData.baseUrl}/projects/${project.slug}`;
  return {
    title,
    description,
    authors: [{ name: metaData.name, url: metaData.baseUrl }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: project.date,
      modifiedTime: project.updatedAt ?? project.date,
      siteName: metaData.name,
      locale: "en_US",
      images: [{ url: image, alt: project.coverImageAlt ?? project.imageAlt ?? `${project.name} case study` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const isExternal = project.url.startsWith("http");
  const study = project.caseStudy;
  const canonicalUrl = `${metaData.baseUrl}/projects/${project.slug}`;
  const pageImage = project.coverImage ?? project.image;
  const image = pageImage
    ? `${metaData.baseUrl}${pageImage}`
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(`${project.name} case study`)}`;
  const description = project.seoDescription ?? project.description;

  return (
    <article className="max-w-2xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TechArticle",
                "@id": `${canonicalUrl}#article`,
                headline: project.seoTitle ?? `${project.name} case study`,
                name: project.name,
                description,
                datePublished: project.date,
                dateModified: project.updatedAt ?? project.date,
                image,
                url: canonicalUrl,
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": canonicalUrl,
                },
                isPartOf: { "@id": `${metaData.baseUrl}/#website` },
                keywords: project.tech,
                about: project.tech,
                author: {
                  "@type": "Person",
                  "@id": `${metaData.baseUrl}/#person`,
                  name: metaData.name,
                  url: `${metaData.baseUrl}/`,
                },
                publisher: {
                  "@type": "Person",
                  "@id": `${metaData.baseUrl}/#person`,
                  name: metaData.name,
                  url: `${metaData.baseUrl}/`,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${canonicalUrl}#breadcrumb`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Projects",
                    item: `${metaData.baseUrl}/projects`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: project.name,
                    item: canonicalUrl,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Link href="/projects" className="mb-6 inline-flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        ← Projects
      </Link>
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Case study</p>
      <h1 className="text-balance text-2xl font-medium leading-tight text-gray-900 dark:text-gray-100">{project.name}</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        <span>
          By <Link href="/" rel="author" className="hover:text-gray-700 hover:underline dark:hover:text-gray-300">{metaData.name}</Link>
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={project.date}>{formatDate(project.date)}</time>
        {project.updatedAt && project.updatedAt !== project.date ? (
          <>
            <span aria-hidden="true">·</span>
            <span>Updated <time dateTime={project.updatedAt}>{formatDate(project.updatedAt)}</time></span>
          </>
        ) : null}
      </div>
      {pageImage ? (
        <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={pageImage}
            alt={project.coverImageAlt ?? project.imageAlt ?? `${project.name} project`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            className={
              project.imageAlignment?.includes("object-contain")
                ? "object-contain p-8"
                : `object-cover ${project.imageAlignment ?? ""}`
            }
          />
        </figure>
      ) : null}

      <dl className="mt-10 space-y-8 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold text-gray-900 dark:text-gray-100">What was going on</dt>
          <dd className="mt-2 text-gray-600 dark:text-gray-400">{study.context}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-900 dark:text-gray-100">What I did</dt>
          <dd className="mt-2 text-gray-600 dark:text-gray-400">{study.contribution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-900 dark:text-gray-100">How it turned out</dt>
          <dd className="mt-2 text-gray-600 dark:text-gray-400">{study.outcome}</dd>
        </div>
      </dl>

      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Technical details</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-gray-400 dark:text-gray-400">
          {study.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        {project.tech.map((tech, index) => (
          <span key={tech} className="contents">
            {index > 0 && <span aria-hidden="true">·</span>}
            <span>{tech}</span>
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3">
        {project.articleSlug ? (
          <Link
            href={`/blog/${project.articleSlug}`}
            prefetch={false}
            className="text-sm font-medium text-[color:var(--accent)] hover:underline"
          >
            Read the full technical write-up →
          </Link>
        ) : null}
        <Link
          href={project.url}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-sm font-medium text-[color:var(--accent)] hover:underline"
        >
          Visit project {isExternal ? "↗" : "→"}
        </Link>
        {project.contributionUrl ? (
          <Link
            href={project.contributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[color:var(--accent)] hover:underline"
          >
            View merged PR ↗
          </Link>
        ) : null}
      </div>
    </article>
  );
}
