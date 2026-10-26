import Image from "next/image";
import { skills } from "@/content/skills";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";

export async function SkillsGrid() {
  const { skills: labels } = getDictionary(await getLocale());

  return (
    <section
      aria-labelledby="skills-title"
      className="content-width py-20 md:py-28"
    >
      <h2
        id="skills-title"
        className="text-4xl text-primary italic md:text-5xl"
      >
        {labels.title}
      </h2>
      <ul className="mt-12 grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="flex flex-col items-center gap-3 text-center"
          >
            {/* Decorative: the name is visible text. */}
            <Image src={skill.icon} alt="" className="size-12" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              {skill.name}
            </span>
            {skill.learning && (
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs">
                {labels.learning}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
