import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { cvPaths } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/contacto",
    title: meta.contact.title,
    description: meta.contact.description,
  });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const { contact, hero } = getDictionary(locale);

  return (
    <>
      <PageHero>
        <h1 className="max-w-2xl text-4xl italic md:text-6xl">
          {contact.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg">{contact.intro}</p>
        <ButtonLink
          href={cvPaths[locale]}
          variant="secondary"
          newTabNotice={hero.cvNotice}
          className="mt-8"
        >
          {hero.cv}
        </ButtonLink>
      </PageHero>
      <section className="content-width max-w-3xl py-16 md:py-24">
        <ContactForm locale={locale} labels={contact.form} />
      </section>
    </>
  );
}
