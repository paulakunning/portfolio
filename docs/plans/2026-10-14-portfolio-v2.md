# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild paulakunning.com as a bilingual (ES/EN), statically generated Next.js site that keeps the current design, adds project detail pages, testimonials and a working contact form, and is clean enough to walk through in a job interview.

**Architecture:**
- **Routing and languages:**
  - Every page lives under `src/app/[lang]`, which is the root layout.
  - `src/proxy.ts` rewrites unprefixed URLs to `/es/...` internally and redirects `/es/...` to the unprefixed URL, so public URLs stay `/…` (ES) and `/en/…` (EN).
  - Interface copy lives in typed dictionaries; list content lives in typed `src/content/*` files with both languages per item.
- **Rendering:**
  - Everything is prerendered except the contact form's Server Action, which validates with Zod and sends plain-text email through Resend.
  - Only three components run in the browser: `SiteNav`, `ProjectFilter` and `ContactForm`.

**Tech Stack:** Next.js 16.4 (App Router, Turbopack), React 19, TypeScript 5 (strict), Tailwind CSS 4, Zod 4, Resend 6, Vitest 5, Playwright 1.64 + @axe-core/playwright, ESLint 9 (eslint-config-next) + Prettier, GitHub Actions, Vercel.

**Spec:** `docs/specs/2026-10-14-portfolio-v2-design.md`. Read it before any task: copy, colors, URLs and content lists come from there.

## Global Constraints

**Versions and dependencies:**
- Node 24 LTS (`.nvmrc` = `24`), npm. `next@16.4.x`, `react@19.x`, `tailwindcss@4.x`, `zod@4.x`, `resend@6.x`, `vitest@5.x`, `@playwright/test@1.64.x`.
- No i18n library, no UI kit, no CSS-in-JS.
- Runtime dependencies beyond the scaffold are only `zod` and `resend`.
- Dev dependencies beyond the scaffold are only:
  - `vitest`, `vite-tsconfig-paths`
  - `prettier`, `prettier-plugin-tailwindcss`
  - `@playwright/test`, `@axe-core/playwright`

**Language and copy:**
- Code, identifiers, comments, commit messages, PR texts and `README.md` are in English.
- User-facing copy lives only in `src/i18n/dictionaries/{es,en}.ts` or `src/content/*`, never as string literals in components.
- Every copy key added in a task must exist in both `es.ts` and `en.ts`; the `Dictionary` type enforces it.
- Copy marked "verbatim" below must be pasted exactly.

**Git:**
- Commits use Conventional Commits.
- **No AI attribution of any kind** (no `Co-Authored-By`, no "Generated with" lines) in commits or PRs.
- Git author is Paula's global config; never override it.
- Task 1 commits to `main`. Every later task:
  - starts with `git switch main && git pull && git switch -c feat/<task-slug>`;
  - ends with `git push -u origin HEAD` and `gh pr create --fill`;
  - is merged by Paula before the next task starts.

**Components and markup:**
- Client components are exactly `SiteNav`, `ProjectFilter`, `ContactForm`. Everything else is a Server Component (or a shared component with no client-only APIs).
- Exactly one `h1` per page.
- External links and PDFs open in a new tab and append a visually hidden notice: `common.newTab`, or `hero.cvNotice` for PDFs.

**Colors and layout:**
- Use only the theme tokens from spec §6: `background`, `foreground`, `primary`, `secondary`, `accent`.
- `secondary` and `accent` are never used as a text color.
- Mobile-first. No horizontal scroll from 360px to 1440px.

**Images:**
- Static imports from `src/assets/**`. Source files are at most 2400px wide.
- The LCP image of a page uses `fetchPriority="high"` (`priority` is deprecated in Next 16; don't use it).

**Site URL:** `SITE_URL = 'https://paulakunning.com'` (single constant in `src/lib/metadata.ts`).

## Review Focus

1. **Contact fields with line breaks or HTML** (`"Ana\r\nBcc: x@y.com"`, `"<b>hi</b>"`): the email subject stays on one line, the body is plain text, and the page never renders the input as HTML. Pinned in Task 4 (`build-email.test.ts`).
2. **Old WordPress URLs with a trailing slash** (`/proyectos/`, `/en/contacto/`): they redirect to the slashless URL and render the right page. Pinned in Task 2 (`navigation.spec.ts`).
3. **Unknown project slug in either language** (`/proyectos/no-existe`, `/en/proyectos/nope`): a localized 404 with HTTP 404, not a crash or Next's default page. Pinned in Task 6 (`projects.spec.ts`).
4. **360px-wide phones with long project names or tool lists:** no horizontal overflow on any page. Pinned in Task 2 (`a11y.spec.ts`); its page list grows in Tasks 6 and 7.
5. **Contact form submitted without JavaScript** (blocked JS, slow network before hydration): the message is still sent and the thank-you message shown. Pinned in Task 4 (`contact.spec.ts`).

---

### Task 1: Scaffold, tooling and i18n primitives

**Files:**
- Create (generator): `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `src/app/*`, `.gitignore`
- Create: `.nvmrc`, `.prettierrc.json`, `.prettierignore`, `vitest.config.mts`, `.github/workflows/ci.yml`, `src/i18n/config.ts`, `src/i18n/routing.ts`, `src/i18n/format.ts`
- Test: `src/i18n/routing.test.ts`, `src/i18n/format.test.ts`

**Interfaces:**
- Produces, in `src/i18n/config.ts`:
  - `locales = ['es', 'en'] as const`
  - `type Locale = (typeof locales)[number]`
  - `defaultLocale: Locale = 'es'`
  - `isLocale(value: string): value is Locale`
  - `type Localized<T = string> = Record<Locale, T>`
- Produces, in `src/i18n/routing.ts`:
  - `localizePath(locale: Locale, path: string): string`. `path` is the unprefixed path starting with `/`.
  - `switchLocalePath(pathname: string, target: Locale): string`. `pathname` is the browser pathname.
- Produces, in `src/i18n/format.ts`:
  - `formatMessage(template: string, values: Record<string, string | number>): string`. Replaces `{key}` and leaves unknown keys untouched.

- [ ] **Step 1: Scaffold**

  1. In `~/Dev/portfolio` (it only contains `.git/` and `docs/`, which create-next-app accepts), run:
     `npx create-next-app@16.4.1 . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`
     If asked about the React Compiler, answer No.
  2. If the generator created `AGENTS.md` or `CLAUDE.md`, add both names to `.gitignore` (keep the files locally).
  3. Add `/playwright-report` and `/test-results` to `.gitignore`.
  4. Run `npm run build`. Expected: build succeeds.

- [ ] **Step 2: Tooling**

  1. `npm i -D vitest@5 vite-tsconfig-paths prettier prettier-plugin-tailwindcss`.
  2. `tsconfig.json`: add `"noUncheckedIndexedAccess": true` (keep `"strict": true`).
  3. `.nvmrc`: `24`.
  4. `.prettierrc.json`: `{ "plugins": ["prettier-plugin-tailwindcss"] }`.
  5. `.prettierignore`: `.next`, `node_modules`, `docs`, `playwright-report`, `test-results`.
  6. `vitest.config.mts`: plugin `tsconfigPaths()`, `test.environment: 'node'`, `test.include: ['src/**/*.test.ts']`.
  7. `package.json` scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "next typegen && tsc --noEmit",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "vitest run",
  "test:e2e": "playwright test"
}
```

- [ ] **Step 3: Write the failing tests**

```ts
// src/i18n/routing.test.ts
describe('localizePath', () => {
  it('keeps Spanish paths unprefixed', () => {
    expect(localizePath('es', '/')).toBe('/')
    expect(localizePath('es', '/proyectos')).toBe('/proyectos')
  })
  it('prefixes English paths with /en', () => {
    expect(localizePath('en', '/')).toBe('/en')
    expect(localizePath('en', '/proyectos/don-higinio')).toBe('/en/proyectos/don-higinio')
  })
})

