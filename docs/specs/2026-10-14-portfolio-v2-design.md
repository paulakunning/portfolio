# Portfolio v2 — Spec de diseño

- **Fecha:** 2026-10-14
- **Estado:** en revisión
- **Reemplaza a:** paulakunning.com (WordPress + Elementor en Hostinger)
- **Versión anterior:** [paulakunning/portfolio-v1](https://github.com/paulakunning/portfolio-v1) (archivada)

## 1. Objetivo

Rehacer paulakunning.com en Next.js manteniendo el diseño actual, con estos cambios: textos nuevos, formulario de contacto, páginas de detalle de proyectos, sección de testimonios y lista de habilidades actualizada.

El sitio tiene dos públicos:

- **Clientes freelance:** necesitan ver trabajos reales y contactar fácil.
- **Reclutadores:** buscan perfil de diseñadora web / desarrolladora WordPress y front-end para trabajo remoto. Necesitan entender el perfil en segundos y bajar el CV.

El código también es parte del portfolio: tiene que poder mostrarse y explicarse en una entrevista técnica.

### Criterios de éxito

1. Todas las URLs actuales siguen funcionando: `/`, `/proyectos`, `/contacto` y sus versiones `/en/...`.
2. Lighthouse en mobile ≥ 95 en Performance, Accessibility, Best Practices y SEO, medido en home, proyectos, un detalle y contacto.
3. Cero violaciones de axe en todas las páginas, en los dos idiomas.
4. Sin scroll horizontal ni elementos rotos entre 360px y 1440px de ancho.
5. El formulario entrega un mail real. Si el envío falla, la persona ve una alternativa y no pierde lo que escribió.
6. CI en verde (lint, tipos, unit tests, build, E2E) en cada PR y en `main`.

### Fuera de alcance (por ahora)

- Animaciones de aparición al hacer scroll: fase 2, respetando `prefers-reduced-motion`.
- Sección "Proyectos de código".
- Abrir los proyectos en pop-up con URL propia (intercepting routes). Se puede sumar después sobre las páginas de detalle sin rehacerlas.
- Blog, CMS, analytics, captcha, guardar mensajes en base de datos, Storybook, hooks de pre-commit, tests visuales por capturas.

## 2. Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Lenguaje | TypeScript en modo `strict`, con `noUncheckedIndexedAccess` |
| Estilos | Tailwind CSS 4, con tokens en `globals.css` (`@theme`) |
| Tipografías | `next/font/google`: Playfair Display 600 (títulos) y DM Sans 400/500 (texto) |
| Validación | Zod 4 |
| Mail | Resend |
| Unit tests | Vitest |
| E2E y accesibilidad | Playwright + `@axe-core/playwright` |
| Lint y formato | ESLint (`eslint-config-next`) + Prettier con `prettier-plugin-tailwindcss` |
| Hosting | Vercel |
| CI | GitHub Actions |
| Node / paquetes | Node 24 LTS (`.nvmrc`), npm |

No se usa ninguna librería de i18n: los dos idiomas se resuelven con el ruteo de Next y diccionarios tipados (ver sección 3).

## 3. Rutas e idiomas

### URLs públicas

| Página | Español | Inglés |
|---|---|---|
| Home | `/` | `/en` |
| Proyectos | `/proyectos` | `/en/proyectos` |
| Detalle | `/proyectos/[slug]` | `/en/proyectos/[slug]` |
| Contacto | `/contacto` | `/en/contacto` |

- Los segmentos (`proyectos`, `contacto`) y los slugs son iguales en los dos idiomas. Cambiar de idioma es agregar o quitar `/en` al principio de la ruta, así que siempre se llega a la misma página.
- `/es` y `/es/...` no son públicas: redirigen (308) a la misma ruta sin prefijo para evitar contenido duplicado.
- Las URLs con barra final, como las de WordPress (`/proyectos/`), redirigen a la versión sin barra. Es el comportamiento por defecto de Next.
- Cualquier ruta que no existe muestra una 404 en el idioma que corresponde.

### Implementación

- `src/i18n/config.ts` define `locales = ['es', 'en']`, `defaultLocale = 'es'`, el tipo `Locale` y el guard `isLocale()`.
- `src/proxy.ts` (en Next 16 reemplaza a `middleware.ts`):
  - Si la ruta empieza con `/es`, redirige 308 a la misma ruta sin `/es`.
  - Si no empieza con `/en`, la reescribe internamente a `/es/...`.
  - El matcher excluye `_next`, `api`, archivos con extensión (imágenes, PDFs, `sitemap.xml`, `robots.txt`) y las rutas `opengraph-image`, que se sirven en su ruta interna.
- `src/app/[lang]/layout.tsx` es el root layout:
  - pone `<html lang={lang}>`, carga las fuentes y renderiza el link para saltar al contenido, el header y el footer;
  - exporta `generateStaticParams` (es, en) y valida el idioma con `isLocale`.
  - No se usa `dynamicParams = false`, porque rompería el catch-all de la 404.
- Todas las páginas son estáticas (SSG). El detalle genera sus params a partir de `projects`, y un slug desconocido llama a `notFound()`.
- `src/app/[lang]/[...rest]/page.tsx` llama a `notFound()`, para que las rutas inexistentes usen `src/app/[lang]/not-found.tsx` (404 localizada).
- `not-found.tsx` no recibe params: lee el idioma con `next/root-params` (estable desde Next 16.3).
- `src/i18n/routing.ts` tiene dos helpers puros:
  - `localizePath(locale, path)` devuelve, por ejemplo, `('en', '/contacto')` → `'/en/contacto'`;
  - `switchLocalePath(pathname, targetLocale)` lo usa el selector de idioma.
- Los textos de la interfaz van en `src/i18n/dictionaries/es.ts` y `en.ts`:
  - `es.ts` exporta el objeto y `type Dictionary = typeof es`;
  - `en.ts` se declara como `const en: Dictionary`, así que si falta una clave o sobra una, el build falla;
  - `getDictionary(locale)` devuelve el diccionario que corresponde.

## 4. Contenido

**Regla:**
- Las **listas** (proyectos, experiencia, habilidades, testimonios) van en `src/content/`, con los textos en los dos idiomas dentro de cada ítem.
- Los **textos sueltos** de la interfaz van en los diccionarios.

```ts
type Localized<T = string> = Record<Locale, T>
```

### Proyectos — `src/content/projects.ts`

```ts
type Category = 'web-design' | 'web-development' | 'branding'

type ProjectImage = { src: StaticImageData; alt: Localized }

type Project = {
  slug: string                   // URL: /proyectos/{slug}
  name: string                   // nombre propio, no se traduce
  categories: Category[]         // define en qué pestañas aparece
  tools: string[]                // Figma, WordPress, Bricks Builder…
  conceptual?: boolean           // muestra la etiqueta "Conceptual"
  year: number
  role: Localized
  summary: Localized             // qué hizo Paula, en una línea (tarjeta)
  body: Localized<string[]>      // 1–2 párrafos (detalle)
  cover: ProjectImage            // imagen de la tarjeta y del encabezado del detalle
  gallery: ProjectImage[]        // 2 a 4 imágenes
  link: { type: 'live' | 'behance'; url: string }
}
```

**Reglas:**
- El orden del array es el orden en pantalla.
- "Siguiente proyecto" toma el que sigue en el array; el del último es el primero.

**Etiquetas:**

| Valor | ES | EN |
|---|---|---|
| `web-design` | Diseño web | Web design |
| `web-development` | Desarrollo web | Web development |
| `branding` | Branding | Branding |
| `link.type: 'live'` | Ir a la web | Visit site |
| `link.type: 'behance'` | Ver en Behance | View on Behance |

**Imágenes:**
- Se importan de forma estática desde `src/assets/projects/{slug}/`. Así Next conoce el tamaño (sin saltos de layout) y genera el placeholder borroso.
- Los archivos fuente miden como máximo 2400px de ancho; `next/image` sirve AVIF o WebP.
- Los originales quedan en `~/Dev/portfolio-assets`, fuera del repo.

**Lista inicial, en este orden:**

| # | slug | Nombre | Categorías | Herramientas | Link |
|---|---|---|---|---|---|
| 1 | `don-higinio` | Don Higinio | web-design, web-development | Figma, WordPress | live |
| 2 | `factchequeado-lab` | Factchequeado Lab | web-design, web-development | Figma, WordPress | live |
| 3 | `tecnofast-peru` | Tecnofast Perú | web-development | Bricks Builder | live |
| 4 | `gea-logistics` | GEA Logistics | web-development | WordPress | live |
| 5 | `javier-carrizo` | Javier Carrizo | web-development | WordPress | live |
| 6 | `arqci` | ARQCI | web-development | WordPress | live |
| 7 | `maraton-de-rio` | Maratón de Río | a confirmar | a confirmar | a confirmar |
| 8 | `friosur` | Friosur | a confirmar | a confirmar | a confirmar |
| 9 | `aeropuerto-el-loa` | Aeropuerto El Loa | a confirmar | a confirmar | a confirmar |
| 10 | según el nombre | Sitio de coaching | a confirmar | a confirmar | a confirmar |
| 11 | `dede-digital` | DéDé Digital | web-design | Figma | behance |
| 12 | `amanda-wellness-coach` | Amanda Wellness Coach (conceptual) | web-design | Figma | behance |
| 13 | `uniform` | Uniform (conceptual) | branding, web-design | Adobe Illustrator, Figma | behance |
| 14 | `lucrecia-cornaglia` | Lucrecia Cornaglia | branding | Adobe Illustrator | behance |

**Resúmenes ya definidos (ES / EN):**

- **Don Higinio:** "Sitio corporativo para una distribuidora mayorista. Diseño de interfaz en Figma y desarrollo en WordPress." / "Corporate site for a wholesale distributor. UI design in Figma and WordPress development."
- **Factchequeado Lab:** "Landing para un laboratorio de divulgación sobre IA. Diseño en Figma y desarrollo en WordPress, con contenido administrable por el equipo del cliente." / "Landing page for an AI information lab. Figma design and WordPress development, with content managed by the client's team."
- **Tecnofast Perú:** "Sitio corporativo rehecho en Bricks Builder, con un cotizador desarrollado a medida." / "Corporate site rebuilt in Bricks Builder, with a custom-built quote calculator."
- **GEA Logistics:** "Sitio B2B de logística. Desarrollo a partir del diseño del cliente y mantenimiento continuo." / "B2B logistics site. Development from the client's design, plus ongoing maintenance."

### Experiencia — `src/content/experience.ts`

```ts
type Experience = {
  company: string
  role: Localized
  start: `${number}-${number}`        // 'YYYY-MM'
  end?: `${number}-${number}`         // sin `end` = actualidad
  description?: Localized
  highlights?: Localized<string[]>
}
```

**Formato de los períodos:**
- Se muestran como "Julio 2025 — Actualidad" o "July 2025 — Present".
- Los arma `formatPeriod(locale, start, end?)` en `src/lib/dates.ts`, con `Intl.DateTimeFormat` (mes con mayúscula inicial y año, sin "de").

**Entradas:**

1. **Aster Estudio**
   - **Rol:** Diseñadora y Desarrolladora Web Freelance / Freelance Web Designer & Developer
   - **Período:** `2025-07` en adelante
   - **Descripción:** "Diseño y desarrollo sitios web y landing pages para clientes, de Figma a WordPress. Trabajo directo con clientes, mantenimiento, y proyectos de identidad visual cuando hace falta." (la versión en inglés la traduce Claude y la revisa Paula)
2. **Canal Cero**
   - **Rol:** Desarrolladora Web (WordPress y Front-End) / Web Developer (WordPress & Front-End)
   - **Período:** `2023-03` a `2025-07`
   - **Highlights:** los mismos bullets del CV, incluido Tecnofast

### Habilidades — `src/content/skills.ts`

```ts
type Skill = { name: string; icon: StaticImageData; learning?: boolean }
```

**Orden:**
- Figma, HTML, CSS, SCSS, JavaScript, TypeScript, React, PHP, WordPress, Elementor, Bricks Builder, WooCommerce
- Next.js (aprendiendo), Framer (aprendiendo)
- Adobe Illustrator, Adobe Photoshop

**Íconos:**
- Son SVG en `src/assets/skills/`.
- Los que ya existen salen del sitio actual; los que faltan, de los recursos oficiales de cada marca.
- `learning: true` muestra la etiqueta "Aprendiendo" / "Learning".

### Testimonios — `src/content/testimonials.ts`

```ts
type Testimonial = { quote: Localized; author: string; role: Localized }
```

**Entradas:**
1. **Ana Fernández, Don Higinio:** "Se destacó por su profesionalismo, creatividad, compromiso y atención a cada detalle durante el proceso."
2. **Andrés Tiberti, GEA Logistics:** "Es una persona muy responsable con los plazos acordados, siempre atenta a los detalles y con una actitud constante de aportar valor."
3. **Reseña de 5 estrellas del cliente de Upwork.**

Paula confirma el permiso de cada persona antes de publicar.

### Textos de la interfaz (diccionarios)

**Metadatos del home:**

| | Título | Descripción |
|---|---|---|
| ES | Paula Kunning — Diseñadora Web y Desarrolladora WordPress / Front-End | Diseño sitios web en Figma y los desarrollo en WordPress y código. Portfolio de Paula Kunning, Córdoba, Argentina. Disponible para trabajo remoto. |
| EN | Paula Kunning — Web Designer & WordPress / Front-End Developer | I design websites in Figma and build them in WordPress and code. Portfolio of Paula Kunning, Argentina. Available for remote work. |

**Metadatos de las demás páginas:**
- Usan la plantilla `%s — Paula Kunning`: Proyectos / Projects, Contacto / Contact, y el nombre del proyecto en cada detalle.

**Hero:**
- **Título:**
  - ES: "Diseñadora Web y Desarrolladora WordPress / Front-End"
  - EN: "Web Designer & WordPress / Front-End Developer"
- **Subtítulo:**
  - ES: "Diseño en Figma y lo desarrollo: sitios responsive que se ven bien y funcionan."
  - EN: "I design in Figma and build it in WordPress and code: responsive sites that look good and work."
- **Disponibilidad:**
  - ES: "Disponible para trabajo remoto de tiempo completo y proyectos freelance"
  - EN: "Available for full-time remote work and freelance projects"

**Sobre mí:** el título es "Hola, soy Paula" / "Hi, I'm Paula". Los párrafos van textuales:

- **ES:**
  1. "Diseño sitios web en Figma y los llevo a la realidad en WordPress y código, así que lo que se diseña es lo que se publica."
  2. "Tengo más de 3 años de experiencia: trabajé 2 años y medio en una agencia de marketing digital desarrollando sitios corporativos, y hoy tomo proyectos freelance que combinan diseño y desarrollo."
  3. "Antes de dedicarme a esto fui contadora pública. Cambié de carrera en 2022, y esa mirada de negocio, ordenada y atenta al detalle sigue presente en cada proyecto."
  4. "Hoy estoy profundizando en React, Next.js y TypeScript, y aprendiendo Framer. Vivo en Córdoba, Argentina, y trabajo en remoto en español e inglés."
- **EN:**
  1. "I design websites in Figma and build them in WordPress and code, so what gets designed is what ships."
  2. "I have 3+ years of experience: I spent 2.5 years at a digital marketing agency building corporate sites, and I now take freelance projects that combine design and development."
  3. "Before this I was a public accountant. I changed careers in 2022, and that business mindset, organized and detail-oriented, shows up in every project."
  4. "I'm currently going deeper into React, Next.js and TypeScript, and learning Framer. I live in Córdoba, Argentina, and work remotely in English and Spanish."

**Cierre:**
- **Título:** "¿Tenés una idea en mente? Me encantaría hacerla realidad"
- **Línea de disponibilidad:** "Busco un puesto remoto como diseñadora web o desarrolladora WordPress / front-end, y también tomo proyectos freelance."
- La versión en inglés la traduce Claude.

**Contacto:** se mantienen los textos actuales:
- "¿Tenés un proyecto en mente?"
- "Si sentís que podemos crear algo juntos, me encantaría conocer tu idea."
- "Estemos en contacto"

La versión en inglés la traduce Claude.

**Página de proyectos:** el título actual es "Some work I enjoyed making" (en inglés también en la versión ES). Se mantiene salvo que Paula indique otro.

**Regla para todo lo nuevo en inglés:** lo traduce Claude y lo revisa Paula antes del lanzamiento.

### Links y archivos

**Links:**

| Destino | URL |
|---|---|
| Email | `paulakunning@gmail.com` (visible en el footer y como alternativa si falla el formulario) |
| LinkedIn | https://www.linkedin.com/in/paula-kunning/ |
| Behance | https://www.behance.net/paulakunning |
| GitHub | https://github.com/paulakunning |

**Archivos:**
- **CV en español:** `public/cv/paula-kunning-cv-es.pdf`, enlazado desde `/`.
- **Resume en inglés:** `public/cv/paula-kunning-resume-en.pdf`, enlazado desde `/en`.
- Los nombres son descriptivos porque son los que ve quien los descarga.

## 5. Páginas y componentes

### Layout (todas las páginas)

**Link para saltar al contenido:** "Ir al contenido" / "Skip to content", visible al recibir foco.

**Header:**
- Logo, que lleva al home del idioma actual.
- Proyectos y Contacto.
- Selector de idioma: muestra "EN" en español y "ES" en inglés.
- Botón "Hablemos", que lleva a `/contacto`.

**Menú mobile:**
- Es un botón con `aria-expanded` y `aria-controls`.
- Se cierra con Escape y al navegar, y el foco vuelve al botón.

**Footer:**
- Mail, LinkedIn, Behance y GitHub.

### Home — `/`

Cada página tiene un único `h1`: en el home es el título del hero. El sitio actual no tiene ninguno.

1. **Hero:**
   - título (`h1`), subtítulo y etiqueta de disponibilidad;
   - "Hablemos", que lleva a `/contacto`;
   - "Ver mi CV", que abre el PDF del idioma en una pestaña nueva y lo indica en un texto oculto para lectores de pantalla.
2. **Proyectos destacados:**
   - pestañas Todos / Diseño web / Desarrollo web / Branding;
   - muestra los primeros 6 proyectos de la pestaña activa;
   - termina con "Ver todos los proyectos".
3. **Experiencia.**
4. **Habilidades:** grilla de íconos con la etiqueta "Aprendiendo" donde corresponde.
5. **Sobre mí:** texto y tira de 3 fotos.
6. **Testimonios.**
7. **Cierre:** título, línea de disponibilidad y "Hablemos".

### Proyectos — `/proyectos`

- Título (`h1`), pestañas y grilla con los 14 proyectos, cierre y footer.

### Detalle — `/proyectos/[slug]`

**Contenido, en orden:**
1. Imagen de portada.
2. Nombre (`h1`) y etiqueta "Conceptual" si corresponde.
3. Resumen.
4. Fila de datos: Rol, Año, Servicios (las categorías traducidas) y Herramientas.
5. Párrafos.
6. Galería de 2 a 4 imágenes.
7. Botón externo "Ir a la web" o "Ver en Behance" (pestaña nueva, indicado).

**Al final:**
- "← Volver a proyectos".
- "Siguiente proyecto: {nombre} →".

### Contacto — `/contacto`

- Título (`h1`) y texto.
- "Ver mi CV".
- El formulario (sección 7).
- Imagen.
- "Estemos en contacto", con los links.

### Componentes

**Corren en el navegador (`'use client'`), solo estos tres:**
- `SiteNav`: links del header, selector de idioma y menú mobile. Necesita la URL actual, que solo existe en el navegador.
- `ProjectFilter`
- `ContactForm`

**Todo lo demás son Server Components:**
- **Layout:** `Header`, `Footer`.
- **Home:** `Hero`, `FeaturedProjects`, `ExperienceList`, `SkillsGrid`, `About`, `Testimonials`, `ContactCta`.
- **Proyectos:** `ProjectCard`, `ProjectFacts`, `ProjectGallery`, `ProjectNav`.
- **Compartido:** `ButtonLink` (variantes `primary` y `secondary`, interno o externo). Se usa en todo el sitio; no se crean más abstracciones de UI hasta que se repitan.

### Pestañas — `ProjectFilter`

**Datos:**
- Recibe la lista de proyectos ya traducida al idioma de la página.
- `filterProjects(projects, category, limit?)` es una función pura en `src/lib/projects.ts`, junto a `getProject(slug)` y `getNextProject(slug)`.

**Accesibilidad:**
- Es un grupo de botones (`role="group"` con `aria-label`), y el activo lleva `aria-pressed="true"`.
- Una región `aria-live="polite"` anuncia la cantidad de resultados.

**SEO:** el HTML que se genera de antemano incluye la pestaña "Todos" con todos los proyectos, así que el contenido es indexable sin JavaScript.

### Responsive

- Mobile-first con los breakpoints de Tailwind (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).
- **Grilla de proyectos:** 1 columna en mobile, 2 desde `md`, 3 desde `lg`.
- **Referencia visual:** capturas de paulakunning.com a 390px y 1280px para cada sección. La versión nueva se compara contra ellas.

## 6. Tokens de diseño

Se definen en `src/app/globals.css` con `@theme` de Tailwind 4.

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#F7F4EF` | fondo general |
| `--color-foreground` | `#2E2A28` | texto (12.95:1 sobre el fondo) |
| `--color-primary` | `#6D4E68` | títulos destacados, links, botones (6.51:1 sobre el fondo) |
| `--color-secondary` | `#B79BB8` | solo fondos, bordes y decoración (2.28:1, no apto para texto) |
| `--color-accent` | `#D7B6B6` | solo fondos, bordes y decoración (1.7:1, no apto para texto) |
| `--font-serif` | Playfair Display 600 | títulos |
| `--font-sans` | DM Sans 400 / 500 | texto, botones, interfaz |

**Reglas de contraste:**
- El texto sobre `secondary` o `accent` va en `foreground` (5.68:1 y 7.62:1).
- El texto sobre `primary` va en `background` (6.51:1).
- El foco es siempre visible: `outline` en `primary` con separación.

## 7. Formulario de contacto

### Campos y validación

Schema Zod en `src/lib/contact/schema.ts`:

| Campo | `name` | Reglas |
|---|---|---|
| Nombre | `name` | texto, sin espacios sobrantes, 2–100 caracteres |
| Email | `email` | email válido, ≤ 254 caracteres |
| Motivo | `reason` | `'job' \| 'freelance' \| 'other'` (Propuesta laboral / Proyecto freelance / Otro) |
| Mensaje | `message` | texto, sin espacios sobrantes, 10–5000 caracteres |
| Trampa | `website` | oculto para personas (fuera de pantalla, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden`); tiene que llegar vacío |

**Validación en dos niveles:**
- **En el navegador:** atributos HTML (`required`, `type="email"`, `minLength`, `maxLength`) para dar aviso inmediato.
- **En el servidor:** el schema es la fuente de verdad.

Los errores del schema son códigos (`too_short`, `invalid_email`…) que se traducen con el diccionario.

### Flujo

**Componentes:**
- **Server Action:** `sendContactMessage(prevState, formData)` en `src/app/[lang]/contacto/actions.ts`. El idioma llega como campo oculto.
- **`ContactForm`:** usa `useActionState`. Funciona sin JavaScript con un envío nativo del formulario.

**Estado que devuelve la acción:**

```ts
type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'invalid'; fieldErrors: Partial<Record<ContactField, ErrorCode>>; values: ContactValues }
  | { status: 'error'; values: ContactValues }
```

**Pasos:**
1. Si `website` tiene contenido, devuelve `success` sin enviar nada.
2. Valida con el schema. Si falla, devuelve `invalid` con los errores y los valores cargados.
3. Envía con `sendContactEmail()` (`src/lib/contact/send-email.ts`, la única pieza que conoce a Resend):
   - **from:** `CONTACT_FROM_EMAIL`
   - **to:** `CONTACT_TO_EMAIL`
   - **replyTo:** el email de la persona
   - **subject:** `[Portfolio] {Motivo} — {Nombre}`
   - **cuerpo:** **solo texto plano** (nombre, email, motivo, mensaje, idioma, fecha), nunca HTML armado con lo que escribió la persona
4. Si Resend falla o falta la configuración, registra el error en el servidor y devuelve `error` con los valores.

**Lo que ve la persona:**
- **Mientras se envía:** el botón queda deshabilitado y dice "Enviando…" / "Sending…".
- **`success`:** el formulario se reemplaza por un mensaje de agradecimiento que recibe el foco (`tabIndex={-1}`) y se anuncia.
- **`invalid`:**
  - mensaje debajo de cada campo con error, enlazado con `aria-describedby`, y `aria-invalid` en el campo;
  - el foco pasa al primer campo con error.
- **`error`:** mensaje con el mail de Paula como alternativa. Los campos conservan lo que la persona escribió.

### Configuración

**Variables de entorno** (documentadas en `.env.example`, cargadas en Vercel, nunca en el código):

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | clave de Resend |
| `CONTACT_TO_EMAIL` | `paulakunning@gmail.com` |
| `CONTACT_FROM_EMAIL` | `Portfolio <contacto@paulakunning.com>`; mientras el dominio no esté verificado, `onboarding@resend.dev` |
| `CONTACT_DRY_RUN` | `true` en desarrollo y E2E: no envía, escribe el mail en la consola y devuelve `success`. Nunca se define en Vercel |

**Resend:**
- **Cuenta y dominio:** Paula crea la cuenta y agrega `paulakunning.com`, que pide registros DNS (SPF y DKIM) en Hostinger. No afectan a la web ni al mail.
- **Mientras se verifica el dominio:** Resend permite enviar desde `onboarding@resend.dev` al mail de la dueña de la cuenta, que alcanza para desarrollar.

**Anti-spam:** el campo trampa. Si llega spam, se suma Cloudflare Turnstile en una iteración aparte.

## 8. SEO

**Metadata API:**
- `metadataBase: https://paulakunning.com`.
- Título y descripción por página e idioma (sección 4).
- `alternates.canonical`.
- `alternates.languages` con `es`, `en` y `x-default` (que apunta a la versión ES).
- **Open Graph:** título, descripción, `locale` (`es_AR` / `en_US`) e imagen.
- **Twitter:** `summary_large_image`.

**Imagen para compartir:**
- **General:** `src/app/[lang]/opengraph-image.tsx` la genera con `ImageResponse` (nombre, título, paleta y fuentes) para cada idioma.
- **Detalle:** cada página usa la portada del proyecto.

**Archivos y metadatos generados:**
- **`src/app/sitemap.ts`:** todas las páginas en los dos idiomas, con sus alternativas.
- **`src/app/robots.ts`:** permite todo y apunta al sitemap.
- **Favicon:** `src/app/icon.svg`, a partir del favicon o logo de Paula.
- **Imagen principal (LCP):** la de cada página que tenga una lleva `fetchPriority="high"`. `priority` está deprecado en Next 16.

## 9. Calidad y testing

### Unit tests (Vitest)

| Archivo | Qué verifica |
|---|---|
| `src/lib/contact/schema.test.ts` | datos válidos, cada regla de cada campo, recorte de espacios |
| `src/app/[lang]/contacto/actions.test.ts` | con `sendContactEmail` simulado: éxito, datos inválidos (no envía), trampa (no envía, devuelve éxito), fallo de Resend (devuelve `error` con valores), dry run |
| `src/content/content.test.ts` | slugs únicos con formato `kebab-case`, al menos una categoría, galería de 2 a 4 imágenes, URLs `https` |
| `src/lib/projects.test.ts` | `filterProjects` (por categoría y con límite), `getNextProject` (incluida la vuelta al primero), `getProject` con slug inexistente |
| `src/i18n/routing.test.ts` | `localizePath` y `switchLocalePath` en home, páginas y detalle, en los dos sentidos |
| `src/lib/dates.test.ts` | `formatPeriod` en ES y EN, con y sin fecha de fin |

### E2E (Playwright)

Corren contra el build de producción con `CONTACT_DRY_RUN=true`, en dos proyectos: mobile (390px) y desktop (1280px).

| Archivo | Recorrido |
|---|---|
| `tests/e2e/navigation.spec.ts` | las 4 páginas cargan en ES y EN; el selector de idioma conserva la página; `/es/proyectos` redirige a `/proyectos`; una ruta inexistente muestra la 404 localizada; el menú mobile abre, navega y se cierra con Escape |
| `tests/e2e/projects.spec.ts` | las pestañas filtran y marcan la activa; una tarjeta lleva a su detalle; "Siguiente proyecto" y "Volver a proyectos" funcionan |
| `tests/e2e/contact.spec.ts` | envío vacío muestra errores y enfoca el primero; envío válido muestra el agradecimiento |
| `tests/e2e/a11y.spec.ts` | axe sin violaciones en las 4 páginas (un detalle), en los dos idiomas |

### Otras verificaciones

**Antes de lanzar:**
- Lighthouse manual en mobile sobre la URL de producción de Vercel, con el objetivo de la sección 1.
- Revisión visual a 360, 768 y 1280px contra las capturas del sitio actual.

### CI — `.github/workflows/ci.yml`

**Cuándo corre:** en cada push y PR.

**Pasos, en orden:**
1. `npm ci`
2. `lint`
3. `typecheck` (`tsc --noEmit`)
4. `test` (Vitest)
5. `build`
6. instalar Chromium de Playwright
7. `test:e2e`

### Forma de trabajo

**Ramas y PRs:**
- Una rama por funcionalidad, con PR hacia `main`.
- Vercel crea un preview por PR.
- Paula revisa y mergea.

**Commits:**
- Chicos, con formato Conventional Commits (`feat:`, `fix:`, `docs:`…).
- Sin líneas de atribución a herramientas.

**Idioma:**
- El código, los commits y el `README.md` van en inglés.
- El README cuenta qué es el proyecto, el stack, las decisiones de arquitectura y cómo correrlo y testearlo.

## 10. Deploy y dominio

1. **Repo:** `paulakunning/portfolio`, público en GitHub.
2. **Vercel:** proyecto nuevo conectado al repo. `main` es producción y cada PR tiene su preview. Se cargan las variables de entorno de Resend.
3. **Cambio de URLs `.vercel.app`**, cuando el sitio nuevo esté listo para probar:
   1. En el proyecto viejo se agrega `paulakunning-v1.vercel.app`, o una variante libre si esa está tomada.
   2. Después se quita `paulakunning.vercel.app` del proyecto viejo.
   3. Se asigna `paulakunning.vercel.app` al proyecto nuevo.
4. **Lanzamiento:**
   1. Agregar `paulakunning.com` y `www.paulakunning.com` en Vercel (`www` redirige a `paulakunning.com`).
   2. En la zona DNS de Hostinger, cambiar solo los registros web (`A` de `@` y `CNAME` de `www`) por los que indique Vercel. El resto de los registros no se toca.
   3. Esperar el certificado HTTPS que emite Vercel.
   4. Verificar todas las URLs de la sección 3.
   5. Recién entonces cancelar el plan de hosting de WordPress, sin cancelar el dominio.

## 11. Estructura del repo

```
.
├─ .github/workflows/ci.yml
├─ docs/specs/                      este documento
├─ public/cv/                       PDFs del CV
├─ src/
│  ├─ app/
│  │  ├─ [lang]/
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx                home
│  │  │  ├─ not-found.tsx
│  │  │  ├─ opengraph-image.tsx
│  │  │  ├─ [...rest]/page.tsx      404 para rutas inexistentes
│  │  │  ├─ proyectos/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [slug]/page.tsx
│  │  │  └─ contacto/
│  │  │     ├─ page.tsx
│  │  │     ├─ actions.ts
│  │  │     └─ actions.test.ts
│  │  ├─ globals.css
│  │  ├─ icon.svg
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ assets/                       imágenes importadas (projects/, skills/, about/)
│  ├─ components/
│  ├─ content/                      projects.ts, experience.ts, skills.ts, testimonials.ts
│  ├─ i18n/                         config.ts, routing.ts, dictionaries/
│  ├─ lib/                          projects.ts, dates.ts, contact/
│  └─ proxy.ts
├─ tests/e2e/
├─ .env.example
├─ .nvmrc
└─ README.md
```

## 12. Contenido que aporta Paula

Se deja en `~/Dev/portfolio-assets`. La implementación no se bloquea por esto: arranca con el contenido que ya está publicado en paulakunning.com y se reemplaza a medida que llega.

**Archivos generales:**
- [ ] CV en español y Resume en inglés (PDF). De ahí salen los highlights de Canal Cero.
- [ ] Logo en SVG y favicon.
- [ ] Las 3 fotos de "Sobre mí" y la imagen de la página de contacto.

**Por cada proyecto:**
- [ ] Imagen de tarjeta y 2 a 4 imágenes para el detalle.
- [ ] Link.
- [ ] Rol y año.
- [ ] Resumen.
- [ ] 1 o 2 párrafos.

En español alcanza: Claude traduce y Paula revisa.

**Proyectos nuevos:**
- [ ] Datos completos de Tecnofast Perú, Maratón de Río, Friosur, Aeropuerto El Loa y el sitio de coaching (nombre incluido).
- [ ] Confirmar que los proyectos de Canal Cero sigan online y no tengan acuerdo de confidencialidad.

**Testimonios:**
- [ ] Permiso de cada persona.
- [ ] Texto de la reseña de Upwork, con nombre y rol.
