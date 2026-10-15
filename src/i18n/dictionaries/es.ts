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
    title: "Estemos en contacto",
  },
  hero: {
    title: "Diseñadora Web y Desarrolladora WordPress / Front-End",
    cv: "Ver mi CV",
    cvNotice: "(PDF, se abre en una pestaña nueva)",
  },
  projects: {
    title: "Algunos trabajos que disfruté crear",
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
