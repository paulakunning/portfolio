import { expect, test, type Page } from "@playwright/test";

const labels = {
  es: {
    name: "Nombre",
    email: "Email",
    reason: "Motivo",
    message: "Mensaje",
    submit: "Enviar mensaje",
  },
  en: {
    name: "Name",
    email: "Email",
    reason: "Reason",
    message: "Message",
    submit: "Send message",
  },
};

type FormInput = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

async function submitForm(page: Page, input: FormInput, l = labels.es) {
  await page.getByLabel(l.name).fill(input.name);
  await page.getByLabel(l.email).fill(input.email);
  await page.getByLabel(l.reason).selectOption({ label: input.reason });
  await page.getByLabel(l.message).fill(input.message);
  await page.getByRole("button", { name: l.submit }).click();
}

// Passes the browser's own validation (required, minLength, type=email)
// but fails the server's rules once trimmed.
const onlyServerInvalid = (reason: string): FormInput => ({
  name: "  ",
  email: "a@b",
  reason,
  message: " ".repeat(10),
});

const valid: FormInput = {
  name: "Ana Pérez",
  email: "ana@mail.com",
  reason: "Proyecto freelance",
  message: "Hola Paula, me gustaría charlar sobre un sitio nuevo.",
};

test("shows server-side errors and focuses the first invalid field", async ({
  page,
}) => {
  await page.goto("/contacto");
  await submitForm(page, onlyServerInvalid("Otro"));

  await expect(page.getByText("Completá este campo.")).toHaveCount(2);
  await expect(page.getByText("Ingresá un email válido.")).toBeVisible();
  await expect(page.getByLabel("Email")).toHaveValue("a@b");
  await expect(page.getByLabel("Motivo")).toHaveValue("other");
  const name = page.getByLabel("Nombre");
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
});

test("shows English errors on /en/contacto", async ({ page }) => {
  await page.goto("/en/contacto");
  await submitForm(page, onlyServerInvalid("Other"), labels.en);
  await expect(page.getByText("Please fill in this field.")).toHaveCount(2);
});

test("sends a valid message and shows the thank-you message", async ({
  page,
}) => {
  await page.goto("/contacto");
  await submitForm(page, valid);

  const thanks = page.getByRole("heading", {
    name: "¡Gracias por escribirme!",
  });
  await expect(thanks).toBeVisible();
  await expect(thanks).toBeFocused();
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("works without JavaScript", async ({ page }) => {
    await page.goto("/contacto");
    await submitForm(page, valid);
    await expect(
      page.getByRole("heading", { name: "¡Gracias por escribirme!" }),
    ).toBeVisible();
  });
});

test("the form fits on a 1280×800 screen", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop layout");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/contacto");
  const submit = (await page
    .getByRole("button", { name: "Enviar mensaje" })
    .boundingBox())!;
  expect(submit.y + submit.height).toBeLessThanOrEqual(800);
  await expect(
    page.getByRole("img", { name: /Paula sonriendo/ }),
  ).toBeVisible();
});
