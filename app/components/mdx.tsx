import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { TweetComponent } from "./tweet";
import { CaptionComponent } from "./caption";
import { YouTubeComponent } from "./youtube";
import { CopyButton } from "./code-block";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: React.ReactNode };

function CustomLink({ href, children, ...rest }: LinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return <a href={href} {...rest}>{children}</a>;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

type RoundedImageProps = React.ComponentProps<typeof Image>;

function RoundedImage({ alt = "", ...props }: RoundedImageProps) {
  return <Image alt={alt} className="rounded-lg" {...props} />;
}

type CodeProps = { children: string } & React.HTMLAttributes<HTMLElement>;

function Code({ children, ...props }: CodeProps) {
  let codeHTML = highlight(children);
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
    />
  );
}

type TableData = { headers: string[]; rows: string[][] };

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr className="text-left">{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type StrikethroughProps = React.HTMLAttributes<HTMLElement>;

function Strikethrough(props: StrikethroughProps) {
  return <del {...props} />;
}

function PreBlock({ children }: React.HTMLAttributes<HTMLPreElement>) {
  let language = "";
  let rawCode = "";

  if (React.isValidElement(children)) {
    const codeProps = children.props as Record<string, unknown>;
    const className = (codeProps?.className as string) ?? "";
    const match = className.match(/language-(\w+)/);
    language = match ? match[1] : "";
    rawCode = (codeProps?.children as string) ?? "";
  }

  // sugar-high v0.9 inserts a \n between consecutive sh__line spans on top of
  // the \n already inside each line token — strip the inter-span one.
  let codeHTML = highlight(rawCode).replace(
    /<\/span>\n<span class="sh__line">/g,
    '</span><span class="sh__line">'
  );

  // Fix inline comments: sugar-high doesn't recognise # as a comment marker in
  // YAML/shell. For each sh__line, if a standalone # sign token appears after
  // other content, replace it and everything after (until the trailing \n token)
  // with a single comment-coloured span.
  const HASH_TOKEN =
    '<span class="sh__token--sign" style="color:var(--sh-sign)">#</span>';
  const NL_TOKEN =
    '<span class="sh__token--string" style="color:var(--sh-string)">\n</span>';
  const SPACE_RE =
    /<span class="sh__token--space"[^>]*>[\s\S]*?<\/span>/g;

  codeHTML = codeHTML
    .split('<span class="sh__line">')
    .map((chunk, i) => {
      if (i === 0) return chunk;
      const hIdx = chunk.indexOf(HASH_TOKEN);
      if (hIdx === -1) return '<span class="sh__line">' + chunk;

      const before = chunk.substring(0, hIdx);
      // Only treat as inline comment if there's non-space content before #
      if (!before.replace(SPACE_RE, "")) return '<span class="sh__line">' + chunk;

      const after = chunk.substring(hIdx + HASH_TOKEN.length);
      const nlIdx = after.lastIndexOf(NL_TOKEN);
      const commentBody = nlIdx !== -1 ? after.substring(0, nlIdx) : after;
      const tail = nlIdx !== -1 ? after.substring(nlIdx) : "";
      const commentText = "#" + commentBody.replace(/<[^>]+>/g, "");

      return (
        `<span class="sh__line">${before}` +
        `<span style="color:var(--sh-comment);font-style:italic">${commentText}</span>` +
        `${tail}`
      );
    })
    .join("");

  const monoStack =
    "ui-monospace, 'Cascadia Code', 'Fira Code', Menlo, Consolas, monospace";

  return (
    <div
      className="not-prose my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-[#2a2a2a] shadow-sm"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ "data-code-wrapper": "" } as any)}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f0f0f0] dark:bg-[#1c1c1c] border-b border-gray-200 dark:border-[#2a2a2a]">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {/* Language label + copy — both on the right */}
        <div className="flex items-center gap-3">
          {language && (
            <span className="text-xs font-mono text-gray-400 dark:text-gray-500 select-none">
              {language}
            </span>
          )}
          <CopyButton />
        </div>
      </div>
      {/* Code area */}
      <div className="bg-[#fafafa] dark:bg-[#141414] overflow-x-auto">
        <pre
          style={{
            margin: 0,
            padding: "1rem 1.25rem",
            background: "transparent",
            border: "none",
            borderRadius: 0,
            fontSize: "13px",
            lineHeight: 1.5,
            fontFamily: monoStack,
          }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: codeHTML }}
            style={{
              fontFamily: monoStack,
              fontSize: "13px",
              lineHeight: 1.5,
              display: "block",
              padding: 0,
              margin: 0,
              background: "transparent",
              border: "none",
              whiteSpace: "pre",
            }}
          />
        </pre>
      </div>
    </div>
  );
}
type CalloutProps = { emoji?: React.ReactNode; children: React.ReactNode };

function Callout({ emoji, children }: CalloutProps) {
  return (
    <div className="my-6 border-l-2 border-gray-300 dark:border-gray-600 pl-4 py-0.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed [&_p]:m-0">
      {children}
    </div>
  );
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: PreBlock,
  StaticTweet: TweetComponent,
  Caption: CaptionComponent,
  YouTube: YouTubeComponent,
  code: Code,
  Table,
  del: Strikethrough,
  Callout,
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
