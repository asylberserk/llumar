import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { films, filmApplications } from "@/data/films";
import { FilmCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { LuxButton } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";
import { cn } from "@/lib/utils";
import type { FilmCategory } from "@/data/types";

export const Route = createFileRoute("/films/")({
  head: () => ({
    meta: [
      { title: "Пленки — каталог LUXFIL" },
      {
        name: "description",
        content:
          "Защитные, тонировочные и архитектурные пленки: подбор по применению и технологии.",
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

function useScrollShift() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let target = 0;
    let current = 0;

    const update = () => {
      if (reduced.matches) {
        target = 0;
        return;
      }
      const overflow = track.scrollWidth - container.clientWidth;
      const startOffset = Math.min(container.clientWidth * 0.18, 120);
      const rect = container.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const scrolled = window.innerHeight - rect.top;
      const progress = Math.min(Math.max(scrolled / travel, 0), 1);
      target = startOffset - (startOffset + Math.max(overflow, 0)) * progress;
    };

    const tick = () => {
      if (!reduced.matches) {
        current += (target - current) * 0.08;
        if (Math.abs(target - current) > 0.05) {
          setStyle({ transform: `translateX(${current.toFixed(2)}px)` });
        }
      } else {
        setStyle({});
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reduced.addEventListener("change", update);
    update();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reduced.removeEventListener("change", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { containerRef, trackRef, style };
}

function BrandStrip({ items }: { items: FilmCategory[] }) {
  const { containerRef, trackRef, style } = useScrollShift();

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-6 md:py-10"
    >
      <div
        ref={trackRef}
        style={style}
        className="film-track flex w-max items-stretch gap-5 will-change-transform md:gap-8"
      >
        {items.map((film) => (
          <div
            key={film.id}
            className="w-[240px] flex-none sm:w-[260px] md:w-[300px] lg:w-[340px]"
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </div>
  );
}

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

          <div className="mt-10 md:mt-14">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                Бренды
              </h2>
              <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {filtered.length} из {films.length}
              </span>
            </div>
            <BrandStrip items={filtered} />
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
