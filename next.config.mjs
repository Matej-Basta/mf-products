/** @type {import('next').NextConfig} */

import NextFederationPlugin from "@module-federation/nextjs-mf";

const isProduction = process.env.NODE_ENV === 'production';
const isPreview = process.env.VERCEL_ENV === 'preview';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    config.output.publicPath = isPreview ? 'https://mf-products-staging.vercel.app/_next/' : (isProduction ? 'https://mf-products-ten.vercel.app/_next/' : 'http://localhost:3006/_next/');
    config.plugins.push(
      new NextFederationPlugin({
        name: "products",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
           './Products': "./src/pages/index.tsx",
        },
        remotes: {},
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  },
};

export default nextConfig;