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
      <h1 className="mb-8 text-2xl font-medium">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.url}
            className="group block overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                className={`object-cover ${project.imageAlignment} transition-transform duration-200 group-hover:scale-105`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-medium text-black dark:text-white mb-2">
                {project.name}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                {project.description}
              </p>
              {project.tech && (
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
