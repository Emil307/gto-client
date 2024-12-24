import type { NextConfig } from "next";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: true,
});

export default withBundleAnalyzer(nextConfig);
