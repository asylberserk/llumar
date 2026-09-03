import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  solid: "bg-primary text-primary-foreground hover:bg-primary/85",
  outline: "border border-border text-foreground hover:border-primary hover:text-primary",
  ghost: "text-muted-foreground hover:text-primary",
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
