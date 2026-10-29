import { cvPaths } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { ButtonLink } from "./ButtonLink";
import { HeroCanvas } from "./HeroCanvas";
import { heroTiles } from "./hero-tiles";

export async function Hero() {
  const locale = await getLocale();
  const { hero } = getDictionary(locale);

  return (
    <section
      aria-labelledby="hero-title"
      className="dot-grid relative grid min-h-svh place-items-center overflow-hidden px-gutter pt-28 pb-24 after:h-[35%] max-md:pt-44 max-md:pb-40"
    >
      <div className="relative z-1 max-w-[44rem] text-center">
        <h1
          id="hero-title"
          className="text-[clamp(2.6rem,6.4vw,5.5rem)] leading-[1.02] tracking-[-0.035em] text-balance"
        >
          {hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-[33rem] text-[clamp(1.0625rem,1.5vw,1.25rem)] text-muted">
          {hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="#proyectos">{hero.seeProjects}</ButtonLink>
          <ButtonLink
            href={cvPaths[locale]}
            variant="secondary"
            newTabNotice={hero.cvNotice}
          >
            {hero.cv}
          </ButtonLink>
        </div>
        <p className="mt-7 text-sm leading-[1.6] text-muted before:mr-[0.6rem] before:inline-block before:size-2 before:rounded-full before:bg-[#4f8a5b] before:align-[0.1em] before:shadow-[0_0_0_4px_rgb(79_138_91/0.16)] before:content-['']">
          {hero.availability}
        </p>
      </div>
      <HeroCanvas tiles={heroTiles} hint={hero.dragHint} />
    </section>
  );
}
