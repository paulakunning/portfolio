import { afterEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "@/lib/contact/send-email";
import { sendContactMessage } from "./actions";

vi.mock("@/lib/contact/send-email", () => ({ sendContactEmail: vi.fn() }));

const idle = { status: "idle" } as const;

const formData = (patch: Record<string, string> = {}) => {
  const data = new FormData();
  const fields = {
    name: "Ana Pérez",
    email: "ana@mail.com",
    reason: "job",
    message: "Hola, quiero contactarte.",
    locale: "es",
    website: "",
    ...patch,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

const sentEmail = () => vi.mocked(sendContactEmail).mock.calls[0]?.[0];

describe("sendContactMessage", () => {
  afterEach(() => {
    vi.mocked(sendContactEmail).mockReset();
    vi.restoreAllMocks();
  });

  it("pretends success and sends nothing when the honeypot is filled", async () => {
    const state = await sendContactMessage(
      idle,
      formData({ website: "spam.com" }),
    );
    expect(state).toEqual({ status: "success" });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("returns field errors and keeps the typed values", async () => {
    const state = await sendContactMessage(idle, formData({ email: "ana" }));
    expect(state).toMatchObject({
      status: "invalid",
      fieldErrors: { email: "invalid_email" },
      values: { name: "Ana Pérez", email: "ana" },
    });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("sends valid messages", async () => {
    const state = await sendContactMessage(idle, formData());
    expect(state).toEqual({ status: "success" });
    expect(sendContactEmail).toHaveBeenCalledTimes(1);
    expect(sentEmail()?.replyTo).toBe("ana@mail.com");
    expect(sentEmail()?.subject).toContain("Propuesta laboral");
  });

  it("returns an error and keeps the values when sending fails", async () => {
    vi.mocked(sendContactEmail).mockRejectedValue(new Error("Resend down"));
    const logError = vi.spyOn(console, "error").mockImplementation(() => {});

    const state = await sendContactMessage(idle, formData());

    expect(state).toMatchObject({
      status: "error",
      values: { message: "Hola, quiero contactarte." },
    });
    expect(logError).toHaveBeenCalled();
  });

  it("falls back to Spanish for an unknown locale", async () => {
    await sendContactMessage(idle, formData({ locale: "fr" }));
    expect(sentEmail()?.text).toContain("Idioma: es");
  });
});
