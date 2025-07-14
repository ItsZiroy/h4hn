// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

export default defineConfig({
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
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
