import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFrontmatter } from "../app/lib/posts";

const base = `---
title: "A post"
publishedAt: "2026-10-01"
summary: >-
  A multiline summary
  with a second line.
tags: "Next.js, Cloudflare"
---
Body text`;

test("parses multiline YAML frontmatter and body", () => {
  const post = parseFrontmatter(base, "post.mdx");
  assert.equal(post.metadata.summary, "A multiline summary with a second line.");
  assert.equal(post.content, "Body text");
});

test("reports a missing frontmatter block with the filename", () => {
  assert.throws(() => parseFrontmatter("Body text", "missing.mdx"), /missing\.mdx: missing YAML frontmatter/);
});

test("rejects missing required fields and invalid calendar dates", () => {
  assert.throws(() => parseFrontmatter(base.replace('tags: "Next.js, Cloudflare"\n', ""), "post.mdx"), /tags must be a non-empty string/);
  assert.throws(() => parseFrontmatter(base.replace("2026-10-01", "2026-02-30"), "post.mdx"), /publishedAt must be a valid/);
});
