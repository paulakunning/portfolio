import type { Localized } from "@/i18n/config";

export const contactLinks = {
  email: "paulakunning@gmail.com",
  linkedin: "https://www.linkedin.com/in/paula-kunning/",
  behance: "https://www.behance.net/paulakunning",
  github: "https://github.com/paulakunning",
} as const;

export const cvPaths: Localized = {
  es: "/cv/paula-kunning-cv-es.pdf",
  en: "/cv/paula-kunning-resume-en.pdf",
};

export const socialChannels = [
  { id: "linkedin", label: "LinkedIn", href: contactLinks.linkedin },
  { id: "behance", label: "Behance", href: contactLinks.behance },
  { id: "github", label: "GitHub", href: contactLinks.github },
] as const;

// The contact page shows the portrait photo from the about section.
export { portraitPhoto } from "./about";
