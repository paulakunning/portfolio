import type { Metadata } from "next";
import { About } from "@/components/About";
import { ContactCta } from "@/components/ContactCta";
import { ExperienceList } from "@/components/ExperienceList";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Testimonials } from "@/components/Testimonials";
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
  const locale = await getLocale();
  const { cta } = getDictionary(locale);

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ExperienceList />
      <SkillsGrid />
      <About />
      <Testimonials />
      <ContactCta locale={locale} labels={cta} />
    </>
  );
}
