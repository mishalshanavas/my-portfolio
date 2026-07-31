import { ImageResponse } from "next/og";
import { metaData } from "../lib/config";

export const runtime = 'edge';

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || metaData.name;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          color: "#111827",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#6b7280" }}>
          {metaData.name}
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 600, lineHeight: 1.1, maxWidth: "1000px" }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#1f75cb" }}>
          Backend developer · Python · Django · Cloud
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
