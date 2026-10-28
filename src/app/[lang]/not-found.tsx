import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();
  const { notFound } = getDictionary(locale);

  return (
    <PageHero>
      <h1 className="text-[clamp(2.75rem,6vw,5rem)] tracking-[-0.035em]">
        {notFound.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{notFound.body}</p>
      <Link
        href={localizePath(locale, "/")}
        className="mt-6 inline-block text-primary underline underline-offset-4"
      >
        {notFound.back}
      </Link>
    </PageHero>
  );
}
