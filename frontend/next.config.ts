import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/institut0-potiguar",
  assetPrefix: "/institut0-potiguar/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
