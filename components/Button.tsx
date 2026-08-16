import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "onDark";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-deep border border-navy hover:border-navy-deep",
  secondary:
    "bg-transparent text-navy border border-navy hover:bg-navy hover:text-white",
  onDark:
    "bg-white text-navy border border-white hover:bg-ivory hover:border-ivory",
};

const baseClasses =
  "inline-block px-8 py-3.5 text-sm font-medium tracking-widest uppercase transition-colors duration-200";

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </Link>
  );
}

export function Button({
  type = "button",
  variant = "primary",
  disabled,
  children,
}: {
  type?: "button" | "submit";
  variant?: ButtonVariant;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  );
}
