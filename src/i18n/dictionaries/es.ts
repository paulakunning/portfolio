export const es = {
  meta: {
    siteName: "Paula Kunning",
    ogLocale: "es_AR",
    home: {
      title: "Paula Kunning — Desarrolladora Full Stack",
      description:
        "Desarrolladora full stack con React, Next.js, TypeScript y Node.js. Portfolio de Paula Kunning, Córdoba, Argentina. Disponible para trabajo remoto.",
    },
    projects: {
      title: "Proyectos",
      description: "Proyectos de desarrollo y diseño web de Paula Kunning.",
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
    view: "Ver",
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
    title: "Desarrolladora Full Stack",
    seeProjects: "Ver proyectos",
    cv: "Ver mi CV",
    cvNotice: "(PDF, se abre en una pestaña nueva)",
    subtitle:
      "Transformo ideas en productos digitales,\ndel diseño en Figma al código.",
    availability:
      "Disponible para trabajo remoto full-time y proyectos freelance",
    dragHint: "Podés mover las herramientas",
  },
  featured: {
    title: "Proyectos destacados",
    subtitle: "Desarrollo y Diseño Web.",
    viewAll: "Ver todos los proyectos",
    viewProject: "Ver proyecto",
    seeAll: "Ver los {count} proyectos",
    previous: "Proyecto anterior",
    next: "Proyecto siguiente",
  },
  experience: {
    title: "Experiencia",
    present: "Actualidad",
  },
  about: {
    title: "Hola, soy Paula",
    paragraphs: [
      "Soy desarrolladora full stack. Diseño las interfaces en Figma y las implemento yo misma con React y Next.js, o con WordPress, así que puedo llevar un proyecto de punta a punta.",
      "Tengo más de 3 años de experiencia en desarrollo web: 2 años y medio en una agencia de marketing digital, donde desarrollé más de 10 sitios, y hoy como freelance para clientes de Argentina y del exterior.",
      "Actualmente estoy aprendiendo Python y LLMs para construir apps con IA, y estoy abierta a nuevas oportunidades laborales y proyectos freelance.",
    ],
    tools: "Herramientas que uso",
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
      about: "Sobre el proyecto",
      more: "Más proyectos",
    },
  },
  cta: {
    title: "¿Tenés una idea en mente? Me encantaría hacerla realidad",
    availability:
      "Busco un puesto remoto como Desarrolladora Full Stack, y también tomo proyectos freelance.",
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
      successBody: "Recibí tu mensaje y voy a responderte a la brevedad.",
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
