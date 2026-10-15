import { contactLinks, socialChannels } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { BehanceIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const socialIcons = {
  linkedin: LinkedInIcon,
  behance: BehanceIcon,
  github: GitHubIcon,
};

export async function Footer() {
  const { footer, common } = getDictionary(await getLocale());

  return (
    <footer className="bg-foreground text-background">
      <div className="content-width flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <h2 className="text-2xl italic">{footer.title}</h2>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          <li className="flex basis-full justify-center sm:basis-auto">
            <a
              href={`mailto:${contactLinks.email}`}
              className="flex items-center gap-2 text-accent transition-colors hover:text-background"
            >
              <MailIcon className="size-6" />
              {contactLinks.email}
            </a>
          </li>
          {socialChannels.map(({ id, label, href }) => {
            const Icon = socialIcons[id];
            return (
              <li key={id}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent transition-colors hover:text-background"
                >
                  <Icon className="size-6" />
                  <span className="sr-only">
                    {label} {common.newTab}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
