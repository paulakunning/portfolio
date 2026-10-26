// shortcut: stand-ins while Paula sends the missing project copy and images.
// Delete this file before launch; TypeScript then lists every leftover.
import pending from "@/assets/projects/pending.png";
import type { Localized } from "@/i18n/config";
import type { ProjectImage } from "./types";

export const pendingImage: ProjectImage = {
  src: pending,
  alt: { es: "Imagen pendiente", en: "Image pending" },
};

export const pendingGallery: ProjectImage[] = [pendingImage, pendingImage];

export const pendingBody: Localized<string[]> = {
  es: [
    "[Texto pendiente] Primer párrafo: de dónde partió el proyecto o qué problema tenía el cliente, en dos o tres oraciones.",
    "[Texto pendiente] Segundo párrafo: qué hice yo, lo más importante del sitio y cómo terminó el proyecto.",
  ],
  en: [
    "[Pending copy] First paragraph: where the project started or the problem the client had, in two or three sentences.",
    "[Pending copy] Second paragraph: what I did, the site's key features and how the project turned out.",
  ],
};