describe('switchLocalePath', () => {
  it.each([
    ['/', 'en', '/en'],
    ['/en', 'es', '/'],
    ['/proyectos', 'en', '/en/proyectos'],
    ['/en/proyectos/arqci', 'es', '/proyectos/arqci'],
    ['/en/contacto', 'en', '/en/contacto'],
    ['/contacto', 'es', '/contacto'],
  ] as const)('%s → %s = %s', (pathname, target, expected) => {
    expect(switchLocalePath(pathname, target)).toBe(expected)
  })
  it('does not mistake paths that merely start with "en" for English', () => {
    expect(switchLocalePath('/enlaces', 'en')).toBe('/en/enlaces')
  })
})

describe('isLocale', () => {
  it('accepts only es and en', () => {
    expect(isLocale('es')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('fr')).toBe(false)
  })
})
```

```ts
// src/i18n/format.test.ts
it('replaces placeholders', () => {
  expect(formatMessage('Escribí al menos {min} caracteres.', { min: 2 })).toBe('Escribí al menos 2 caracteres.')
})
it('leaves unknown placeholders untouched', () => {
  expect(formatMessage('Hola {name}', {})).toBe('Hola {name}')
})
```

- [ ] **Step 4: Run them to verify they fail**

  Run: `npm test`. Expected: FAIL (modules not found).

- [ ] **Step 5: Implement `config.ts`, `routing.ts` and `format.ts`** with the signatures above.

- [ ] **Step 6: Verify everything passes**

  Run: `npm test && npm run lint && npm run typecheck && npm run format:check && npm run build`. Expected: all green (run `npm run format` first if formatting fails).

- [ ] **Step 7: CI workflow** — `.github/workflows/ci.yml`

  - Trigger on `push` and `pull_request`.
  - One job `checks` on `ubuntu-latest`:
    1. `actions/checkout`
    2. `actions/setup-node` with `node-version-file: .nvmrc` and `cache: npm`
    3. `npm ci`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run build`

- [ ] **Step 8: Commit and publish**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with tooling and i18n helpers"
gh repo create paulakunning/portfolio --public --source . --remote origin \
  --description "Personal portfolio — Next.js, TypeScript, Tailwind CSS" --push
```

  Expected: the repo exists and the CI run on `main` is green (`gh run watch`).

- [ ] **Step 9: Ask Paula to connect Vercel**

  She imports `paulakunning/portfolio` in Vercel with the default settings. From then on, every PR gets a preview URL. Don't wait for this to start Task 2.

---

### Task 2: Localized routing shell

**Files:**
- Delete: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/favicon.ico`, `public/*.svg` (scaffold leftovers)
- Create:
  - `src/proxy.ts`
  - `src/app/globals.css` (rewrite)
  - `src/app/[lang]/layout.tsx`, `src/app/[lang]/page.tsx`, `src/app/[lang]/not-found.tsx`, `src/app/[lang]/[...rest]/page.tsx`
  - `src/app/[lang]/proyectos/page.tsx`, `src/app/[lang]/contacto/page.tsx`
  - `src/i18n/dictionaries/es.ts`, `src/i18n/dictionaries/en.ts`, `src/i18n/get-dictionary.ts`, `src/i18n/server.ts`
  - `src/lib/metadata.ts`
  - `playwright.config.ts`, `tests/e2e/pages.ts`, `tests/e2e/navigation.spec.ts`, `tests/e2e/a11y.spec.ts`
- Modify: `.github/workflows/ci.yml`
- Test: `src/lib/metadata.test.ts`

**Interfaces:**
- Consumes: Task 1 `Locale`, `isLocale`, `localizePath`.
- Produces:
  - `type Dictionary = typeof es` and `getDictionary(locale: Locale): Dictionary`
  - `getLocale(): Promise<Locale>` in `src/i18n/server.ts`. It reads `lang` from `next/root-params`; Server Components only.
  - In `src/lib/metadata.ts`:
    - `SITE_URL`
    - `pageMetadata(input: { locale: Locale; path: string; title: string | { absolute: string }; description: string }): Metadata`
  - The `<main id="main" tabIndex={-1}>` landmark that every page renders into.
  - `tests/e2e/pages.ts`: `export const pages: string[]`, the list every page-wide E2E check iterates.

- [ ] **Step 1: Write the failing metadata test**

```ts
// src/lib/metadata.test.ts
it('builds canonical and hreflang alternates', () => {
  const meta = pageMetadata({ locale: 'en', path: '/proyectos', title: 'Projects', description: 'd' })
  expect(meta.alternates).toEqual({
    canonical: '/en/proyectos',
    languages: { es: '/proyectos', en: '/en/proyectos', 'x-default': '/proyectos' },
  })
  expect(meta.openGraph).toMatchObject({ locale: 'en_US', url: '/en/proyectos', siteName: 'Paula Kunning', type: 'website' })
  expect(meta.twitter).toMatchObject({ card: 'summary_large_image' })
})
```

  Run: `npm test`. Expected: FAIL.

- [ ] **Step 2: Implement `pageMetadata`**

  - Paths stay relative; the layout sets `metadataBase: new URL(SITE_URL)`.
  - `openGraph.locale` comes from `meta.ogLocale` in the dictionary (`es_AR` / `en_US`).
  - Run `npm test`. Expected: PASS.

- [ ] **Step 3: Dictionaries**

  - `es.ts` exports `const es = {…}` and `type Dictionary = typeof es`.
  - `en.ts` exports `const en: Dictionary`.
  - Initial keys (verbatim; the projects/contact descriptions are new copy):

| key | es | en |
|---|---|---|
| `meta.siteName` | Paula Kunning | Paula Kunning |
| `meta.ogLocale` | es_AR | en_US |
| `meta.home.title` | Paula Kunning — Diseñadora Web y Desarrolladora WordPress / Front-End | Paula Kunning — Web Designer & WordPress / Front-End Developer |
| `meta.home.description` | Diseño sitios web en Figma y los desarrollo en WordPress y código. Portfolio de Paula Kunning, Córdoba, Argentina. Disponible para trabajo remoto. | I design websites in Figma and build them in WordPress and code. Portfolio of Paula Kunning, Argentina. Available for remote work. |
| `meta.projects.title` | Proyectos | Projects |
| `meta.projects.description` | Proyectos de diseño web, desarrollo WordPress y branding de Paula Kunning. | Web design, WordPress development and branding projects by Paula Kunning. |
| `meta.contact.title` | Contacto | Contact |
| `meta.contact.description` | Contactá a Paula Kunning para un puesto remoto o un proyecto freelance. | Get in touch with Paula Kunning about a remote role or a freelance project. |
| `hero.title` | Diseñadora Web y Desarrolladora WordPress / Front-End | Web Designer & WordPress / Front-End Developer |
| `projects.title` | Some work I enjoyed making | Some work I enjoyed making |
| `contact.title` | ¿Tenés un proyecto en mente? | Have a project in mind? |
| `notFound.title` | Página no encontrada | Page not found |
| `notFound.body` | La página que buscás no existe o cambió de dirección. | The page you're looking for doesn't exist or has moved. |
| `notFound.back` | Volver al inicio | Back to home |

- [ ] **Step 4: Theme** — `src/app/globals.css`

  - `@import "tailwindcss";`
  - `@theme` with the five color tokens from spec §6, using exact hex values: `--color-background: #F7F4EF` and so on.
  - `@theme inline` mapping `--font-sans: var(--font-dm-sans)` and `--font-serif: var(--font-playfair)`.
  - Base styles:
    - `body` uses `bg-background text-foreground font-sans`
    - headings use `font-serif font-semibold`
    - `:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px }`

- [ ] **Step 5: Proxy** — `src/proxy.ts`

  Export `proxy(request: NextRequest)`:
  - `/es` or `/es/…` → `NextResponse.redirect(url, 308)` to the same path without `/es` (`/es` → `/`), keeping `search`.
  - `/en` or `/en/…` → `NextResponse.next()`.
  - Anything else → `NextResponse.rewrite` to `/es${pathname === '/' ? '' : pathname}`, keeping `search`.
  - `config.matcher`: `['/((?!api|_next|.*\\..*|.*opengraph-image).*)']`. Files with an extension (sitemap, robots, PDFs, icons) and generated OG images are served untouched.

