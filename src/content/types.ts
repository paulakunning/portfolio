import type { StaticImageData } from "next/image";
import type { Localized } from "@/i18n/config";

export type Category = "web-design" | "web-development" | "branding";

export type ProjectImage = { src: StaticImageData; alt: Localized };

export type Project = {
  /** URL segment: /proyectos/{slug} */
  slug: string;
  /** Proper noun, not translated. */
  name: string;
  /** Decides which filter tabs show the project. */
  categories: Category[];
  tools: string[];
  conceptual?: boolean;
  year: number;
  role: Localized;
  /** What Paula did, in one line (card). */
  summary: Localized;
  /** One or two paragraphs (detail page). */
  body: Localized<string[]>;
  cover: ProjectImage;
  gallery: ProjectImage[];
  link: { type: "live" | "behance"; url: string };
};

export type YearMonth = `${number}-${number}`;

export type Experience = {
  company: string;
  role: Localized;
  start: YearMonth;
  /** Missing while the job is current. */
  end?: YearMonth;
  description?: Localized;
  highlights?: Localized<string[]>;
};

export type Skill = { name: string; icon: StaticImageData; learning?: boolean };

export type Testimonial = { quote: Localized; author: string; role: Localized };
