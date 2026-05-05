import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { formatDate, getBlogPosts, getReadingTime } from "../lib/posts";

export const metadata = {
  title: "Blog",
  description: "Posts about backend development, Linux, open source, and things I find interesting.",
};

function getCoverSVG(slug: string): string {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) {
    seed = (Math.imul(seed, 31) + slug.charCodeAt(i)) | 0;
  }
  seed = seed >>> 0;

  const rand = (): number => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 0x100000000;
  };
  const ri = (min: number, max: number) =>
    min + Math.floor(rand() * (max - min + 1));

  // Monochrome palette — matches the site's black/white/gray UI
  const colors = [
    "#ffffff", "#e5e5e5", "#a3a3a3",
    "#737373", "#404040", "#171717",
  ];
  const bgs = ["#0a0a0a", "#0d0d0d", "#111111", "#141414", "#0f0f0f"];
  const bg = bgs[ri(0, bgs.length - 1)];
  const light = () => colors[ri(0, 2)];  // white / light gray
  const mid   = () => colors[ri(2, 4)];  // mid / dark gray

  const style = ri(0, 3);
  let shapes = "";

  if (style === 0) {
    // Irregular polygon shards — jagged, asymmetric
    const c1 = light(), c2 = mid(), c3 = light();
    const p1 = `${ri(-10,20)},${ri(-10,10)} ${ri(50,90)},${ri(-15,5)} ${ri(60,95)},${ri(40,70)} ${ri(10,40)},${ri(55,80)}`;
    const p2 = `${ri(30,60)},${ri(0,20)} ${ri(85,100)},${ri(20,50)} ${ri(70,100)},${ri(70,100)} ${ri(40,65)},${ri(60,90)}`;
    const lx1 = ri(-5,40), lx2 = ri(50,90), ly1 = ri(0,80), ly2 = ri(0,80);
    shapes = [
      `<polygon points="${p1}" fill="${c1}" opacity="0.9"/>`,
      `<polygon points="${p2}" fill="${c2}" opacity="0.7"/>`,
      `<line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="${c3}" stroke-width="2" opacity="0.6"/>`,
    ].join("");
  } else if (style === 1) {
    // Skewed ellipses at wild angles, off-center
    const cx1 = ri(-10, 50), cy1 = ri(-10, 50);
    const cx2 = ri(30, 90), cy2 = ri(30, 90);
    const rx1 = ri(30, 60), ry1 = ri(10, 28), rot1 = ri(-80, 80);
    const rx2 = ri(20, 45), ry2 = ri(8, 20), rot2 = ri(-80, 80);
    const c1 = light(), c2 = mid(), c3 = light();
    shapes = [
      `<ellipse cx="${cx1}" cy="${cy1}" rx="${rx1}" ry="${ry1}" fill="${c1}" transform="rotate(${rot1} ${cx1} ${cy1})" opacity="0.88"/>`,
      `<ellipse cx="${cx2}" cy="${cy2}" rx="${rx2}" ry="${ry2}" fill="${c2}" transform="rotate(${rot2} ${cx2} ${cy2})" opacity="0.72"/>`,
      `<ellipse cx="${ri(0,80)}" cy="${ri(0,80)}" rx="${ri(5,14)}" ry="${ri(3,8)}" fill="${c3}" transform="rotate(${ri(-90,90)} 40 40)" opacity="0.95"/>`,
    ].join("");
  } else if (style === 2) {
    // Parallelograms — sheared rects, not rotated
    const c1 = light(), c2 = mid(), c3 = light();
    const sh1 = ri(10, 35), sh2 = ri(-30, -10);
    const x1 = ri(-20, 10), w1 = ri(40, 65);
    const x2 = ri(20, 55), w2 = ri(20, 40);
    shapes = [
      `<polygon points="${x1},${ri(-5,5)} ${x1+w1},${ri(-5,5)} ${x1+w1+sh1},${ri(75,85)} ${x1+sh1},${ri(75,85)}" fill="${c1}" opacity="0.9"/>`,
      `<polygon points="${x2},${ri(-5,5)} ${x2+w2},${ri(-5,5)} ${x2+w2+sh2},${ri(75,85)} ${x2+sh2},${ri(75,85)}" fill="${c2}" opacity="0.7"/>`,
      `<line x1="${ri(-10,30)}" y1="${ri(0,40)}" x2="${ri(50,95)}" y2="${ri(40,85)}" stroke="${c3}" stroke-width="${ri(1,3)}" opacity="0.5"/>`,
    ].join("");
  } else {
    // Arc slices — like pie wedges, off-frame
    const c1 = mid(), c2 = light(), c3 = mid();
    const ocx = ri(-20, 30), ocy = ri(-20, 30);
    const r1 = ri(50, 90), r2 = ri(25, 48);
    const a1s = ri(0, 60), a1e = ri(90, 160);
    const a2s = ri(180, 240), a2e = ri(280, 340);
    const toRad = (d: number) => (d * Math.PI) / 180;
    const arc = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
      const x1 = cx + r * Math.cos(toRad(startDeg));
      const y1 = cy + r * Math.sin(toRad(startDeg));
      const x2 = cx + r * Math.cos(toRad(endDeg));
      const y2 = cy + r * Math.sin(toRad(endDeg));
      return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;
    };
    shapes = [
      `<path d="${arc(ocx, ocy, r1, a1s, a1e)}" fill="${c1}" opacity="0.85"/>`,
      `<path d="${arc(ocx + ri(20,50), ocy + ri(20,50), r2, a2s, a2e)}" fill="${c2}" opacity="0.78"/>`,
      `<line x1="${ri(0,40)}" y1="${ri(0,40)}" x2="${ri(40,90)}" y2="${ri(40,90)}" stroke="${c3}" stroke-width="2" opacity="0.4"/>`,
    ].join("");
  }

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" style="overflow:hidden">`,
    `<rect width="80" height="80" fill="${bg}"/>`,
    shapes,
    `</svg>`,
  ].join("");

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function BlogPosts() {
  const sortedBlogs = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Blog</h1>
      <div className="border-t border-gray-300 dark:border-gray-800 divide-y divide-gray-300 dark:divide-gray-800">
        {sortedBlogs.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 py-4 -mx-2 px-2 rounded transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 dark:focus-visible:ring-gray-400"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getCoverSVG(post.slug)}
              className="w-10 h-10 flex-shrink-0"
              aria-hidden="true"
              alt=""
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-black dark:text-white leading-snug">
                {post.metadata.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <span>{formatDate(post.metadata.publishedAt, false)}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{getReadingTime(post.content)}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {post.metadata.summary}
              </p>
            </div>
            <FiChevronRight
              aria-hidden="true"
              className="mt-1 flex-shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

