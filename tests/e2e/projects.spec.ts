import { expect, test, type Locator, type Page } from "@playwright/test";

const pathnameOf = (page: Page) => new URL(page.url()).pathname;
const menuToggle = (page: Page) =>
  page.locator('button[aria-controls="site-menu"]');

test("filters projects by category and marks the active tab", async ({
  page,
}) => {
  await page.goto("/proyectos");
  const filters = page.getByRole("group", {
    name: "Filtrar proyectos por categoría",
  });
  await filters.getByRole("button", { name: "Branding" }).click();

  await expect(
    filters.getByRole("button", { name: "Branding" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(filters.getByRole("button", { name: "Todos" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(page.getByRole("article").getByRole("heading")).toHaveText([
    "Uniform",
    "Lucrecia Cornaglia",
  ]);
  await expect(page.getByRole("main").getByRole("status")).toHaveText(
    "2 proyectos",
  );
});

test("opens a project and walks to the next one", async ({ page }) => {
  await page.goto("/proyectos");
  await page.getByRole("link", { name: "Don Higinio" }).click();
  await expect(page).toHaveURL(/\/proyectos\/don-higinio$/);
  // Next keeps the previous page hidden in the DOM (Activity); match visible only.
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Don Higinio",
  );

  await page.getByRole("link", { name: /Factchequeado Lab/ }).click();
  await expect(page).toHaveURL(/\/proyectos\/factchequeado-lab$/);

  await page.getByRole("link", { name: "Volver a proyectos" }).click();
  await expect(page).toHaveURL(/\/proyectos$/);
});

test("wraps from the last project to the first", async ({ page }) => {
  await page.goto("/proyectos/lucrecia-cornaglia");
  await page.getByRole("link", { name: /Siguiente proyecto/ }).click();
  await expect(page).toHaveURL(/\/proyectos\/don-higinio$/);
});

test("shows conceptual projects as such", async ({ page }) => {
  await page.goto("/proyectos/uniform");
  await expect(page.getByText("Conceptual", { exact: true })).toBeVisible();
});

test("shows a localized 404 for unknown slugs", async ({ page }) => {
  const spanish = await page.goto("/proyectos/no-existe");
  expect(spanish?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Página no encontrada");

  const english = await page.goto("/en/proyectos/nope");
  expect(english?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Page not found");
});

test("keeps the project when switching language", async ({
  page,
  isMobile,
}) => {
  await page.goto("/proyectos/arqci");
  if (isMobile) await menuToggle(page).click();
  await page.getByRole("link", { name: "Ver esta página en inglés" }).click();
  expect(pathnameOf(page)).toBe("/en/proyectos/arqci");
  await expect(page.locator("h1")).toHaveText("ARQCI");
});

test("links out to the live site or Behance in a new tab", async ({ page }) => {
  await page.goto("/proyectos/don-higinio");
  const link = page.getByRole("link", { name: /Ir a la web/ });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("href", "https://dhmayorista.com.ar/");
});

test("shows the project count next to the tabs", async ({ page }) => {
  await page.goto("/proyectos");
  const count = page.getByText("14 proyectos");
  await expect(count).toBeVisible();
  // Not the old sr-only 1px box.
  expect((await count.boundingBox())?.width).toBeGreaterThan(50);
});

const opacityOf = (card: Locator) =>
  card.evaluate((el) => getComputedStyle(el).opacity);

test("cards below the fold start hidden and appear when scrolled into view", async ({
  page,
}) => {
  await page.goto("/proyectos");
  const last = page.getByRole("article").last();
  await expect(last).toHaveAttribute("data-reveal", "hidden");
  await expect.poll(() => opacityOf(last)).toBe("0");
  await last.scrollIntoViewIfNeeded();
  await expect(last).toHaveAttribute("data-reveal", "shown");
  await expect.poll(() => opacityOf(last)).toBe("1");
});

test("no card stays hidden after switching tabs quickly", async ({ page }) => {
  await page.goto("/proyectos");
  const filters = page.getByRole("group", {
    name: "Filtrar proyectos por categoría",
  });
  await filters.getByRole("button", { name: "Branding" }).click();
  await filters.getByRole("button", { name: "Todos" }).click();
  const cards = page.getByRole("article");
  await expect(cards.last()).toHaveAttribute("data-reveal", "hidden");
  for (const card of await cards.all()) {
    await card.scrollIntoViewIfNeeded();
    await expect.poll(() => opacityOf(card)).toBe("1");
  }
  await expect(page.locator('[data-reveal="hidden"]')).toHaveCount(0);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("every card is visible", async ({ page }) => {
    await page.goto("/proyectos");
    await expect(page.getByRole("article")).toHaveCount(14);
    expect(
      await page
        .getByRole("article")
        .last()
        .evaluate((el) => getComputedStyle(el).opacity),
    ).toBe("1");
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("cards are never hidden", async ({ page }) => {
    await page.goto("/proyectos");
    expect(
      await page
        .getByRole("article")
        .last()
        .evaluate((el) => getComputedStyle(el).opacity),
    ).toBe("1");
  });
});
