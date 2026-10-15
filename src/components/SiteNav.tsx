"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { localizePath, switchLocalePath, toPublicPath } from "@/i18n/routing";
import { ButtonLink } from "./ButtonLink";
import { CloseIcon, MenuIcon } from "./icons";

type SiteNavProps = {
  locale: Locale;
  labels: Dictionary["nav"];
};

export function SiteNav({ locale, labels }: SiteNavProps) {
  const pathname = toPublicPath(usePathname());
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isOpen = openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOn(null);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const links = [
    { href: localizePath(locale, "/proyectos"), label: labels.projects },
    { href: localizePath(locale, "/contacto"), label: labels.contact },
  ];
  const currentState = (href: string) => {
    if (pathname === href) return "page";
    return pathname.startsWith(`${href}/`) ? "true" : undefined;
  };

  return (
    <nav aria-label={labels.label}>
      <button
        ref={toggleRef}
        type="button"
        className="-mr-2 p-2 md:hidden"
        aria-expanded={isOpen}
        aria-controls="site-menu"
        aria-label={isOpen ? labels.closeMenu : labels.openMenu}
        onClick={() => setOpenOn(isOpen ? null : pathname)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id="site-menu"
        className={`${isOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-6 bg-foreground px-6 py-8 md:static md:flex md:flex-row md:items-center md:gap-8 md:bg-transparent md:p-0`}
      >
        <ul className="flex flex-col gap-6 md:flex-row md:gap-8">
          {links.map(({ href, label }) => {
            const current = currentState(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current}
                  className={`font-semibold uppercase transition-colors hover:text-accent ${current ? "text-accent" : ""}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* A full page load: the whole document, including <html lang>, changes language. */}
        <a
          href={switchLocalePath(pathname, otherLocale)}
          hrefLang={otherLocale}
          className="font-semibold uppercase transition-colors hover:text-accent"
        >
          {labels.switchTo}
          <span className="sr-only"> — {labels.switchToLabel}</span>
        </a>
        <ButtonLink
          href={localizePath(locale, "/contacto")}
          variant="outline"
          className="self-start md:self-auto"
        >
          {labels.cta}
        </ButtonLink>
      </div>
    </nav>
  );
}
