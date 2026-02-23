import React from "react";
import Image from "next/image";
import Link from "next/link";
import { hero, socialLinks, experiences, aboutMe, skills, topProjects, contact } from "./lib/config";

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
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">

        {/* Hero Section */}
        <section className="flex flex-col items-start justify-center mb-12 sm:mb-16">
            <div className="flex items-center gap-4">
            <Image
              src={hero.imageLight}
              alt="Profile photo"
              className="rounded-full border-2 border-gray-200 dark:border-gray-800 transition-all duration-200 dark:hidden"
              width={120}
              height={120}
              priority
            />
            <Image
              src={hero.imageDark}
              alt="Profile photo"
              className="rounded-full border-2 border-gray-200 dark:border-gray-800 transition-all duration-200 hidden dark:block"
              width={120}
              height={120}
              priority
            />
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-black dark:text-white mb-1">
              {hero.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light mb-2">
              {hero.title}
              </p>
              <nav className="flex flex-wrap gap-3 sm:gap-4 text-sm">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  GitHub
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  LinkedIn
                </a>
                <a
                  href={socialLinks.email}
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  Email
                </a>
              </nav>
            </div>
            </div>
        </section>

        {/* About Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            About
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-normal font-light">
            {renderAbout(aboutMe)}
          </p>
        </section>

        {/* Experience Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Experience
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="font-light text-base sm:text-lg text-black dark:text-white mb-1">
                  {exp.role}
                </div>
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-light mb-2 block transition-colors duration-200"
                >
                  {exp.company} • {exp.period}
                </a>
                <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-light bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            <h2 className="text-lg sm:text-xl font-light text-black dark:text-white">
              Projects
            </h2>
            <Link 
              href="/projects"
              className="text-xs font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {topProjects.map((project, idx) => {
              const isExternal = project.url.startsWith("http");
              return (
              <div key={idx} className="group">
                <a
                  href={project.url}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 -mx-2 px-2 py-3 sm:py-2 rounded transition-colors duration-200"
                >
                  <div className="font-light text-base sm:text-base text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                    {project.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-light mt-1">
                    {project.description}
                  </div>
                </a>
              </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Contact
          </h2>
          <p
            className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contact.text }}
          />
        </section>
      </div>
    </div>
  );
}
