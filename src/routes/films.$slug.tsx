import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { getFilm } from "@/data/films";
import { defaultProductImage } from "@/data/productImages";
import { fetchPublishedProducts, rowToProduct } from "@/lib/adminProducts";
import { ProductCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

export const Route = createFileRoute("/films/$slug")({
  loader: ({ params }) => {
    const film = getFilm(params.slug);
    if (!film) throw notFound();
    return { film };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Линейка не найдена — LUXFIL" }, { name: "robots", content: "noindex" }],
      };
    }
    const { film } = loaderData;
    return {
      meta: [
        { title: `${film.title} — пленки LUXFIL` },
        { name: "description", content: film.description },
        { property: "og:title", content: `${film.title} — пленки LUXFIL` },
        { property: "og:description", content: film.description },
      ],
    };
  },
  component: FilmBrandPage,
});

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "");
}

function FilmBrandPage() {
  const { film } = Route.useLoaderData();
  const consult = useConsult();

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["catalog-products"],
    queryFn: fetchPublishedProducts,
  });

  const brand = normalize(film.brand);
  const items = rows
    .map((row) => rowToProduct(row, defaultProductImage))
    .filter((p) => p.category === "Пленки")
    .filter((p) => {
      const b = normalize(p.brand);
      return b === brand || b.includes(brand) || brand.includes(b);
    });


  return (
    <>
      <PageHeader
        eyebrow="Пленки"
        title={film.title}
        description={film.description}
      />

      <section className="py-12 md:py-20">
        <div className="shell">
          <Link
            to="/films"
            className="inline-flex items-center gap-2 text-xs tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Все линейки
          </Link>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={film.image}
                alt={film.title}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="sm:col-span-1 lg:col-span-2">
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Применение
                  </dt>
                  <dd className="mt-1">{film.application}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Технология
                  </dt>
                  <dd className="mt-1">{film.technology}</dd>
                </div>
              </dl>
            </div>
          </div>

          <h2 className="mt-16 font-display text-2xl font-medium sm:text-3xl">
            Пленки {film.title}
          </h2>

          {isLoading ? (
            <p className="mt-6 text-sm text-muted-foreground">Загружаем позиции…</p>
          ) : items.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Позиции этой линейки пока не добавлены. Напишите нам — подберем материал и уточним
                сроки поставки.
              </p>
              <div className="mt-6">
                <LuxButton onClick={() => consult.open()}>Запросить подбор</LuxButton>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 6) * 50}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
