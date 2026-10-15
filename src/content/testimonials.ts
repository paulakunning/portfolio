import type { Testimonial } from "./types";

// Pending: the 5-star Upwork review (text, name and role from Paula).
export const testimonials: Testimonial[] = [
  {
    quote: {
      es: "Se destacó por su profesionalismo, creatividad, compromiso y atención a cada detalle durante el proceso.",
      en: "She stood out for her professionalism, creativity, commitment and attention to every detail throughout the process.",
    },
    author: "Ana Fernández",
    role: { es: "Don Higinio", en: "Don Higinio" },
  },
  {
    quote: {
      es: "Es una persona muy responsable con los plazos acordados, siempre atenta a los detalles y con una actitud constante de aportar valor.",
      en: "She is very responsible with agreed deadlines, always attentive to detail, and consistently looks to add value.",
    },
    author: "Andrés Tiberti",
    role: { es: "GEA Logistics", en: "GEA Logistics" },
  },
];
