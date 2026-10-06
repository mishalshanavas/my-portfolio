import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "../../components/mdx";
import { formatDate, getBlogPosts, getReadingTime } from "../../lib/posts";
import { metaData, projects } from "../../lib/config";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const title = post.metadata.seoTitle ?? post.metadata.title;
  const description = post.metadata.seoDescription ?? post.metadata.summary;
  const publishedTime = post.metadata.publishedAt;
  const modifiedTime = post.metadata.updatedAt ?? publishedTime;
  const { image } = post.metadata;
  let ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;
  const canonicalUrl = `${metaData.baseUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    authors: [{ name: metaData.name, url: metaData.baseUrl }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime,
      url: canonicalUrl,
      siteName: metaData.name,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          alt: post.metadata.imageAlt ?? post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${metaData.baseUrl}/blog/${post.slug}`;
  const imageUrl = post.metadata.image
    ? post.metadata.image.startsWith("http")
      ? post.metadata.image
      : `${metaData.baseUrl}${post.metadata.image}`
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`;
  const keywords = post.metadata.tags
    ? post.metadata.tags.split(",").map((tag) => tag.trim())
    : [];
  const relatedPosts = getBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateTags = candidate.metadata.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      const score = keywords.filter((tag) =>
        candidateTags.includes(tag.toLowerCase())
      ).length;
      return { ...candidate, score };
    })
    .filter((candidate) => candidate.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 2);
  const relatedProject = projects.find(
    (project) => project.articleSlug === post.slug && project.slug
  );

  return (
    <section className="max-w-2xl min-w-0">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${canonicalUrl}#article`,
                headline: post.metadata.title,
                alternativeHeadline: post.metadata.seoTitle,
                datePublished: post.metadata.publishedAt,
                dateModified:
                  post.metadata.updatedAt ?? post.metadata.publishedAt,
                description:
                  post.metadata.seoDescription ?? post.metadata.summary,
                image: {
                  "@type": "ImageObject",
                  url: imageUrl,
                  caption: post.metadata.imageAlt ?? post.metadata.title,
                },
                url: canonicalUrl,
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": canonicalUrl,
                },
                isPartOf: { "@id": `${metaData.baseUrl}/#website` },
                keywords,
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
                    name: "Blog",
                    item: `${metaData.baseUrl}/blog`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: post.metadata.title,
                    item: canonicalUrl,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-xs text-gray-500 transition-colors duration-150 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        &larr; Blog
      </Link>
      <h1 className="mb-3 text-balance text-2xl font-medium leading-tight">{post.metadata.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
        <span>
          By <Link href="/" rel="author" className="hover:text-gray-700 hover:underline dark:hover:text-gray-300">{metaData.name}</Link>
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.metadata.publishedAt}>
          {formatDate(post.metadata.publishedAt)}
        </time>
        {post.metadata.updatedAt ? (
          <>
            <span aria-hidden="true">·</span>
            <span>Updated <time dateTime={post.metadata.updatedAt}>{formatDate(post.metadata.updatedAt)}</time></span>
          </>
        ) : null}
        <span aria-hidden="true">·</span>
        <span>{getReadingTime(post.content)}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Topics">
        {keywords.map((tag) => (
          <span key={tag} className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            {tag}
          </span>
        ))}
      </div>
      {post.metadata.image ? (
        <figure className="relative my-8 aspect-[16/9] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={post.metadata.image}
            alt={post.metadata.imageAlt ?? post.metadata.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            className={
              post.metadata.image === "/fabric.webp"
                ? "object-contain p-8"
                : "object-cover"
            }
          />
          <figcaption className="sr-only">
            {post.metadata.imageAlt ?? post.metadata.title}
          </figcaption>
        </figure>
      ) : null}
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      {relatedProject ? (
        <aside className="mt-10 border-t border-gray-200 pt-6 text-sm dark:border-gray-800">
          <Link href={`/projects/${relatedProject.slug}`} prefetch={false} className="font-medium text-[color:var(--accent)] hover:underline">
            View the concise {relatedProject.name} project case study →
          </Link>
        </aside>
      ) : null}
      {relatedPosts.length > 0 ? (
        <aside className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800" aria-labelledby="related-posts-heading">
          <h2 id="related-posts-heading" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Related technical stories</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link href={`/blog/${related.slug}`} prefetch={false} className="text-[color:var(--accent)] hover:underline">
                  {related.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </section>
  );
}
