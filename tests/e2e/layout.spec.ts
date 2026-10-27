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

test("Sobre mí lands on the about section from another page", async ({
  page,
  isMobile,
}) => {
  const cases: [string, string, string][] = [
    ["/proyectos", "Sobre mí", "Hola, soy Paula"],
    ["/en/proyectos", "About", "Hi, I'm Paula"],
  ];
  for (const [from, label, heading] of cases) {
    await page.goto(from);
    if (isMobile) await menuToggle(page).click();
    await page
      .getByRole("navigation", { name: /Principal|Main/ })
      .getByRole("link", { name: label })
      .click();
    await expect(page).toHaveURL(/#sobre-mi$/);
    const title = page.getByRole("heading", { level: 2, name: heading });
    await expect(title).toBeInViewport();
  }
});

test("mobile menu closes after a same-page Sobre mí link", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const toggle = menuToggle(page);

  await toggle.click();
  await page
    .locator("#site-menu")
    .getByRole("link", { name: "Sobre mí" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("heading", { level: 2, name: "Hola, soy Paula" }),
  ).toBeInViewport();
});

test("header CTA leads to the contact page", async ({ page }) => {
  await page.goto("/");
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

test.describe("copy email", () => {
  test("copies the address and confirms", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await footer.getByRole("button", { name: "Copiar" }).click();
    await expect(footer.getByRole("button", { name: "Copiado" })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "paulakunning@gmail.com",
    );
  });

  test("shows the address when the clipboard fails", async ({ page }) => {
    await page.addInitScript(() => {
      navigator.clipboard.writeText = () => Promise.reject(new Error("denied"));
    });
    await page.goto("/");
    await page
      .getByRole("contentinfo")
      .getByRole("button", { name: "Copiar" })
      .click();
    const message = page.getByText(
      "No se pudo copiar. El mail es paulakunning@gmail.com",
    );
    await expect(message).toBeVisible();

    const cv = page
      .getByRole("contentinfo")
      .getByRole("link", { name: /Ver mi CV/ });
    const [m, c] = [await message.boundingBox(), await cv.boundingBox()];
    expect(m && c).toBeTruthy();
    const overlaps =
      m!.x < c!.x + c!.width &&
      c!.x < m!.x + m!.width &&
      m!.y < c!.y + c!.height &&
      c!.y < m!.y + m!.height;
    expect(overlaps).toBe(false);

    // The address stays readable until the next click.
    await page.waitForTimeout(2500);
    await expect(message).toBeVisible();
  });
});

test("the footer closes every page except contact", async ({ page }) => {
  const title = "¿Tenés una idea en mente? Me encantaría hacerla realidad";
  await page.goto("/proyectos");
  await expect(
    page.getByRole("contentinfo").getByRole("heading", { name: title }),
  ).toBeVisible();
  await page.goto("/contacto");
  await expect(page.getByRole("contentinfo").getByRole("heading")).toHaveCount(
    0,
  );
});

test("footer credits and back to top", async ({ page }) => {
  await page.goto("/en");
  const footer = page.getByRole("contentinfo");
  await expect(footer).toContainText(
    "Designed & built by me, with a little help from AI.",
  );
  await expect(
    footer.getByRole("link", { name: "Back to top" }),
  ).toHaveAttribute("href", "#");
});
