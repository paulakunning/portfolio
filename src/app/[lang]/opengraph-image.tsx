import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// generateImageMetadata (not a static `alt`) is what lets the alt follow the language.
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return [];
  return [
    {
      id: "home",
      alt: getDictionary(lang).meta.home.title,
      size,
      contentType,
    },
  ];
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang, __metadata_id__: "home" }));
}

const font = (file: string) =>
  readFile(join(process.cwd(), "src/assets/fonts", file));

// Read once at module load: file IO inside the handler would opt the image out of prerendering.
const [playfair, playfairItalic, dmSans] = await Promise.all([
  font("playfair-display-latin-400-normal.woff"),
  font("playfair-display-latin-400-italic.woff"),
  font("dm-sans-latin-400-normal.woff"),
]);

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response(null, { status: 404 });
  const { hero } = getDictionary(lang);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "#F7F4EF",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "Playfair Display",
          fontSize: 112,
          letterSpacing: "-0.03em",
          color: "#6D4E68",
        }}
      >
        Paula&nbsp;
        <span style={{ fontStyle: "italic" }}>Kunning</span>
      </div>
      <div
        style={{
          marginTop: 32,
          fontFamily: "DM Sans",
          fontSize: 48,
          lineHeight: 1.25,
          color: "#2E2A28",
        }}
      >
        {hero.title}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfair,
          style: "normal",
          weight: 400,
        },
        {
          name: "Playfair Display",
          data: playfairItalic,
          style: "italic",
          weight: 400,
        },
        { name: "DM Sans", data: dmSans, style: "normal", weight: 400 },
      ],
    },
  );
}
