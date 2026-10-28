import type { StaticImageData } from "next/image";
import profile from "@/assets/about/profile.jpg";
import bricks from "@/assets/skills/bricks-builder.svg";
import css from "@/assets/skills/css.svg";
import elementor from "@/assets/skills/elementor.svg";
import figma from "@/assets/skills/figma.svg";
import html from "@/assets/skills/html.svg";
import javascript from "@/assets/skills/javascript.svg";
import nextjs from "@/assets/skills/nextjs.svg";
import php from "@/assets/skills/php.svg";
import react from "@/assets/skills/react.svg";
import typescript from "@/assets/skills/typescript.svg";
import wordpress from "@/assets/skills/wordpress.svg";

export type HeroTile = {
  /** Shown in the selection label, also data-tile. */
  label: string;
  image: StaticImageData;
  /** Desktop position, % of the hero. */
  x: number;
  y: number;
  /** Present = shown below md. */
  mobile?: { x: number; y: number };
  tint?: "lilac" | "rose";
  /** The larger 4:5 photo tile. */
  photo?: boolean;
};

export const heroTiles: HeroTile[] = [
  {
    label: "Figma",
    image: figma,
    x: 17,
    y: 15,
    mobile: { x: 5, y: 12 },
    tint: "lilac",
  },
  {
    label: "WordPress",
    image: wordpress,
    x: 9,
    y: 30,
    mobile: { x: 28, y: 12 },
  },
  {
    label: "Elementor",
    image: elementor,
    x: 18,
    y: 44,
    mobile: { x: 8, y: 82 },
    tint: "rose",
  },
  { label: "PHP", image: php, x: 6, y: 58 },
  { label: "HTML", image: html, x: 14, y: 72, mobile: { x: 31, y: 83 } },
  { label: "CSS", image: css, x: 4, y: 82, tint: "lilac" },
  { label: "Paula.jpg", image: profile, x: 79, y: 13, photo: true },
  {
    label: "React",
    image: react,
    x: 91,
    y: 22,
    mobile: { x: 62, y: 11 },
    tint: "rose",
  },
  {
    label: "TypeScript",
    image: typescript,
    x: 89,
    y: 42,
    mobile: { x: 81, y: 12 },
  },
  { label: "Next.js", image: nextjs, x: 79, y: 52, tint: "lilac" },
  {
    label: "JavaScript",
    image: javascript,
    x: 90,
    y: 64,
    mobile: { x: 56, y: 83 },
  },
  {
    label: "Bricks Builder",
    image: bricks,
    x: 81,
    y: 76,
    mobile: { x: 79, y: 83 },
    tint: "rose",
  },
];
