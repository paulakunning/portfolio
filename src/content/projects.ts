import elLoa1 from "@/assets/projects/aeropuerto-el-loa/1.jpg";
import elLoa2 from "@/assets/projects/aeropuerto-el-loa/2.jpg";
import elLoaCover from "@/assets/projects/aeropuerto-el-loa/cover.jpg";
import amanda1 from "@/assets/projects/amanda-wellness-coach/1.jpg";
import amanda2 from "@/assets/projects/amanda-wellness-coach/2.jpg";
import amandaCover from "@/assets/projects/amanda-wellness-coach/cover.jpg";
import arqci1 from "@/assets/projects/arqci/1.jpg";
import arqci2 from "@/assets/projects/arqci/2.jpg";
import arqciCover from "@/assets/projects/arqci/cover.jpg";
import burning1 from "@/assets/projects/burning-wanderlust/1.jpg";
import burning2 from "@/assets/projects/burning-wanderlust/2.jpg";
import burningCover from "@/assets/projects/burning-wanderlust/cover.jpg";
import dede1 from "@/assets/projects/dede-digital/1.jpg";
import dede2 from "@/assets/projects/dede-digital/2.jpg";
import dedeCover from "@/assets/projects/dede-digital/cover.jpg";
import donHiginio1 from "@/assets/projects/don-higinio/1.jpg";
import donHiginio2 from "@/assets/projects/don-higinio/2.jpg";
import donHiginioCover from "@/assets/projects/don-higinio/cover.jpg";
import factchequeado1 from "@/assets/projects/factchequeado-lab/1.jpg";
import factchequeado2 from "@/assets/projects/factchequeado-lab/2.jpg";
import factchequeadoCover from "@/assets/projects/factchequeado-lab/cover.png";
import friosur1 from "@/assets/projects/friosur/1.jpg";
import friosur2 from "@/assets/projects/friosur/2.jpg";
import friosurCover from "@/assets/projects/friosur/cover.jpg";
import gea1 from "@/assets/projects/gea-logistics/1.jpg";
import gea2 from "@/assets/projects/gea-logistics/2.jpg";
import geaCover from "@/assets/projects/gea-logistics/cover.jpg";
import javierCarrizo1 from "@/assets/projects/javier-carrizo/1.jpg";
import javierCarrizo2 from "@/assets/projects/javier-carrizo/2.jpg";
import javierCarrizoCover from "@/assets/projects/javier-carrizo/cover.jpg";
import lucrecia1 from "@/assets/projects/lucrecia-cornaglia/1.jpg";
import lucrecia2 from "@/assets/projects/lucrecia-cornaglia/2.jpg";
import lucreciaCover from "@/assets/projects/lucrecia-cornaglia/cover.jpg";
import olatrek1 from "@/assets/projects/olatrek/1.jpg";
import olatrek2 from "@/assets/projects/olatrek/2.jpg";
import olatrekCover from "@/assets/projects/olatrek/cover.jpg";
import tecnofast1 from "@/assets/projects/tecnofast-peru/1.jpg";
import tecnofast2 from "@/assets/projects/tecnofast-peru/2.jpg";
import tecnofastCover from "@/assets/projects/tecnofast-peru/cover.jpg";
import uniform1 from "@/assets/projects/uniform/1.jpg";
import uniform2 from "@/assets/projects/uniform/2.jpg";
import uniformCover from "@/assets/projects/uniform/cover.jpg";
import { pendingBody } from "./placeholders";
import type { Project } from "./types";

const webDevelopment = { es: "Desarrollo web", en: "Web development" };

