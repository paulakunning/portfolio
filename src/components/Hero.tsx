import Image from "next/image";
import { portraitPhoto } from "@/content/about";
import { cvPaths } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";
import { ButtonLink } from "./ButtonLink";
import { PageHero } from "./PageHero";

export async function Hero() {
  const locale = await getLocale();
  const { hero, nav } = getDictionary(locale);

  return (
    <PageHero>
      <div className="grid items-center gap-12 md:grid-cols-[3fr_2fr]">
        <div>
          <h1 className="text-4xl md:text-6xl">{hero.title}</h1>
          <p className="mt-6 max-w-xl text-lg">{hero.subtitle}</p>
          <p className="mt-6 inline-block rounded-full border border-accent px-4 py-1 text-sm text-accent">
            {hero.availability}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={localizePath(locale, "/contacto")}>
              {nav.cta}
            </ButtonLink>
            <ButtonLink
              href={cvPaths[locale]}
              variant="light"
              newTabNotice={hero.cvNotice}
            >
              {hero.cv}
            </ButtonLink>
          </div>
        </div>
        <Image
          src={portraitPhoto.src}
          alt={portraitPhoto.alt[locale]}
          sizes="(min-width: 768px) 40vw, 100vw"
          placeholder="blur"
          fetchPriority="high"
          className="aspect-[4/5] w-full rounded-2xl object-cover object-top"
        />
      </div>
    </PageHero>
  );
}
