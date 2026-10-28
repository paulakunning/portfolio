# Portfolio v2 — Spec de diseño

- **Fecha:** 2026-10-14
- **Actualizado:** 2026-10-27, con el rediseño visual (secciones 1, 2, 4, 5, 6, 9, 11 y 12)
- **Estado:** en revisión
- **Reemplaza a:** paulakunning.com (WordPress + Elementor en Hostinger)
- **Versión anterior:** [paulakunning/portfolio-v1](https://github.com/paulakunning/portfolio-v1) (archivada)

## 1. Objetivo

Rehacer paulakunning.com en Next.js con un diseño nuevo, creativo en cómo se comporta y sobrio en cómo se ve:

- el hero es un lienzo tipo Figma, con herramientas que se pueden arrastrar;
- los proyectos destacados se recorren con el scroll;
- todo usa la paleta y las tipografías de Paula.

Además suma textos nuevos, formulario de contacto, páginas de detalle de proyectos, testimonios y la lista de herramientas actualizada.

**Referencia visual:** el prototipo HTML de `~/Dev/portfolio-prototipo/`, que está fuera del repo y es descartable. Paula lo aprobó el 2026-10-27. Si este documento no fija una medida, vale la del prototipo (`styles.css`).

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
7. Con `prefers-reduced-motion: reduce` nada se mueve solo: el reel es un carrusel común y no hay animaciones de entrada.

### Qué se mantiene

Lo construido en los PRs #1 a #7 sigue igual: rutas e idiomas, contenido, formulario y su Server Action, metadata, tests y CI. El rediseño cambia:

- los componentes (sección 5);
- los tokens (sección 6);
- algunos textos (sección 4).

### Fuera de alcance (por ahora)

- Recordar dónde quedaron las herramientas arrastradas: vuelven a su lugar al recargar.
- Animaciones además de las de la sección 5 (lienzo, reel y aparición de proyectos).
- Sección "Proyectos de código".
- Abrir los proyectos en pop-up con URL propia (intercepting routes). Se puede sumar después sobre las páginas de detalle sin rehacerlas.
- Blog, CMS, analytics, captcha, guardar mensajes en base de datos, Storybook, hooks de pre-commit, tests visuales por capturas.

## 2. Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Lenguaje | TypeScript en modo `strict`, con `noUncheckedIndexedAccess` |
| Estilos | Tailwind CSS 4, con tokens en `globals.css` (`@theme`) |
| Tipografías | `next/font/google`: Playfair Display 400 normal e itálica (títulos) y DM Sans 400/500/600 (texto) |
| Validación | Zod 4 |
| Mail | Resend |
| Unit tests | Vitest |
| E2E y accesibilidad | Playwright + `@axe-core/playwright` |
| Lint y formato | ESLint (`eslint-config-next`) + Prettier con `prettier-plugin-tailwindcss` |
| Hosting | Vercel |
| CI | GitHub Actions |
| Node / paquetes | Node 24 LTS (`.nvmrc`), npm |

No se usa ninguna librería de i18n: los dos idiomas se resuelven con el ruteo de Next y diccionarios tipados (ver sección 3).

Tampoco hay librería de animaciones:

- el arrastre usa Pointer Events;
- el reel, un listener de scroll con `requestAnimationFrame`;
- la aparición de proyectos, `IntersectionObserver`.

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
  featured?: boolean             // aparece en el reel del home
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
- El reel del home muestra los proyectos con `featured: true`, en el orden del array. Son 5 y mezclan categorías, porque el home no tiene pestañas: Don Higinio, Factchequeado Lab, GEA Logistics, DéDé Digital y Lucrecia Cornaglia.

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
- La portada se recorta según dónde aparece (16:10 en el reel, 4:3 en la grilla, 16:9 en el detalle), así que lo importante tiene que estar cerca del centro.

**Lista inicial, en este orden:**

| # | slug | Nombre | Categorías | Herramientas | Link |
|---|---|---|---|---|---|
| 1 | `don-higinio` | Don Higinio | web-design, web-development | Figma, WordPress | live |
| 2 | `factchequeado-lab` | Factchequeado Lab | web-design, web-development | Figma, WordPress | live |
| 3 | `gea-logistics` | GEA Logistics | web-development | WordPress | live |
| 4 | `javier-carrizo` | Javier Carrizo | web-development | WordPress | live |
| 5 | `arqci` | ARQCI | web-development | WordPress | live |
| 6 | `tecnofast-peru` | Tecnofast Perú | web-development | Bricks Builder | live |
| 7 | `olatrek` | Olatrek | a confirmar | a confirmar | a confirmar |
| 8 | `friosur` | Friosur | a confirmar | a confirmar | a confirmar |
| 9 | `aeropuerto-el-loa` | Aeropuerto El Loa | a confirmar | a confirmar | a confirmar |
| 10 | `burning-wanderlust` | Burning Wanderlust | a confirmar | a confirmar | a confirmar |
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
- Figma, HTML, CSS, JavaScript, TypeScript, React, PHP, WordPress, Elementor, Bricks Builder, WooCommerce
- Next.js (aprendiendo), Framer (aprendiendo)
- Adobe Illustrator

**Íconos:**
- Son SVG en `src/assets/skills/`.
- Los que ya existen salen del sitio actual; los que faltan, de los recursos oficiales de cada marca.
- Las que tienen `learning: true` no van entre las píldoras de herramientas. Se nombran en una línea aparte, armada con `Intl.ListFormat`: "Ahora estoy aprendiendo Next.js y Framer." / "Currently learning Next.js and Framer.".
- El hero usa 11 de estos íconos como fichas decorativas: Figma, WordPress, Elementor, PHP, HTML, CSS, React, TypeScript, Next.js, JavaScript y Bricks Builder.

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
  - ES: "Diseño digital, del concepto a la pantalla."
  - EN: "Digital design, from concept to screen."
- **Subtítulo:**
  - ES: "Creo sitios web que conectan una buena idea con un diseño cuidado y una experiencia intuitiva. También puedo llevar esos diseños a la web, combinando criterio visual y conocimientos de desarrollo."
  - EN: "I create websites that connect a good idea with thoughtful design and an intuitive experience. I can also bring those designs to the web, combining a visual eye with development skills."
- El rol ("Diseñadora Web y Desarrolladora WordPress / Front-End") sigue en el título de la página, así que se mantiene para SEO.
- **Disponibilidad:**
  - ES: "Disponible para trabajo remoto de tiempo completo y proyectos freelance"
  - EN: "Available for full-time remote work and freelance projects"

**Sobre mí:** el título es "Hola, soy Paula" / "Hi, I'm Paula". Los párrafos van textuales:

- **ES:**
  1. "Diseño sitios web en Figma y los llevo a la realidad en WordPress y código, así que lo que se diseña es lo que se publica."
  2. "Tengo más de 3 años de experiencia: trabajé 2 años y medio en una agencia de marketing digital desarrollando sitios corporativos, y hoy tomo proyectos freelance que combinan diseño y desarrollo."
- **EN:**
  1. "I design websites in Figma and build them in WordPress and code, so what gets designed is what ships."
  2. "I have 3+ years of experience: I spent 2.5 years at a digital marketing agency building corporate sites, and I now take freelance projects that combine design and development."

**Cierre (va en el footer):**
- **Título:** "¿Tenés una idea en mente? Me encantaría hacerla realidad"
- **Línea de disponibilidad:** "Busco un puesto remoto como diseñadora web o desarrolladora WordPress / front-end, y también tomo proyectos freelance."
- La versión en inglés la traduce Claude.

**Contacto:**
- Se mantienen "¿Tenés un proyecto en mente?" y "Si sentís que podemos crear algo juntos, me encantaría conocer tu idea.".
- El bloque "Estemos en contacto" se elimina, porque el footer ya tiene el mail y las redes.

**Página de proyectos:** "Algunos trabajos que disfruté crear" / "Some work I enjoyed making".

**Textos nuevos del rediseño:**

| Dónde | ES | EN |
|---|---|---|
| Header | Sobre mí | About |
| Hero, botón | Ver proyectos | See projects |
| Hero, aviso | Podés mover las herramientas | You can move the tools around |
| Reel, bajada | Diseño web, desarrollo WordPress y branding. | Web design, WordPress development and branding. |
| Reel, tarjeta | Ver proyecto | View project |
| Reel, tarjeta final | Ver los {count} proyectos | See all {count} projects |
| Reel, botones del carrusel | Proyecto anterior / Proyecto siguiente | Previous project / Next project |
| Sobre mí | Herramientas que uso | Tools I use |
| Sobre mí | Ahora estoy aprendiendo {lista}. | Currently learning {list}. |
| Detalle | Sobre el proyecto | About the project |
| Detalle, `aria-label` del cierre | Más proyectos | More projects |
| Footer, botón del mail | Copiar → Copiado | Copy → Copied |
| Footer, si falla copiar | No se pudo copiar. El mail es {email} | Couldn't copy. The email is {email} |
| Footer | Volver arriba | Back to top |
| Footer, crédito | Diseñado y desarrollado por mí, con una ayudita de la IA. | Designed & built by me, with a little help from AI. |

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

**Medidas comunes:**
- Columna de contenido de `73rem` como máximo, centrada, con margen lateral `clamp(1rem, 4vw, 3rem)`.
- El reel del home arranca en el mismo borde izquierdo que esa columna: `max(margen, (100% − 73rem) / 2 + margen)`. Se usa `100%` y no `100vw`, porque `100vw` incluye la barra de scroll.
- Los encabezados de proyectos y del detalle llevan de fondo la grilla de puntos del hero, que se desvanece hacia abajo.
- Ningún link interno anima el scroll (`scroll-behavior` queda en `auto`). Con scroll suave, ir a "Sobre mí" o "Volver arriba" recorría todo el reel.

**Link para saltar al contenido:** "Ir al contenido" / "Skip to content", visible al recibir foco.

**Header:** una píldora flotante, fija arriba y centrada, con fondo `background` al 80 % y desenfoque.
- "Paula *Kunning*" en serif `primary`, con tracking −0.03em y el apellido en itálica. Lleva al home del idioma actual.
- Links Proyectos, Sobre mí (`/#sobre-mi` o `/en#sobre-mi`) y Contacto, y el selector de idioma ("EN" en español, "ES" en inglés): mayúsculas, 0.875rem, tracking 0.06em, en `muted`. La página actual va subrayada y con `aria-current="page"`; Sobre mí nunca se marca.
- Botón "Hablemos", sólido, que lleva a `/contacto`.

**Menú mobile (menos de 768px):**
- La píldora muestra el nombre, "Hablemos" y un botón redondo con ícono de hamburguesa, que pasa a ✕ cuando está abierto.
- El botón tiene `aria-expanded`, `aria-controls` y `aria-label` "Abrir menú" / "Cerrar menú".
- Abre un panel debajo de la píldora con los links en columna.
- Se cierra con Escape, al tocar un link y al navegar, y el foco vuelve al botón.

**Footer:** un bloque `primary-deep` con radio de 2rem, separado de los bordes de la ventana, con texto `background`.
- Título del cierre (`h2`) y línea de disponibilidad (sección 4). En `/contacto` no van, porque la página entera ya es eso.
- El mail en una píldora con el botón "Copiar", que es `CopyEmailButton`:
  - copia con `navigator.clipboard`;
  - durante 2 segundos dice "Copiado" y lo anuncia en una región `role="status"`;
  - si falla, la región muestra el mail.
- "Ver mi CV", botón claro.
- LinkedIn, Behance y GitHub en serif grande, a la derecha (debajo en mobile).
- Fila final, separada por una línea, con tres partes: "© {año} Paula Kunning. Córdoba, Argentina.", la frase de crédito centrada y "Volver arriba ↑" a la derecha. En mobile van una debajo de la otra.

### Home — `/`

Cada página tiene un único `h1`: en el home es el título del hero.

1. **Hero, un lienzo tipo Figma:**
   - Ocupa toda la pantalla, con fondo de grilla de puntos que se desvanece abajo.
   - Al centro, en este orden:
     - el título (`h1`, tracking −0.035em, con `text-wrap: balance` para que corte "Diseño digital, / del concepto / a la pantalla.") y el subtítulo;
     - "Ver proyectos" (sólido, baja al reel) y "Ver mi CV" (outline, abre el PDF del idioma en una pestaña nueva y lo indica en un texto oculto para lectores de pantalla);
     - la línea de disponibilidad, con un punto verde.
   - Alrededor hay 11 fichas con íconos de herramientas, sobre fondos `lilac-tint`, `rose-tint` o `surface`, y una ficha más grande con la foto de Paula, rotulada "Paula.jpg".
   - Las fichas se arrastran con el mouse o el dedo (ver `HeroCanvas`):
     - quedan donde se sueltan;
     - la que se agarra pasa al frente;
     - al pasar el mouse o arrastrar, muestran una caja de selección estilo Figma con una etiqueta con el nombre.
   - Al cargar, las fichas entran con una caída corta, escalonada cada 60ms.
   - Abajo, el aviso "Podés mover las herramientas" se oculta después del primer arrastre.
   - Las fichas son decorativas (`aria-hidden`), porque las herramientas también están como texto en Sobre mí.
   - **Mobile:** 8 fichas, en una banda arriba y otra abajo del texto; sin foto.
2. **Proyectos destacados, el reel** (`id="proyectos"`):
   - **Contenido:** título "Proyectos destacados", bajada, "Ver todos los proyectos", una tarjeta por cada proyecto `featured` y una tarjeta final `primary` con "Ver los 14 proyectos →".
   - **Cada tarjeta:** imagen 16:10, nombre (`h3`), rol y año, resumen y botón "Ver proyecto".
   - **Desktop con movimiento** (`min-width: 900px` y `prefers-reduced-motion: no-preference`):
     - la sección queda fija y el scroll vertical mueve la tira hacia el costado;
     - las imágenes tienen un parallax leve y abajo hay una barra de progreso;
     - si con Tab se llega a una tarjeta fuera de pantalla, la página scrollea hasta mostrarla.
   - **Mobile o con movimiento reducido:** carrusel horizontal nativo con scroll-snap y botones anterior/siguiente.
3. **Sobre mí** (`id="sobre-mi"`):
   - a la izquierda, la foto de Paula trabajando, cuadrada;
   - a la derecha, el título, los párrafos, "Herramientas que uso" como píldoras con ícono y la línea de lo que está aprendiendo.
4. **Experiencia:**
   - El título va a la izquierda y los trabajos a la derecha (4/12 y 8/12).
   - El título acompaña el scroll (`sticky`) y frena cuando llega al último trabajo, para no terminar pegado a Testimonios. Va dentro de un contenedor que ocupa las filas de todos los trabajos menos el último, y la lista es `subgrid`. Hace falta así porque `sticky` se limita a su contenedor, no a su celda de la grilla.
   - Cada trabajo muestra período, empresa (`h3`), rol, y descripción o lista.
5. **Testimonios:** el de Désirée va grande, en serif y con comillas `primary`; los otros dos, en tarjetas al costado (debajo en mobile).

### Proyectos — `/proyectos`

- **Encabezado con puntos:** el `h1` a la izquierda (4.5rem como máximo), y a la derecha, alineadas con su base, las pestañas y la cantidad de proyectos. En mobile van debajo.
- **Pestañas:** píldoras outline; la activa, `primary`.
- **Grilla:**
  - 2 columnas desde 768px, con la columna derecha 8rem más abajo; 1 columna en mobile.
  - Cada tarjeta muestra la imagen 4:3, el nombre (`h2`), el rol, el año y la etiqueta "Conceptual".
  - Al pasar el mouse, la imagen crece 3 %.
- **Aparición:**
  - Cuando una tarjeta entra en pantalla, sube 2.5rem y aparece en 0.9s, con la imagen pasando de 108 % a 100 %. La columna derecha arranca 0.12s después.
  - Pasa una vez por tarjeta, y de nuevo con las tarjetas que aparecen al cambiar de pestaña.
  - Las que ya están en pantalla cuando carga la página no se esconden, para que no parpadeen al hidratar.
  - Sin JavaScript se ve todo, y con movimiento reducido no hay animación.

### Detalle — `/proyectos/[slug]`

**Contenido, en orden:**
1. Encabezado con puntos: "← Volver a proyectos", el nombre (`h1`) y la etiqueta "Conceptual" si corresponde.
2. Dos columnas (7/12 y 5/12):
   - a la izquierda, el resumen y el botón externo "Ir a la web" o "Ver en Behance" (pestaña nueva, indicado);
   - a la derecha, los datos en una grilla de 2×2: Rol, Año, Servicios (las categorías traducidas) y Herramientas.
3. Portada 16:9 con radio de 2rem, del ancho de la columna de contenido.
4. "Sobre el proyecto" (`h2`) a la izquierda y los párrafos a la derecha (4/12 y 8/12), como en Experiencia.
5. Galería de 2 columnas (1 en mobile).
6. **Cierre:** un `nav` con `aria-label` "Más proyectos".
   - Una fila con "Siguiente proyecto" a la izquierda y el botón outline "← Volver a proyectos" a la derecha.
   - Una línea divisoria.
   - El link al siguiente proyecto, con el nombre en serif grande, una flecha que se corre al pasar el mouse y la miniatura de su portada.

### Contacto — `/contacto`

- Dos columnas (5/12 y 7/12).
- A la izquierda: el retrato de Paula (9rem, cuadrado, oculto en mobile), el `h1`, el texto y "Ver mi CV" (outline).
- A la derecha: el formulario (sección 7) en una tarjeta `surface` con borde y sombra suave.
- Todo entra en una pantalla de 1280×800.
- El footer va sin título ni línea de disponibilidad.

### Componentes

**Lógica pura, sin React, con unit tests:**
- `src/lib/canvas.ts`, para el arrastre:
  - recibe el puntero, el punto donde se agarró la ficha, su tamaño y el del lienzo;
  - devuelve la posición en % del lienzo, limitada a sus bordes;
  - usa % para que las fichas se acomoden si cambia el tamaño de la ventana.
- `src/lib/reel.ts`, para el reel:
  - el progreso del scroll (0 a 1);
  - el alto que necesita la sección fija;
  - el desplazamiento de parallax de cada imagen;
  - a dónde scrollear para mostrar la tarjeta que recibió el foco.

**Corren en el navegador (`'use client'`):**
- **`SiteNav`** (ya existe): suma Sobre mí y el nuevo menú mobile.
- **`ProjectFilter`** (ya existe): nuevo diseño y la aparición de tarjetas.
- **`ContactForm`** (ya existe): nuevo diseño.
- **`HeroCanvas`** (nuevo): recibe las fichas y maneja el arrastre con Pointer Events y `setPointerCapture`.
- **`ProjectReel`** (nuevo):
  - recibe como `children` las tarjetas, ya renderizadas en el servidor;
  - agrega el modo fijo, el parallax, la barra de progreso, los botones del carrusel y el seguimiento del foco;
  - el alto de la sección fija se conoce recién en el navegador, así que, después de calcularlo, si la URL trae un `#` que apunta debajo del reel, vuelve a scrollear a ese elemento.
- **`CopyEmailButton`** (nuevo).

**Todo lo demás son Server Components:**
- **Layout:** `Header` y `Footer`. El `Footer` absorbe el cierre, así que `ContactCta` se elimina.
- **Home:** `Hero`, `FeaturedProjects` (arma el reel), `About`, `ExperienceList` y `Testimonials`. `About` absorbe las herramientas, así que `SkillsGrid` se elimina.
- **Proyectos:** `PageHero` (el encabezado con puntos), `ProjectCard`, `ProjectFacts`, `ProjectGallery` y `ProjectNav`.
- **Compartido:** `ButtonLink`, con las variantes `primary` (sólido), `secondary` (outline) y `light` (para el footer).

### Pestañas — `ProjectFilter`

**Datos:**
- Recibe la lista de proyectos ya traducida al idioma de la página.
- `filterProjects(projects, category)` es una función pura en `src/lib/projects.ts`, junto a `getProject(slug)` y `getNextProject(slug)`. El parámetro `limit` se elimina, porque el home ya no tiene pestañas.

**Accesibilidad:**
- Es un grupo de botones (`role="group"` con `aria-label`), y el activo lleva `aria-pressed="true"`.
- La cantidad de proyectos se ve en pantalla y está en una región `aria-live="polite"`, que la anuncia al cambiar de pestaña.

**SEO:** el HTML que se genera de antemano incluye la pestaña "Todos" con todos los proyectos, así que el contenido es indexable sin JavaScript.

### Responsive

- Mobile-first.
- **Cortes:**
  - `md` (761px, para coincidir con el `max-width: 760px` del prototipo) para las dos columnas y para la píldora completa del header;
  - el reel queda fijo desde 900px, y lo decide `matchMedia` en `ProjectReel`.
- **Referencia visual:** el prototipo a 390px y a 1440px.

## 6. Tokens de diseño

Se definen en `src/app/globals.css` con `@theme` de Tailwind 4. Los contrastes son contra `background`, salvo que se indique otro fondo.

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#F7F4EF` | fondo general |
| `--color-foreground` | `#2E2A28` | texto (12.95:1) |
| `--color-muted` | `#675E5A` | texto secundario: bajadas, períodos, datos (5.76:1; 6.22:1 sobre `surface`; 5.01:1 sobre `lilac-tint`) |
| `--color-primary` | `#6D4E68` | nombre, botones, pestaña activa, foco (6.51:1; blanco sobre `primary`, 7.14:1) |
| `--color-primary-deep` | `#3A2937` | fondo del footer (`background` encima, 12.33:1; al 65 % de opacidad, 6.16:1) |
| `--color-secondary` | `#B79BB8` | base de `lilac-tint`; solo decoración (2.28:1, no apto para texto) |
| `--color-accent` | `#D7B6B6` | base de `rose-tint`; solo decoración (1.7:1, no apto para texto) |
| `--color-lilac-tint` | `#ECE2EB` | fondo de fichas e imágenes |
| `--color-rose-tint` | `#F3E5E3` | fondo de fichas e imágenes |
| `--color-sand-tint` | `#EBE5DA` | fondo de fichas e imágenes |
| `--color-surface` | `#FFFDF9` | tarjetas, píldoras de herramientas, campos del formulario |
| `--color-line` | `rgb(46 42 40 / 0.12)` | bordes y divisores |
| `--color-error` | `#A3332B` | errores del formulario (6.24:1) |
| `--font-serif` | Playfair Display 400, normal e itálica | títulos |
| `--font-sans` | DM Sans 400 / 500 / 600 | texto, botones, interfaz |

**Forma:**
- **Títulos:** serif 400, interlineado 1.05 y tracking −0.015em; los `h1` y el título del hero, −0.035em.
- **Botones y píldoras:** radio completo, sólidos o con borde de 1px. Sin degradés ni brillos.
- **Radios:** 1.5rem en imágenes y tarjetas; 2rem en la portada del detalle, el formulario y el footer.

**Reglas de contraste:**
- El texto sobre los tints o sobre `surface` va en `foreground` o `muted`.
- El texto sobre `primary` va en blanco o `background`.
- El texto sobre `primary-deep` va en `background`, con al menos 65 % de opacidad.
- El foco es siempre visible: `outline` en `primary` con separación; dentro del footer, en `background`.

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
| `src/content/content.test.ts` | slugs únicos con formato `kebab-case`, al menos una categoría, galería de 2 a 4 imágenes, URLs `https`, 5 proyectos `featured` |
| `src/lib/projects.test.ts` | `filterProjects` por categoría, `getNextProject` (incluida la vuelta al primero), `getProject` con slug inexistente |
| `src/lib/canvas.test.ts` | la posición en % con el puntero dentro del lienzo, y limitada a los bordes cuando sale |
| `src/lib/reel.test.ts` | progreso 0 y 1 en los extremos y limitado afuera de ellos; alto de la sección; parallax con signo opuesto al desplazamiento; destino del foco para la primera tarjeta, una del medio y la última |
| `src/i18n/routing.test.ts` | `localizePath` y `switchLocalePath` en home, páginas y detalle, en los dos sentidos |
| `src/lib/dates.test.ts` | `formatPeriod` en ES y EN, con y sin fecha de fin |

### E2E (Playwright)

Corren contra el build de producción con `CONTACT_DRY_RUN=true`, en dos proyectos: mobile (390px) y desktop (1280px).

| Archivo | Recorrido |
|---|---|
| `tests/e2e/navigation.spec.ts` | las 4 páginas cargan en ES y EN; el selector de idioma conserva la página; `/es/proyectos` redirige a `/proyectos`; una ruta inexistente muestra la 404 localizada; el menú mobile abre, navega y se cierra con Escape |
| `tests/e2e/home.spec.ts` | desktop: el scroll mueve el reel, y con Tab se llega a la última tarjeta y queda visible; arrastrar una ficha del hero la mueve. Con movimiento reducido y en mobile, el reel es un carrusel y los botones lo mueven. Desde `/proyectos`, "Sobre mí" deja esa sección arriba de la pantalla (ES y EN). "Copiar" copia el mail y muestra "Copiado" |
| `tests/e2e/projects.spec.ts` | las pestañas filtran y marcan la activa; con JavaScript desactivado se ven todas las tarjetas; una tarjeta lleva a su detalle; "Siguiente proyecto" y los dos "Volver a proyectos" funcionan |
| `tests/e2e/contact.spec.ts` | envío vacío muestra errores y enfoca el primero; envío válido muestra el agradecimiento |
| `tests/e2e/a11y.spec.ts` | axe sin violaciones en las 4 páginas (un detalle), en los dos idiomas |

### Otras verificaciones

**Antes de lanzar:**
- Lighthouse manual en mobile sobre la URL de producción de Vercel, con el objetivo de la sección 1.
- Revisión visual a 360, 768 y 1440px contra el prototipo.

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
│  ├─ assets/                       imágenes importadas (projects/, skills/, about/ con la foto del hero)
│  ├─ components/
│  ├─ content/                      projects.ts, experience.ts, skills.ts, testimonials.ts
│  ├─ i18n/                         config.ts, routing.ts, dictionaries/
│  ├─ lib/                          projects.ts, dates.ts, canvas.ts, reel.ts, contact/
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
- [x] Fotos:
  - Sobre mí: Paula trabajando;
  - contacto: el retrato;
  - hero: `paula-perfil.jpg`, que hoy está en el prototipo;
  - la foto del espejo queda sin uso.

**Por cada proyecto:**
- [ ] Imagen de tarjeta y 2 a 4 imágenes para el detalle.
- [ ] Link.
- [ ] Rol y año.
- [ ] Resumen.
- [ ] 1 o 2 párrafos.

En español alcanza: Claude traduce y Paula revisa.

**Proyectos nuevos:**
- [ ] Datos completos de Tecnofast Perú, Olatrek, Friosur, Aeropuerto El Loa y Burning Wanderlust.
- [ ] Confirmar que los proyectos de Canal Cero sigan online y no tengan acuerdo de confidencialidad.

**Testimonios:**
- [ ] Permiso de cada persona.
- [ ] Texto de la reseña de Upwork, con nombre y rol.
