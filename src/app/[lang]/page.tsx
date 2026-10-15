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
    path: "/",
    title: { absolute: meta.home.title },
    description: meta.home.description,
  });
}

export default async function HomePage() {
  const { hero } = getDictionary(await getLocale());
  return (
    <PageHero>
      <h1 className="text-4xl md:text-5xl">{hero.title}</h1>
    </PageHero>
  );
}
