import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { FiMapPin, FiClock, FiZap, FiBook } from "react-icons/fi";
import {
  hero,
  socialLinks,
  experiences,
  aboutMe,
  skillGroups,
  projects,
  profileMeta,
  metaData,
} from "./lib/config";
import { getTimelineEvents } from "./lib/activity";
import { getBlogPosts } from "./lib/posts";
import ContributionSection from "./components/contribution-section";
import ActivityTimeline from "./components/activity-timeline";
import ProjectTabs from "./components/project-tabs";
import LocalTime from "./components/local-time";

const description =
  "Mishal Shanavas is a backend developer in Kerala building APIs, cloud projects, and open-source fixes with Python, Django, and Linux.";
const socialImage = `/og?title=${encodeURIComponent(
  "Mishal Shanavas — Backend Developer"
)}`;

export const metadata: Metadata = {
  title: "Mishal Shanavas | Backend Developer",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mishal Shanavas | Backend Developer",
    description,
    url: "/",
    type: "website",
    siteName: metaData.name,
    locale: "en_US",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `${metaData.name}, backend developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mishal Shanavas | Backend Developer",
    description,
    images: [socialImage],
  },
};

function renderAbout(text: string) {
  return text.split("\n").map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <React.Fragment key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function Page() {
  const timelineEvents = getTimelineEvents();
  const recentPosts = [...getBlogPosts()]
    .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt))
    .slice(0, 3);

  return (
    <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${metaData.baseUrl}/#website`,
                  url: `${metaData.baseUrl}/`,
                  name: metaData.name,
                  alternateName: `${metaData.name} portfolio`,
                  description,
                  inLanguage: "en",
                  author: { "@id": `${metaData.baseUrl}/#person` },
                },
                {
                  "@type": "ProfilePage",
                  "@id": `${metaData.baseUrl}/#profile`,
                  name: `${metaData.name} portfolio`,
                  description,
                  url: `${metaData.baseUrl}/`,
                  dateCreated: `${profileMeta.memberSince}-01-01`,
                  dateModified: "2026-08-26",
                  isPartOf: { "@id": `${metaData.baseUrl}/#website` },
                  mainEntity: { "@id": `${metaData.baseUrl}/#person` },
                },
                {
                  "@type": "Person",
                  "@id": `${metaData.baseUrl}/#person`,
                  name: metaData.name,
                  url: `${metaData.baseUrl}/`,
                  image: `${metaData.baseUrl}${hero.imageLight}`,
                  jobTitle: "Backend Developer",
                  mainEntityOfPage: { "@id": `${metaData.baseUrl}/#profile` },
                  homeLocation: {
                    "@type": "Place",
                    name: profileMeta.location,
                  },
                  sameAs: [
                    socialLinks.github,
                    socialLinks.linkedin,
                    socialLinks.twitter,
                    socialLinks.instagram,
                  ],
                  knowsAbout: skillGroups.flatMap((group) => group.skills),
                },
              ],
            }),
          }}
        />
        {/* HERO (full width top) */}
        <section className="mb-5 flex flex-col gap-4 border-b border-gray-200 pb-5 dark:border-gray-800 sm:mb-6 sm:flex-row sm:items-center sm:gap-5 sm:pb-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={hero.imageLight}
              alt={`Portrait of ${metaData.name}`}
              className="rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-200 dark:hidden"
              width={90}
              height={90}
              priority
            />
            <Image
              src={hero.imageDark}
              alt=""
              aria-hidden="true"
              className="rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-200 hidden dark:block"
              width={90}
              height={90}
            />
          </div>

          {/* Name + username + title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              {hero.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-0.5">
              @{profileMeta.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-1">
              {hero.title}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:hidden">
              {profileMeta.location} · CS Major, 2028
            </p>
            <a
              href={socialLinks.email}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--accent)] sm:hidden"
            >
              <FiZap aria-hidden="true" />
              Open to work
            </a>
          </div>

          {/* Social text links */}
          <nav aria-label="Primary profile links" className="flex flex-wrap gap-4 sm:gap-5 text-sm flex-shrink-0">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
            >
              LinkedIn
            </a>
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="mishalshanavas_cv.pdf"
              className="py-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
            >
              Resume ↗
            </a>
          </nav>
        </section>



        {/* ── TWO-COLUMN BODY ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-[1fr_220px] lg:gap-10">

          {/* ── LEFT MAIN ─────────────────────────────────────── */}
          <div className="min-w-0 space-y-7 sm:space-y-8">

            {/* About */}
            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                About
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                {renderAbout(aboutMe)}
              </p>
            </section>

            {/* Experience and open source */}
            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Experience &amp; open source
              </h2>
              <div className="space-y-5">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-0.5">
                      {exp.role}
                    </div>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-normal mb-2 block transition-colors duration-150"
                    >
                      {exp.company} · {exp.period}
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <ProjectTabs
              openSource={projects.filter((project) => project.category === "open-source")}
              featured={projects.filter((project) => project.category === "featured")}
            />

            {/* Skills */}
            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skillGroups.flatMap((group, gi) => {
                  const badges = group.skills.map((skill: string, si: number) => (
                    <span
                      key={`${group.name}-${si}`}
                      className="px-2.5 py-0.5 text-xs font-normal text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md"
                    >
                      {skill}
                    </span>
                  ));
                  if (gi < skillGroups.length - 1) {
                    badges.push(
                      <span key={`div-${gi}`} className="w-px h-5 self-center bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                    );
                  }
                  return badges;
                })}
              </div>
            </section>

            {/* Open-source activity */}
            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Open-source activity
              </h2>
              <div className="space-y-5">
                <ActivityTimeline events={timelineEvents} />
                <Suspense fallback={<div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 h-32 animate-pulse bg-gray-50 dark:bg-gray-900" />}>
                  <ContributionSection />
                </Suspense>
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ──────────────────────────────────── */}
          <aside className="space-y-4 lg:sticky lg:top-8">

            {/* Info */}
            <div className="hidden lg:block">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Info
              </h3>
              <ul className="space-y-2.5 text-sm font-normal text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <FiMapPin className="flex-shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                  <span>{profileMeta.location}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiClock className="flex-shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                  <LocalTime />
                </li>
                <li className="flex items-center gap-2">
                  <FiBook className="flex-shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                  <span>CS Major · 2028</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiZap className="flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <a
                    href={socialLinks.email}
                    className="font-normal hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    Open to work
                  </a>
                </li>
              </ul>
            </div>

            <div className="hidden border-t border-gray-200 dark:border-gray-700 lg:block" />

            {/* Contact */}
            <div className="hidden lg:block">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm font-normal text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
                  >
                    <FaGithub className="text-base flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">github.com/{profileMeta.username}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.email}
                    className="flex items-center gap-2.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
                  >
                    <TbMailFilled className="text-base flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">mishalshanavas@yahoo.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
                  >
                    <FaLinkedinIn className="text-base flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">mishalshanavas</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
                  >
                    <FaXTwitter className="text-base flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">mishal_shanavas</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
                  >
                    <FaInstagram className="text-base flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">mishal_shanavas</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Recent writing
                </h2>
                <Link href="/blog" className="text-xs text-[color:var(--accent)] hover:underline">
                  All →
                </Link>
              </div>
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block text-xs leading-snug text-gray-600 hover:text-[color:var(--accent)] hover:underline dark:text-gray-400"
                    >
                      {post.metadata.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
    </>
  );
}
