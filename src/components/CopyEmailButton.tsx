"use client";

import { useEffect, useRef, useState } from "react";
import { formatMessage } from "@/i18n/format";

type CopyEmailButtonProps = {
  email: string;
  labels: { copy: string; copied: string; copyFailed: string };
};

export function CopyEmailButton({ email, labels }: CopyEmailButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="min-h-9 rounded-full bg-background/12 px-4 text-sm font-medium transition-colors hover:bg-background/20"
      >
        {state === "copied" ? labels.copied : labels.copy}
      </button>
      {/* Announces the result; on failure it is also shown, so the address can be read. */}
      <span
        role="status"
        className={
          state === "failed"
            ? "absolute top-full left-5 mt-2 text-sm text-background/75"
            : "sr-only"
        }
      >
        {state === "copied" && labels.copied}
        {state === "failed" && formatMessage(labels.copyFailed, { email })}
      </span>
    </>
  );
}
