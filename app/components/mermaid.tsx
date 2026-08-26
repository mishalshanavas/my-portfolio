import { renderMermaidSVG } from "beautiful-mermaid";

type MermaidProps = {
  code: string;
  title: string;
};

function compactHorizontalCanvas(svg: string, code: string) {
  if (!/^\s*(?:flowchart|graph)\s+LR\b/m.test(code)) return svg;

  const rectangles = Array.from(
    svg.matchAll(/<rect[^>]*\sy="([^"]+)"[^>]*\sheight="([^"]+)"[^>]*>/g),
    ([, y, height]) => Number(y) + Number(height)
  );
  const topPadding = Math.min(
    ...Array.from(svg.matchAll(/<rect[^>]*\sy="([^"]+)"[^>]*>/g), ([, y]) => Number(y))
  );
  const dimensions = svg.match(/viewBox="0 0 ([^ ]+) ([^"]+)" width="[^"]+" height="[^"]+"/);

  if (!rectangles.length || !Number.isFinite(topPadding) || !dimensions) return svg;

  const width = dimensions[1];
  const currentHeight = Number(dimensions[2]);
  const compactHeight = Math.ceil((Math.max(...rectangles) + topPadding) * 10) / 10;
  if (compactHeight >= currentHeight) return svg;

  return svg
    .replace(`viewBox="0 0 ${width} ${dimensions[2]}"`, `viewBox="0 0 ${width} ${compactHeight}"`)
    .replace(`height="${currentHeight}"`, `height="${compactHeight}"`);
}

export function Mermaid({ code, title }: MermaidProps) {
  let renderedSvg: string;

  try {
    const svg = renderMermaidSVG(code, {
      bg: "var(--background)",
      fg: "var(--foreground)",
      line: "color-mix(in srgb, var(--foreground) 45%, var(--background))",
      accent: "var(--accent)",
      muted: "color-mix(in srgb, var(--foreground) 60%, var(--background))",
      surface: "color-mix(in srgb, var(--accent) 7%, var(--background))",
      border: "color-mix(in srgb, var(--accent) 35%, var(--background))",
      font: "var(--font-geist-sans), system-ui, sans-serif",
      nodeSpacing: 16,
      padding: 12,
      transparent: true,
    });
    const sketchStyle = `<style>
      .node > rect {
        rx: 7px;
        ry: 7px;
        fill: transparent;
        stroke-width: 1.1px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 3 3;
      }
      .edge { stroke-width: 1.1px; stroke-linecap: round; stroke-linejoin: round; }
      .edge-label > rect { display: none; }
      .edge-label > text {
        fill: var(--_text-muted);
        font-size: 10px;
        font-weight: 500;
        transform: translateY(-12px);
      }
    </style>`;
    const compactSvg = compactHorizontalCanvas(svg, code);
    renderedSvg = compactSvg.replace("</svg>", `${sketchStyle}</svg>`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown rendering error";
    return <p className="my-6 text-sm text-red-600 dark:text-red-400">Could not render {title}: {message}</p>;
  }

  return (
    <div
      aria-label={title}
      className="diagram-scroll not-prose my-6 overflow-x-auto rounded-lg border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-[#18181b] [&>svg]:mx-auto [&>svg]:block"
      dangerouslySetInnerHTML={{ __html: renderedSvg }}
      role="img"
    />
  );
}
