import { Link } from "@tanstack/react-router";
import logo from "@/assets/luxfil-logo.png.asset.json";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={className} aria-label="LUXFIL — на главную">
      <img
        src={logo.url}
        alt="LUXFIL"
        width={1007}
        height={464}
        className="h-7 w-auto md:h-8"
      />
    </Link>
  );
}
