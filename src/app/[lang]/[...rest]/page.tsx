import { notFound } from "next/navigation";

// It only ever renders the 404, so there is no navigation UI to validate.
export const instant = false;

// Unmatched URLs render the localized [lang]/not-found page.
export default function CatchAllPage() {
  notFound();
}
