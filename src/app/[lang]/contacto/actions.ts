"use server";

import { defaultLocale, isLocale } from "@/i18n/config";
import { buildContactEmail } from "@/lib/contact/build-email";
import {
  parseContactForm,
  type ContactState,
  type ContactValues,
} from "@/lib/contact/schema";
import { sendContactEmail } from "@/lib/contact/send-email";

const text = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
};

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots fill every field; people never see this one. Pretend it worked.
  if (text(formData, "website")) return { status: "success" };

  const values: ContactValues = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    reason: text(formData, "reason"),
    message: text(formData, "message"),
  };
  const result = parseContactForm(values);
  if (!result.success) {
    return { status: "invalid", fieldErrors: result.fieldErrors, values };
  }

  const locale = text(formData, "locale");
  const email = buildContactEmail(result.data, {
    locale: isLocale(locale) ? locale : defaultLocale,
    sentAt: new Date(),
  });

  try {
    await sendContactEmail({ ...email, replyTo: result.data.email });
    return { status: "success" };
  } catch (error) {
    console.error("Contact form: the email could not be sent.", error);
    return { status: "error", values };
  }
}
