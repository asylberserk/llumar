import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { films, filmApplications } from "@/data/films";
import { FilmCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/films")({
  head: () => ({
    meta: [
      { title: "Пленки — каталог LUXFIL" },
      {
        name: "description",
        content:
          "Защитные, тонировочные и архитектурные пленки LLumar: подбор по применению и технологии.",
      },
      { property: "og:title", content: "Каталог пленок LUXFIL" },
      {
        property: "og:description",
        content: "Пленки для кузова, стекол автомобиля и архитектурного остекления.",
      },
      { property: "og:url", content: "/films" },
    ],
    links: [{ rel: "canonical", href: "/films" }],
  }),
  component: FilmsPage,
});

function FilmsPage() {
  const [application, setApplication] = useState("Все");
  const consult = useConsult();
  const filtered = films.filter(
    (f) => application === "Все" || f.application.includes(application),
  );

  return (
    <>
      <PageHeader
        eyebrow="Пленки"
        title="Каталог материалов"
        description="Подбор пленки по применению и технологии. Точные характеристики линеек — по запросу."
      />

      <section className="py-12 md:py-20">
        <div className="shell">
          <div className="flex flex-wrap gap-3">
            {filmApplications.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setApplication(item)}
                className={cn(
                  "glass-btn px-5 py-2.5 text-xs tracking-[0.14em] uppercase",
                  application === item ? "glass-btn-active" : "glass-btn-quiet",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((film, i) => (
              <Reveal key={film.id} delay={i * 50}>
                <FilmCard film={film} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 border border-border bg-surface p-8 text-center md:p-12">
            <h2 className="text-2xl font-medium sm:text-3xl">Не нашли нужную линейку?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Подберем материал под задачу и объем и уточним сроки поставки.
            </p>
            <div className="mt-8">
              <LuxButton onClick={() => consult.open()}>Запросить подбор</LuxButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
