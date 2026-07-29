import type { ImageMetadata } from "astro";

import calendarDashboard from "../assets/portfolio/calendar-dashboard.png";
import iam from "../assets/portfolio/iam-demo-video.png";
import microdeck from "../assets/portfolio/microdeck.png";
import midiMorph from "../assets/portfolio/midi-morph.png";
import soundwatch from "../assets/portfolio/soundwatch.png";
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
  soundwatch,
  "youtube-kpi-framework": youtubeKpiFramework,
  "youtube-transcript-pipeline": youtubeTranscriptPipeline,
};

function withPreviewImage(project: RawProject): Project {
  return {
    ...project,
    previewImage: portfolioImages[project.previewImageKey],
  };
}

export const projects: Project[] = profile.projects.map(withPreviewImage);

export const featuredProjects = projects.filter((project) => project.featured);
