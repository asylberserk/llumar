import { Link } from "@tanstack/react-router";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Разделы</p>
          <ul className="grid gap-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow mb-5">Контакты</p>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-primary">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-primary">
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
          <div className="mt-6 flex gap-5 text-xs tracking-[0.14em] uppercase">
            <a href={site.whatsapp} className="text-muted-foreground hover:text-primary">
              WhatsApp
            </a>
            <a href={site.telegram} className="text-muted-foreground hover:text-primary">
              Telegram
            </a>
            <a href={site.instagram} className="text-muted-foreground hover:text-primary">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. Все права защищены.
          </span>
          <span>Бишкек, Кыргызская Республика</span>
        </div>
      </div>
    </footer>
  );
}
