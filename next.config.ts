import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["react-icons"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tygry8.saikat.com.bd",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;