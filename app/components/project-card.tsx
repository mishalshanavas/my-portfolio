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
      className="flex flex-col h-44 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
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
          <div className="text-sm font-medium text-black dark:text-white line-clamp-2 leading-snug">
            {project.name}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 line-clamp-2 leading-relaxed flex-1">
            {project.description}
          </p>
          {(project.isContributor || (project.tech && project.tech.length > 0)) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {project.isContributor && (
                <span className="px-1.5 py-0.5 text-[10px] font-light bg-[#FBF9E4] text-[#122C4F] border border-[#122C4F]/20 rounded dark:bg-[#122C4F] dark:text-[#FBF9E4] dark:border-[#5B88B2]">
                  Contributor
                </span>
              )}
              {project.tech?.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 text-[10px] font-light bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {project.date && (
        <div className="text-[10px] text-gray-400 dark:text-gray-600 mt-auto pt-2">
          Updated {formatCardDate(project.date)}
        </div>
      )}
    </Link>
  );
}
