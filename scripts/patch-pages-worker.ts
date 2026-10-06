import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// next-on-pages misses Next 16's prerendered dynamic leaf segments when the
// request uses Next-Router-Segment-Prefetch. Serve those generated files directly.
const workerDir = join(process.cwd(), ".vercel/output/static/_worker.js");
const entry = join(workerDir, "index.js");
const generated = join(workerDir, "generated.js");

if (!existsSync(entry) || !readFileSync(entry, "utf8").includes("export{wr as default}")) {
  throw new Error("Unexpected next-on-pages worker output; segment routing patch was not applied");
}

rmSync(generated, { force: true });
renameSync(entry, generated);
writeFileSync(entry, `import worker from "./generated.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/__portfolio-patch-status") {
      return new Response("next16-segment-patch-v1", { headers: { "content-type": "text/plain" } });
    }
    const segment = request.headers.get("next-router-segment-prefetch");
    const isProject = url.pathname.startsWith("/projects/") && segment === "/projects/$d$slug";
    const isBlog = url.pathname.startsWith("/blog/") && segment === "/blog/$d$slug";

    if (request.headers.get("rsc") === "1" && request.headers.get("next-router-prefetch") === "1" && (isProject || isBlog)) {
      url.pathname += ".segments" + segment + ".segment.rsc";
      url.search = "";
      const asset = await env.ASSETS.fetch(new Request(url));
      if (asset.ok) {
        const headers = new Headers(asset.headers);
        headers.set("content-type", "text/x-component");
        headers.set("vary", "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch");
        headers.set("x-portfolio-segment-source", "asset");
        return new Response(asset.body, { status: asset.status, headers });
      }
    }

    const response = await worker.fetch(request, env, ctx);
    if (isProject || isBlog) {
      const headers = new Headers(response.headers);
      headers.set("x-portfolio-segment-source", "fallback");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  },
};
`);
