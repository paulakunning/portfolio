import amandaCover from "@/assets/projects/amanda-wellness-coach/cover.jpg";
import arqciCover from "@/assets/projects/arqci/cover.jpg";
import dedeCover from "@/assets/projects/dede-digital/cover.jpg";
import donHiginioCover from "@/assets/projects/don-higinio/cover.jpg";
import factchequeadoCover from "@/assets/projects/factchequeado-lab/cover.png";
import geaCover from "@/assets/projects/gea-logistics/cover.jpg";
import javierCarrizoCover from "@/assets/projects/javier-carrizo/cover.jpg";
import lucreciaCover from "@/assets/projects/lucrecia-cornaglia/cover.jpg";
import uniformCover from "@/assets/projects/uniform/cover.jpg";
import { pendingBody, pendingGallery, pendingImage } from "./placeholders";
import type { Project } from "./types";

const webDevelopment = { es: "Desarrollo web", en: "Web development" };

// Order here is the order on screen.
export const projects: Project[] = [
  {
    slug: "don-higinio",
    name: "Don Higinio",
    categories: ["web-design", "web-development"],
    tools: ["Figma", "WordPress"],
    year: 2026,
    role: { es: "Diseño + desarrollo", en: "Design + development" },
    summary: {
      es: "Sitio corporativo para una distribuidora mayorista. Diseño de interfaz en Figma y desarrollo en WordPress.",
      en: "Corporate site for a wholesale distributor. UI design in Figma and WordPress development.",
    },
    body: {
      es: [
        "Sitio corporativo para una distribuidora mayorista. Se realizó el diseño en Figma y el desarrollo en WordPress con Elementor Pro.",
      ],
      en: [
        "Corporate site for a wholesale distributor. Designed in Figma and built in WordPress with Elementor Pro.",
      ],
    },
    cover: {
      src: donHiginioCover,
      alt: {
        es: "Sitio de Don Higinio abierto en un celular, apoyado sobre una mesada de mármol",
        en: "Don Higinio's site on a phone resting on a marble countertop",
      },
    },
    gallery: pendingGallery,
    link: { type: "live", url: "https://dhmayorista.com.ar/" },
  },
  {
    slug: "factchequeado-lab",
    name: "Factchequeado Lab",
    categories: ["web-design", "web-development"],
    tools: ["Figma", "WordPress"],
    year: 2026,
    role: { es: "Diseño + desarrollo", en: "Design + development" },
    summary: {
      es: "Landing para un laboratorio de divulgación sobre IA. Diseño en Figma y desarrollo en WordPress, con contenido administrable por el equipo del cliente.",
      en: "Landing page for an AI information lab. Figma design and WordPress development, with content managed by the client's team.",
    },
    body: pendingBody,
    cover: {
      src: factchequeadoCover,
      alt: {
        es: "Mano sosteniendo un celular con la landing de Factchequeado Lab",
        en: "Hand holding a phone showing the Factchequeado Lab landing page",
      },
    },
    gallery: pendingGallery,
    link: { type: "live", url: "https://innovacion.factchequeado.com/" },
  },
  {
    slug: "tecnofast-peru",
    name: "Tecnofast Perú",
    categories: ["web-development"],
    tools: ["Bricks Builder"],
    year: 2025,
    role: webDevelopment,
    summary: {
      es: "Sitio corporativo rehecho en Bricks Builder, con un cotizador desarrollado a medida.",
      en: "Corporate site rebuilt in Bricks Builder, with a custom-built quote calculator.",
    },
    body: pendingBody,
    cover: pendingImage,
    gallery: pendingGallery,
    link: { type: "live", url: "https://tecnofast.com.pe/" },
  },
  {
    slug: "gea-logistics",
    name: "GEA Logistics",
    categories: ["web-development"],
    tools: ["WordPress"],
    year: 2026,
    role: {
      es: "Desarrollo + mantenimiento continuo",
      en: "Development + ongoing maintenance",
    },
    summary: {
      es: "Sitio B2B de logística. Desarrollo a partir del diseño del cliente y mantenimiento continuo.",
      en: "B2B logistics site. Development from the client's design, plus ongoing maintenance.",
    },
    body: pendingBody,
    cover: {
      src: geaCover,
      alt: {
        es: "Sitio de GEA Logistics en una notebook sobre un escritorio, iluminada por una lámpara",
        en: "GEA Logistics site on a laptop on a desk, lit by a desk lamp",
      },
    },
    gallery: pendingGallery,
    link: { type: "live", url: "https://gealogistics.net/" },
  },
  {
    slug: "javier-carrizo",
    name: "Javier Carrizo",
    categories: ["web-development"],
    tools: ["WordPress"],
    year: 2026,
    role: webDevelopment,
    summary: {
      es: "Desarrollo del sitio web en WordPress a partir del diseño del cliente y mantenimiento continuo.",
      en: "WordPress website development from the client's design, plus ongoing maintenance.",
    },
    body: pendingBody,
    cover: {
      src: javierCarrizoCover,
      alt: {
        es: "Sitio de Javier Carrizo abierto en una notebook",
        en: "Javier Carrizo's site open on a laptop",
      },
    },
    gallery: pendingGallery,
    link: { type: "live", url: "https://javiercarrizo.com/" },
  },
  {
    slug: "arqci",
    name: "ARQCI",
    categories: ["web-development"],
    tools: ["WordPress"],
    year: 2026,
    role: webDevelopment,
    summary: {
      es: "Desarrollo del sitio en WordPress a partir del diseño del cliente.",
      en: "WordPress site development from the client's design.",
    },
    body: pendingBody,
    cover: {
      src: arqciCover,
      alt: {
        es: "Persona mostrando el sitio de Estudio ARQCI en su celular",
        en: "Person showing the Estudio ARQCI site on their phone",
      },
    },
    gallery: pendingGallery,
    link: { type: "live", url: "https://arqci.com.ar/" },
  },
  {
    slug: "olatrek",
    name: "Olatrek",
    categories: ["web-development"],
    tools: ["WordPress"],
    year: 2024,
    role: webDevelopment,
    summary: {
      es: "Desarrollo del sitio en WordPress y Elementor Pro a partir del diseño del cliente.",
      en: "Site development in WordPress and Elementor Pro from the client's design.",
    },
    body: pendingBody,
    cover: pendingImage,
    gallery: pendingGallery,
    link: { type: "live", url: "https://olatrek.com.ar/" },
  },
  {
    slug: "friosur",
    name: "Friosur",
    categories: ["web-development"],
    tools: ["WordPress", "Bricks Builder"],
    year: 2024,
    role: webDevelopment,
    summary: {
      es: "Desarrollo del sitio web para un cliente de la agencia de marketing digital Canal Cero, con diseño del equipo de la agencia.",
      en: "Website build for a client of the digital marketing agency Canal Cero, designed by the agency's design team.",
    },
    body: pendingBody,
    cover: pendingImage,
    gallery: pendingGallery,
    link: { type: "live", url: "https://friosur.cl/" },
  },
  {
    slug: "aeropuerto-el-loa",
    name: "Aeropuerto El Loa",
    categories: ["web-development"],
    tools: ["WordPress", "Bricks Builder"],
    year: 2024,
    role: webDevelopment,
    summary: {
      es: "Desarrollo del sitio web del Aeropuerto El Loa, cliente de la agencia de marketing digital Canal Cero, con diseño del equipo de la agencia.",
      en: "Website build for El Loa Airport, a client of the digital marketing agency Canal Cero, designed by the agency's design team.",
    },
    body: pendingBody,
    cover: pendingImage,
    gallery: pendingGallery,
    link: { type: "live", url: "https://aeropuertoelloa.cl/" },
  },
  {
    slug: "burning-wanderlust",
    name: "Burning Wanderlust",
    categories: ["web-development"],
    tools: ["WordPress", "Elementor Pro"],
    year: 2025,
    role: webDevelopment,
    summary: {
      es: "Desarrollo de la página web de una coach motivacional a partir de un diseño en Figma.",
      en: "Website build for a motivational coach from a Figma design.",
    },
    body: pendingBody,
    cover: pendingImage,
    gallery: pendingGallery,
    link: { type: "live", url: "https://burning-wanderlust.com/" },
  },
  {
    slug: "dede-digital",
    name: "DéDé Digital",
    categories: ["web-design"],
    tools: ["Figma"],
    year: 2026,
    role: { es: "Diseño web", en: "Web design" },
    summary: {
      es: "Rediseño web en alemán para una freelancer.",
      en: "German-language website redesign for a freelancer.",
    },
    body: pendingBody,
    cover: {
      src: dedeCover,
      alt: {
        es: "Notebook sostenida al aire libre con el sitio de DéDé Digital",
        en: "Laptop held outdoors showing the DéDé Digital site",
      },
    },
    gallery: pendingGallery,
    link: {
      type: "behance",
      url: "https://www.behance.net/gallery/245345687/Diseno-Web-para-Freelancer-Figma-UXUI",
    },
  },
  {
    slug: "amanda-wellness-coach",
    name: "Amanda Wellness Coach",
    categories: ["web-design"],
    tools: ["Figma"],
    conceptual: true,
    year: 2026,
    role: { es: "Diseño web", en: "Web design" },
    summary: {
      es: "Diseño conceptual de una página web para una coach de bienestar.",
      en: "Concept website design for a wellness coach.",
    },
    body: pendingBody,
    cover: {
      src: amandaCover,
      alt: {
        es: "Mujer navegando la landing de Amanda Wellness Coach en su notebook",
        en: "Woman browsing the Amanda Wellness Coach landing page on her laptop",
      },
    },
    gallery: pendingGallery,
    link: {
      type: "behance",
      url: "https://www.behance.net/gallery/246443875/Landing-Page-para-Coach-Bienestar-Diseno-web-UIUX",
    },
  },
  {
    slug: "uniform",
    name: "Uniform",
    categories: ["branding", "web-design"],
    tools: ["Adobe Illustrator", "Figma"],
    conceptual: true,
    year: 2026,
    role: { es: "Diseño gráfico y web", en: "Graphic and web design" },
    summary: {
      es: "Diseño conceptual de branding y página web para una marca de ropa urbana.",
      en: "Concept branding and website design for a streetwear brand.",
    },
    body: pendingBody,
    cover: {
      src: uniformCover,
      alt: {
        es: "Buzo negro con la etiqueta de Uniform, colgado en una percha",
        en: "Black sweatshirt with the Uniform label, on a hanger",
      },
    },
    gallery: pendingGallery,
    link: {
      type: "behance",
      url: "https://www.behance.net/gallery/251108279/Uniform-Indumentaria-Branding-Diseno-Web-Ecommerce",
    },
  },
  {
    slug: "lucrecia-cornaglia",
    name: "Lucrecia Cornaglia",
    categories: ["branding"],
    tools: ["Adobe Illustrator"],
    year: 2026,
    role: { es: "Diseño gráfico", en: "Graphic design" },
    summary: {
      es: "Diseño de identidad visual para una contadora especializada en costos y rentabilidad.",
      en: "Visual identity design for an accountant specializing in costs and profitability.",
    },
    body: pendingBody,
    cover: {
      src: lucreciaCover,
      alt: {
        es: "Tarjetas personales de Lucrecia Cornaglia, frente y dorso",
        en: "Lucrecia Cornaglia's business cards, front and back",
      },
    },
    gallery: pendingGallery,
    link: {
      type: "behance",
      url: "https://www.behance.net/gallery/251109241/Lucrecia-Cornaglia-Branding-Marca-Personal",
    },
  },
];
