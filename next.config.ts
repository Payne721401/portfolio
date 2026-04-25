import type { NextConfig } from "next";

// DEPLOY_TARGET=ghpages is set in the GitHub Actions workflow for GitHub Pages.
// Vercel builds don't set this, so basePath stays empty there.
const isGHPages = process.env.DEPLOY_TARGET === "ghpages";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: isDev ? undefined : "export",
  trailingSlash: true,
  basePath: isGHPages ? "/portfolio" : "",
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
