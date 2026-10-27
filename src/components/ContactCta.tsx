import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { localizePath } from "@/i18n/routing";
import { ButtonLink } from "./ButtonLink";

type ContactCtaProps = { locale: Locale; labels: Dictionary["cta"] };

export function ContactCta({ locale, labels }: ContactCtaProps) {
  return (
    <section
      aria-labelledby="contact-cta-title"
      className="content-width py-20 text-center md:py-28"
    >
      <h2
        id="contact-cta-title"
        className="mx-auto max-w-2xl text-3xl text-primary italic md:text-4xl"
      >
        {labels.title}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg">{labels.availability}</p>
      <ButtonLink href={localizePath(locale, "/contacto")} className="mt-8">
        {labels.button}
      </ButtonLink>
    </section>
  );
}
