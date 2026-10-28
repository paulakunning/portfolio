import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const path of pages) {
  test(`has no axe violations: ${path}`, async ({ page }) => {
    // axe scans the settled page; the reveal's hidden/fading cards are transparent on purpose and are not scanned.
    if (path.endsWith("/proyectos")) {
      await page.emulateMedia({ reducedMotion: "reduce" });
    }
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations).toEqual([]);
  });
}

test.describe("narrow phones", () => {
  test.use({ viewport: { width: 360, height: 740 } });

  for (const path of pages) {
    test(`does not overflow horizontally at 360px: ${path}`, async ({
      page,
    }) => {
      await page.goto(path);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflows).toBe(false);
    });
  }
});
