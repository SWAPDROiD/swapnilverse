import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.credly.com",
      },
      {
        protocol: "https",
        hostname: "learn.microsoft.com",
      },
      {
        protocol: "https",
        hostname: "www.udemy.com",
      },
      {
        protocol: "https",
        hostname: "udemy-certificate.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
