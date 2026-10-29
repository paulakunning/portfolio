import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const path of pages) {
  test(`the largest element counts as painted from the start: ${path}`, async ({
    page,
  }) => {
    // Find the largest element with motion off: a fade can hold back its
    // Largest Contentful Paint, so with motion on it may not be reported yet.
    await page.emulateMedia({ reducedMotion: "reduce" });
    // networkidle: on /proyectos the h1 paints first and the first card's image takes over once it loads.
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          new PerformanceObserver((list, observer) => {
            observer.disconnect();
            // Every candidate so far, not just the last: a slower image may still take over.
            for (const entry of list.getEntries() as LargestContentfulPaint[]) {
              entry.element?.setAttribute("data-lcp", "");
            }
            resolve();
          }).observe({ type: "largest-contentful-paint", buffered: true });
        }),
    );
    const candidates = page.locator("[data-lcp]");
    await expect(candidates).not.toHaveCount(0);
    // Motion back on restarts the entrance, so its animations can be read.
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const entrances = await candidates.evaluateAll((elements) => {
      const found: { delay: number; from: unknown }[] = [];
      for (const candidate of elements) {
        for (let el: Element | null = candidate; el; el = el.parentElement) {
          for (const animation of el.getAnimations()) {
            const effect = animation.effect as KeyframeEffect;
            found.push({
              delay: Number(effect.getTiming().delay ?? 0),
              from: effect.getKeyframes()[0]?.opacity,
            });
          }
        }
      }
      return found;
    });
    for (const { delay, from } of entrances) {
      expect(delay).toBe(0);
      // A paint at opacity 0 doesn't count, see --animate-enter.
      expect(from).not.toBe("0");
    }
  });
}

test("the hero text fades in on load", async ({ page }) => {
  await page.goto("/");
  for (const selector of ["#hero-title", "#hero-title + p"]) {
    expect(
      await page
        .locator(selector)
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("enter");
  }
});
