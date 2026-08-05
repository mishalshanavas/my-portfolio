import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { codeToTokens, type BundledLanguage } from "shiki";
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
      className="not-prose my-7 overflow-hidden rounded-lg border border-gray-200 dark:border-[#3e4451]"
      data-code-wrapper=""
    >
      <div className="flex h-9 items-center justify-between border-b border-gray-200 bg-gray-50 px-4 dark:border-[#3e4451] dark:bg-[#21252b]">
        <span className="select-none font-mono text-xs text-gray-500 dark:text-gray-400">
          {language || "text"}
        </span>
        <CopyButton />
      </div>
      <div className="overflow-x-auto bg-white dark:bg-[#282c34]">
        <pre className="m-0 border-0 bg-transparent px-4 py-4 text-sm leading-[1.65]">
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
