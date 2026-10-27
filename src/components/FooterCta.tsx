"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { localizePath, toPublicPath } from "@/i18n/routing";

type FooterCtaProps = { locale: Locale; title: string; availability: string };

export function FooterCta({ locale, title, availability }: FooterCtaProps) {
  // The contact page is itself the call to action.
  if (toPublicPath(usePathname()) === localizePath(locale, "/contacto")) {
    return null;
  }

  return (
    <>
      <h2 className="max-w-[18ch] text-[clamp(2.25rem,5.4vw,4.5rem)]">
        {title}
      </h2>
      <p className="mt-6 mb-10 max-w-[34rem] text-background/75">
        {availability}
      </p>
    </>
  );
}
