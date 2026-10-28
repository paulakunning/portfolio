import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const path of pages) {
  test(`has no axe violations: ${path}`, async ({ page }) => {
    // Cards not yet revealed are transparent on purpose; check the settled page.
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
