import { z } from "zod";

export const contactReasons = ["job", "freelance", "other"] as const;

export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

export type ContactField = "name" | "email" | "reason" | "message";

export type ContactErrorCode =
  "required" | "too_short" | "too_long" | "invalid_email" | "invalid_option";

export type ContactValues = Record<ContactField, string>;

export type ContactFieldErrors = Partial<
  Record<ContactField, ContactErrorCode>
>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "invalid";
      fieldErrors: ContactFieldErrors;
      values: ContactValues;
    }
  | { status: "error"; values: ContactValues };

// Error messages are codes; the form translates them with the dictionary.
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "required" })
    .min(contactLimits.name.min, { error: "too_short" })
    .max(contactLimits.name.max, { error: "too_long" }),
  email: z
    .string()
    .trim()
    .min(1, { error: "required" })
    .max(contactLimits.email.max, { error: "too_long" })
    .pipe(z.email({ error: "invalid_email" })),
  reason: z.enum(contactReasons, { error: "invalid_option" }),
  message: z
    .string()
    .trim()
    .min(1, { error: "required" })
    .min(contactLimits.message.min, { error: "too_short" })
    .max(contactLimits.message.max, { error: "too_long" }),
});

export type ContactMessage = z.infer<typeof contactSchema>;

export function parseContactForm(
  values: ContactValues,
):
  | { success: true; data: ContactMessage }
  | { success: false; fieldErrors: ContactFieldErrors } {
  const result = contactSchema.safeParse(values);
  if (result.success) return { success: true, data: result.data };

  const { fieldErrors } = z.flattenError(result.error);
  const firstErrors: ContactFieldErrors = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    // Each field reports only its first problem.
    firstErrors[field as ContactField] = messages?.[0] as ContactErrorCode;
  }
  return { success: false, fieldErrors: firstErrors };
}