- [ ] **Step 6: Layout, pages and 404**

  - **`[lang]/layout.tsx`:**
    - `generateStaticParams` returns `locales.map((lang) => ({ lang }))`.
    - `notFound()` if `!isLocale(lang)`.
    - Fonts via `next/font/google`:
      - `DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-sans', display: 'swap' })`
      - `Playfair_Display({ subsets: ['latin'], weight: '600', variable: '--font-playfair', display: 'swap' })`
    - Renders `<html lang={lang}>` and `<main id="main" tabIndex={-1}>{children}</main>`.
    - `generateMetadata` returns:
      - `metadataBase`
      - `title: { template: '%s — Paula Kunning', default: meta.home.title }`
      - `description: meta.home.description`
  - **Placeholder pages:** home, proyectos and contacto each render a single `h1` from `hero.title`, `projects.title` and `contact.title`, plus `generateMetadata` via `pageMetadata`. Home uses `{ absolute: meta.home.title }`; the others use `meta.projects.title` and `meta.contact.title`.
  - **`not-found.tsx`:** reads `getLocale()` and renders `h1` `notFound.title`, `notFound.body` and a link to `localizePath(locale, '/')` labelled `notFound.back`.
  - **`[...rest]/page.tsx`:** calls `notFound()`.

- [ ] **Step 7: Playwright**

  1. `npm i -D @playwright/test@1.64 @axe-core/playwright && npx playwright install chromium`.
  2. `playwright.config.ts`:
     - `testDir: 'tests/e2e'`, `baseURL: 'http://localhost:3000'`
     - `forbidOnly: !!process.env.CI`, `retries: process.env.CI ? 1 : 0`
     - project `mobile`: Desktop Chrome with `viewport: { width: 390, height: 844 }`, `isMobile: true`, `hasTouch: true`
     - project `desktop`: Desktop Chrome with `viewport: { width: 1280, height: 800 }`
     - `webServer`: `command: 'npm run build && npm run start'`, `env: { CONTACT_DRY_RUN: 'true' }`, `reuseExistingServer: !process.env.CI`, `timeout: 180_000`
  3. `tests/e2e/pages.ts`: `export const pages = ['/', '/en', '/proyectos', '/en/proyectos', '/contacto', '/en/contacto']`.

- [ ] **Step 8: Write the E2E tests**

`tests/e2e/navigation.spec.ts`:

| test | assertions |
|---|---|
| `serves every page with its language and a single h1` | for each of `pages`: status 200; `html[lang]` is `en` when the path starts with `/en`, else `es`; `page.locator('h1')` has count 1 |
| `redirects /es URLs to the unprefixed URL` | `/es/proyectos` ends at `/proyectos`; `/es` ends at `/` |
| `redirects WordPress-style trailing slashes` | `/proyectos/` ends at `/proyectos` with h1 `Some work I enjoyed making`; `/en/contacto/` ends at `/en/contacto` with h1 `Have a project in mind?` |
| `shows a localized 404 for unknown URLs` | `/no-existe` → status 404 and h1 `Página no encontrada`; `/en/nope` → status 404 and h1 `Page not found` |
| `declares canonical and hreflang alternates` | on `/proyectos`: `link[rel=canonical]` href `https://paulakunning.com/proyectos`; `link[rel=alternate][hreflang=en]` href `https://paulakunning.com/en/proyectos`; `hreflang=x-default` href `https://paulakunning.com/proyectos` |

`tests/e2e/a11y.spec.ts`:

| test | assertions |
|---|---|
| `has no axe violations: ${path}` | for each of `pages`: `new AxeBuilder({ page }).analyze()` returns `violations` equal to `[]` |
| `does not overflow horizontally at 360px: ${path}` | `test.use({ viewport: { width: 360, height: 740 } })`; for each of `pages`: `document.documentElement.scrollWidth <= window.innerWidth` |

- [ ] **Step 9: Run everything**

  Run: `npm test && npm run test:e2e`. Expected: all pass on both projects. Fix the code, not the assertions.

- [ ] **Step 10: Add E2E to CI**

  After `npm run build`, add:
  1. `npx playwright install --with-deps chromium`
  2. `npm run test:e2e`
  3. `actions/upload-artifact` of `playwright-report/` on failure

- [ ] **Step 11: Commit and open PR**

```bash
git add -A && git commit -m "feat: add localized routing, layout shell and e2e harness"
git push -u origin HEAD && gh pr create --fill
```

---

### Task 3: Header, navigation and footer

**Files:**
- Create:
  - `src/components/ButtonLink.tsx`
  - `src/components/Header.tsx`, `src/components/SiteNav.tsx`, `src/components/Footer.tsx`
  - `src/content/site.ts`
  - `tests/e2e/layout.spec.ts`
- Modify: `src/app/[lang]/layout.tsx`, both dictionaries

**Interfaces:**
- Consumes: `getLocale`, `getDictionary`, `localizePath`, `switchLocalePath`.
- Produces:
  - `ButtonLink(props: { href: string; variant?: 'primary' | 'secondary'; newTabNotice?: string; children: ReactNode; className?: string })`
    - with `newTabNotice`, it renders `target="_blank" rel="noopener noreferrer"` plus `<span className="sr-only">{newTabNotice}</span>`;
    - internal hrefs use `next/link`.
  - `Header()` and `Footer()`: no props; Server Components that read `getDictionary(await getLocale())` themselves.
  - `SiteNav(props: { locale: Locale; labels: Dictionary['nav'] })` (`'use client'`), rendered by `Header`.
  - In `src/content/site.ts`:
    - `contactLinks = { email: 'paulakunning@gmail.com', linkedin: 'https://www.linkedin.com/in/paula-kunning/', behance: 'https://www.behance.net/paulakunning', github: 'https://github.com/paulakunning' }`
    - `cvPaths: Localized = { es: '/cv/paula-kunning-cv-es.pdf', en: '/cv/paula-kunning-resume-en.pdf' }`

- [ ] **Step 1: Add copy (verbatim)**

| key | es | en |
|---|---|---|
| `nav.skipToContent` | Ir al contenido | Skip to content |
| `nav.home` | Paula Kunning — Inicio | Paula Kunning — Home |
| `nav.label` | Principal | Main |
| `nav.projects` | Proyectos | Projects |
| `nav.contact` | Contacto | Contact |
| `nav.cta` | Hablemos | Let's talk |
| `nav.switchTo` | EN | ES |
| `nav.switchToLabel` | Ver esta página en inglés | View this page in Spanish |
| `nav.openMenu` | Abrir menú | Open menu |
| `nav.closeMenu` | Cerrar menú | Close menu |
| `common.newTab` | (se abre en una pestaña nueva) | (opens in a new tab) |
| `footer.title` | Estemos en contacto | Let's stay in touch |

- [ ] **Step 2: Write the failing E2E tests** — `tests/e2e/layout.spec.ts`

| test | assertions |
|---|---|
| `skip link moves focus to the main content` | on `/`: first `Tab` focuses link `Ir al contenido`; `Enter` → `document.activeElement.id === 'main'` |
| `language switch keeps the current page` | on `/contacto` click link named `Ver esta página en inglés` → URL `/en/contacto`; then link `View this page in Spanish` → `/contacto` |
| `marks the current section in the navigation` | on `/proyectos` (desktop project only), nav link `Proyectos` has `aria-current="page"` |
| `header CTA leads to the contact page` | click link `Hablemos` → URL `/contacto` |
| `mobile menu opens, closes with Escape and restores focus` | mobile only: button `Abrir menú` → `aria-expanded="true"` and link `Proyectos` visible; `Escape` → `aria-expanded="false"` and the toggle is focused |
| `mobile menu closes after navigating` | mobile only: open, click `Contacto` → URL `/contacto` and toggle `aria-expanded="false"` |
| `footer lists every contact channel` | footer has links to `mailto:paulakunning@gmail.com`, the LinkedIn, Behance and GitHub URLs from `contactLinks` |

  Run: `npm run test:e2e -- layout`. Expected: FAIL.

