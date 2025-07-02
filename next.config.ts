import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export', // Active l'export statique
  images: {
    unoptimized: true, // Désactive l'optimisation d'image pour l'export
  },
};

export default nextConfig;
