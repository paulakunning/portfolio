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

// Inside the mobile menu panel links are full-width rows in the foreground color.
const linkClass =
  "block px-4 py-[0.85rem] text-sm leading-[1.6] uppercase tracking-[0.06em] text-foreground transition-colors hover:text-foreground md:inline md:p-0";
const idleClass = "md:text-muted";

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
    { href: `${localizePath(locale, "/")}#sobre-mi`, label: labels.about },
    { href: localizePath(locale, "/contacto"), label: labels.contact },
  ];
  const currentState = (href: string) => {
    if (pathname === href) return "page";
    return pathname.startsWith(`${href}/`) ? "true" : undefined;
  };

  return (
    <nav
      aria-label={labels.label}
      className="ml-auto flex items-center gap-1.5 md:ml-0 md:gap-8"
    >
      <button
        ref={toggleRef}
        type="button"
        className="order-last grid size-10 place-items-center rounded-full border border-foreground/28 md:hidden"
        aria-expanded={isOpen}
        aria-controls="site-menu"
        aria-label={isOpen ? labels.closeMenu : labels.openMenu}
        onClick={() => setOpenOn(isOpen ? null : pathname)}
      >
        {isOpen ? (
          <CloseIcon width={18} height={18} strokeWidth={1.8} />
        ) : (
          <MenuIcon width={18} height={18} strokeWidth={1.8} />
        )}
      </button>

      <div
        id="site-menu"
        onClick={() => setOpenOn(null)}
        className={`${isOpen ? "flex" : "hidden"} absolute inset-x-0 top-[calc(100%+0.5rem)] flex-col rounded-3xl border border-line bg-background p-2 shadow-[0_16px_40px_-20px_rgb(46_42_40/0.4)] md:static md:flex md:flex-row md:items-center md:gap-6 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
      >
        <ul className="flex flex-col md:flex-row md:gap-6">
          {links.map(({ href, label }) => {
            const current = currentState(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current}
                  className={`${linkClass} ${current ? "underline decoration-1 underline-offset-[0.45em]" : idleClass}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* A full page load: the whole document, including <html lang>, changes language. */}
        {/* One flex item, so the menu lays the list and the EN link out as two blocks. */}
        <div>
          <a
            href={switchLocalePath(pathname, otherLocale)}
            hrefLang={otherLocale}
            className={`${linkClass} ${idleClass}`}
          >
            {labels.switchTo}
            <span className="sr-only"> — {labels.switchToLabel}</span>
          </a>
        </div>
      </div>

      <ButtonLink
        href={localizePath(locale, "/contacto")}
        size="sm"
        className="tracking-[0.06em] uppercase max-md:px-[0.9rem]"
        onClick={() => setOpenOn(null)}
      >
        {labels.cta}
      </ButtonLink>
    </nav>
  );
}
