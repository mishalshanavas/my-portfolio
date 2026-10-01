import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { projectCategories, type Project } from "../lib/config";

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
  const initial = project.name.charAt(0).toUpperCase();
  const href = project.slug ? `/projects/${project.slug}` : project.url;
  const isExternal = href.startsWith("http");
  const details = [
    formatCardDate(project.date),
    projectCategories.find((category) => category.id === project.category)?.label ?? "",
    project.role ?? "",
  ].filter(Boolean);

  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex gap-3 rounded-md py-4 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        {project.image ? (
          <div className="relative h-full w-full">
            <Image
              src={project.image}
              alt=""
              fill
              className={`object-cover ${project.imageAlignment ?? ""}`}
              sizes="40px"
            />
          </div>
        ) : (
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
            {initial}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium leading-snug text-gray-900 group-hover:underline dark:text-gray-100">
          {project.name}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-gray-500 dark:text-gray-400">
          {details.map((detail, index) => (
            <Fragment key={detail}>
              {index > 0 && <span aria-hidden="true">·</span>}
              <span>{detail}</span>
            </Fragment>
          ))}
        </div>
        <p className="mt-1 line-clamp-4 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
          {project.homeDescription ?? project.description}
        </p>
        {project.tech.length > 0 && (
          <p className="mt-1.5 truncate text-[11px] text-gray-400 dark:text-gray-500">
            {project.tech.slice(0, 4).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
