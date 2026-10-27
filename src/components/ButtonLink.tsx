import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary:
    "border border-foreground/30 hover:border-foreground hover:bg-foreground/5",
  light: "bg-background text-primary-deep hover:bg-white",
} as const;

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof variants;
  /** When set, the link opens in a new tab and announces it to screen readers. */
  newTabNotice?: string;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  newTabNotice,
  children,
  className = "",
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-11.5 items-center justify-center gap-2 rounded-full px-5.5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors ${variants[variant]} ${className}`;

  if (newTabNotice) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <span className="sr-only"> {newTabNotice}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
