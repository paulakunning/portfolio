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
    title: "Diseño Web + Desarrollo",
    seeProjects: "Ver proyectos",
    cv: "Ver mi CV",
    cvNotice: "(PDF, se abre en una pestaña nueva)",
    subtitle:
      "Creo páginas web en Figma y puedo hacerlas realidad con código o herramientas no-code.",
    availability:
      "Disponible para trabajo remoto full-time y proyectos freelance",
    dragHint: "Podés mover las herramientas",
  },
  featured: {
    title: "Proyectos destacados",
    subtitle: "Diseño Web, Desarrollo WordPress y Branding.",
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
      "Diseño páginas web en Figma y las hago realidad con WordPress o código.",
      "Tengo más de 3 años de experiencia trabajando en desarrollo web para una agencia de marketing digital y en proyectos freelance. Trabajé en sitios corporativos y tiendas online, y también diseño identidades visuales y piezas gráficas que complementan mi trabajo web.",
      "Actualmente, estoy abierta a nuevas oportunidades laborales y proyectos freelance, especialmente en diseño y desarrollo web.",
    ],
    tools: "Herramientas que uso",
    learning: "Ahora estoy aprendiendo {list}.",
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
      "Busco un puesto remoto como Diseñadora Web o Desarrolladora WordPress / Front-End, y también tomo proyectos freelance.",
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
