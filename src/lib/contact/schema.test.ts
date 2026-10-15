import { describe, expect, it } from "vitest";
import { parseContactForm, type ContactValues } from "./schema";

const valid: ContactValues = {
  name: "  Ana Pérez ",
  email: " ana@mail.com ",
  reason: "job",
  message: "  Hola, quiero contactarte.  ",
};

const errorsFor = (patch: Partial<ContactValues>) => {
  const result = parseContactForm({ ...valid, ...patch });
  return result.success ? undefined : result.fieldErrors;
};

describe("parseContactForm", () => {
  it("accepts valid input and trims it", () => {
    expect(parseContactForm(valid)).toEqual({
      success: true,
      data: {
        name: "Ana Pérez",
        email: "ana@mail.com",
        reason: "job",
        message: "Hola, quiero contactarte.",
      },
    });
  });

  it.each([
    [{ name: "" }, "name", "required"],
    [{ name: "   " }, "name", "required"],
    [{ name: "A" }, "name", "too_short"],
    [{ name: "A".repeat(101) }, "name", "too_long"],
    [{ email: "" }, "email", "required"],
    [{ email: "ana" }, "email", "invalid_email"],
    [{ email: "a@b" }, "email", "invalid_email"],
    [{ email: `${"a".repeat(250)}@mail.com` }, "email", "too_long"],
    [{ reason: "" }, "reason", "invalid_option"],
    [{ reason: "spam" }, "reason", "invalid_option"],
    [{ message: "" }, "message", "required"],
    [{ message: "          " }, "message", "required"],
    [{ message: "corto" }, "message", "too_short"],
    [{ message: "a".repeat(5001) }, "message", "too_long"],
  ] as const)("%o → %s: %s", (patch, field, code) => {
    expect(errorsFor(patch)?.[field]).toBe(code);
  });
});
