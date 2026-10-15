import { notFound } from "next/navigation";

// Unmatched URLs render the localized [lang]/not-found page.
export default function CatchAllPage() {
  notFound();
}
