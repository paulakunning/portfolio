# Paula Kunning, portfolio

Bilingual (Spanish and English) portfolio for Paula Kunning, a web designer and developer. It has a home page, a filterable project list, one page per project and a contact form.

Live: https://paulakunning.com

## Stack

- Next.js 16 (App Router) with `cacheComponents` and `partialPrefetching` enabled
- React 19 and TypeScript
- Tailwind CSS 4
- Resend for email and zod for validating the contact form
- Vitest for unit tests, Playwright and axe for end-to-end and accessibility tests
- No i18n library, no UI kit, no CSS-in-JS

## Architecture decisions

**i18n without a library.** Every route lives under a `[lang]` segment that is the root layout. Spanish is served without a prefix and English under `/en`: `src/proxy.ts` rewrites unprefixed requests to the internal `/es` routes and redirects `/es/...` to the unprefixed URL, so each page has one public URL. Copy lives in two typed dictionaries (`src/i18n/dictionaries/es.ts` and `en.ts`); the `Dictionary` type makes a key missing from either language a type error. Server Components read the locale with `getLocale()` from `src/i18n/server.ts`.

**Static generation.** `generateStaticParams` in `src/app/[lang]/layout.tsx` prerenders both languages, and the one in `src/app/[lang]/proyectos/[slug]/page.tsx` prerenders every project slug. An unknown slug gets a localized 404 from the proxy and the `[...rest]` catch-all route. Each language also gets a generated Open Graph image (`opengraph-image.tsx`). `sitemap.ts` lists every page and project in both languages, and `robots.ts` points to it.

**Content as typed data.** Projects, experience, skills, testimonials and site links are plain TypeScript in `src/content/`, typed by `src/content/types.ts`. Translatable fields use `Localized<T>`, a record with an `es` and an `en` entry, and images are static imports from `src/assets/`. There is no CMS; adding a project is adding an object, and `content.test.ts` checks the data.

**Contact form: Server Action with progressive enhancement.** `ContactForm` posts to the `sendContactMessage` Server Action (`src/app/[lang]/contacto/actions.ts`) through `useActionState`, so the form is a real `<form action>` that submits without JavaScript. The action checks a honeypot field, validates with zod (`src/lib/contact/schema.ts`), and sends a plain-text email with Resend (`src/lib/contact/send-email.ts`). With `CONTACT_DRY_RUN=true` it logs the message to the console instead of sending it, which is what local development and the E2E tests use.

**Client code stays at the leaves.** Everything is a Server Component unless it needs browser state or events. Seven components are client components:

- `SiteNav`: mobile menu state and `usePathname` for the active link and the language switch
- `FooterCta`: `usePathname` to hide the call to action on the contact page
- `ProjectFilter`: active category tab state and the scroll reveal of the cards
- `ProjectReel`: horizontal scroll tied to vertical scroll on wide screens, plus carousel controls
- `HeroCanvas`: draggable tiles using pointer events
- `EmailPill`: copies the email address to the clipboard
- `ContactForm`: `useActionState` for pending and error state

## Project structure

```
.
├─ .github/workflows/ci.yml   lint, format, typecheck, unit, build, E2E
├─ docs/specs/                design spec
├─ public/                    static files (CVs and similar)
├─ src/
│  ├─ proxy.ts                locale rewrite and redirect
│  ├─ app/
│  │  ├─ sitemap.ts, robots.ts
│  │  └─ [lang]/              root layout; every page is under it
│  │     ├─ page.tsx          home
│  │     ├─ proyectos/        project list and [slug] detail pages
│  │     ├─ contacto/         contact page and Server Action
│  │     ├─ [...rest]/        localized 404 for unknown paths
│  │     └─ opengraph-image.tsx
│  ├─ components/             UI components
│  ├─ content/                typed content: projects, experience, skills
│  ├─ i18n/                   config, routing helpers, dictionaries
│  ├─ lib/                    helpers; lib/contact has the form schema and email
│  └─ assets/                 images, SVG icons, fonts
└─ tests/e2e/                 Playwright specs
```

Unit tests sit next to the code they test (`*.test.ts`).

## Getting started

You need Node 24 (see `.nvmrc`) and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000. `.env.example` sets `CONTACT_DRY_RUN=true`, so the contact form works locally without a Resend key: messages are logged to the terminal.

## Scripts

| Script                 | What it does                                           |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start the development server                           |
| `npm run build`        | Production build                                       |
| `npm start`            | Serve the production build                             |
| `npm run lint`         | ESLint                                                 |
| `npm run typecheck`    | `next typegen` and `tsc --noEmit`                      |
| `npm run format`       | Format everything with Prettier                        |
| `npm run format:check` | Check formatting without writing                       |
| `npm test`             | Unit tests (Vitest)                                    |
| `npm run test:e2e`     | End-to-end tests (Playwright); builds and serves first |

## Testing

- **Unit (Vitest):** `npm test` runs `src/**/*.test.ts`: content data, locale routing, the contact schema, email building and sending, the Server Action, metadata, sitemap and the small layout helpers.
- **End to end (Playwright):** `npm run test:e2e` builds the site, serves the production build on port 3100 with `CONTACT_DRY_RUN=true`, and runs the specs in `tests/e2e/` in two projects: mobile (390x844) and desktop (1280x800). The first run needs `npx playwright install chromium`.
- **Accessibility:** `tests/e2e/a11y.spec.ts` runs axe (`@axe-core/playwright`) on every public page in both languages plus the 404 pages, and checks that no page scrolls horizontally at 360px.

CI (`.github/workflows/ci.yml`) runs lint, format check, typecheck, unit tests, build and E2E on every push and pull request.

## Deployment

The site is deployed on Vercel. Set these environment variables in the project (see `.env.example`):

| Variable             | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `RESEND_API_KEY`     | Resend API key                                             |
| `CONTACT_TO_EMAIL`   | Inbox that receives the messages                           |
| `CONTACT_FROM_EMAIL` | Sender address; its domain must be verified in Resend      |
| `CONTACT_DRY_RUN`    | Must not be `true` in production, or no email is ever sent |

Until `paulakunning.com` is verified in Resend, `onboarding@resend.dev` works as the sender for testing.