// Order here is the order on screen.
export const projects: Project[] = [
  {
    slug: "don-higinio",
    name: "Don Higinio",
    featured: true,
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
        es: "Mano sosteniendo un celular con el sitio de Don Higinio, frente a un balcón con plantas",
        en: "Hand holding a phone with the Don Higinio site, in front of a balcony full of plants",
      },
    },
    gallery: [
      {
        src: donHiginio1,
        alt: {
          es: "Persona mirando la sección «Trabajá con nosotros» del sitio de Don Higinio en una notebook",
          en: "Person viewing the “Work with us” section of the Don Higinio site on a laptop",
        },
      },
      {
        src: donHiginio2,
        alt: {
          es: "Inicio del sitio de Don Higinio en una notebook, junto a una taza",
          en: "Don Higinio home page on a laptop, next to a mug",
        },
      },
    ],
    link: { type: "live", url: "https://dhmayorista.com.ar/" },
  },
  {
    slug: "factchequeado-lab",
    name: "Factchequeado Lab",
    featured: true,
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
    gallery: [
      {
        src: factchequeado1,
        alt: {
          es: "Notebook sobre un piso de cemento con la landing de Factchequeado Lab",
          en: "Laptop on a concrete floor showing the Factchequeado Lab landing page",
        },
      },
      {
        src: factchequeado2,
        alt: {
          es: "Primer plano de un celular con la landing de Factchequeado Lab",
          en: "Close-up of a phone showing the Factchequeado Lab landing page",
        },
      },
    ],
    link: { type: "live", url: "https://innovacion.factchequeado.com/" },
  },
  {
    slug: "gea-logistics",
    name: "GEA Logistics",
    featured: true,
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
    gallery: [
      {
        src: gea1,
        alt: {
          es: "Mano sosteniendo un celular con la versión mobile del sitio de GEA Logistics",
          en: "Hand holding a phone with the mobile version of the GEA Logistics site",
        },
      },
      {
        src: gea2,
        alt: {
          es: "Persona con una notebook sobre las piernas, con el inicio del sitio de GEA Logistics",
          en: "Person with a laptop on their lap showing the GEA Logistics home page",
        },
      },
    ],
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
    gallery: [
      {
        src: javierCarrizo1,
        alt: {
          es: "Celular apoyado sobre una notebook con la versión mobile del sitio de Javier Carrizo",
          en: "Phone resting on a laptop showing the mobile version of Javier Carrizo's site",
        },
      },
      {
        src: javierCarrizo2,
        alt: {
          es: "Inicio del sitio de Javier Carrizo en una notebook, frente a una pared de cemento",
          en: "Javier Carrizo's home page on a laptop, against a concrete wall",
        },
      },
    ],
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
    gallery: [
      {
        src: arqci1,
        alt: {
          es: "Persona viendo el sitio de Estudio ARQCI en una computadora de escritorio",
          en: "Person viewing the Estudio ARQCI site on a desktop computer",
        },
      },
      {
        src: arqci2,
        alt: {
          es: "Celular con el sitio de Estudio ARQCI sobre un escritorio, junto a una notebook",
          en: "Phone showing the Estudio ARQCI site on a desk, next to a laptop",
        },
      },
    ],
    link: { type: "live", url: "https://arqci.com.ar/" },
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
    cover: {
      src: tecnofastCover,
      alt: {
        es: "Sitio de Tecnofast Perú en una notebook sobre un escritorio de madera, junto a una planta",
        en: "Tecnofast Perú site on a laptop on a wooden desk, beside a plant",
      },
    },
    gallery: [
      {
        src: tecnofast1,
        alt: {
          es: "Celular sobre una mesa de madera con la versión mobile del sitio de Tecnofast Perú",
          en: "Phone on a wooden table showing the mobile version of the Tecnofast Perú site",
        },
      },
      {
        src: tecnofast2,
        alt: {
          es: "Persona revisando el sitio de Tecnofast Perú en una notebook",
          en: "Person browsing the Tecnofast Perú site on a laptop",
        },
      },
    ],
    link: { type: "live", url: "https://tecnofast.com.pe/" },
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
    cover: {
      src: olatrekCover,
      alt: {
        es: "Notebook sobre un sillón con el sitio de Olatrek abierto",
        en: "Laptop on a couch with the Olatrek site open",
      },
    },
    gallery: [
      {
        src: olatrek1,
        alt: {
          es: "Celular apoyado sobre una notebook con la versión mobile del sitio de Olatrek",
          en: "Phone resting on a laptop showing the mobile version of the Olatrek site",
        },
      },
      {
        src: olatrek2,
        alt: {
          es: "Tres páginas del sitio de Olatrek: inicio, equipo y noticias",
          en: "Three pages of the Olatrek site: home, team and news",
        },
      },
    ],
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
    cover: {
      src: friosurCover,
      alt: {
        es: "Sitio de Friosur en una notebook, frente a una ventana con plantas",
        en: "Friosur site on a laptop, in front of a window with plants",
      },
    },
    gallery: [
      {
        src: friosur1,
        alt: {
          es: "Persona sosteniendo un celular con la versión mobile del sitio de Friosur",
          en: "Person holding a phone with the mobile version of the Friosur site",
        },
      },
      {
        src: friosur2,
        alt: {
          es: "Tres páginas del sitio de Friosur, entre ellas la de la empresa y la de productos",
          en: "Three pages of the Friosur site, including the company and products pages",
        },
      },
    ],
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
    cover: {
      src: elLoaCover,
      alt: {
        es: "Persona consultando la información de vuelos del sitio del Aeropuerto El Loa en una computadora",
        en: "Person checking flight information on the El Loa Airport site on a computer",
      },
    },
    gallery: [
      {
        src: elLoa1,
        alt: {
          es: "Celular sobre un escritorio con la información de vuelos del Aeropuerto El Loa",
          en: "Phone on a desk showing El Loa Airport flight information",
        },
      },
      {
        src: elLoa2,
        alt: {
          es: "Tres páginas del sitio del Aeropuerto El Loa: vuelos, aerolíneas y servicios",
          en: "Three pages of the El Loa Airport site: flights, airlines and services",
        },
      },
    ],
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
    cover: {
      src: burningCover,
      alt: {
        es: "Sitio de Burning Wanderlust en una notebook sobre un escritorio blanco",
        en: "Burning Wanderlust site on a laptop on a white desk",
      },
    },
    gallery: [
      {
        src: burning1,
        alt: {
          es: "Celular sobre una superficie blanca con la versión mobile del sitio de Burning Wanderlust",
          en: "Phone on a white surface showing the mobile version of the Burning Wanderlust site",
        },
      },
      {
        src: burning2,
        alt: {
          es: "Tres páginas del sitio de Burning Wanderlust",
          en: "Three pages of the Burning Wanderlust site",
        },
      },
    ],
    link: { type: "live", url: "https://burning-wanderlust.com/" },
  },
  {
    slug: "dede-digital",
    name: "DéDé Digital",
    featured: true,
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
    gallery: [
      {
        src: dede1,
        alt: {
          es: "Mano sosteniendo un celular con la versión mobile del sitio de DéDé Digital",
          en: "Hand holding a phone with the mobile version of the DéDé Digital site",
        },
      },
      {
        src: dede2,
        alt: {
          es: "Tres páginas del diseño del sitio de DéDé Digital",
          en: "Three pages from the DéDé Digital site design",
        },
      },
    ],
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
    gallery: [
      {
        src: amanda1,
        alt: {
          es: "Notebook sobre una mesa de mármol con la landing de Amanda Wellness Coach",
          en: "Laptop on a marble table showing the Amanda Wellness Coach landing page",
        },
      },
      {
        src: amanda2,
        alt: {
          es: "Persona sosteniendo un celular con la versión mobile de la landing de Amanda Wellness Coach",
          en: "Person holding a phone with the mobile version of the Amanda Wellness Coach landing page",
        },
      },
    ],
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
    gallery: [
      {
        src: uniform1,
        alt: {
          es: "Notebook con la tienda online de Uniform y su nueva colección",
          en: "Laptop showing the Uniform online store and its new collection",
        },
      },
      {
        src: uniform2,
        alt: {
          es: "Pantallas mobile de la tienda online de Uniform",
          en: "Mobile screens from the Uniform online store",
        },
      },
    ],
    link: {
      type: "behance",
      url: "https://www.behance.net/gallery/251108279/Uniform-Indumentaria-Branding-Diseno-Web-Ecommerce",
    },
  },
  {
    slug: "lucrecia-cornaglia",
    name: "Lucrecia Cornaglia",
    featured: true,
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
    gallery: [
      {
        src: lucrecia1,
        alt: {
          es: "Manos sosteniendo un reporte mensual impreso con la identidad de Lucrecia Cornaglia",
          en: "Hands holding a printed monthly report with Lucrecia Cornaglia's branding",
        },
      },
      {
        src: lucrecia2,
        alt: {
          es: "Sticker con el logo de Lucrecia Cornaglia sobre una notebook",
          en: "Sticker with Lucrecia Cornaglia's logo on a laptop",
        },
      },
    ],
    link: {
      type: "behance",
      url: "https://www.behance.net/gallery/251109241/Lucrecia-Cornaglia-Branding-Marca-Personal",
    },
  },
];
