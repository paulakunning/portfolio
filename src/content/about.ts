import portrait from "@/assets/about/1.jpg";
import working from "@/assets/about/2.jpg";
import mirror from "@/assets/about/3.jpg";
import type { ProjectImage } from "./types";

export const workingPhoto: ProjectImage = {
  src: working,
  alt: {
    es: "Paula trabajando en su notebook, sentada junto a una planta",
    en: "Paula working on her laptop, sitting next to a plant",
  },
};

export const aboutPhotos: ProjectImage[] = [
  {
    src: portrait,
    alt: {
      es: "Paula sonriendo, con el mentón apoyado en la mano frente a su notebook",
      en: "Paula smiling, chin resting on her hand in front of her laptop",
    },
  },
  workingPhoto,
  {
    src: mirror,
    alt: {
      es: "Paula sacándose una selfie en el espejo con su notebook bajo el brazo",
      en: "Paula taking a mirror selfie with her laptop under her arm",
    },
  },
];
