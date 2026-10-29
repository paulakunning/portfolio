import portrait from "@/assets/about/profile.jpg";
import working from "@/assets/about/2.jpg";
import type { ProjectImage } from "./types";

export const workingPhoto: ProjectImage = {
  src: working,
  alt: {
    es: "Paula trabajando en su notebook, sentada junto a una planta",
    en: "Paula working on her laptop, sitting next to a plant",
  },
};

export const portraitPhoto: ProjectImage = {
  src: portrait,
  alt: {
    es: "Paula sonriendo, con la mejilla apoyada en la mano, frente a su notebook y una taza",
    en: "Paula smiling, cheek resting on her hand, in front of her laptop and a mug",
  },
};
