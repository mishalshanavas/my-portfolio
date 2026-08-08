import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { codeToTokens, type BundledLanguage } from "shiki";
import { TweetComponent } from "./tweet";
import { CaptionComponent } from "./caption";
import { YouTubeComponent } from "./youtube";
import { CopyButton } from "./code-block";
import { Mermaid } from "./mermaid";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
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

function RoundedImage({ alt = "", width, height, ...props }: RoundedImageProps) {
  return (
    <Image
      alt={alt}
      className="rounded-lg"
      height={height ?? 960}
      width={width ?? 1920}
      {...props}
    />
  );
}

type CodeProps = { children: string } & React.HTMLAttributes<HTMLElement>;

function Code({ children, ...props }: CodeProps) {
  const content = props.className
    ? children
    : children.replace(/^`([\s\S]*)`$/, "$1");

  return <code {...props}>{content}</code>;
}

type TableData = { headers: string[]; rows: string[][] };
type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  children?: React.ReactNode;
  data?: TableData;
};

function Table({ children, data, ...props }: TableProps) {
  const content = data ? (
    <>
      <thead>
        <tr>
          {data.headers.map((header, index) => <th key={index}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </>
  ) : children;

  return (
    <div className="not-prose my-6 w-full overflow-x-auto" data-table-wrapper="">
      <table {...props}>{content}</table>
    </div>
  );
}

type StrikethroughProps = React.HTMLAttributes<HTMLElement>;

const languageAliases: Record<string, string> = {
  bash: "bash",
  js: "javascript",
  py: "python",
  shell: "bash",
  sh: "bash",
  shellscript: "bash",
  text: "text",
  plaintext: "text",
  ts: "typescript",
  yml: "yaml",
};

function Strikethrough(props: StrikethroughProps) {
  return <del {...props} />;
}

async function PreBlock({ children }: React.HTMLAttributes<HTMLPreElement>) {
  let language = "";
  let rawCode = "";

  if (React.isValidElement(children)) {
    const codeProps = children.props as Record<string, unknown>;
    const className = (codeProps?.className as string) ?? "";
    const match = className.match(/language-([\w-]+)/);
    language = match ? match[1] : "";
    rawCode = (codeProps?.children as string) ?? "";
  }

  const requestedLanguage = (
    languageAliases[language.toLowerCase()] ?? (language || "text")
  ) as BundledLanguage;
  let highlighted;

  try {
    highlighted = await codeToTokens(rawCode.trimEnd(), {
      lang: requestedLanguage,
      themes: { light: "github-light", dark: "one-dark-pro" },
    });
  } catch {
    highlighted = await codeToTokens(rawCode.trimEnd(), {
      lang: "text",
      themes: { light: "github-light", dark: "one-dark-pro" },
    });
  }

  return (
    <div
      className="not-prose my-6 overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-[#18181b] dark:text-gray-50"
      data-code-wrapper=""
    >
      <div className="flex h-9 items-center justify-between border-b border-gray-200 bg-gray-50/80 px-3 dark:border-gray-800 dark:bg-[#202024]">
        <span className="select-none font-mono text-[11px] font-medium text-gray-500 dark:text-gray-400">
          {language || "text"}
        </span>
        <CopyButton />
      </div>
      <div className="overflow-x-auto bg-white dark:bg-[#18181b]">
        <pre className="m-0 border-0 bg-transparent px-3 py-3 text-[13px] leading-6 sm:px-4">
          <code className="block min-w-max font-mono">
            {highlighted.tokens.map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                <span className="block min-h-[1lh]">
                  {line.map((token, tokenIndex) => (
                    <span
                      data-shiki-token=""
                      key={`${lineIndex}-${tokenIndex}`}
                      style={token.htmlStyle as React.CSSProperties}
                    >
                      {token.content}
                    </span>
                  ))}
                </span>
                {lineIndex < highlighted.tokens.length - 1 ? (
                  <span className="hidden">{"\n"}</span>
                ) : null}
              </React.Fragment>
            ))}
          </code>
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
  table: Table,
  Table,
  del: Strikethrough,
  Callout,
  Mermaid,
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
