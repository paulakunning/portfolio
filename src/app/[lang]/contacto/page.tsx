import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { contactImage, cvPaths } from "@/content/site";
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
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-4xl italic md:text-6xl">{contact.title}</h1>
            <p className="mt-6 max-w-xl text-lg">{contact.intro}</p>
            <ButtonLink
              href={cvPaths[locale]}
              variant="light"
              newTabNotice={hero.cvNotice}
              className="mt-8"
            >
              {hero.cv}
            </ButtonLink>
          </div>
          <Image
            src={contactImage.src}
            alt={contactImage.alt[locale]}
            sizes="(min-width: 768px) 45vw, 100vw"
            placeholder="blur"
            fetchPriority="high"
            className="aspect-square w-full rounded-2xl object-cover"
          />
        </div>
      </PageHero>
      <section className="content-width max-w-3xl py-16 md:py-24">
        <ContactForm locale={locale} labels={contact.form} />
      </section>
    </>
  );
}
