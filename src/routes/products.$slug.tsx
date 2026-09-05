import { formatPrice } from "@/lib/price";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { availabilityLabel } from "@/data/products";
import { defaultProductImage } from "@/data/productImages";
import {
  fetchPublishedProductBySlug,
  fetchPublishedProducts,
  rowToProduct,
} from "@/lib/adminProducts";
import { ProductCard } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton, LuxLink } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Товар — LUXFIL` },
      {
        name: "description",
        content: "Позиция каталога LUXFIL: инструмент, химия и материалы для детейлинга.",
      },
      { property: "og:title", content: "Товар каталога — LUXFIL" },
      {
        property: "og:description",
        content: "Позиция каталога LUXFIL: инструмент, химия и материалы для детейлинга.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `/products/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/products/${params.slug}` }],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const consult = useConsult();

  const { data: row, isLoading } = useQuery({
    queryKey: ["catalog-product", slug],
    queryFn: () => fetchPublishedProductBySlug(slug),
  });
  const { data: allRows = [] } = useQuery({
    queryKey: ["catalog-products"],
    queryFn: fetchPublishedProducts,
  });

  const product = useMemo(
    () => (row ? rowToProduct(row, defaultProductImage) : null),
    [row],
  );

  const related = useMemo(() => {
    if (!product) return [];
    return allRows
      .map((r) => rowToProduct(r, defaultProductImage))
      .filter((p) => p.category === product.category && p.slug !== product.slug)
      .slice(0, 4);
  }, [allRows, product]);

  if (!product) {
    return (
      <section className="pt-36 pb-24">
        <div className="shell text-center">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Загрузка…" : "Позиция не найдена или снята с публикации."}
          </p>
          <div className="mt-8 flex justify-center">
            <LuxLink to="/products" variant="outline">
              В каталог
            </LuxLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="shell grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="media-zoom border border-border">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-5" delay={80}>
            <p className="eyebrow mb-4">{product.brand}</p>
            <h1 className="font-display text-3xl leading-tight font-medium sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="hairline mt-8 flex items-center justify-between pt-6">
              <span className="font-display text-xl text-primary">
                {formatPrice(product.price, product.currency)}
              </span>
              <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {availabilityLabel[product.availability]}
              </span>
            </div>

            <dl className="mt-8 grid gap-3">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="hairline flex justify-between gap-6 pt-3 text-sm">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="text-foreground">{spec.value}</dd>
                </div>
              ))}
              {product.application ? (
                <div className="hairline flex justify-between gap-6 pt-3 text-sm">
                  <dt className="text-muted-foreground">Применение</dt>
                  <dd className="text-right text-foreground">{product.application}</dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <LuxButton onClick={() => consult.open()}>Запросить цену</LuxButton>
              <LuxLink to="/products" variant="outline">
                В каталог
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border py-16 md:py-24">
          <div className="shell">
            <p className="eyebrow mb-8">Похожие позиции</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
