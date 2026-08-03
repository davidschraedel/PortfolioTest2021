import headshot from "../assets/headshot.jpg";
import profile from "./profile.json";

export type Profile = typeof profile;
export type Person = Profile["person"];
export type Hero = Profile["hero"];
export type About = Profile["about"];
export type Home = Profile["home"];
export type Connect = Profile["connect"];
export type Presence = Profile["presence"];
export type TimelineEntry = Profile["timeline"][number];

const BASE_URL = import.meta.env.BASE_URL;

export const person = profile.person;
export const hero = profile.hero;
export const about = profile.about;
export const home = profile.home;
export const connect = profile.connect;
export const presence = profile.presence;
export const handshakeLine = profile.handshakeLine;
export const projectsPage = profile.projectsPage;
export const timeline = profile.timeline;

/** Public URL for the resume PDF (GitHub Pages base-aware). */
export const resumePath = `${BASE_URL}${person.resume}`;

export const headshotImage = headshot;

/** Hero subtitle; falls back to `home.tldr` when profile.json omits `professionalSentence`. */
export const heroProfessionalSentence =
  "professionalSentence" in hero &&
  typeof hero.professionalSentence === "string"
    ? hero.professionalSentence
    : home.tldr;
