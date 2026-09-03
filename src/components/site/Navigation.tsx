import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { useConsult } from "./ConsultModal";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const consult = useConsult();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "border-b border-border bg-background/95 backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="shell flex h-18 items-center justify-between">
        <Wordmark />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.phoneHref}
            className="hidden text-xs tracking-[0.14em] text-foreground transition-colors hover:text-primary md:block"
          >
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => consult.open()}
            className="hidden rounded-sm border border-primary px-5 py-2.5 text-[0.7rem] tracking-[0.16em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground lg:block"
          >
            Консультация
          </button>
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
            className="text-foreground lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="shell flex flex-col gap-1 py-8">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                consult.open();
              }}
              className="mt-8 rounded-sm bg-primary px-6 py-4 text-xs tracking-[0.16em] text-primary-foreground uppercase"
            >
              Оставить заявку
            </button>
            <a href={site.phoneHref} className="mt-6 text-sm text-muted-foreground">
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