- [ ] **Step 3: Implement**

  - **Skip link:** rendered in the layout as the first focusable element: `sr-only focus:not-sr-only`, `href="#main"`.
  - **`Header`** (server): renders the wordmark "Paula Kunning" in `font-serif`, linking to the locale home with `aria-label` from `nav.home`, followed by `<SiteNav>`.
  - **`SiteNav`:**
    - `usePathname()` drives `aria-current` and the language link (`switchLocalePath`). The language link has `aria-label` from `nav.switchToLabel` and `hrefLang` set to the other locale.
    - Below `md`, the links collapse behind a toggle button (`aria-expanded`, `aria-controls`).
    - The menu closes on `Escape` (focus returns to the toggle) and whenever the pathname changes.
  - **`Footer`:**
    - `h2` from `footer.title`, followed by the four links from `contactLinks`.
    - LinkedIn, Behance and GitHub carry `newTabNotice={common.newTab}`.
    - The footer is the "Estemos en contacto" block of the spec; the contact page doesn't duplicate it.

- [ ] **Step 4: Verify**

  Run: `npm test && npm run test:e2e`. Expected: PASS, including `a11y.spec.ts`.

- [ ] **Step 5: Commit and open PR** — `feat: add header, site navigation and footer`

---

### Task 4: Contact form

**Files:**
- Create:
  - `src/lib/contact/schema.ts`, `src/lib/contact/build-email.ts`, `src/lib/contact/send-email.ts`
  - `src/app/[lang]/contacto/actions.ts`
  - `src/components/ContactForm.tsx`
  - `.env.example`
- Modify: `src/app/[lang]/contacto/page.tsx`, both dictionaries
- Test:
  - `src/lib/contact/schema.test.ts`, `src/lib/contact/build-email.test.ts`, `src/lib/contact/send-email.test.ts`
  - `src/app/[lang]/contacto/actions.test.ts`
  - `tests/e2e/contact.spec.ts`

**Interfaces:**
- Consumes: `Locale`, `isLocale`, `formatMessage`, `getDictionary`, `ButtonLink`, `cvPaths`, `contactLinks`.
- Produces, in `schema.ts`:

```ts
export const contactReasons = ['job', 'freelance', 'other'] as const
export const contactLimits = { name: { min: 2, max: 100 }, email: { max: 254 }, message: { min: 10, max: 5000 } } as const
export type ContactField = 'name' | 'email' | 'reason' | 'message'
export type ContactErrorCode = 'required' | 'too_short' | 'too_long' | 'invalid_email' | 'invalid_option'
export type ContactValues = Record<ContactField, string>
export type ContactMessage = { name: string; email: string; reason: (typeof contactReasons)[number]; message: string }
export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'invalid'; fieldErrors: Partial<Record<ContactField, ContactErrorCode>>; values: ContactValues }
  | { status: 'error'; values: ContactValues }
export function parseContactForm(values: ContactValues):
  | { success: true; data: ContactMessage }
  | { success: false; fieldErrors: Partial<Record<ContactField, ContactErrorCode>> }
```

- Produces, elsewhere:
  - `buildContactEmail(message: ContactMessage, meta: { locale: Locale; sentAt: Date }): { subject: string; text: string }` in `build-email.ts`
  - `sendContactEmail(email: { subject: string; text: string; replyTo: string }): Promise<void>` in `send-email.ts`
  - `sendContactMessage(prevState: ContactState, formData: FormData): Promise<ContactState>` in `actions.ts` (`'use server'`)
  - `ContactForm(props: { locale: Locale; labels: Dictionary['contact']['form'] })` (`'use client'`)

- [ ] **Step 1: Write the failing schema tests** — `schema.test.ts`

```ts
const valid = { name: '  Ana Pérez ', email: ' ana@mail.com ', reason: 'job', message: '  Hola, quiero contactarte.  ' }
const errorFor = (patch: Partial<ContactValues>) => {
  const r = parseContactForm({ ...valid, ...patch })
  return r.success ? undefined : r.fieldErrors
}

it('accepts valid input and trims it', () => {
  expect(parseContactForm(valid)).toEqual({ success: true,
    data: { name: 'Ana Pérez', email: 'ana@mail.com', reason: 'job', message: 'Hola, quiero contactarte.' } })
})
it.each([
  [{ name: '' }, 'name', 'required'], [{ name: '   ' }, 'name', 'required'],
  [{ name: 'A' }, 'name', 'too_short'], [{ name: 'A'.repeat(101) }, 'name', 'too_long'],
  [{ email: '' }, 'email', 'required'], [{ email: 'ana' }, 'email', 'invalid_email'],
  [{ email: 'a@b' }, 'email', 'invalid_email'], [{ email: `${'a'.repeat(250)}@mail.com` }, 'email', 'too_long'],
  [{ reason: '' }, 'reason', 'invalid_option'], [{ reason: 'spam' }, 'reason', 'invalid_option'],
  [{ message: '' }, 'message', 'required'], [{ message: '          ' }, 'message', 'required'],
  [{ message: 'corto' }, 'message', 'too_short'], [{ message: 'a'.repeat(5001) }, 'message', 'too_long'],
] as const)('%o → %s: %s', (patch, field, code) => {
  expect(errorFor(patch)?.[field]).toBe(code)
})
```

- [ ] **Step 2: Run, then implement `schema.ts`**

  1. Run: `npm test -- schema`. Expected: FAIL.
  2. Implement:
     - Zod 4 schema built from `contactLimits`, with per-check error codes.
     - Check order per field: `required` → `too_short` / `too_long` → format. Each field reports its **first** issue (`z.flattenError(...).fieldErrors[field]?.[0]`).
     - `a@b` must fail: require a dot in the domain if `z.email()` accepts it.
  3. Run again. Expected: PASS.

- [ ] **Step 3: Write the failing email-building tests** — `build-email.test.ts`

```ts
const msg = { name: 'Ana Pérez', email: 'ana@mail.com', reason: 'freelance', message: 'Hola <b>Paula</b>\nSegunda línea' } as const
const meta = { locale: 'en' as const, sentAt: new Date('2026-10-14T12:00:00Z') }

it('builds a descriptive subject', () => {
  expect(buildContactEmail(msg, meta).subject).toBe('[Portfolio] Proyecto freelance — Ana Pérez')
})
it('collapses line breaks in the subject', () => {
  const { subject } = buildContactEmail({ ...msg, name: 'Ana\r\nBcc: x@y.com', reason: 'other' }, meta)
  expect(subject).toBe('[Portfolio] Otro — Ana Bcc: x@y.com')
})
it('writes a plain-text body that keeps the message verbatim', () => {
  const { text } = buildContactEmail(msg, meta)
  for (const line of ['Nombre: Ana Pérez', 'Email: ana@mail.com', 'Motivo: Proyecto freelance', 'Idioma: en', 'Fecha: 2026-10-14T12:00:00.000Z'])
    expect(text).toContain(line)
  expect(text).toContain('Hola <b>Paula</b>\nSegunda línea')
})
```

- [ ] **Step 4: Run, then implement `build-email.ts`**

  1. Run: `npm test -- build-email`. Expected: FAIL.
  2. Implement:
     - Reason labels come from `es.contact.form.reasons`, because the email always goes to Paula in Spanish.
     - The subject replaces `/\s+/g` with a single space.
  3. Run again. Expected: PASS.

- [ ] **Step 5: Write the failing sender tests** — `send-email.test.ts`

  - Use `vi.mock('resend')` and `vi.stubEnv`.

| test | setup | assertion |
|---|---|---|
| `logs instead of sending in dry-run mode` | `CONTACT_DRY_RUN=true` | resolves; `Resend` constructor not called |
| `throws when configuration is missing` | no `RESEND_API_KEY` | rejects with `Contact email is not configured` |
| `sends a plain-text email with reply-to` | `RESEND_API_KEY=k`, `CONTACT_TO_EMAIL=paulakunning@gmail.com`, `CONTACT_FROM_EMAIL=Portfolio <contacto@paulakunning.com>` | `emails.send` called once with `{ from: 'Portfolio <contacto@paulakunning.com>', to: 'paulakunning@gmail.com', replyTo: 'ana@mail.com', subject, text }` and no `html` key |
| `throws when Resend reports an error` | `send` resolves `{ data: null, error: { message: 'boom' } }` | rejects |

