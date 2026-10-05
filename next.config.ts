import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/fireworks", destination: "/", permanent: true },
      { source: "/fireworks/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;