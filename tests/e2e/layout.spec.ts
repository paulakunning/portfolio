import { expect, test, type Page } from "@playwright/test";

const pathnameOf = (page: Page) => new URL(page.url()).pathname;
const menuToggle = (page: Page) =>
  page.locator('button[aria-controls="site-menu"]');

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Ir al contenido" }),
  ).toBeFocused();

  await page.keyboard.press("Enter");
  await expect
    .poll(() => page.evaluate(() => document.activeElement?.id))
    .toBe("main");
});

test("language switch keeps the current page", async ({ page, isMobile }) => {
  await page.goto("/contacto");
  if (isMobile) await menuToggle(page).click();
  await page.getByRole("link", { name: "Ver esta página en inglés" }).click();
  await expect.poll(() => pathnameOf(page)).toBe("/en/contacto");

  if (isMobile) await menuToggle(page).click();
  await page.getByRole("link", { name: "View this page in Spanish" }).click();
  await expect.poll(() => pathnameOf(page)).toBe("/contacto");
});

test("marks the current section in the navigation", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "the desktop navigation is hidden behind the menu");
  await page.goto("/proyectos");
  await expect(
    page
      .getByRole("navigation", { name: "Principal" })
      .getByRole("link", { name: "Proyectos" }),
  ).toHaveAttribute("aria-current", "page");
});

test("header CTA leads to the contact page", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await menuToggle(page).click();
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Hablemos" })
    .click();
  await expect.poll(() => pathnameOf(page)).toBe("/contacto");
});

test("mobile menu opens, closes with Escape and restores focus", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const toggle = menuToggle(page);

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.locator("#site-menu").getByRole("link", { name: "Proyectos" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("mobile menu closes after navigating", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const toggle = menuToggle(page);

  await toggle.click();
  await page
    .locator("#site-menu")
    .getByRole("link", { name: "Contacto" })
    .click();
  await expect.poll(() => pathnameOf(page)).toBe("/contacto");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("footer lists every contact channel", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  for (const href of [
    "mailto:paulakunning@gmail.com",
    "https://www.linkedin.com/in/paula-kunning/",
    "https://www.behance.net/paulakunning",
    "https://github.com/paulakunning",
  ]) {
    await expect(footer.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
});