- [ ] **Step 6: Run, then implement `send-email.ts`**

  1. Run the tests. Expected: FAIL.
  2. Implement:
     - Read the env vars at call time, not at module load.
     - Dry run: `console.info` the subject and text, then return.
  3. Run again. Expected: PASS.

- [ ] **Step 7: Write the failing action tests** — `actions.test.ts`

  - Use `vi.mock('@/lib/contact/send-email')`.
  - Build `FormData` with `name`, `email`, `reason`, `message`, `locale`, `website`.

| test | assertion |
|---|---|
| `pretends success and sends nothing when the honeypot is filled` | `website: 'spam.com'` → `{ status: 'success' }`; `sendContactEmail` not called |
| `returns field errors and keeps the typed values` | `email: 'ana'` → `status: 'invalid'`, `fieldErrors.email === 'invalid_email'`, `values.name === 'Ana Pérez'`; not sent |
| `sends valid messages` | → `{ status: 'success' }`; called once with `replyTo: 'ana@mail.com'` and a subject containing `Propuesta laboral` |
| `returns an error and keeps the values when sending fails` | mock rejects → `status: 'error'`, `values.message` preserved; `console.error` called |
| `falls back to Spanish for an unknown locale` | `locale: 'fr'` → the built text contains `Idioma: es` |

- [ ] **Step 8: Run, then implement `actions.ts`**

  1. Run the tests. Expected: FAIL.
  2. Implement:
     - Missing `FormData` entries become `''`.
     - Order: honeypot → `parseContactForm` → `buildContactEmail` → `sendContactEmail`.
  3. Run again. Expected: PASS.

- [ ] **Step 9: Add copy (verbatim)**

| key | es | en |
|---|---|---|
| `contact.intro` | Si sentís que podemos crear algo juntos, me encantaría conocer tu idea. | If you feel we could build something together, I'd love to hear your idea. |
| `contact.form.name` | Nombre | Name |
| `contact.form.email` | Email | Email |
| `contact.form.reason` | Motivo | Reason |
| `contact.form.reasonPlaceholder` | Elegí una opción | Choose an option |
| `contact.form.reasons.job` | Propuesta laboral | Job opportunity |
| `contact.form.reasons.freelance` | Proyecto freelance | Freelance project |
| `contact.form.reasons.other` | Otro | Other |
| `contact.form.message` | Mensaje | Message |
| `contact.form.submit` | Enviar mensaje | Send message |
| `contact.form.sending` | Enviando… | Sending… |
| `contact.form.successTitle` | ¡Gracias por escribirme! | Thanks for reaching out! |
| `contact.form.successBody` | Recibí tu mensaje y te respondo a la brevedad. | I got your message and I'll get back to you soon. |
| `contact.form.error` | No pude enviar tu mensaje. Probá de nuevo o escribime a {email}. | I couldn't send your message. Please try again or email me at {email}. |
| `contact.form.errors.required` | Completá este campo. | Please fill in this field. |
| `contact.form.errors.too_short` | Escribí al menos {min} caracteres. | Please write at least {min} characters. |
| `contact.form.errors.too_long` | Usá como máximo {max} caracteres. | Please use at most {max} characters. |
| `contact.form.errors.invalid_email` | Ingresá un email válido. | Enter a valid email address. |
| `contact.form.errors.invalid_option` | Elegí un motivo. | Choose a reason. |
| `hero.cv` | Ver mi CV | View my resume |
| `hero.cvNotice` | (PDF, se abre en una pestaña nueva) | (PDF, opens in a new tab) |

- [ ] **Step 10: Write the failing E2E tests** — `tests/e2e/contact.spec.ts`

| test | assertions |
|---|---|
| `shows server-side errors and focuses the first invalid field` | on `/contacto` fill name `'  '`, email `a@b`, reason `Otro`, message ten spaces (these pass the browser's own validation but fail the server's); submit → texts `Completá este campo.` and `Ingresá un email válido.` visible; Nombre has `aria-invalid="true"` and is focused |
| `shows English errors on /en/contacto` | same input → `Please fill in this field.` visible |
| `sends a valid message and shows the thank-you message` | valid input → heading `¡Gracias por escribirme!` visible and focused |
| `works without JavaScript` | `test.use({ javaScriptEnabled: false })`; valid input, submit → `¡Gracias por escribirme!` visible |

- [ ] **Step 11: Implement `ContactForm` and the contact page**

  **`ContactForm`:**
  - `useActionState(sendContactMessage, { status: 'idle' })`.
  - Hidden inputs: `locale`, and the honeypot `website` inside an `aria-hidden` wrapper positioned off-screen, with `tabIndex={-1}` and `autoComplete="off"`.
  - Inputs:
    - HTML attributes come from `contactLimits` (`required`, `minLength`, `maxLength`, `type="email"`).
    - `defaultValue` comes from `state.values`.
    - Errors render via `formatMessage(labels.errors[code], contactLimits[field])`, linked with `aria-describedby`, and the field gets `aria-invalid`.
  - Pending state: the button is disabled and shows `labels.sending`.
  - After a state change:
    - `invalid` → focus the first invalid field;
    - `success` → replace the form with a `tabIndex={-1}` heading (`successTitle`) plus body, and focus the heading;
    - `error` → show a `role="alert"` paragraph with `{email}` = `contactLinks.email` as a `mailto:` link.

  **Contact page:**
  - `h1` `contact.title`, then `contact.intro`.
  - `ButtonLink` to `cvPaths[locale]` labelled `hero.cv`, with `newTabNotice={hero.cvNotice}`.
  - `ContactForm`.

  **`.env.example`:** lists `RESEND_API_KEY=`, `CONTACT_TO_EMAIL=paulakunning@gmail.com`, `CONTACT_FROM_EMAIL=onboarding@resend.dev`, `CONTACT_DRY_RUN=true`, each with a one-line comment.

- [ ] **Step 12: Verify**

  Run: `npm test && npm run test:e2e`. Expected: PASS.

- [ ] **Step 13: Commit and open PR** — `feat: add contact form with server-side validation and Resend delivery`

  The PR body lists Paula's pending setup: create the Resend account, verify `paulakunning.com` in Hostinger DNS, and add the env vars in Vercel. Until then the preview shows the error state on submit, which is expected.

---

### Task 5: Content model and assets

**Prerequisite:** Paula's `~/Dev/portfolio-assets`.

- **Step 1** inventories it against spec §12 and reports gaps to Paula.
- Projects with incomplete data (missing images, link, role, year, summary or body) are **left out** of `projects.ts` and listed in the PR body; they're added when the data arrives. Never invent copy.
- Spanish copy Paula provides is translated to English in the same commit and flagged in the PR for her review.

**Files:**
- Create:
  - `src/content/types.ts`, `src/content/projects.ts`, `src/content/experience.ts`, `src/content/skills.ts`, `src/content/testimonials.ts`, `src/content/about.ts`
  - `src/lib/projects.ts`, `src/lib/dates.ts`
  - `src/assets/**`, `public/cv/*.pdf`, `src/app/icon.svg`
- Modify: `src/content/site.ts` (`contactImage`), `src/app/[lang]/contacto/page.tsx` (render it)
- Test: `src/content/content.test.ts`, `src/lib/projects.test.ts`, `src/lib/dates.test.ts`

**Interfaces:**
- Consumes: `Locale`, `Localized`, `localizePath`.
- Produces, in `src/content/types.ts`:
  - `Category`, `ProjectImage`, `Project` and `Testimonial`, exactly as in spec §4.
  - `type YearMonth = \`${number}-${number}\``
  - `Experience`, as in spec §4 with `start: YearMonth; end?: YearMonth`.
  - `type Skill = { name: string; icon: StaticImageData; learning?: boolean }`
- Produces, as content data:
  - `projects: Project[]`
  - `experience: Experience[]`
  - `skills: Skill[]`
  - `testimonials: Testimonial[]`
  - `aboutPhotos: ProjectImage[]` (3)
  - `contactImage: ProjectImage`
