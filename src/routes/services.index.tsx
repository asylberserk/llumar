import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Услуги — LUXFIL" },
      {
        name: "description",
        content:
          "Защита кузова пленкой, тонирование, детейлинг, работа с салоном и поставка материалов в Бишкеке.",
      },
      { property: "og:title", content: "Услуги LUXFIL" },
      {
        property: "og:description",
        content: "Полный цикл работ по защите и обслуживанию автомобиля.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const consult = useConsult();
  return (
    <>
      <PageHeader
        eyebrow="Услуги"
        title="Защита, детейлинг и снабжение"
        description="Полный цикл работ с автомобилем и поставка материалов для профессионалов."
      />
      <section className="py-16 md:py-24">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <div className="shell mt-16 text-center">
          <LuxButton onClick={() => consult.open()}>Обсудить задачу</LuxButton>
        </div>
      </section>
    </>
  );
}
