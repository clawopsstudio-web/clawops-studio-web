import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No basePath — nginx handles /site/ routing via URL rewriting
  turbopack: {
    root: "/root/.openclaw/workspaces/clawops-web",
  },
};

export default nextConfig;
