import Link from "next/link";
import type { ReactNode } from "react";

// Every variant keeps the 1px border (transparent unless outlined), like the prototype.
const variants = {
  primary: "border-transparent bg-primary text-white hover:bg-primary-hover",
  // Solid, unlike the prototype's see-through outline: the hero's dot grid showed through. The hover is the same 4% tint, mixed in.
  secondary:
    "border-foreground/28 bg-background hover:border-foreground hover:bg-[color-mix(in_oklab,var(--color-foreground)_4%,var(--color-background))]",
  light: "border-transparent bg-background text-primary-deep hover:bg-white",
} as const;

const sizes = {
  md: "min-h-11.5 text-[0.9375rem]",
  sm: "min-h-10 text-sm",
} as const;

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** When set, the link opens in a new tab and announces it to screen readers. */
  newTabNotice?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  newTabNotice,
  children,
  className = "",
  onClick,
}: ButtonLinkProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full border px-5.5 leading-none font-medium whitespace-nowrap transition-colors ${sizes[size]} ${variants[variant]} ${className}`;

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

  // A same-page anchor: next/link's scroll handling would pull focus back to the target.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
