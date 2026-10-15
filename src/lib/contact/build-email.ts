import type { Locale } from "@/i18n/config";
import { es } from "@/i18n/dictionaries/es";
import type { ContactMessage } from "./schema";

/** The email always goes to Paula, so it is written in Spanish. */
export function buildContactEmail(
  message: ContactMessage,
  meta: { locale: Locale; sentAt: Date },
): { subject: string; text: string } {
  const reason = es.contact.form.reasons[message.reason];
  // Line breaks in a header would let a sender inject extra headers.
  const name = message.name.replace(/\s+/g, " ");

  return {
    subject: `[Portfolio] ${reason} — ${name}`,
    text: [
      `Nombre: ${message.name}`,
      `Email: ${message.email}`,
      `Motivo: ${reason}`,
      `Idioma: ${meta.locale}`,
      `Fecha: ${meta.sentAt.toISOString()}`,
      "",
      message.message,
    ].join("\n"),
  };
}
