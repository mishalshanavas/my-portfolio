import { metaData } from "app/lib/config";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export function GET(request: Request) {
  // For Cloudflare Pages, we'll redirect to a static OG image
  // since next/og requires Node.js streams which aren't available in Edge Runtime
  
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  
  // If a custom title is requested, we could use a third-party service
  // For now, redirect to the static OG image
  const ogImageUrl = new URL(metaData.ogImage, url.origin);
  
  return NextResponse.redirect(ogImageUrl, 302);
}
