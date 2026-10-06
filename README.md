# Portfolio

## Cloudflare Pages deployment

Set the Pages project's **Build command** to `pnpm pages:build` and its
**Build output directory** to `.vercel/output/static`. Keep the `nodejs_compat`
compatibility flag enabled as specified in `wrangler.toml`.

The `pages:build` script runs the Next.js adapter and then patches its worker
to serve prerendered Next.js 16 segment requests. Running only `pnpm build` or
`npx @cloudflare/next-on-pages` skips that patch and leaves dynamic project and
blog prefetch requests returning 404.
