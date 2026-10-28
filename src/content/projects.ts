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
      es: "Diseño y desarrollo de un sitio web corporativo para una distribuidora mayorista, con foco en fortalecer su presencia digital, comunicar su identidad y facilitar el contacto con potenciales clientes.",
      en: "Design and development of a corporate website for a wholesale distributor, focused on strengthening its online presence, communicating its identity and making it easy for potential customers to get in touch.",
    },
    body: {
      es: [
        "Don Higinio es una distribuidora mayorista que buscaba fortalecer su presencia digital y comunicar su identidad de manera profesional. El objetivo fue desarrollar un sitio web que presentara a la empresa, facilitara el contacto con potenciales clientes y permitiera consultar sus zonas de cobertura.",
        "Diseñé la interfaz desde cero en Figma y desarrollé el sitio con WordPress y Elementor. La implementación incluyó formularios de contacto, carruseles de marcas, mapas interactivos para visualizar las zonas de cobertura y un diseño responsive, adaptado a distintos dispositivos.",
      ],
      en: [
        "Don Higinio is a wholesale distributor that wanted to strengthen its online presence and present its identity professionally. The goal was a website that introduced the company, made it easy for potential customers to get in touch and let them check its coverage areas.",
        "I designed the interface from scratch in Figma and built the site with WordPress and Elementor. The build included contact forms, brand carousels, interactive maps of the coverage areas and a responsive layout that adapts to different devices.",
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
      es: "Diseño y desarrollo de una web para un laboratorio de innovación que comparte información, herramientas y recursos sobre inteligencia artificial. Una experiencia visual organizada en grillas, pensada para facilitar la navegación y permitir que el contenido se actualice fácilmente.",
      en: "Design and development of a website for an innovation lab that shares information, tools and resources about artificial intelligence. A grid-based visual experience, built for easy browsing and easy content updates.",
    },
    body: {
      es: [
        "Factchequeado Lab es un espacio dedicado a compartir información, herramientas y recursos sobre inteligencia artificial y sus aplicaciones. El desafío fue organizar los contenidos en una web de una sola página que facilitara el acceso a la información y mantuviera una presentación visual clara y coherente.",
        "Diseñé la interfaz desde cero en Figma y desarrollé el sitio en WordPress con Elementor Pro. Trabajé en los estilos visuales y en un sistema de grillas y tarjetas que permite presentar los contenidos de forma ordenada y facilita su actualización desde el administrador, manteniendo la estructura de la página a medida que se incorpora nueva información.",
      ],
      en: [
        "Factchequeado Lab is a space for sharing information, tools and resources about artificial intelligence and its uses. The challenge was to organize the content into a single-page site that made the information easy to reach and kept the presentation clear and consistent.",
        "I designed the interface from scratch in Figma and built the site in WordPress with Elementor Pro. I worked on the visual styles and on a system of grids and cards that presents the content in an orderly way and makes it easy to update from the WordPress admin, keeping the page structure intact as new information is added.",
      ],
    },
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
      es: "Desarrollo de un sitio web corporativo para una empresa de logística, implementado en WordPress con Elementor Pro a partir de un diseño de referencia.",
      en: "Development of a corporate website for a logistics company, built in WordPress with Elementor Pro from a reference design.",
    },
    body: {
      es: [
        "El proyecto consistió en desarrollar el sitio web corporativo de GEA Logistics, con el objetivo de establecer una presencia digital profesional y comunicar su propuesta de servicios.",
        "Me encargué de implementar el diseño en WordPress con Elementor Pro, trasladando la estructura y los lineamientos visuales de referencia a un sitio funcional. El trabajo se centró en la construcción de las páginas y la adaptación de la propuesta al entorno web.",
      ],
      en: [
        "The project was to build the corporate website of GEA Logistics, to give the company a professional online presence and communicate the services it offers.",
        "I implemented the design in WordPress with Elementor Pro, turning the reference structure and visual guidelines into a working site. The work focused on building the pages and adapting the design to the web.",
      ],
    },
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
      es: "Desarrollo de una web one page para una marca personal, implementada en WordPress con Elementor a partir de un diseño visual predefinido.",
      en: "Development of a one-page website for a personal brand, built in WordPress with Elementor from an existing visual design.",
    },
    body: {
      es: [
        "El proyecto consistió en desarrollar una web one page para la marca personal de Javier Carrizo, con el objetivo de construir una presencia digital profesional y comunicar su propuesta de manera clara.",
        "Me encargué de implementar el diseño en WordPress con Elementor, trasladando la propuesta visual al entorno web y adaptando su estructura para lograr una experiencia coherente y funcional.",
      ],
      en: [
        "The project was to build a one-page website for Javier Carrizo's personal brand, to establish a professional online presence and communicate the brand's offering clearly.",
        "I implemented the design in WordPress with Elementor, bringing the visual design to the web and adapting its structure into a consistent, functional experience.",
      ],
    },
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
      es: "Desarrollo de un sitio web corporativo para un estudio de arquitectura especializado en instalaciones, implementado en WordPress con Elementor.",
      en: "Development of a corporate website for an architecture firm specializing in building services, built in WordPress with Elementor.",
    },
    body: {
      es: [
        "ARQCI es un estudio de arquitectura especializado en instalaciones que necesitaba una presencia digital para comunicar sus servicios y presentar su propuesta profesional.",
        "Me encargué de desarrollar el sitio en WordPress con Elementor, implementando el diseño visual existente y trasladándolo a una experiencia web funcional. El objetivo fue mantener la coherencia visual del proyecto y organizar la información de manera clara para facilitar la navegación.",
      ],
      en: [
        "ARQCI is an architecture firm specializing in building services that needed an online presence to communicate its services and present its professional offering.",
        "I built the site in WordPress with Elementor, implementing the existing visual design as a working website. The goal was to keep the project visually consistent and to organize the information clearly so the site is easy to navigate.",
      ],
    },
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
    tools: ["WordPress", "Bricks Builder"],
    year: 2025,
    role: webDevelopment,
    summary: {
      es: "Desarrollo de un sitio web corporativo para una empresa de soluciones modulares, con catálogo de productos y un sistema de cotización online. Implementado en WordPress con Bricks Builder, combinando funcionalidades personalizadas y un enfoque centrado en el rendimiento.",
      en: "Development of a corporate website for a modular solutions company, with a product catalog and an online quote system. Built in WordPress with Bricks Builder, combining custom features with a focus on performance.",
    },
    body: {
      es: [
        "Tecnofast Perú necesitaba un sitio web corporativo para presentar sus soluciones modulares, mostrar su catálogo de productos y facilitar las consultas comerciales. El proyecto tomó como referencia el sitio de Tecnofast Chile, adaptando su estructura y funcionalidades a una nueva implementación.",
        "Participé en el desarrollo con WordPress y Bricks Builder, utilizando HTML, CSS y código personalizado para implementar el flujo de cotización integrado con WooCommerce, desde la selección de productos hasta el envío de la solicitud. El trabajo combinó funcionalidades a medida con un enfoque orientado al rendimiento y a una experiencia de navegación ágil.",
      ],
      en: [
        "Tecnofast Perú needed a corporate website to present its modular solutions, show its product catalog and make sales inquiries easier. The project took the Tecnofast Chile site as a reference, adapting its structure and features into a new build.",
        "I worked on the development with WordPress and Bricks Builder, using HTML, CSS and custom code to build the quote flow integrated with WooCommerce, from choosing products to sending the request. The work combined custom features with a focus on performance and fast, smooth browsing.",
      ],
    },
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
      es: "Desarrollo de un sitio web corporativo para una agencia de turismo deportivo especializada en viajes a carreras y maratones. Una plataforma para descubrir próximos destinos, conocer las propuestas de cada carrera y facilitar el contacto con la agencia.",
      en: "Development of a corporate website for a sports travel agency specializing in trips to races and marathons. A place to discover upcoming destinations, see what each race trip offers and get in touch with the agency.",
    },
    body: {
      es: [
        "Olatrek organiza viajes a carreras y maratones en Argentina y el mundo. El objetivo del sitio era presentar su oferta de viajes, destacar las próximas carreras y facilitar el acceso a la información para que los corredores pudieran conocer las propuestas y realizar consultas.",
        "Me encargué del desarrollo del sitio en WordPress con Elementor Pro, implementando un diseño previamente definido. La estructura permite organizar las carreras por destino y presentar información relevante de cada experiencia, con accesos directos al contacto para acompañar el proceso de consulta.",
      ],
      en: [
        "Olatrek organizes trips to races and marathons in Argentina and around the world. The site needed to present its trips, highlight upcoming races and make the information easy to find, so runners could explore the options and send inquiries.",
        "I built the site in WordPress with Elementor Pro from an existing design. The structure organizes races by destination and presents the key information for each trip, with direct links to contact the agency along the way.",
      ],
    },
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
      es: "Desarrollo de un sitio web corporativo para una empresa pesquera chilena, orientado a presentar sus productos, comunicar su actividad y fortalecer su presencia digital en los mercados nacionales e internacionales.",
      en: "Development of a corporate website for a Chilean fishing company, built to present its products, communicate what it does and strengthen its online presence in domestic and international markets.",
    },
    body: {
      es: [
        "Friosur es una empresa pesquera chilena dedicada a la elaboración y comercialización de productos del mar para distintos mercados. El sitio web reúne información institucional, presenta su catálogo de productos y comunica sus operaciones, con el objetivo de acercar su propuesta comercial a clientes de Chile y el mundo.",
        "Me encargué del desarrollo del sitio en WordPress con Bricks Builder, implementando el diseño proporcionado y trasladando su propuesta visual a una web funcional. Mi trabajo se centró en la construcción de las páginas y la implementación de la estructura definida para presentar los contenidos de forma clara y organizada.",
      ],
      en: [
        "Friosur is a Chilean fishing company that produces and sells seafood for several markets. The website brings together company information, presents its product catalog and describes its operations, to bring its offering closer to customers in Chile and around the world.",
        "I built the site in WordPress with Bricks Builder, implementing the design I was given and turning it into a working website. My work focused on building the pages and implementing the planned structure to present the content clearly and in an organized way.",
      ],
    },
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
      es: "Desarrollo de un sitio web corporativo para el Aeropuerto El Loa, implementado en WordPress con Bricks Builder e integrado con una API meteorológica para mostrar información del clima en tiempo real.",
      en: "Development of the corporate website for El Loa Airport, built in WordPress with Bricks Builder and connected to a weather API to show live weather information.",
    },
    body: {
      es: [
        "El proyecto consistió en desarrollar el sitio web corporativo del Aeropuerto El Loa, en Calama, Chile, con el objetivo de ofrecer un espacio digital para consultar información relevante sobre el aeropuerto y sus servicios.",
        "Me encargué de la implementación del sitio en WordPress con Bricks Builder, trabajando a partir de un diseño existente. Además, desarrollé una integración con una API meteorológica para mostrar información actualizada del clima directamente en la barra de navegación, incorporando datos dinámicos a la interfaz.",
      ],
      en: [
        "The project was to build the corporate website of El Loa Airport in Calama, Chile, as an online place to look up information about the airport and its services.",
        "I built the site in WordPress with Bricks Builder from an existing design. I also built an integration with a weather API that shows up-to-date weather information right in the navigation bar, bringing live data into the interface.",
      ],
    },
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
      es: "Desarrollo de un sitio web para la marca personal de una life coach, orientado a comunicar su propuesta profesional y conectar su presencia digital con sus contenidos en Instagram.",
      en: "Development of a personal brand website for a life coach, built to present the coach's professional offering and connect the site with the brand's Instagram content.",
    },
    body: {
      es: [
        "Burning Wanderlust es la marca personal de una life coach que buscaba trasladar su propuesta profesional al entorno digital y contar con un espacio propio para presentar su trabajo.",
        "Me encargué del desarrollo del sitio en WordPress con Elementor Pro, implementando un diseño previamente definido e integrando un plugin para mostrar publicaciones de Instagram. De esta manera, el sitio combina su presencia web con sus contenidos en redes sociales.",
      ],
      en: [
        "Burning Wanderlust is a life coach's personal brand. The goal was to bring the coaching offering online, with a dedicated space to present the work.",
        "I built the site in WordPress with Elementor Pro from an existing design, and integrated a plugin that shows Instagram posts. This way the site brings together the brand's web presence and its social media content.",
      ],
    },
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
      es: "Diseño de una web para una agencia de email marketing, con un enfoque visual que simplifica la presentación de sus servicios y comunica su propuesta de forma clara y profesional.",
      en: "Website design for an email marketing agency, with a visual approach that simplifies how its services are presented and communicates its offering clearly and professionally.",
    },
    body: {
      es: [
        "DéDé Digital necesitaba renovar su presencia digital con una web que presentara sus servicios de forma más visual, clara y profesional. El principal desafío era transformar una estructura con demasiado texto en una experiencia más dinámica, que facilitara la comprensión de su propuesta y permitiera identificar rápidamente sus servicios.",
        "Diseñé la interfaz en Figma, trabajando en la jerarquía de contenidos, la organización de la información y la composición visual. Además, al tratarse de un sitio en alemán, tuve en cuenta la extensión de las palabras al definir los espacios y las proporciones de los elementos, buscando mantener una interfaz equilibrada y legible.",
      ],
      en: [
        "DéDé Digital needed to refresh its online presence with a website that presented its services in a more visual, clear and professional way. The main challenge was turning a text-heavy structure into a more dynamic experience that made the offering easier to understand and the services quick to find.",
        "I designed the interface in Figma, working on the content hierarchy, the information structure and the visual composition. Since the site is in German, I accounted for long words when setting the spacing and proportions of each element, to keep the interface balanced and readable.",
      ],
    },
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
      es: "Diseño conceptual de una landing page para un programa de bienestar de seis semanas. Una experiencia digital pensada para comunicar el valor del programa y convertir el interés de las visitantes en inscripciones.",
      en: "Concept design of a landing page for a six-week wellness program. A digital experience built to communicate the program's value and turn visitors' interest into sign-ups.",
    },
    body: {
      es: [
        "Amanda Wellness Coach es una landing page conceptual para un programa de bienestar de seis semanas, dirigido a mujeres que buscan incorporar hábitos sostenibles y mejorar sus rutinas cotidianas. El objetivo fue crear una experiencia digital clara y cercana que comunicara la propuesta de valor del programa y motivara a las visitantes a inscribirse.",
        "El diseño combina una estética serena con una estructura organizada, jerarquías visuales claras y llamados a la acción estratégicamente ubicados. También definí la dirección visual a través de la paleta cromática, las tipografías y un logotipo tipográfico, buscando transmitir confianza y crear una experiencia coherente, enfocada en la legibilidad y la conversión.",
      ],
      en: [
        "Amanda Wellness Coach is a concept landing page for a six-week wellness program for women who want to build sustainable habits and improve their daily routines. The goal was a clear, warm digital experience that communicated the program's value and encouraged visitors to sign up.",
        "The design pairs a calm look with an organized structure, clear visual hierarchy and well-placed calls to action. I also set the visual direction through the color palette, the typefaces and a wordmark, aiming to build trust and create a consistent experience focused on readability and conversion.",
      ],
    },
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
      es: "Identidad visual para una marca conceptual de indumentaria unisex que reinterpreta los básicos cotidianos a través de una estética minimalista, contemporánea y atemporal.",
      en: "Visual identity for a concept unisex clothing brand that reinterprets everyday basics through a minimal, contemporary and timeless look.",
    },
    body: {
      es: [
        "UNIFORM es una marca conceptual de indumentaria unisex dirigida a una comunidad creativa que busca prendas versátiles para el día a día. La propuesta parte de la idea de reinterpretar los básicos cotidianos a través de una estética minimalista, funcional y atemporal, combinando la comodidad del streetwear con una mirada más sofisticada.",
        "La identidad visual se construyó a partir de un lenguaje gráfico modular, una paleta sobria y una tipografía de carácter contemporáneo. El sistema busca transmitir solidez y versatilidad, creando una marca reconocible y coherente con su propuesta de elevated dailywear.",
      ],
      en: [
        "UNIFORM is a concept unisex clothing brand for a creative community looking for versatile everyday pieces. The idea is to reinterpret everyday basics through a minimal, functional and timeless look, combining the comfort of streetwear with a more refined eye.",
        "The visual identity is built on a modular graphic language, a restrained palette and a contemporary typeface. The system aims to convey strength and versatility, creating a recognizable brand that fits its elevated dailywear concept.",
      ],
    },
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
      es: "Identidad visual para una marca personal especializada en costos y rentabilidad. Un sistema gráfico que combina profesionalismo, claridad y una estética contemporánea para comunicar su propuesta de valor.",
      en: "Visual identity for a personal brand specializing in costs and profitability. A graphic system that combines professionalism, clarity and a contemporary look to communicate the brand's value.",
    },
    body: {
      es: [
        "Lucrecia Cornaglia es una marca personal enfocada en el asesoramiento en costos y rentabilidad, orientado a acompañar a empresas y negocios en la toma de decisiones. El objetivo fue construir una identidad visual profesional y reconocible, capaz de transmitir confianza, claridad y una mirada estratégica.",
        "Desarrollé un sistema de identidad visual que combina una paleta de verdes, azules y tonos neutros con una tipografía de personalidad distintiva y un isotipo propio. La propuesta se extiende a distintas aplicaciones de marca, como tarjetas personales y piezas de comunicación, manteniendo una estética coherente y alineada con los valores del negocio.",
      ],
      en: [
        "Lucrecia Cornaglia is a personal brand focused on cost and profitability consulting, helping companies and businesses make decisions. The goal was a professional, recognizable visual identity that conveys trust, clarity and a strategic outlook.",
        "I developed a visual identity system that pairs a palette of greens, blues and neutrals with a distinctive typeface and a custom symbol. It extends to several brand applications, such as business cards and communication pieces, keeping a consistent look aligned with the business's values.",
      ],
    },
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
