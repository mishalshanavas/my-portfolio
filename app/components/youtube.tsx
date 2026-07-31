"use client";
import YT, { type YouTubeProps } from "react-youtube";

export function YouTubeComponent({ title = "Embedded YouTube video", ...props }: YouTubeProps) {
  return (
    <div className="relative w-full h-0 pb-[56.25%] my-6">
      <YT
        opts={{
          height: '100%',
          width: '100%',
        }}
        {...props}
        title={title}
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
