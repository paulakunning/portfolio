import { expect, test } from "@playwright/test";
import { disableScrollAnchoring } from "./no-scroll-anchoring";

test("renders the home sections in order", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "Proyectos destacados",
    "Hola, soy Paula",
    "Experiencia",
    "Testimonios",
    "¿Tenés una idea en mente? Me encantaría hacerla realidad",
  ]);
});

test("lists the tools and what Paula is learning", async ({ page }) => {
  const cases = [
    ["/", "Hola, soy Paula", "Ahora estoy aprendiendo Next.js y Framer."],
    ["/en", "Hi, I'm Paula", "Currently learning Next.js and Framer."],
  ] as const;
  for (const [path, region, line] of cases) {
    await page.goto(path);
    const about = page.getByRole("region", { name: region });
    await expect(
      about.getByRole("listitem").filter({ hasText: "Figma" }),
    ).toHaveCount(1);
    await expect(
      about.getByRole("listitem").filter({ hasText: "Next.js" }),
    ).toHaveCount(0);
    await expect(about.getByText(line)).toBeVisible();
  }
});

test("the experience title stops beside the last job", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "sticky only from md");
  await page.goto("/");
  const section = page.getByRole("region", { name: "Experiencia" });
  await section.evaluate((el) =>
    scrollTo({
      top: el.getBoundingClientRect().bottom + scrollY - 150,
      behavior: "instant",
    }),
  );
  const title = await section.getByRole("heading", { level: 2 }).boundingBox();
  const lastJob = await section.locator("[data-job]").last().boundingBox();
  expect(Math.abs(title!.y - lastJob!.y)).toBeLessThan(2);
});

test("links the CV for each language", async ({ page, request }) => {
  await page.goto("/");
  const spanish = page
    .getByRole("main")
    .getByRole("link", { name: /Ver mi CV/ });
  await expect(spanish).toHaveAttribute("href", "/cv/paula-kunning-cv-es.pdf");

  await page.goto("/en");
  const english = page
    .getByRole("main")
    .getByRole("link", { name: /View my resume/ });
  await expect(english).toHaveAttribute(
    "href",
    "/cv/paula-kunning-resume-en.pdf",
  );

  for (const path of [
    "/cv/paula-kunning-cv-es.pdf",
    "/cv/paula-kunning-resume-en.pdf",
  ]) {
    expect((await request.get(path)).status()).toBe(200);
  }
});

test("shows the five featured projects and a link to all", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-reel-card]")).toHaveCount(5);
  // Enter, not click: on desktop the card is off-screen until focus scrolls to it.
  await page.getByRole("link", { name: "Ver los 14 proyectos" }).press("Enter");
  await expect(page).toHaveURL(/\/proyectos$/);
});

