import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "./lib/config";
import { getTimelineEvents } from "./lib/activity";
import ContributionSection from "./components/contribution-section";
import ActivityTimeline from "./components/activity-timeline";
import ProjectCard from "./components/project-card";
import HorizontalScroll from "./components/horizontal-scroll";
import LocalTime from "./components/local-time";

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

  return (
    <>
        {/* HERO (full width top) */}
        <section className="flex flex-col sm:flex-row sm:items-center gap-5 pb-10 mb-10 border-b border-gray-200 dark:border-gray-800">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={hero.imageLight}
              alt="Profile photo"
              className="rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-200 dark:hidden"
              width={90}
              height={90}
              priority
            />
            <Image
              src={hero.imageDark}
              alt="Profile photo"
              aria-hidden="true"
              className="rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-200 hidden dark:block"
              width={90}
              height={90}
              priority
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
              href={socialLinks.email}
              className="py-3 font-medium text-[color:var(--accent)] hover:underline transition-colors duration-150"
            >
              Email me
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 items-start">

          {/* ── LEFT MAIN ─────────────────────────────────────── */}
          <div className="space-y-14 min-w-0">

            {/* About */}
            <section>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                About
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                {renderAbout(aboutMe)}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Experience
              </h2>
              <div className="space-y-6">
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

            {/* Skills */}
            <section>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
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

            {/* Activity Chart */}
            <section>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Activity
              </h2>
              <Suspense fallback={<div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 h-32 animate-pulse bg-gray-50 dark:bg-gray-900" />}>
                <ContributionSection />
              </Suspense>
            </section>

            {/* Contributions Timeline */}
            <section>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Contributions
              </h2>
              <ActivityTimeline events={timelineEvents} />
            </section>

            {/* Projects */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Projects
                </h2>
                <Link
                  href="/projects"
                  className="text-xs font-normal text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                >
                  View all →
                </Link>
              </div>
              <HorizontalScroll>
                {projects.map((project, idx) => (
                  <div key={idx} className="flex-shrink-0 w-72">
                    <ProjectCard project={project} />
                  </div>
                ))}
                {/* View all card */}
                <Link
                  href="/projects"
                  className="flex-shrink-0 w-36 flex flex-col items-center justify-center gap-2 border border-dashed border-gray-200 dark:border-gray-700 rounded-md hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-150 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="text-2xl">→</span>
                  <span className="text-xs font-light">View all</span>
                </Link>
              </HorizontalScroll>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ──────────────────────────────────── */}
          <aside className="lg:sticky lg:top-8 space-y-6">

            {/* Info */}
            <div>
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
                    Available for hire
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700" />

            {/* Contact */}
            <div>
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

          </aside>
        </div>
    </>
  );
}
