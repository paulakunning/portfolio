import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const path of pages) {
  test(`the largest element counts as painted from the start: ${path}`, async ({
    page,
  }) => {
    // Find the largest element with motion off: a fade can hold back its
    // Largest Contentful Paint, so with motion on it may not be reported yet.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries() as LargestContentfulPaint[];
            entries.at(-1)?.element?.setAttribute("data-lcp", "");
            resolve();
          }).observe({ type: "largest-contentful-paint", buffered: true });
        }),
    );
    // Motion back on restarts the entrance, so its animations can be read.
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const entrances = await page.locator("[data-lcp]").evaluate((largest) => {
      const found: { delay: number; from: unknown }[] = [];
      for (let el: Element | null = largest; el; el = el.parentElement) {
        for (const animation of el.getAnimations()) {
          const effect = animation.effect as KeyframeEffect;
          found.push({
            delay: Number(effect.getTiming().delay ?? 0),
            from: effect.getKeyframes()[0]?.opacity,
          });
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
