import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "../lib/config";

export const metadata: Metadata = {
  title: "Projects",
  description: "Nextfolio Projects",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-light">Projects</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => {
          const isExternal = project.url.startsWith("http");
          return (
          <Link
            key={index}
            href={project.url}
            className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 active:scale-[0.99]"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                className={`object-cover ${project.imageAlignment} transition-transform duration-300 group-hover:scale-[1.02]`}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-light text-black dark:text-white mb-2">
                {project.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {project.description}
              </p>
              {project.tech && (
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
