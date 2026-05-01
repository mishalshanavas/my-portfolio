import React from "react";
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
  skills,
  projects,
  profileMeta,
  contributionData as fallbackData,
} from "./lib/config";
import { getTimelineEvents } from "./lib/activity";
import { fetchGitHubContributions } from "./lib/github";
import ContributionChart from "./components/contribution-chart";
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

export default async function Page() {
  const timelineEvents = getTimelineEvents();
  const ghData = await fetchGitHubContributions(profileMeta.username);
  const contributionData = ghData.length > 0 ? ghData : fallbackData;

  return (
    <>
        {/* HERO (full width top) */}
        <section className="flex flex-col sm:flex-row sm:items-center gap-5 pb-8 mb-8 border-b border-gray-200 dark:border-gray-800">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={hero.imageLight}
              alt="Profile photo"
              className="rounded-full border-2 border-gray-200 dark:border-gray-800 transition-all duration-200 dark:hidden"
              width={90}
              height={90}
              priority
            />
            <Image
              src={hero.imageDark}
              alt="Profile photo"
              className="rounded-full border-2 border-gray-200 dark:border-gray-800 transition-all duration-200 hidden dark:block"
              width={90}
              height={90}
              priority
            />
          </div>

          {/* Name + username + title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-light text-black dark:text-white leading-tight">
              {hero.name}
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 font-light mt-0.5">
              @{profileMeta.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-1">
              {hero.title}
            </p>
          </div>

          {/* Social text links */}
          <nav className="flex flex-wrap gap-3 sm:gap-4 text-sm flex-shrink-0">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={socialLinks.email}
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Email
            </a>
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="mishalshanavas_cv.pdf"
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Resume ↗
            </a>
          </nav>
        </section>

        {/* ── TWO-COLUMN BODY ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_210px] gap-8 items-start">

          {/* ── LEFT MAIN ─────────────────────────────────────── */}
          <div className="space-y-12 min-w-0">

            {/* About */}
            <section>
              <h2 className="text-base font-light text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                About
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                {renderAbout(aboutMe)}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-base font-light text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <div className="font-light text-sm text-black dark:text-white mb-0.5">
                      {exp.role}
                    </div>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-light mb-2 block transition-colors duration-200"
                    >
                      {exp.company} · {exp.period}
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-base font-light text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-light bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Activity Chart */}
            <section>
              <h2 className="text-base font-light text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                Activity
              </h2>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 overflow-hidden">
                <ContributionChart data={contributionData} />
              </div>
            </section>

            {/* Contributions Timeline */}
            <section>
              <h2 className="text-base font-light text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                Contributions
              </h2>
              <ActivityTimeline events={timelineEvents} />
            </section>

            {/* Projects */}
            <section>
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                <h2 className="text-base font-light text-black dark:text-white">
                  Personal Projects
                </h2>
                <Link
                  href="/projects"
                  className="text-xs font-light text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
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
                  className="flex-shrink-0 w-36 flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"
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
              <h3 className="text-xs font-medium text-black dark:text-white uppercase tracking-wider mb-3">
                Info
              </h3>
              <ul className="space-y-2 text-sm font-light text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <FiMapPin className="flex-shrink-0 text-gray-400" />
                  <span>{profileMeta.location}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiClock className="flex-shrink-0 text-gray-400" />
                  <LocalTime />
                </li>
                <li className="flex items-center gap-2">
                  <FiBook className="flex-shrink-0 text-gray-400" />
                  <span>CS major</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiZap className="flex-shrink-0 text-blue-500" />
                  <span className="text-blue-600 dark:text-blue-400">Available for freelance</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800" />

            {/* Contact */}
            <div>
              <h3 className="text-xs font-medium text-black dark:text-white uppercase tracking-wider mb-3">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm font-light text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <FaGithub className="text-base flex-shrink-0" />
                    <span className="truncate">github.com/{profileMeta.username}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.email}
                    className="flex items-center gap-2.5 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <TbMailFilled className="text-base flex-shrink-0" />
                    <span className="truncate">mishalshanavas@yahoo.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <FaLinkedinIn className="text-base flex-shrink-0" />
                    <span className="truncate">mishalshanavas</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <FaXTwitter className="text-base flex-shrink-0" />
                    <span className="truncate">mishal_shanavas</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <FaInstagram className="text-base flex-shrink-0" />
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
