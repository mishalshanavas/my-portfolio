import { metaData } from "app/lib/config";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export function GET(request: Request) {
  // next/og requires Node.js streams unavailable in Cloudflare's Edge Runtime.
  // All OG requests redirect to the static profile image.
  // TODO: use a service like og.vercel.app for per-page dynamic images.
  const url = new URL(request.url);
  const ogImageUrl = new URL(metaData.ogImage, url.origin);
  return NextResponse.redirect(ogImageUrl, 302);
}
