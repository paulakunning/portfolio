import Image from "next/image";
import { workingPhoto } from "@/content/about";
import { Reveal } from "@/components/Reveal";
import { skills } from "@/content/skills";
import { getDictionary } from "@/i18n/get-dictionary";
import { formatMessage } from "@/i18n/format";
import { getLocale } from "@/i18n/server";

export async function About() {
  const locale = await getLocale();
  const { about } = getDictionary(locale);
  const tools = skills.filter((skill) => !skill.learning);
  const learning = skills
    .filter((skill) => skill.learning)
    .map((skill) => skill.name);

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="mx-auto grid max-w-[73rem] -scroll-mt-22 items-center gap-[clamp(2rem,6vw,6rem)] px-gutter py-20 md:grid-cols-[5fr_7fr] md:py-28"
    >
      <Reveal>
        <Image
          src={workingPhoto.src}
          alt={workingPhoto.alt[locale]}
          sizes="(min-width: 761px) 40vw, 100vw"
          placeholder="blur"
          className="aspect-square w-full rounded-[1.75rem] object-cover"
        />
      </Reveal>
      <Reveal>
        <h2
          id="about-title"
          className="mb-6 text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.05]"
        >
          {about.title}
        </h2>
        <div className="grid max-w-[36rem] gap-4">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <h3 className="mt-10 font-sans text-base leading-[1.4] font-medium tracking-normal">
          {about.tools}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {tools.map((skill) => (
            <li
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-[0.85rem] py-[0.4rem] text-sm leading-[1.6]"
            >
              <Image src={skill.icon} alt="" className="size-4" />
              {skill.name}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.9375rem] text-muted">
          {formatMessage(about.learning, {
            list: new Intl.ListFormat(locale, { type: "conjunction" }).format(
              learning,
            ),
          })}
        </p>
      </Reveal>
    </section>
  );
}
