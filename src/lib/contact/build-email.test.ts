import { describe, expect, it } from "vitest";
import { buildContactEmail } from "./build-email";
import type { ContactMessage } from "./schema";

const message: ContactMessage = {
  name: "Ana Pérez",
  email: "ana@mail.com",
  reason: "freelance",
  message: "Hola <b>Paula</b>\nSegunda línea",
};
const meta = {
  locale: "en" as const,
  sentAt: new Date("2026-10-14T12:00:00Z"),
};

describe("buildContactEmail", () => {
  it("builds a descriptive subject", () => {
    expect(buildContactEmail(message, meta).subject).toBe(
      "[Portfolio] Proyecto freelance — Ana Pérez",
    );
  });

  it("collapses line breaks in the subject", () => {
    const { subject } = buildContactEmail(
      { ...message, name: "Ana\r\nBcc: x@y.com", reason: "other" },
      meta,
    );
    expect(subject).toBe("[Portfolio] Otro — Ana Bcc: x@y.com");
  });

  it("writes a plain-text body that keeps the message verbatim", () => {
    const { text } = buildContactEmail(message, meta);
    for (const line of [
      "Nombre: Ana Pérez",
      "Email: ana@mail.com",
      "Motivo: Proyecto freelance",
      "Idioma: en",
      "Fecha: 2026-10-14T12:00:00.000Z",
    ]) {
      expect(text).toContain(line);
    }
    expect(text).toContain("Hola <b>Paula</b>\nSegunda línea");
  });
});
