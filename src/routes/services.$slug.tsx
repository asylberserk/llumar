import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService, services } from "@/data/services";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/Cards";
import { LuxButton, LuxLink } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Услуга недоступна — LUXFIL" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — LUXFIL` },
        { name: "description", content: service.short },
        { property: "og:title", content: `${service.title} — LUXFIL` },
        { property: "og:description", content: service.short },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const consult = useConsult();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={`Услуга ${service.index}`} title={service.title} description={service.short} />

      <section className="py-16 md:py-24">
        <div className="shell grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="media-zoom border border-border">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-5" delay={80}>
            <p className="text-base leading-relaxed text-muted-foreground">{service.description}</p>
            <ul className="mt-8 grid gap-4">
              {service.points.map((point) => (
                <li key={point} className="hairline pt-4 text-sm text-foreground">
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <LuxButton onClick={() => consult.open()}>Записаться</LuxButton>
              <LuxLink to="/projects" variant="outline">
                Наши работы
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-8">Другие услуги</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
