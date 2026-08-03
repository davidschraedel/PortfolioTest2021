import { execSync } from "node:child_process";

const FALLBACK = {
  site: "https://davidschraedel.github.io",
  base: "/portfolio-test-2021/",
};

/** Derive Astro `site` and `base` from `git remote get-url origin` (GitHub Pages project site). */
export function getGitHubPagesConfig() {
  try {
    const remote = execSync("git remote get-url origin", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    const match = remote.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    if (!match) return FALLBACK;

    const [, owner, repo] = match;
    return {
      site: `https://${owner}.github.io`,
      base: `/${repo}/`,
    };
  } catch {
    return FALLBACK;
  }
}
