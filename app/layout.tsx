import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import { BrandSymbols } from "@/components/Brand";

// Poppins only, self-hosted (SIL Open Font License, see app/fonts/OFL.txt)
const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://inaspaceworks.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Ina SpaceWorks", template: "%s · Ina SpaceWorks" },
  description: "Design-led interiors for workplaces and commercial spaces, with engineers in the family.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Ina SpaceWorks",
    siteName: "Ina SpaceWorks",
    type: "website",
    locale: "en_IN",
    description: "Design-led interiors for workplaces and commercial spaces, with engineers in the family.",
  },
};
export const viewport: Viewport = { themeColor: "#F4F2EE", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={poppins.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <BrandSymbols />
        <Chrome />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
