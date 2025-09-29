// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import playformCompress from "@playform/compress";

import compressor from "astro-compressor";

import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

const { SITE_URL } = loadEnv(process.env.SITE_URL, process.cwd(), "");
const { MODE } = loadEnv(process.env.MODE, process.cwd(), "");

export default defineConfig({
  output: MODE == "standalone" ? "server" : "static",
  adapter:
    MODE == "standalone"
      ? node({
          mode: "standalone",
        })
      : undefined,
  site: SITE_URL,
  trailingSlash: "never",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  image: {
    service: {
      config: {
        limitInputPixels: false,
      },
    },
    layout: "constrained",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.h4hn.de",
        pathname: "/**",
      },
    ],
  },
  integrations: [react(), icon(), sitemap(), playformCompress(), compressor()],
  vite: {
    plugins: [tailwindcss()],
  },
});
