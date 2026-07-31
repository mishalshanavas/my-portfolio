export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
        role="region"
        aria-label="Projects. Scroll horizontally to view more."
        tabIndex={0}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-black to-transparent" aria-hidden="true" />
    </div>
  );
}
