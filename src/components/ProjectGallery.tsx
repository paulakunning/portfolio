import Image from "next/image";
import type { ProjectImage } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { Reveal } from "./Reveal";

type ProjectGalleryProps = { images: ProjectImage[]; locale: Locale };

export function ProjectGallery({ images, locale }: ProjectGalleryProps) {
  return (
    <ul className="content-width grid gap-6 pt-20 md:grid-cols-2">
      {images.map((image) => (
        <li key={image.src.src}>
          <Reveal>
            <Image
              src={image.src}
              alt={image.alt[locale]}
              sizes="(min-width: 1168px) 524px, (min-width: 761px) 50vw, 100vw"
              placeholder="blur"
              className="aspect-[4/3] w-full rounded-3xl bg-sand-tint object-cover"
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
