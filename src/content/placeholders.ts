// shortcut: stand-in while Paula sends the missing project copy.
// Delete this file before launch; TypeScript then lists every leftover.
import type { Localized } from "@/i18n/config";

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
