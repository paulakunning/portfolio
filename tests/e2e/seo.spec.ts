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

const PNG_SIGNATURE = "89504e470d0a1a0a";

for (const path of [
  "/",
  "/en",
  "/proyectos",
  "/en/proyectos",
  "/contacto",
  "/en/contacto",
]) {
  test(`exposes a working share image on ${path}`, async ({
    page,
    request,
  }) => {
    await page.goto(path);
    const og = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    const twitter = await page
      .locator('meta[name="twitter:image"]')
      .getAttribute("content");
    expect(og).toBeTruthy();
    expect(twitter).toBeTruthy();

    const response = await request.get(new URL(og!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
    const body = await response.body();
    expect(body.length).toBeGreaterThan(5_000);
    expect(body.subarray(0, 8).toString("hex")).toBe(PNG_SIGNATURE);
    // IHDR holds width and height right after the signature and chunk header.
    expect(body.readUInt32BE(16)).toBe(1200);
    expect(body.readUInt32BE(20)).toBe(630);
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
