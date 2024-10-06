import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { withContentlayer } from "next-contentlayer2";
import { env } from "./env.mjs";

const output = process.env.EXPORT ? "export" : undefined;
const basePath = process.env.BASE_PATH || undefined;
const unoptimized = process.env.UNOPTIMIZED ? true : undefined;

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins(
  [[withContentlayer, withBundleAnalyzer({ enabled: env.ANALYZE })]],
  {
    output,
    basePath,
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    eslint: {
      dirs: ["app", "components", "layouts", "scripts"],
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "picsum.photos",
        },
      ],
      unoptimized,
    },
    rewrites() {
      return [
        { source: "/healthz", destination: "/api/health" },
        { source: "/api/healthz", destination: "/api/health" },
        { source: "/health", destination: "/api/health" },
        { source: "/ping", destination: "/api/health" },
      ];
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  },
);

export default config;
