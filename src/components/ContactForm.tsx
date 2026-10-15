"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  type FormEvent,
} from "react";
import { sendContactMessage } from "@/app/[lang]/contacto/actions";
import { contactLinks } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { formatMessage } from "@/i18n/format";
import {
  contactLimits,
  contactReasons,
  type ContactField,
  type ContactState,
} from "@/lib/contact/schema";

type ContactFormProps = {
  locale: Locale;
  labels: Dictionary["contact"]["form"];
};

const fieldOrder: ContactField[] = ["name", "email", "reason", "message"];
const initialState: ContactState = { status: "idle" };

const inputClasses =
  "mt-2 block w-full rounded-lg border border-foreground/30 bg-background px-4 py-3 text-foreground aria-[invalid=true]:border-error";

export function ContactForm({ locale, labels }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.status === "success") thanksRef.current?.focus();
    if (state.status === "invalid") {
      const first = fieldOrder.find((field) => state.fieldErrors[field]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-secondary/25 p-8">
        <h2
          ref={thanksRef}
          tabIndex={-1}
          className="text-3xl italic outline-none"
        >
          {labels.successTitle}
        </h2>
        <p className="mt-3">{labels.successBody}</p>
      </div>
    );
  }

  const values =
    state.status === "invalid" || state.status === "error"
      ? state.values
      : undefined;
  const errors = state.status === "invalid" ? state.fieldErrors : {};

  const errorProps = (field: ContactField) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const errorMessage = (field: ContactField) => {
    const code = errors[field];
    if (!code) return null;
    const limits = field === "reason" ? {} : contactLimits[field];
    return (
      <p id={`${field}-error`} className="mt-2 text-sm text-error">
        {formatMessage(labels.errors[code], limits)}
      </p>
    );
  };

  const [errorBefore, errorAfter] = labels.error.split("{email}");

  // With JavaScript, submit manually so React doesn't reset the form: a reset
  // would clear what the person typed (selects ignore defaultValue on reset).
  // Without JavaScript, the native form action still posts to the server.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="grid gap-6"
    >
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: invisible to people and assistive tech, filled by bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="font-medium">
            {labels.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={contactLimits.name.min}
            maxLength={contactLimits.name.max}
            defaultValue={values?.name}
            className={inputClasses}
            {...errorProps("name")}
          />
          {errorMessage("name")}
        </div>

        <div>
          <label htmlFor="contact-email" className="font-medium">
            {labels.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={contactLimits.email.max}
            defaultValue={values?.email}
            className={inputClasses}
            {...errorProps("email")}
          />
          {errorMessage("email")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-reason" className="font-medium">
          {labels.reason}
        </label>
        <select
          id="contact-reason"
          name="reason"
          required
          defaultValue={values?.reason ?? ""}
          className={inputClasses}
          {...errorProps("reason")}
        >
          <option value="" disabled>
            {labels.reasonPlaceholder}
          </option>
          {contactReasons.map((reason) => (
            <option key={reason} value={reason}>
              {labels.reasons[reason]}
            </option>
          ))}
        </select>
        {errorMessage("reason")}
      </div>

      <div>
        <label htmlFor="contact-message" className="font-medium">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          minLength={contactLimits.message.min}
          maxLength={contactLimits.message.max}
          defaultValue={values?.message}
          className={inputClasses}
          {...errorProps("message")}
        />
        {errorMessage("message")}
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-accent/40 p-4">
          {errorBefore}
          <a
            href={`mailto:${contactLinks.email}`}
            className="font-medium text-primary underline underline-offset-4"
          >
            {contactLinks.email}
          </a>
          {errorAfter}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="justify-self-start rounded-full bg-primary px-8 py-3 text-sm font-medium tracking-wide text-background uppercase transition-colors hover:bg-primary/85 disabled:opacity-60"
      >
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
