export const es = {
  meta: {
    siteName: "Paula Kunning",
    ogLocale: "es_AR",
    home: {
      title:
        "Paula Kunning — Diseñadora Web y Desarrolladora WordPress / Front-End",
      description:
        "Diseño sitios web en Figma y los desarrollo en WordPress y código. Portfolio de Paula Kunning, Córdoba, Argentina. Disponible para trabajo remoto.",
    },
    projects: {
      title: "Proyectos",
      description:
        "Proyectos de diseño web, desarrollo WordPress y branding de Paula Kunning.",
    },
    contact: {
      title: "Contacto",
      description:
        "Contactá a Paula Kunning para un puesto remoto o un proyecto freelance.",
    },
  },
  nav: {
    skipToContent: "Ir al contenido",
    home: "Paula Kunning — Inicio",
    label: "Principal",
    projects: "Proyectos",
    about: "Sobre mí",
    contact: "Contacto",
    cta: "Hablemos",
    switchTo: "EN",
    switchToLabel: "Ver esta página en inglés",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  common: {
    newTab: "(se abre en una pestaña nueva)",
  },
  footer: {
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "No se pudo copiar. El mail es {email}",
    backToTop: "Volver arriba",
    credit: "Diseñado y desarrollado por mí, con una ayudita de la IA.",
    copyright: "© {year} Paula Kunning. Córdoba, Argentina.",
  },
  hero: {
    title: "Diseñadora Web y Desarrolladora WordPress / Front-End",
    cv: "Ver mi CV",
    cvNotice: "(PDF, se abre en una pestaña nueva)",
    subtitle:
      "Diseño en Figma y lo desarrollo: sitios responsive que se ven bien y funcionan.",
    availability:
      "Disponible para trabajo remoto de tiempo completo y proyectos freelance",
  },
  featured: {
    title: "Proyectos destacados",
    viewAll: "Ver todos los proyectos",
  },
  experience: {
    title: "Experiencia",
    present: "Actualidad",
  },
  skills: {
    title: "Habilidades",
    learning: "Aprendiendo",
  },
  about: {
    title: "Hola, soy Paula",
    paragraphs: [
      "Diseño sitios web en Figma y los llevo a la realidad en WordPress y código, así que lo que se diseña es lo que se publica.",
      "Tengo más de 3 años de experiencia: trabajé 2 años y medio en una agencia de marketing digital desarrollando sitios corporativos, y hoy tomo proyectos freelance que combinan diseño y desarrollo.",
      "Antes de dedicarme a esto fui contadora pública. Cambié de carrera en 2022, y esa mirada de negocio, ordenada y atenta al detalle sigue presente en cada proyecto.",
      "Hoy estoy profundizando en React, Next.js y TypeScript, y aprendiendo Framer. Vivo en Córdoba, Argentina, y trabajo en remoto en español e inglés.",
    ],
  },
  testimonials: {
    title: "Testimonios",
  },
  projects: {
    title: "Algunos trabajos que disfruté crear",
    filterLabel: "Filtrar proyectos por categoría",
    all: "Todos",
    categories: {
      "web-design": "Diseño web",
      "web-development": "Desarrollo web",
      branding: "Branding",
    },
    count: { one: "{count} proyecto", other: "{count} proyectos" },
    conceptual: "Conceptual",
    detail: {
      role: "Rol",
      year: "Año",
      services: "Servicios",
      tools: "Herramientas",
      links: { live: "Ir a la web", behance: "Ver en Behance" },
      back: "Volver a proyectos",
      next: "Siguiente proyecto",
    },
  },
  cta: {
    title: "¿Tenés una idea en mente? Me encantaría hacerla realidad",
    availability:
      "Busco un puesto remoto como diseñadora web o desarrolladora WordPress / front-end, y también tomo proyectos freelance.",
  },
  contact: {
    title: "¿Tenés un proyecto en mente?",
    intro:
      "Si sentís que podemos crear algo juntos, me encantaría conocer tu idea.",
    form: {
      name: "Nombre",
      email: "Email",
      reason: "Motivo",
      reasonPlaceholder: "Elegí una opción",
      reasons: {
        job: "Propuesta laboral",
        freelance: "Proyecto freelance",
        other: "Otro",
      },
      message: "Mensaje",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      successTitle: "¡Gracias por escribirme!",
      successBody: "Recibí tu mensaje y te respondo a la brevedad.",
      error: "No pude enviar tu mensaje. Probá de nuevo o escribime a {email}.",
      errors: {
        required: "Completá este campo.",
        too_short: "Escribí al menos {min} caracteres.",
        too_long: "Usá como máximo {max} caracteres.",
        invalid_email: "Ingresá un email válido.",
        invalid_option: "Elegí un motivo.",
      },
    },
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que buscás no existe o cambió de dirección.",
    back: "Volver al inicio",
  },
};

export type Dictionary = typeof es;
