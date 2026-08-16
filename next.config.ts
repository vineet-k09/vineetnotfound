import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@react-three/drei",
      "@react-three/fiber",
      "framer-motion",
      "three",
    ],
  },
  transpilePackages: ["three", "@react-three/drei", "@react-three/fiber"],
};

export default nextConfig;
