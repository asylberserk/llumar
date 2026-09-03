import { Link } from "@tanstack/react-router";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={className} aria-label="LUXFIL — на главную">
      <span className="font-display text-lg font-semibold tracking-[0.32em] text-foreground">
        LUX<span className="text-primary">FIL</span>
      </span>
    </Link>
  );
}