test.describe("desktop reel", () => {
  test.skip(({ isMobile }) => isMobile, "pinned only on desktop");

  test("scrolling moves the strip sideways", async ({ page }) => {
    await page.goto("/");
    const reel = page.locator("#proyectos");
    await expect(reel).toHaveAttribute("data-pinned");
    const card = page.locator("[data-reel-card]").first();
    await reel.evaluate((el: HTMLElement) =>
      scrollTo({ top: el.offsetTop, behavior: "instant" }),
    );
    const start = (await card.boundingBox())!.x;
    await page.mouse.wheel(0, 600);
    await expect
      .poll(async () => (await card.boundingBox())!.x)
      .toBeLessThan(start - 300);
  });

  test("tabbing to an off-screen card brings it into view", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("#proyectos")).toHaveAttribute("data-pinned");
    await page.getByRole("link", { name: "Ver proyecto DéDé Digital" }).focus();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Ver proyecto Lucrecia Cornaglia" }),
    ).toBeInViewport();
  });

  test("a mouse click on a reel link follows it", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#proyectos")).toHaveAttribute("data-pinned");
    await page
      .locator("#proyectos")
      .evaluate((el: HTMLElement) =>
        scrollTo({ top: el.offsetTop, behavior: "instant" }),
      );
    // delay: the page must not move between mousedown and mouseup
    await page
      .getByRole("link", { name: "Ver proyecto Don Higinio" })
      .click({ delay: 100 });
    await expect(page).toHaveURL(/\/proyectos\/don-higinio$/);
  });

  test("Enter on Ver proyectos leaves focus in the reel", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#proyectos")).toHaveAttribute("data-pinned");
    const button = page.getByRole("link", {
      name: "Ver proyectos",
      exact: true,
    });
    await button.focus();
    await button.press("Enter");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Ver todos los proyectos" }),
    ).toBeFocused();
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(400);
  });

  test("a full page load on #sobre-mi lands on the about section", async ({
    page,
  }) => {
    await disableScrollAnchoring(page);
    await page.goto("/#sobre-mi");
    const title = page.getByRole("heading", {
      level: 2,
      name: "Hola, soy Paula",
    });
    await expect(title).toBeInViewport();
    expect((await title.boundingBox())!.y).toBeLessThan(400);
  });

  test("pinning later doesn't jump back to the #hash", async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto("/#sobre-mi");
    // Wait for hydration (the carousel button works): widening before it makes this the initial pin.
    await expect(async () => {
      await page.getByRole("button", { name: "Proyecto siguiente" }).click();
      expect(
        await page.locator("[data-reel-list]").evaluate((el) => el.scrollLeft),
      ).toBeGreaterThan(0);
    }).toPass();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.locator("#proyectos")).toHaveAttribute("data-pinned");
    // Two frames: the pinned effect has run.
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(10);
  });

  test("falls back to the carousel when the window gets narrow", async ({
    page,
  }) => {
    await page.goto("/");
    const reel = page.locator("#proyectos");
    await expect(reel).toHaveAttribute("data-pinned");
    await page.setViewportSize({ width: 800, height: 800 });
    await expect(reel).not.toHaveAttribute("data-pinned");
    await expect(reel).not.toHaveAttribute("style", /height/);
    expect(
      await page
        .locator("[data-reel-strip]")
        .evaluate((el) => getComputedStyle(el).transform),
    ).toBe("none");
  });
});

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test.describe(`carousel reel, ${reducedMotion} motion`, () => {
    // Without reduced motion the reel only stays a carousel on the narrow project.
    test.skip(
      ({ isMobile }) => reducedMotion === "no-preference" && !isMobile,
      "pinned on desktop",
    );
    test.use({ reducedMotion });

    test("is a carousel moved by its buttons", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("#proyectos")).not.toHaveAttribute(
        "data-pinned",
      );
      await page.getByRole("button", { name: "Proyecto siguiente" }).click();
      await expect
        .poll(() =>
          page.locator("[data-reel-list]").evaluate((el) => el.scrollLeft),
        )
        .toBeGreaterThan(0);
    });
  });
}

test("formats experience periods", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Julio 2025 — Actualidad")).toBeVisible();
  await expect(page.getByText("Marzo 2023 — Julio 2025")).toBeVisible();

  await page.goto("/en");
  await expect(page.getByText("July 2025 — Present")).toBeVisible();
});

test("hero tiles can be dragged", async ({ page, isMobile }) => {
  test.skip(isMobile, "mouse drag");
  await page.goto("/");
  const tile = page.locator('[data-tile="Figma"]');
  await expect(page.getByText("Podés mover las herramientas")).toBeVisible();
  const before = (await tile.boundingBox())!;
  await page.mouse.move(before.x + 30, before.y + 30);
  await page.mouse.down();
  await page.mouse.move(before.x + 230, before.y + 130, { steps: 5 });
  await page.mouse.up();
  // poll: the tile eases out of its tilted "dragging" pose after mouseup
  await expect
    .poll(async () => (await tile.boundingBox())!.x - before.x)
    .toBeCloseTo(200, -1);
  await expect
    .poll(async () => (await tile.boundingBox())!.y - before.y)
    .toBeCloseTo(100, -1);
  await expect(page.getByText("Podés mover las herramientas")).toBeHidden();
});

test("only the tiles take over touch gestures", async ({ page, isMobile }) => {
  test.skip(!isMobile, "touch");
  await page.goto("/");
  const touchAction = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate((el) => getComputedStyle(el).touchAction);
  expect(await touchAction("[data-tile]")).toBe("none");
  expect(await touchAction("#hero-title")).not.toBe("none");
});
