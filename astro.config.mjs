import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { getGitHubPagesConfig } from "./scripts/github-pages-config.mjs";

const { site, base } = getGitHubPagesConfig();

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
