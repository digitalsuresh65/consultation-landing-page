import { ImageResponse } from "next/og";
export const alt = "A&A Fashion Boutique — Free Outfit Consultation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#FBF3EA",
        color: "#7A1B2E",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 27, marginBottom: 40 }}>
        A&amp;A Fashion Boutique
      </div>
      <div style={{ fontSize: 70, fontFamily: "serif" }}>
        Get the Perfect Fitting Dress
      </div>
      <div style={{ fontSize: 28, marginTop: 35 }}>
        Free one-to-one consultation
      </div>
    </div>,
    size,
  );
}
