import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output is ideal for GitHub Pages and custom-domain hosting.
export default defineConfig({
  site: "https://knitwithandrew.com",
  trailingSlash: "always",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      allowedHosts: [".trycloudflare.com", "kilometers-involvement-jane-cluster.trycloudflare.com"],
    },
  },
});
