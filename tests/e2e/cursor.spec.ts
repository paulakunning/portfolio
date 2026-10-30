import { expect, test } from "@playwright/test";

test.describe("custom cursor", () => {
  test.skip(({ isMobile }) => isMobile, "mouse only");

  test("turns into Ver over a project and goes light over the footer", async ({
    page,
  }) => {
    await page.goto("/proyectos");
    const arrow = page.locator("[data-cursor-arrow]");
    const glow = page.locator("[data-cursor-glow]");

    await page.getByRole("heading", { level: 1 }).hover();
    await expect(arrow).toHaveAttribute("data-visible", "");
    await expect(arrow).toHaveAttribute("data-zone", "");
    await expect(glow).toHaveAttribute("data-visible", "");

    await page.locator("article").first().hover();
    await expect(arrow).toHaveAttribute("data-zone", "view");
    await expect(arrow).toContainText("Ver");
    await expect(glow).not.toHaveAttribute("data-visible");

    await page.getByRole("contentinfo").hover();
    await expect(arrow).toHaveAttribute("data-zone", "dark");
  });

  test("reel covers link to their project", async ({ page }) => {
    await page.goto("/");
    const cover = page.locator("[data-reel-image]").first();
    await cover.scrollIntoViewIfNeeded();
    await cover.click();
    await expect(page).toHaveURL(/\/proyectos\/don-higinio$/);
  });

  test("form fields keep the native caret", async ({ page }) => {
    await page.goto("/contacto");
    const field = page.getByRole("textbox").first();
    await field.hover();
    await expect(page.locator("[data-cursor-arrow]")).not.toHaveAttribute(
      "data-visible",
    );
    expect(await field.evaluate((el) => getComputedStyle(el).cursor)).toBe(
      "auto",
    );
  });
});

test("touch screens keep the native cursor", async ({ page, isMobile }) => {
  test.skip(!isMobile, "touch only");
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveAttribute("data-custom-cursor");
});
