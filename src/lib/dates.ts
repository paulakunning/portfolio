import type { YearMonth } from "@/content/types";
import type { Locale } from "@/i18n/config";

function formatMonth(locale: Locale, value: YearMonth): string {
  const [year, month] = value.split("-").map(Number) as [number, number];
  const parts = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(new Date(Date.UTC(year, month - 1, 1)));
  const monthName = parts.find((part) => part.type === "month")?.value ?? "";
  const yearText = parts.find((part) => part.type === "year")?.value ?? "";
  return `${monthName.charAt(0).toLocaleUpperCase(locale)}${monthName.slice(1)} ${yearText}`;
}

/** "Julio 2025 — Actualidad" / "March 2023 — July 2025" */
export function formatPeriod(
  locale: Locale,
  start: YearMonth,
  end: YearMonth | undefined,
  presentLabel: string,
): string {
  return `${formatMonth(locale, start)} — ${end ? formatMonth(locale, end) : presentLabel}`;
}
