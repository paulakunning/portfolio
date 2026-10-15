import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();
  const { notFound } = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl">{notFound.title}</h1>
      <p className="mt-4">{notFound.body}</p>
      <Link
        href={localizePath(locale, "/")}
        className="text-primary mt-6 inline-block underline underline-offset-4"
      >
        {notFound.back}
      </Link>
    </div>
  );
}
