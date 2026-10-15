import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-primary text-background hover:bg-primary/85",
  secondary: "bg-background text-primary hover:bg-secondary/40",
  outline:
    "border border-current text-background hover:bg-background hover:text-foreground",
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
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors ${variants[variant]} ${className}`;

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