- Produces, in `src/lib/projects.ts`:
  - `type ProjectCardData = { slug: string; name: string; href: string; categories: Category[]; tools: string[]; conceptual: boolean; summary: string; cover: { src: StaticImageData; alt: string } }`
  - `toCardData(project: Project, locale: Locale): ProjectCardData`
  - `filterProjects<T extends { categories: readonly Category[] }>(items: readonly T[], category: Category | 'all', limit?: number): T[]`
  - `getProject(slug: string): Project | undefined`
  - `getNextProject(slug: string, list: readonly Project[] = projects): Project | undefined`
- Produces, in `src/lib/dates.ts`:
  - `formatPeriod(locale: Locale, start: YearMonth, end: YearMonth | undefined, presentLabel: string): string`

- [ ] **Step 1: Inventory**

  1. List `~/Dev/portfolio-assets` and compare it with spec §12.
  2. Send Paula one message listing what's missing.
  3. Continue with what's complete.

- [ ] **Step 2: Assets**

  - **Project images:** copy into `src/assets/projects/{slug}/` as `cover.*`, `1.*`, `2.*`… Downscale anything wider than 2400px with `sips --resampleWidth 2400 <file>`.
  - **Skill icons:** SVGs into `src/assets/skills/{figma,html,css,scss,javascript,typescript,react,php,wordpress,elementor,bricks-builder,woocommerce,nextjs,framer,illustrator,photoshop}.svg`.
    - Existing icons come from paulakunning.com's media library.
    - Missing ones come from the brand's official asset page, or `simple-icons` SVGs (CC0).
  - **About and contact photos:** `src/assets/about/1–3.*` and `src/assets/contact.*`.
  - **CV files:** `public/cv/paula-kunning-cv-es.pdf` and `public/cv/paula-kunning-resume-en.pdf`.
  - **Icon:** `src/app/icon.svg` from Paula's favicon or logo. If neither exists, a 32×32 rounded square filled with `#6D4E68`, to be replaced when she provides one.

- [ ] **Step 3: Write the failing tests**

```ts
// src/lib/dates.test.ts
it.each([
  ['es', '2025-07', undefined, 'Actualidad', 'Julio 2025 — Actualidad'],
  ['en', '2025-07', undefined, 'Present', 'July 2025 — Present'],
  ['es', '2023-03', '2025-07', 'Actualidad', 'Marzo 2023 — Julio 2025'],
  ['en', '2023-03', '2025-07', 'Present', 'March 2023 — July 2025'],
] as const)('%s %s–%s', (locale, start, end, present, expected) => {
  expect(formatPeriod(locale, start, end, present)).toBe(expected)
})
```

`src/lib/projects.test.ts`. It uses a fixture list `a(web-design)`, `b(branding)`, `c(web-design, web-development)`, `d(web-development)`, … up to `h`, so content changes never break it:

| test | assertion |
|---|---|
| `returns everything for "all"` | `filterProjects(list, 'all')` equals `list` |
| `filters by category keeping order` | `'web-design'` → slugs `['a', 'c', …]` in list order |
| `applies the limit after filtering` | `filterProjects(list, 'all', 6)` has length 6 and starts with `a` |
| `ignores a limit larger than the result` | `filterProjects(list, 'branding', 6)` returns all branding items |
| `getNextProject returns the following project` | `getNextProject('a', list)?.slug === 'b'` |
| `getNextProject wraps from last to first` | `getNextProject('h', list)?.slug === 'a'` |
| `getNextProject returns undefined for unknown slugs` | `getNextProject('nope', list)` is `undefined` |
| `toCardData localizes text and builds the href` | for `en`: `summary === project.summary.en`, `cover.alt === project.cover.alt.en`, `href === '/en/proyectos/' + slug` |

`src/content/content.test.ts`, against the real data:

| test | assertion |
|---|---|
| `project slugs are unique kebab-case` | match `/^[a-z0-9]+(-[a-z0-9]+)*$/`; `new Set(slugs).size === slugs.length` |
| `projects keep the spec order` | first slug `don-higinio`; last slug `lucrecia-cornaglia`; the relative order of present slugs matches spec §4 |
| `every project is complete in both languages` | categories ≥ 1; gallery length 2–4; `link.url` starts with `https://`; `summary`, `role`, `cover.alt` and every gallery `alt` are non-empty in `es` and `en`; `body.es` and `body.en` have ≥ 1 paragraph |
| `only Next.js and Framer are marked as learning` | the names with `learning` equal `['Next.js', 'Framer']` |
| `skills end with Illustrator and Photoshop` | the last two names are `Adobe Illustrator`, `Adobe Photoshop` |
| `experience matches the CV` | Aster Estudio has `start: '2025-07'` and no `end`; Canal Cero has `start: '2023-03'`, `end: '2025-07'` |

  Run: `npm test`. Expected: FAIL.

- [ ] **Step 4: Implement `dates.ts` and `projects.ts`**

  - `formatPeriod`:
    - format the month and year with `Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).formatToParts`;
    - build the date with `Date.UTC(y, m - 1, 1)`;
    - output is the capitalized month, a space, the year, then ` — ` and the end date or `presentLabel`.

- [ ] **Step 5: Fill the content files**

  - **Projects:** follow the order and the data in spec §4. The four summaries are verbatim from the spec; everything else comes from Paula.
  - **Experience:**
    - Aster Estudio's description ES is verbatim from the spec. EN: "I design and build websites and landing pages for clients, from Figma to WordPress. I work directly with clients, handle maintenance, and take on visual identity projects when needed."
    - Canal Cero highlights are taken verbatim from the CV, translated for EN.
  - **Testimonials:** quotes are verbatim ES from the spec; `role` is the client company.
    - Ana Fernández EN: "She stood out for her professionalism, creativity, commitment and attention to every detail throughout the process."
    - Andrés Tiberti EN: "She is very responsible with agreed deadlines, always attentive to detail, and consistently looks to add value."
    - The Upwork review comes from Paula.
  - **Skills:** spec §4 order, with display names: Figma, HTML, CSS, SCSS, JavaScript, TypeScript, React, PHP, WordPress, Elementor, Bricks Builder, WooCommerce, Next.js, Framer, Adobe Illustrator, Adobe Photoshop.
  - **Contact page:** render `contactImage` with `next/image` and `sizes` set.

- [ ] **Step 6: Verify**

  Run: `npm test && npm run typecheck && npm run test:e2e`. Expected: PASS.

- [ ] **Step 7: Commit and open PR** — `feat: add typed content, assets and project helpers`

  The PR body lists:
  - projects left out and why;
  - the EN translations for Paula to review;
  - testimonials whose permission is still pending.

---

### Task 6: Projects list and detail pages

**Files:**
- Create:
  - `src/components/ProjectCard.tsx`, `src/components/ProjectFilter.tsx`
  - `src/components/ProjectFacts.tsx`, `src/components/ProjectGallery.tsx`, `src/components/ProjectNav.tsx`
  - `src/components/ContactCta.tsx`
  - `src/app/[lang]/proyectos/[slug]/page.tsx`
  - `tests/e2e/projects.spec.ts`
- Modify:
  - `src/app/[lang]/proyectos/page.tsx`
  - both dictionaries
  - `tests/e2e/pages.ts`: add `/proyectos/don-higinio` and `/en/proyectos/don-higinio`

**Interfaces:**
- Consumes: `ProjectCardData`, `toCardData`, `filterProjects`, `getProject`, `getNextProject`, `projects`, `pageMetadata`, `ButtonLink`, `formatMessage`.
- Produces:
  - `ProjectFilter(props: { locale: Locale; projects: ProjectCardData[]; labels: Dictionary['projects']; limit?: number })` (`'use client'`)
  - `ContactCta(props: { locale: Locale; labels: Dictionary['cta'] })`, reused by the home page in Task 7.

- [ ] **Step 1: Add copy (verbatim)**

