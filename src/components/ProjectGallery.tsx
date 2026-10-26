import Image from "next/image";
import type { ProjectImage } from "@/content/types";
import type { Locale } from "@/i18n/config";

type ProjectGalleryProps = { images: ProjectImage[]; locale: Locale };

export function ProjectGallery({ images, locale }: ProjectGalleryProps) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {images.map((image, index) => (
        // Index keys: the list is static and may repeat the same image.
        <li key={index}>
          <Image
            src={image.src}
            alt={image.alt[locale]}
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="w-full rounded-2xl"
          />
        </li>
      ))}
    </ul>
  );
}
