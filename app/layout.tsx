import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "Free Outfit Consultation | A&A Fashion Boutique",
  description:
    "A free consultation to plan your bridal, wedding, festival, or party outfit — before you spend a single rupee.",
  openGraph: {
    title: "Free Outfit Consultation | A&A Fashion Boutique",
    description: "Plan your design, fitting, and price before you commit.",
    type: "website",
    locale: "en_US",
    siteName: "A&A Fashion Boutique",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Outfit Consultation | A&A Fashion Boutique",
    description: "Plan your design, fitting, and price before you commit.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
