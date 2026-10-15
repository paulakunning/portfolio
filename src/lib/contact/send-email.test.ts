import { Resend } from "resend";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "./send-email";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send } };
  }),
}));

const email = { subject: "Asunto", text: "Cuerpo", replyTo: "ana@mail.com" };

const configure = () => {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_TO_EMAIL", "paulakunning@gmail.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "Portfolio <contacto@paulakunning.com>");
};

describe("sendContactEmail", () => {
  beforeEach(() => {
    send.mockReset();
    vi.mocked(Resend).mockClear();
    for (const name of [
      "CONTACT_DRY_RUN",
      "RESEND_API_KEY",
      "CONTACT_TO_EMAIL",
      "CONTACT_FROM_EMAIL",
    ]) {
      vi.stubEnv(name, "");
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("logs instead of sending in dry-run mode", async () => {
    vi.stubEnv("CONTACT_DRY_RUN", "true");
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    await expect(sendContactEmail(email)).resolves.toBeUndefined();
    expect(Resend).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalled();
  });

  it("throws when configuration is missing", async () => {
    await expect(sendContactEmail(email)).rejects.toThrow(
      "Contact email is not configured",
    );
    expect(send).not.toHaveBeenCalled();
  });

  it("sends a plain-text email with reply-to", async () => {
    configure();
    send.mockResolvedValue({ data: { id: "email_1" }, error: null });

    await sendContactEmail(email);

    expect(Resend).toHaveBeenCalledWith("re_test");
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({
      from: "Portfolio <contacto@paulakunning.com>",
      to: "paulakunning@gmail.com",
      replyTo: "ana@mail.com",
      subject: "Asunto",
      text: "Cuerpo",
    });
  });

  it("throws when Resend reports an error", async () => {
    configure();
    send.mockResolvedValue({ data: null, error: { message: "boom" } });

    await expect(sendContactEmail(email)).rejects.toThrow("boom");
  });
});
