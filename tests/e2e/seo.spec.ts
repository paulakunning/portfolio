import { expect, test } from "@playwright/test";

test("serves the sitemap", async ({ request }) => {
  const response = await request.get("/sitemap.xml");

  expect(response.status()).toBe(200);
  expect(await response.text()).toContain(
    "https://paulakunning.com/en/proyectos/don-higinio",
  );
});

test("serves robots.txt", async ({ request }) => {
  const response = await request.get("/robots.txt");

  expect(response.status()).toBe(200);
  expect(await response.text()).toContain(
    "Sitemap: https://paulakunning.com/sitemap.xml",
  );
});

for (const path of ["/", "/en"]) {
  test(`exposes a working Open Graph image on ${path}`, async ({
    page,
    request,
  }) => {
    await page.goto(path);
    const content = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(content).toBeTruthy();

    const response = await request.get(new URL(content!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
  });
}

test("uses the cover as the Open Graph image of a project", async ({
  page,
}) => {
  await page.goto("/proyectos/don-higinio");

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/_next\/static\/media\//,
  );
});
