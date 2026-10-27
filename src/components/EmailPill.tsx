"use client";

import { useEffect, useRef, useState } from "react";
import { formatMessage } from "@/i18n/format";

type EmailPillProps = {
  email: string;
  labels: { copy: string; copied: string; copyFailed: string };
};

export function EmailPill({ email, labels }: EmailPillProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      // Stays until the next click so the address can be read.
      setState("failed");
    }
  }

  return (
    <>
      <div className="inline-flex max-w-full items-center gap-4 rounded-full border border-background/25 py-1 pr-1 pl-5">
        <a
          href={`mailto:${email}`}
          className="min-w-0 [overflow-wrap:anywhere]"
        >
          {email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="min-h-9 rounded-full bg-background/12 px-4 text-sm font-medium transition-colors hover:bg-background/20"
        >
          {state === "copied" ? labels.copied : labels.copy}
        </button>
      </div>
      {/* Always mounted so the result is announced; on failure it is also shown. */}
      <span
        role="status"
        className={
          state === "failed"
            ? "order-last basis-full text-sm text-background/75"
            : "sr-only"
        }
      >
        {state === "copied" && labels.copied}
        {state === "failed" && formatMessage(labels.copyFailed, { email })}
      </span>
    </>
  );
}
