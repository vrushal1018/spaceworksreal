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
  description: "Design-led interiors for workplaces and commercial spaces, with engineers in the family. An interior vertical of Ina TechFM.",
  openGraph: { siteName: "Ina SpaceWorks", type: "website", locale: "en_IN" },
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
