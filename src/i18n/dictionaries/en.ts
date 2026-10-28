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
    about: "About",
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
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Couldn't copy. The email is {email}",
    backToTop: "Back to top",
    credit: "Designed & built by me, with a little help from AI.",
    copyright: "© {year} Paula Kunning. Córdoba, Argentina.",
  },
  hero: {
    title: "Digital design, from concept to screen.",
    seeProjects: "See projects",
    cv: "View my resume",
    cvNotice: "(PDF, opens in a new tab)",
    subtitle:
      "I create websites that connect a good idea with thoughtful design and an intuitive experience. I can also bring those designs to the web, combining a visual eye with development skills.",
    availability: "Available for full-time remote work and freelance projects",
    dragHint: "You can move the tools around",
  },
  featured: {
    title: "Featured projects",
    subtitle: "Web design, WordPress development and branding.",
    viewAll: "View all projects",
    viewProject: "View project",
    seeAll: "See all {count} projects",
    previous: "Previous project",
    next: "Next project",
  },
  experience: {
    title: "Experience",
    present: "Present",
  },
  about: {
    title: "Hi, I'm Paula",
    paragraphs: [
      "I design websites in Figma and build them in WordPress and code, so what gets designed is what ships.",
      "I have 3+ years of experience: I spent 2.5 years at a digital marketing agency building corporate sites, and I now take freelance projects that combine design and development.",
    ],
    tools: "Tools I use",
    learning: "Currently learning {list}.",
  },
  testimonials: {
    title: "Testimonials",
  },
  projects: {
    title: "Some work I enjoyed making",
    filterLabel: "Filter projects by category",
    all: "All",
    categories: {
      "web-design": "Web design",
      "web-development": "Web development",
      branding: "Branding",
    },
    count: { one: "{count} project", other: "{count} projects" },
    conceptual: "Concept",
    detail: {
      role: "Role",
      year: "Year",
      services: "Services",
      tools: "Tools",
      links: { live: "Visit site", behance: "View on Behance" },
      back: "Back to projects",
      next: "Next project",
    },
  },
  cta: {
    title: "Have an idea in mind? I'd love to bring it to life",
    availability:
      "I'm looking for a remote role as a web designer or WordPress / front-end developer, and I also take on freelance projects.",
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
