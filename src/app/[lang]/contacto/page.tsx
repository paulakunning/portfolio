import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
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
  const { contact } = getDictionary(await getLocale());
  return (
    <PageHero>
      <h1 className="text-4xl md:text-5xl">{contact.title}</h1>
    </PageHero>
  );
}
