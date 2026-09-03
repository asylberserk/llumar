import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "glass-btn px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em]";

const variants: Record<Variant, string> = {
  solid: "glass-btn-primary",
  outline: "",
  ghost: "glass-btn-quiet",
};


export function LuxButton({
  variant = "solid",
  className,
  children,
  ...props
}: { variant?: Variant; children: ReactNode } & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function LuxLink({
  variant = "solid",
  className,
  children,
  ...props
}: { variant?: Variant; children: ReactNode } & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function LuxAnchor({
  variant = "solid",
  className,
  children,
  ...props
}: { variant?: Variant; children: ReactNode } & ComponentProps<"a">) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
