import Image from "next/image";
import Link from "next/link";
import { hero, socialLinks, experiences, aboutMe, skills, topProjects, contact } from "./lib/config";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Hero Section */}
        <section className="flex flex-col items-start justify-center mb-20">
            <div className="flex items-center gap-6 mb-6 justify-start">
            <Image
              src={hero.image}
              alt="Profile photo"
              className="rounded-full border-4 border-gray-100 dark:border-gray-800 transition-all duration-300"
              unoptimized
              width={120}
              height={120}
              priority
            />
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
              {hero.name}
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 font-light">
              {hero.title}
              </p>
            </div>
            </div>
          <nav className="flex gap-8 justify-start text-sm">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            >
              GitHub
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            >
              LinkedIn
            </a>
            <a
              href={socialLinks.email}
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            >
              Email
            </a>
          </nav>
        </section>

        {/* About Section */}
        <section className="mb-16">
          {/*<h2 className="text-xl font-light mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            About
          </h2>*/}
          <p
            className="text-gray-700 dark:text-gray-300 leading-relaxed font-light"
            dangerouslySetInnerHTML={{
              __html: aboutMe
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
                .replace(/\n/g, "<br />"), 
            }}
          ></p>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-xl font-light mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="font-light text-lg text-black dark:text-white mb-1">
                  {exp.role}
                </div>
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 font-light mb-2 "
                >
                  {exp.company} • {exp.period}
                </a>
                <div className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-xl font-light mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-light bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            <h2 className="text-xl font-light text-black dark:text-white">
              Projects
            </h2>
            <Link href="/projects">
              <span className="text-xs font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600">
                View All →
              </span>
            </Link>
          </div>
          <div className="space-y-4">
            {topProjects.map((project, idx) => (
              <div key={idx} className="group">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-950 -mx-2 px-2 py-2 rounded transition-colors"
                >
                  <div className="font-light text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {project.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-light mt-1">
                    {project.description}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-xl font-light mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Contact
          </h2>
          <p
            className="text-gray-700 dark:text-gray-300 font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contact.text }}
          />
        </section>
      </div>
    </div>
  );
}
