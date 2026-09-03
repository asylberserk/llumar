import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — LUXFIL" },
      {
        name: "description",
        content: "Связаться с LUXFIL: телефон, WhatsApp, Telegram, адрес студии в Бишкеке.",
      },
      { property: "og:title", content: "Контакты LUXFIL" },
      { property: "og:description", content: "Телефон, мессенджеры, адрес и часы работы." },
      { property: "og:url", content: "/contacts" },
    ],
    links: [{ rel: "canonical", href: "/contacts" }],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        description="Ответим в рабочее время и подберем решение под вашу задачу."
      />

      <section className="py-16 md:py-24">
        <div className="shell grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <dl className="grid gap-6">
              <div className="hairline pt-5">
                <dt className="eyebrow">Телефон</dt>
                <dd className="mt-2">
                  <a href={site.phoneHref} className="text-lg transition-colors hover:text-primary">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="hairline pt-5">
                <dt className="eyebrow">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg transition-colors hover:text-primary"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="hairline pt-5">
                <dt className="eyebrow">Адрес</dt>
                <dd className="mt-2 text-lg">{site.address}</dd>
              </div>
              <div className="hairline pt-5">
                <dt className="eyebrow">Часы работы</dt>
                <dd className="mt-2 text-lg">{site.hours}</dd>
              </div>
              <div className="hairline flex gap-5 pt-5 text-xs tracking-[0.14em] uppercase">
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
            </dl>
            <p className="mt-8 text-xs text-muted-foreground">
              Контактные данные указаны предварительно — пришлите актуальные, и мы их обновим.
            </p>
          </Reveal>

          <Reveal className="md:col-span-7" delay={80}>
            <div className="border border-border bg-surface p-6 md:p-10">
              <h2 className="font-display text-2xl font-medium">Оставить заявку</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <iframe
          title="Карта — LUXFIL, Бишкек"
          src={site.map}
          loading="lazy"
          className="h-[420px] w-full border-0 grayscale"
        />
      </section>
    </>
  );
}
