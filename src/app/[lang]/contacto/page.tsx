import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { portraitPhoto } from "@/content/about";
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
    <section className="content-width grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-12 pt-30 pb-28 md:grid-cols-[5fr_7fr] md:pt-36">
      <div>
        <Image
          src={portraitPhoto.src}
          alt={portraitPhoto.alt[locale]}
          sizes="9rem"
          placeholder="blur"
          fetchPriority="high"
          className="mb-8 size-36 rounded-3xl object-cover object-[50%_30%] max-md:hidden"
        />
        <h1 className="text-[clamp(2.75rem,5.4vw,4.5rem)] tracking-[-0.035em]">
          {contact.title}
        </h1>
        <p className="mt-6 max-w-[30rem] text-[clamp(1.0625rem,1.5vw,1.2rem)] text-muted">
          {contact.intro}
        </p>
        <ButtonLink
          href={cvPaths[locale]}
          variant="secondary"
          newTabNotice={hero.cvNotice}
          className="mt-8"
        >
          {hero.cv}
        </ButtonLink>
      </div>
      <div className="self-start rounded-[2rem] border border-line bg-surface p-[clamp(1.5rem,4vw,2.75rem)] shadow-[0_24px_50px_-36px_rgb(46_42_40/0.4)]">
        <ContactForm locale={locale} labels={contact.form} />
      </div>
    </section>
  );
}
