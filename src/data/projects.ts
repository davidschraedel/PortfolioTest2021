import type { ImageMetadata } from "astro";

import calendarDashboard from "../assets/portfolio/calendar-dashboard.png";
import iam from "../assets/portfolio/iam.png";
import microdeck from "../assets/portfolio/microdeck.png";
import midiMorph from "../assets/portfolio/midi-morph.png";
import photoBookGenerator from "../assets/portfolio/photo-book-generator.png";
import soundwatch from "../assets/portfolio/soundwatch.png";
import voiceFirstPortfolio from "../assets/portfolio/voice-first-portfolio.png";
import youtubeKpiFramework from "../assets/portfolio/youtube-kpi-framework.png";
import youtubeTranscriptPipeline from "../assets/portfolio/youtube-transcript-pipeline.png";
import profile from "./profile.json";

export type RawProject = (typeof profile.projects)[number];

export type Project = RawProject & {
  previewImage?: ImageMetadata;
};

/** Maps `previewImageKey` from profile.json to optimized `astro:assets` imports. */
const portfolioImages: Record<string, ImageMetadata> = {
  "calendar-dashboard": calendarDashboard,
  iam,
  microdeck,
  "midi-morph": midiMorph,
  "photo-book-generator": photoBookGenerator,
  soundwatch,
  "voice-first-portfolio": voiceFirstPortfolio,
  "youtube-kpi-framework": youtubeKpiFramework,
  "youtube-transcript-pipeline": youtubeTranscriptPipeline,
};

/** Keys in profile.json with no PNG import yet. */
export const unmappedPreviewImageKeys = [
  ...new Set(
    profile.projects
      .filter((project) => !portfolioImages[project.previewImageKey])
      .map((project) => project.previewImageKey),
  ),
];

function withPreviewImage(project: RawProject): Project {
  return {
    ...project,
    previewImage: portfolioImages[project.previewImageKey],
  };
}

export const projects: Project[] = profile.projects.map(withPreviewImage);

/** Home page only — `featured: true` in profile.json does not limit the projects page. */
export const featuredProjects = projects.filter((project) => project.featured);

if (unmappedPreviewImageKeys.length > 0) {
  console.warn(
    `[projects.ts] previewImageKey has no asset import: ${unmappedPreviewImageKeys.join(", ")}`,
  );
}
