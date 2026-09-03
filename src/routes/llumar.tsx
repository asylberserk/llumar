import { createFileRoute } from "@tanstack/react-router";
import rolls from "@/assets/film-rolls.jpg";
import ppf from "@/assets/ppf-install.jpg";
import { films } from "@/data/films";
import { FilmCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton, LuxLink } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

export const Route = createFileRoute("/llumar")({
  head: () => ({
    meta: [
      { title: "LLumar в Кыргызстане — LUXFIL" },
      {
        name: "description",
        content:
          "LUXFIL — официальный дистрибьютор LLumar в Кыргызстане: защитные, тонировочные и архитектурные пленки.",
      },
      { property: "og:title", content: "LLumar в Кыргызстане — LUXFIL" },
      {
        property: "og:description",
        content: "Официальная дистрибуция пленок LLumar для студий и частных клиентов.",
      },
      { property: "og:url", content: "/llumar" },
    ],
    links: [{ rel: "canonical", href: "/llumar" }],
  }),
  component: LlumarPage,
});

function LlumarPage() {
  const consult = useConsult();
  const llumarFilms = films.filter((f) => f.brand === "LLumar");

  return (
    <>
      <PageHeader
        eyebrow="Дистрибуция"
        title="LLumar в Кыргызстане"
        description="LUXFIL представляет продукцию LLumar в Кыргызстане и поставляет её студиям, мастерам и частным клиентам."
      />

      <section className="py-16 md:py-24">
        <div className="shell grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <div className="media-zoom border border-border">
              <img src={rolls} alt="Пленки LLumar" loading="lazy" className="size-full object-cover" />
            </div>
          </Reveal>
          <Reveal className="md:col-span-6 md:pl-6" delay={80}>
            <h2 className="text-3xl leading-tight font-medium sm:text-4xl">Официальный статус</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Мы поставляем оригинальные материалы LLumar и консультируем по подбору под конкретную
              задачу: защита кузова, тонирование стекол автомобиля, архитектурное остекление.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Технические характеристики конкретных линеек предоставляем по запросу — по официальным
              данным производителя.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxButton onClick={() => consult.open()}>Запросить условия</LuxButton>
              <LuxLink to="/films" variant="outline">
                Каталог пленок
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-8">Линейки</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {llumarFilms.map((film, i) => (
              <Reveal key={film.id} delay={i * 60}>
                <FilmCard film={film} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <img src={ppf} alt="Монтаж защитной пленки" loading="lazy" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-background/85" />
        <div className="shell relative py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-medium sm:text-4xl">
              Нужны материалы LLumar для студии?
            </h2>
            <div className="mt-8">
              <LuxButton onClick={() => consult.open()}>Связаться</LuxButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
