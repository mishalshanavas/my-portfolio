# Portfolio

## Deployment

The production site at `mishalshanavas.in` deploys through Vercel. Cloudflare
proxies the public domain, so its response headers do not identify the origin.

This repository also has a separate Cloudflare Pages preview deployment. Its
build command is `pnpm pages:build`, with `.vercel/output/static` as the build
output directory and the `nodejs_compat` flag from `wrangler.toml`.
