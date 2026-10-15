import bricksBuilder from "@/assets/skills/bricks-builder.svg";
import css from "@/assets/skills/css.svg";
import elementor from "@/assets/skills/elementor.svg";
import figma from "@/assets/skills/figma.svg";
import framer from "@/assets/skills/framer.svg";
import html from "@/assets/skills/html.svg";
import illustrator from "@/assets/skills/illustrator.svg";
import javascript from "@/assets/skills/javascript.svg";
import nextjs from "@/assets/skills/nextjs.svg";
import photoshop from "@/assets/skills/photoshop.svg";
import php from "@/assets/skills/php.svg";
import react from "@/assets/skills/react.svg";
import scss from "@/assets/skills/scss.svg";
import typescript from "@/assets/skills/typescript.svg";
import woocommerce from "@/assets/skills/woocommerce.svg";
import wordpress from "@/assets/skills/wordpress.svg";
import type { Skill } from "./types";

// Icons: Simple Icons (CC0); Adobe icons from the previous site.
export const skills: Skill[] = [
  { name: "Figma", icon: figma },
  { name: "HTML", icon: html },
  { name: "CSS", icon: css },
  { name: "SCSS", icon: scss },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React", icon: react },
  { name: "PHP", icon: php },
  { name: "WordPress", icon: wordpress },
  { name: "Elementor", icon: elementor },
  { name: "Bricks Builder", icon: bricksBuilder },
  { name: "WooCommerce", icon: woocommerce },
  { name: "Next.js", icon: nextjs, learning: true },
  { name: "Framer", icon: framer, learning: true },
  { name: "Adobe Illustrator", icon: illustrator },
  { name: "Adobe Photoshop", icon: photoshop },
];
