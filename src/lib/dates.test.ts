import { expect, it } from "vitest";
import { formatPeriod } from "./dates";

it.each([
  ["es", "2025-07", undefined, "Actualidad", "Julio 2025 — Actualidad"],
  ["en", "2025-07", undefined, "Present", "July 2025 — Present"],
  ["es", "2023-03", "2025-07", "Actualidad", "Marzo 2023 — Julio 2025"],
  ["en", "2023-03", "2025-07", "Present", "March 2023 — July 2025"],
] as const)("%s %s–%s", (locale, start, end, present, expected) => {
  expect(formatPeriod(locale, start, end, present)).toBe(expected);
});