| key | es | en |
|---|---|---|
| `projects.filterLabel` | Filtrar proyectos por categoría | Filter projects by category |
| `projects.all` | Todos | All |
| `projects.categories.web-design` | Diseño web | Web design |
| `projects.categories.web-development` | Desarrollo web | Web development |
| `projects.categories.branding` | Branding | Branding |
| `projects.count.one` | {count} proyecto | {count} project |
| `projects.count.other` | {count} proyectos | {count} projects |
| `projects.conceptual` | Conceptual | Concept |
| `projects.detail.role` | Rol | Role |
| `projects.detail.year` | Año | Year |
| `projects.detail.services` | Servicios | Services |
| `projects.detail.tools` | Herramientas | Tools |
| `projects.detail.links.live` | Ir a la web | Visit site |
| `projects.detail.links.behance` | Ver en Behance | View on Behance |
| `projects.detail.back` | Volver a proyectos | Back to projects |
| `projects.detail.next` | Siguiente proyecto | Next project |
| `cta.title` | ¿Tenés una idea en mente? Me encantaría hacerla realidad | Have an idea in mind? I'd love to bring it to life |
| `cta.availability` | Busco un puesto remoto como diseñadora web o desarrolladora WordPress / front-end, y también tomo proyectos freelance. | I'm looking for a remote role as a web designer or WordPress / front-end developer, and I also take on freelance projects. |
| `cta.button` | Hablemos | Let's talk |

- [ ] **Step 2: Write the failing E2E tests** — `tests/e2e/projects.spec.ts`

| test | assertions |
|---|---|
| `filters projects by category and marks the active tab` | on `/proyectos` click button `Branding` → it has `aria-pressed="true"`, `Todos` has `"false"`; card headings are exactly `Uniform`, `Lucrecia Cornaglia`; status text `2 proyectos` |
| `opens a project and walks to the next one` | click card `Don Higinio` → URL `/proyectos/don-higinio`, h1 `Don Higinio`; click the next-project link (contains `Factchequeado Lab`) → `/proyectos/factchequeado-lab`; click `Volver a proyectos` → `/proyectos` |
| `wraps from the last project to the first` | `/proyectos/lucrecia-cornaglia` → next-project link → `/proyectos/don-higinio` |
| `shows conceptual projects as such` | `/proyectos/uniform` shows text `Conceptual` |
| `shows a localized 404 for unknown slugs` | `/proyectos/no-existe` → status 404, h1 `Página no encontrada`; `/en/proyectos/nope` → status 404, h1 `Page not found` |
| `keeps the project when switching language` | on `/proyectos/arqci` click `Ver esta página en inglés` → `/en/proyectos/arqci`, h1 `ARQCI` |
| `links out to the live site or Behance in a new tab` | on `/proyectos/don-higinio` link `Ir a la web` has `target="_blank"` and the project's URL |

  Run: `npm run test:e2e -- projects`. Expected: FAIL.

- [ ] **Step 3: Implement**

  - **`ProjectCard`:**
    - Shared component, no `'use client'`.
    - Contents: cover image (`sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"`), `h3` with the project name linking to `href` (stretched-link pattern so the whole card is clickable), summary, category and tool tags, and the `Conceptual` badge.
  - **`ProjectFilter`:**
    - State is `Category | 'all'`, default `'all'`.
    - Buttons sit inside `role="group"` with `aria-label={labels.filterLabel}` and carry `aria-pressed`.
    - An `aria-live="polite"` status shows `formatMessage(labels.count[new Intl.PluralRules(locale).select(n)], { count: n })`.
    - Grid: 1 column, `md:` 2, `lg:` 3. Results come from `filterProjects(projects, category, limit)`.
  - **`/proyectos`:** `h1` `projects.title`, then `ProjectFilter` with all projects, then `ContactCta` (title, availability, `ButtonLink` `cta.button` → `localizePath(locale, '/contacto')`).
  - **Missing projects:** if a project these tests name (Don Higinio, Factchequeado Lab, ARQCI, Uniform, Lucrecia Cornaglia) was left out in Task 5, point the test at a present project with the same property and note it in the PR.
  - **Detail page:**
    - `generateStaticParams` returns `projects.map(({ slug }) => ({ slug }))`. Don't set `dynamicParams`; unknown slugs call `notFound()` so the localized 404 renders.
    - `generateMetadata`: `pageMetadata` with `title: project.name`, `description: summary[locale]` and `openGraph.images: [project.cover.src.src]`.
    - Layout, in spec §5 order:
      1. cover image with `fetchPriority="high"`
      2. `h1` and the conceptual badge
      3. summary
      4. `ProjectFacts` (a `<dl>` with role, year, services from category labels, and tools)
      5. body paragraphs
      6. `ProjectGallery`
      7. external `ButtonLink` with `common.newTab`
      8. `ProjectNav`: back link plus "Siguiente proyecto: {name}" with decorative `aria-hidden` arrows
      9. `ContactCta`

- [ ] **Step 4: Verify**

  Run: `npm test && npm run test:e2e`. Expected: PASS, including axe and the 360px check on the new detail pages.

- [ ] **Step 5: Commit and open PR** — `feat: add projects page with filters and project detail pages`

---

### Task 7: Home page

**Files:**
- Create:
  - `src/components/Hero.tsx`, `src/components/FeaturedProjects.tsx`
  - `src/components/ExperienceList.tsx`, `src/components/SkillsGrid.tsx`
  - `src/components/About.tsx`, `src/components/Testimonials.tsx`
  - `tests/e2e/home.spec.ts`
- Modify: `src/app/[lang]/page.tsx`, both dictionaries

**Interfaces:**
- Consumes:
  - `ProjectFilter` (with `limit={6}`), `ContactCta`, `toCardData`, `formatPeriod`, `ButtonLink`
  - content: `experience`, `skills`, `testimonials`, `aboutPhotos`, `cvPaths`

- [ ] **Step 1: Add copy (verbatim)**

| key | es | en |
|---|---|---|
| `hero.subtitle` | Diseño en Figma y lo desarrollo: sitios responsive que se ven bien y funcionan. | I design in Figma and build it in WordPress and code: responsive sites that look good and work. |
| `hero.availability` | Disponible para trabajo remoto de tiempo completo y proyectos freelance | Available for full-time remote work and freelance projects |
| `featured.title` | Proyectos destacados | Featured projects |
| `featured.viewAll` | Ver todos los proyectos | View all projects |
| `experience.title` | Experiencia | Experience |
| `experience.present` | Actualidad | Present |
| `skills.title` | Habilidades | Skills |
| `skills.learning` | Aprendiendo | Learning |
| `about.title` | Hola, soy Paula | Hi, I'm Paula |
| `about.paragraphs` | the four ES paragraphs in spec §4 | the four EN paragraphs in spec §4 |
| `testimonials.title` | Testimonios | Testimonials |

- [ ] **Step 2: Write the failing E2E tests** — `tests/e2e/home.spec.ts`

| test | assertions |
|---|---|
| `renders the home sections in order` | on `/` the `h2` texts, in order, are `Proyectos destacados`, `Experiencia`, `Habilidades`, `Hola, soy Paula`, `Testimonios`, `¿Tenés una idea en mente? Me encantaría hacerla realidad`, `Estemos en contacto` |
| `links the CV for each language` | on `/` link `Ver mi CV` has href `/cv/paula-kunning-cv-es.pdf`; on `/en` link `View my resume` has href `/cv/paula-kunning-resume-en.pdf`; `request.get` of each returns 200 |
| `shows at most six featured projects` | ≤ 6 project cards; link `Ver todos los proyectos` → `/proyectos` |
| `formats experience periods` | text `Julio 2025 — Actualidad` and `Marzo 2023 — Julio 2025` visible; on `/en`, `July 2025 — Present` |
| `marks skills that are still being learned` | the `Next.js` and `Framer` items contain `Aprendiendo`; `Figma` does not |

  Run: `npm run test:e2e -- home`. Expected: FAIL.

