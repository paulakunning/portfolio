import { Resend } from "resend";

type ContactEmail = { subject: string; text: string; replyTo: string };

/** Sends the contact email to Paula. Reads configuration on every call. */
export async function sendContactEmail(email: ContactEmail): Promise<void> {
  if (process.env.CONTACT_DRY_RUN === "true") {
    console.info(`[contact dry run] ${email.subject}\n${email.text}`);
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    throw new Error("Contact email is not configured");
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo: email.replyTo,
    subject: email.subject,
    // Plain text only: the visitor's input is never interpreted as HTML.
    text: email.text,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}
