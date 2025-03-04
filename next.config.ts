import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["gto.big-nose.ru"],
  },
};

export default withNextVideo(nextConfig);
