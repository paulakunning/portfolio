import { testimonials } from "@/content/testimonials";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";

export async function Testimonials() {
  const locale = await getLocale();
  const { testimonials: labels } = getDictionary(locale);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="content-width py-20 md:py-28"
    >
      <h2
        id="testimonials-title"
        className="text-center text-4xl text-primary italic md:text-5xl"
      >
        {labels.title}
      </h2>
      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.author}>
            <figure className="flex h-full flex-col rounded-2xl bg-secondary/25 p-8">
              <blockquote className="flex-1 text-lg">
                <p>“{testimonial.quote[locale]}”</p>
              </blockquote>
              <figcaption className="mt-6">
                <span className="block font-semibold">
                  {testimonial.author}
                </span>
                <span className="text-sm text-primary">
                  {testimonial.role[locale]}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