- [ ] **Step 3: Implement**

  Sections in spec §5 order, each a `<section aria-labelledby>` with its `h2`:
  - **`Hero`:** `h1` + subtitle + availability badge, then `ButtonLink` `nav.cta` → contact and `ButtonLink` `hero.cv` → `cvPaths[locale]` with `newTabNotice={hero.cvNotice}`.
  - **`FeaturedProjects`:** `ProjectFilter` with `limit={6}`, then a `featured.viewAll` link.
  - **`ExperienceList`:** a list with company, role, the `formatPeriod(...)` text, and the description or highlights.
  - **`SkillsGrid`:** a `<ul>` of icon (`alt=""`, since the name is visible text) + name + optional learning badge.
  - **`About`:** paragraphs + a strip of 3 photos (`sizes` set; no `fetchPriority`).
  - **`Testimonials`:** `<figure>` / `<blockquote>` / `<figcaption>` per item.
  - **`ContactCta`.**

- [ ] **Step 4: Visual check against the live site**

  1. With a throwaway Playwright script **in the scratchpad, not the repo**, screenshot paulakunning.com and `localhost:3000` at 390px and 1280px, full page, for `/`, `/proyectos` and `/contacto`.
  2. Compare section by section: spacing, type sizes, colors, alignment.
  3. Fix differences in the components. Intentional changes from the spec (new sections, new copy) are not differences.

- [ ] **Step 5: Verify**

  Run: `npm test && npm run test:e2e`. Expected: PASS.

- [ ] **Step 6: Commit and open PR** — `feat: build home page sections`

  Attach the 390px and 1280px screenshots of the new home to the PR.

---

### Task 8: Open Graph images, sitemap and robots

**Files:**
- Create:
  - `src/app/[lang]/opengraph-image.tsx`
  - `src/app/sitemap.ts`, `src/app/robots.ts`
  - `src/lib/sitemap.ts`
  - `src/assets/fonts/playfair-display-latin-600-normal.woff`, `src/assets/fonts/dm-sans-latin-400-normal.woff`, `src/assets/fonts/OFL.txt`
  - `tests/e2e/seo.spec.ts`
- Test: `src/lib/sitemap.test.ts`

**Interfaces:**
- Consumes: `SITE_URL`, `localizePath`, `locales`, `projects`, `getDictionary`.
- Produces: `buildSitemap(paths: string[]): MetadataRoute.Sitemap`.

- [ ] **Step 1: Write the failing sitemap test**

```ts
it('lists every path in both languages with alternates', () => {
  const entries = buildSitemap(['/', '/proyectos'])
  expect(entries.map((e) => e.url)).toEqual([
    'https://paulakunning.com/', 'https://paulakunning.com/en',
    'https://paulakunning.com/proyectos', 'https://paulakunning.com/en/proyectos',
  ])
  expect(entries[3]?.alternates?.languages).toEqual({
    es: 'https://paulakunning.com/proyectos', en: 'https://paulakunning.com/en/proyectos',
  })
})
```

  Run: `npm test -- sitemap`. Expected: FAIL.

- [ ] **Step 2: Implement**

  - **`buildSitemap`:** implement it, then run `npm test -- sitemap`. Expected: PASS.
  - **`app/sitemap.ts`:** calls `buildSitemap(['/', '/proyectos', '/contacto', ...projects.map((p) => `/proyectos/${p.slug}`)])`.
  - **`app/robots.ts`:** `{ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://paulakunning.com/sitemap.xml' }`.

- [ ] **Step 3: Open Graph image** — `[lang]/opengraph-image.tsx`

  - Exports: `size = { width: 1200, height: 630 }`, `contentType = 'image/png'`, `alt = meta.home.title`.
  - Image:
    - `ImageResponse`, background `#F7F4EF`
    - "Paula Kunning" in Playfair 600, `#6D4E68`
    - `hero.title` in DM Sans, `#2E2A28`
  - Fonts:
    - Read with `readFile(join(process.cwd(), 'src/assets/fonts/…'))`.
    - Download the two `.woff` files once from `https://cdn.jsdelivr.net/npm/@fontsource/<family>@<latest>/files/` (`npm view @fontsource/playfair-display version` gives the version).
    - Add the SIL OFL text as `OFL.txt`.
  - `params` is a Promise in Next 16; await it.

- [ ] **Step 4: Write and run E2E** — `tests/e2e/seo.spec.ts`

| test | assertions |
|---|---|
| `serves the sitemap` | `/sitemap.xml` status 200, body contains `https://paulakunning.com/en/proyectos/don-higinio` |
| `serves robots.txt` | body contains `Sitemap: https://paulakunning.com/sitemap.xml` |
| `exposes a working Open Graph image per language` | on `/` and `/en`: `meta[property="og:image"]` exists; requesting its pathname locally returns 200 with `content-type` `image/png` |
| `uses the cover as the Open Graph image of a project` | on `/proyectos/don-higinio`, `og:image` points to a `/_next/static/media/` asset |

  Run: `npm run test:e2e -- seo`. Expected: PASS.

- [ ] **Step 5: Commit and open PR** — `feat: add Open Graph images, sitemap and robots`

---

### Task 9: README and pre-launch checks

**Files:**
- Create: `README.md` (replace the scaffold's)

- [ ] **Step 1: README (English)**

  1. One-paragraph overview and live URL.
  2. Stack.
  3. Architecture decisions, one short paragraph each:
     - i18n without a library (`[lang]` root layout + proxy rewrite + typed dictionaries)
     - static generation
     - content as typed data
     - Server Action with progressive enhancement and dry-run mode
     - only three client components
  4. Project structure (tree from spec §11).
  5. Getting started:
     - Node 24, `npm ci`
     - `cp .env.example .env.local`
     - `npm run dev`
  6. Scripts table.
  7. Testing (unit, E2E, accessibility).
  8. Deployment (Vercel, env vars).

  No mention of AI tooling.

- [ ] **Step 2: Lighthouse on the production deployment of `main`**

  Use the Vercel project's production URL. Previews may sit behind Vercel's deployment protection.

  1. Run, for `/`, `/proyectos`, `/proyectos/don-higinio` and `/contacto`:
     `npx lighthouse <production-url><path> --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lh.json --quiet`
  2. Read the four category scores. Expected: each ≥ 0.95.
  3. Fix regressions before merging, and put the scores in the PR body.
  4. Delete the `lh.json` files.

- [ ] **Step 3: Manual review**

  Paula reviews the preview on her phone and desktop:
  - both languages
  - every page
  - the form, which needs Resend configured or is expected to show the error state

- [ ] **Step 4: Commit and open PR** — `docs: add project README`

---

### Task 10: Launch

Mostly Paula's dashboard actions. The executor guides each step and verifies it with the commands shown.

- [ ] **Step 1: Resend**

  1. Paula verifies `paulakunning.com` in Resend (DNS in Hostinger).
  2. She sets `RESEND_API_KEY`, `CONTACT_TO_EMAIL=paulakunning@gmail.com` and `CONTACT_FROM_EMAIL=Portfolio <contacto@paulakunning.com>` in Vercel (Production and Preview).
  3. Redeploy.
  4. Verify: send a test message from the preview. Expected: it arrives in Gmail, and "Reply" targets the sender.

- [ ] **Step 2: `.vercel.app` URLs**

  1. On the old project, add `paulakunning-v1.vercel.app` (or a free variant).
  2. Remove `paulakunning.vercel.app` from the old project.
  3. Add `paulakunning.vercel.app` to the new project.
  4. Verify: `curl -sI https://paulakunning.vercel.app/proyectos` → `200`; the v1 URL serves the old site.

- [ ] **Step 3: Domain**

  1. Add `paulakunning.com` and `www.paulakunning.com` in Vercel (`www` redirects to the apex).
  2. In Hostinger DNS, change only the apex `A` record and the `www` `CNAME` to Vercel's values. Nothing else is touched.
  3. Wait for HTTPS.
  4. Verify, expecting the right status codes and pages:
     - `curl -sI https://paulakunning.com/`
     - `/proyectos/` → 308 to `/proyectos`
     - `/en/contacto`
     - `https://www.paulakunning.com` → redirect to the apex
     - `/sitemap.xml`

- [ ] **Step 4: Repo homepage**

  `gh repo edit paulakunning/portfolio --homepage https://paulakunning.com`.

- [ ] **Step 5: Retire WordPress**

  Only after Paula confirms the site works, she cancels the Hostinger hosting plan. The domain is **not** cancelled.
