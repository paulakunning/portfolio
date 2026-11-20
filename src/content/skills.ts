import bricksBuilder from "@/assets/skills/bricks-builder.svg";
import css from "@/assets/skills/css.svg";
import elementor from "@/assets/skills/elementor.svg";
import figma from "@/assets/skills/figma.svg";
import html from "@/assets/skills/html.svg";
import javascript from "@/assets/skills/javascript.svg";
import nextjs from "@/assets/skills/nextjs.svg";
import nodejs from "@/assets/skills/nodejs.svg";
import php from "@/assets/skills/php.svg";
import react from "@/assets/skills/react.svg";
import tailwindCss from "@/assets/skills/tailwind-css.svg";
import typescript from "@/assets/skills/typescript.svg";
import woocommerce from "@/assets/skills/woocommerce.svg";
import wordpress from "@/assets/skills/wordpress.svg";
import type { Skill } from "./types";

// Icons: Simple Icons (CC0).
export const skills: Skill[] = [
  { name: "React", icon: react },
  { name: "Next.js", icon: nextjs },
  { name: "TypeScript", icon: typescript },
  { name: "JavaScript", icon: javascript },
  { name: "Node.js", icon: nodejs },
  { name: "Tailwind CSS", icon: tailwindCss },
  { name: "HTML", icon: html },
  { name: "CSS", icon: css },
  { name: "Figma", icon: figma },
  { name: "PHP", icon: php },
  { name: "WordPress", icon: wordpress },
  { name: "WooCommerce", icon: woocommerce },
  { name: "Elementor", icon: elementor },
  { name: "Bricks Builder", icon: bricksBuilder },
];
