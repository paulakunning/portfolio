import type { Page } from "@playwright/test";

/** Chromium's scroll anchoring would hide a missing re-scroll; Safari has none. */
export async function disableScrollAnchoring(page: Page) {
  await page.addInitScript(() => {
    new MutationObserver((_, observer) => {
      if (!document.head) return;
      const style = document.createElement("style");
      style.textContent = "html { overflow-anchor: none }";
      document.head.append(style);
      observer.disconnect();
    }).observe(document, { childList: true, subtree: true });
  });
}
