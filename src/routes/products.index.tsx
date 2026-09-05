import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { productCategories } from "@/data/products";
import { defaultProductImage } from "@/data/productImages";
import { ProductCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchPublishedProducts, rowToProduct } from "@/lib/adminProducts";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Профессиональное оборудование и материалы — LUXFIL" },
      {
        name: "description",
        content:
          "Каталог инструмента, химии, расходников и оборудования для монтажа пленки и детейлинга.",
      },
      { property: "og:title", content: "Оборудование и материалы — LUXFIL" },
      {
        property: "og:description",
        content: "Ракели, ножи, химия, расходники и оборудование для профессиональных студий.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const [category, setCategory] = useState("Все");
  const [query, setQuery] = useState("");

  const { data: dbRows = [] } = useQuery({
    queryKey: ["catalog-products"],
    queryFn: fetchPublishedProducts,
  });

  const allProducts = useMemo(
    () => dbRows.map((row) => rowToProduct(row, defaultProductImage)),
    [dbRows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((p) => {
      const byCategory = category === "Все" || p.category === category;
      const byQuery =
        q.length === 0 ||
        [p.name, p.brand, p.category, p.description, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return byCategory && byQuery;
    });
  }, [allProducts, category, query]);

  return (
    <>
      <PageHeader
        eyebrow="Каталог"
        title="Профессиональное оборудование"
        description="Инструмент, химия и расходные материалы для монтажа пленки и детейлинга."
      />

      <section className="py-12 md:py-20">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {productCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    "glass-btn px-5 py-2.5 text-xs tracking-[0.14em] uppercase",
                    category === item ? "glass-btn-active" : "glass-btn-quiet",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="relative w-full lg:w-72">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по каталогу"
                className="w-full rounded-sm border border-border bg-background py-3 pr-4 pl-11 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-sm text-muted-foreground">
              Ничего не найдено. Измените запрос или напишите нам — подберем позицию под заказ.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((product, i) => (
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
