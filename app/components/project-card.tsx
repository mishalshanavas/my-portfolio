import Image from "next/image";
import Link from "next/link";

interface Project {
  name: string;
  url: string;
  description: string;
  image?: string;
  date?: string;
  tech?: string[];
  featured?: boolean;
  imageAlignment?: string;
  isContributor?: boolean;
  isSideQuest?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

function formatCardDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(
    dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`
  );
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isExternal = project.url.startsWith("http");
  const initial = project.name.charAt(0).toUpperCase();

  return (
    <Link
      href={project.url}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex flex-col h-44 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 dark:focus-visible:ring-gray-400"
    >
      <div className="flex items-start gap-3">
        {/* Avatar: image or initial */}
        <div className="w-11 h-11 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          {project.image ? (
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
          ) : (
            <span className="text-lg font-light text-gray-500 dark:text-gray-400">
              {initial}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="text-sm font-medium text-black dark:text-white line-clamp-1 leading-snug">
            {project.name}
          </div>
          {project.date && (
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {formatCardDate(project.date)}
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed flex-1">
            {project.description}
          </p>
          {(project.isContributor || project.isSideQuest || (project.tech && project.tech.length > 0)) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {project.isContributor && (
                <span className="px-1.5 py-0.5 text-xs font-medium bg-black/[0.07] text-black border border-black/30 rounded dark:bg-white/[0.07] dark:text-white dark:border-white/30">
                  Contributor
                </span>
              )}
              {project.isSideQuest && (
                <span className="px-1.5 py-0.5 text-xs font-light bg-transparent text-black border border-dashed border-black/40 rounded dark:text-white dark:border-white/40">
                  Side Quest
                </span>
              )}
              {project.tech?.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 text-xs font-light bg-transparent text-black border border-black/20 rounded dark:text-white dark:border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
