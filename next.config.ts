import type { NextConfig } from "next";

// DEPLOY_TARGET=ghpages is set in the GitHub Actions workflow for GitHub Pages.
// Vercel builds don't set this, so basePath stays empty there.
const isGHPages = process.env.DEPLOY_TARGET === "ghpages";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGHPages ? "/portfolio" : "",
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
