import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ format: string }> }
) {
  const { format } = await params;
  const validFormats = ["rss.xml", "atom.xml", "feed.json"];

  if (!validFormats.includes(format)) {
    return NextResponse.json(
      { error: "Unsupported feed format" },
      { status: 404 }
    );
  }

  // Redirect to the static feed files generated at build time
  return NextResponse.redirect(new URL(`/${format}`, _?.url || 'https://example.com'), 301);
}
