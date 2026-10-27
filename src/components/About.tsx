import Image from "next/image";
import { aboutPhotos } from "@/content/about";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";

export async function About() {
  const locale = await getLocale();
  const { about } = getDictionary(locale);

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="bg-foreground text-background"
    >
      <div className="content-width grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <h2
            id="about-title"
            className="text-4xl text-accent italic md:text-5xl"
          >
            {about.title}
          </h2>
          <div className="mt-8 flex flex-col gap-4 text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-4">
          {aboutPhotos.map((photo) => (
            <li key={photo.alt.en}>
              <Image
                src={photo.src}
                alt={photo.alt[locale]}
                sizes="(min-width: 768px) 16vw, 33vw"
                placeholder="blur"
                className="aspect-[3/4] w-full rounded-2xl object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
