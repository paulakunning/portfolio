import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  "aria-hidden": true,
  focusable: false,
  width: 24,
  height: 24,
} as const;

// Stroke icons from Lucide (ISC license).
const stroke = {
  ...base,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function MenuIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

export function MoveIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 2v20" />
      <path d="m15 19-3 3-3-3" />
      <path d="m19 9 3 3-3 3" />
      <path d="M2 12h20" />
      <path d="m5 9-3 3 3 3" />
      <path d="m9 5 3-3 3 3" />
    </svg>
  );
}

// Arrows keep the prototype's shorter head, not Lucide's.
export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
