/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // pdf parsing for CV screening runs on the server only
  serverExternalPackages: ["pdfjs-dist", "mammoth"],
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
};
export default nextConfig;
