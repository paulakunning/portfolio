import { testimonials } from "@/content/testimonials";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";

export async function Testimonials() {
  const locale = await getLocale();
  const { testimonials: labels } = getDictionary(locale);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="mx-auto max-w-[73rem] px-gutter pb-28"
    >
      <h2
        id="testimonials-title"
        className="mb-12 text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.05]"
      >
        {labels.title}
      </h2>
      <ul className="grid items-start gap-x-[clamp(2rem,5vw,5rem)] gap-y-6 md:grid-cols-[7fr_5fr]">
        {testimonials.map((testimonial, index) => {
          const big = index === 0;
          return (
            <li
              key={testimonial.author}
              className={big ? "md:row-span-2" : undefined}
            >
              <figure
                className={
                  big
                    ? undefined
                    : "rounded-3xl border border-line bg-surface p-7"
                }
              >
                <blockquote
                  className={
                    big
                      ? "font-serif text-[clamp(1.35rem,2vw,1.65rem)] leading-[1.45] tracking-[-0.01em]"
                      : undefined
                  }
                >
                  {big && (
                    <span
                      aria-hidden
                      className="block h-13 text-[5rem] leading-none text-primary"
                    >
                      “
                    </span>
                  )}
                  <p>{testimonial.quote[locale]}</p>
                </blockquote>
                <figcaption className="mt-5 grid text-[0.9375rem]">
                  <span className="font-medium">{testimonial.author}</span>
                  <span className="text-muted">{testimonial.role[locale]}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
