import { cacheLife } from "next/cache";
import { contactLinks, cvPaths, socialChannels } from "@/content/site";
import { formatMessage } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { ButtonLink } from "./ButtonLink";
import { EmailPill } from "./EmailPill";
import { FooterCta } from "./FooterCta";
import { ArrowUpIcon } from "./icons";

// `new Date()` is not allowed in a prerendered component; a cached function is.
// "days": the year can lag at most a day after Jan 1, and the default profile
// would make every page revalidate every 15 minutes.
async function getYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const locale = await getLocale();
  const { footer, cta, hero, common } = getDictionary(locale);
  const year = await getYear();

  return (
    <footer
      data-cursor="dark"
      className="mx-[clamp(0.5rem,2vw,1.5rem)] mb-[clamp(0.5rem,2vw,1.5rem)] grid rounded-[2rem] bg-primary-deep px-5 pt-10 pb-6 text-background md:grid-cols-[1fr_auto] md:items-end md:gap-x-12 md:p-[clamp(2.5rem,6vw,5rem)] [&_:focus-visible]:outline-background"
    >
      <div className="min-w-0">
        <FooterCta
          locale={locale}
          title={cta.title}
          availability={cta.availability}
        />
        <div className="flex flex-wrap gap-3">
          <EmailPill
            email={contactLinks.email}
            labels={{
              copy: footer.copy,
              copied: footer.copied,
              copyFailed: footer.copyFailed,
            }}
          />
          <ButtonLink
            href={cvPaths[locale]}
            variant="light"
            newTabNotice={hero.cvNotice}
          >
            {hero.cv}
          </ButtonLink>
        </div>
      </div>

      <ul className="mt-10 flex flex-wrap gap-5 md:mt-0 md:grid md:gap-2 md:text-right">
        {socialChannels.map(({ id, label, href }) => (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2] text-background/80 hover:text-background hover:underline hover:underline-offset-[0.25em]"
            >
              {label}
              <span className="sr-only"> {common.newTab}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-18 grid gap-4 border-t border-background/15 pt-6 text-sm leading-[1.6] text-background/65 md:col-span-full md:grid-cols-[1fr_auto_1fr]">
        <p>{formatMessage(footer.copyright, { year })}</p>
        <p>{footer.credit}</p>
        <a
          href="#"
          className="inline-flex items-center gap-[0.4rem] underline max-md:justify-self-start md:justify-self-end"
        >
          {footer.backToTop}
          <ArrowUpIcon className="size-4" />
        </a>
      </div>
    </footer>
  );
}
