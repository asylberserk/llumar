import { createFileRoute, notFound } from "@tanstack/react-router";
import { availabilityLabel, getProduct, products } from "@/data/products";
import { ProductCard } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton, LuxLink } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Товар недоступен — LUXFIL" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — LUXFIL` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — LUXFIL` },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const consult = useConsult();
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

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
                {product.price === null
                  ? "Цена по запросу"
                  : `${product.price.toLocaleString("ru-RU")} сом`}
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
