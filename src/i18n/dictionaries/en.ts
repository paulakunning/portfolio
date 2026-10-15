import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    siteName: "Paula Kunning",
    ogLocale: "en_US",
    home: {
      title: "Paula Kunning — Web Designer & WordPress / Front-End Developer",
      description:
        "I design websites in Figma and build them in WordPress and code. Portfolio of Paula Kunning, Argentina. Available for remote work.",
    },
    projects: {
      title: "Projects",
      description:
        "Web design, WordPress development and branding projects by Paula Kunning.",
    },
    contact: {
      title: "Contact",
      description:
        "Get in touch with Paula Kunning about a remote role or a freelance project.",
    },
  },
  nav: {
    skipToContent: "Skip to content",
    home: "Paula Kunning — Home",
    label: "Main",
    projects: "Projects",
    contact: "Contact",
    cta: "Let's talk",
    switchTo: "ES",
    switchToLabel: "View this page in Spanish",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  common: {
    newTab: "(opens in a new tab)",
  },
  footer: {
    title: "Let's stay in touch",
  },
  hero: {
    title: "Web Designer & WordPress / Front-End Developer",
    cv: "View my resume",
    cvNotice: "(PDF, opens in a new tab)",
  },
  projects: {
    title: "Some work I enjoyed making",
  },
  contact: {
    title: "Have a project in mind?",
    intro:
      "If you feel we could build something together, I'd love to hear your idea.",
    form: {
      name: "Name",
      email: "Email",
      reason: "Reason",
      reasonPlaceholder: "Choose an option",
      reasons: {
        job: "Job opportunity",
        freelance: "Freelance project",
        other: "Other",
      },
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Thanks for reaching out!",
      successBody: "I got your message and I'll get back to you soon.",
      error:
        "I couldn't send your message. Please try again or email me at {email}.",
      errors: {
        required: "Please fill in this field.",
        too_short: "Please write at least {min} characters.",
        too_long: "Please use at most {max} characters.",
        invalid_email: "Enter a valid email address.",
        invalid_option: "Choose a reason.",
      },
    },
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    back: "Back to home",
  },
};
