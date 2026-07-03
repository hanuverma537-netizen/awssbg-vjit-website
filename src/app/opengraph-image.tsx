import { ImageResponse } from "next/og";

/*
 * Default Open Graph image for routes that do not export their own. Rendered at
 * the edge with system fonts, so no font files are required.
 */
export const runtime = "edge";
export const alt = "AWS SBG VJIT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#161d27",
        padding: "72px",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#ff9900",
        }}
      >
        AWS Student Builder Group
      </div>
      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
          lineHeight: 1.05,
          color: "#fafaf7",
          maxWidth: 900,
        }}
      >
        Build the cloud, on campus.
      </div>
      <div style={{ fontSize: 30, color: "#8b93a1" }}>VJIT, Hyderabad</div>
    </div>,
    { ...size },
  );
}
