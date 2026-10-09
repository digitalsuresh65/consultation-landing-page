import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thank You | A&A Fashion Boutique",
  robots: { index: false, follow: false },
};
export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
