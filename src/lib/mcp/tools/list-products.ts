import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_products",
  title: "Оборудование и расходники",
  description: "Каталог товаров LUXFIL: инструмент, плёнки, химия, расходники, оборудование.",
  inputSchema: {
    category: z.string().optional().describe("Фильтр по категории, например «Инструмент»."),
    query: z.string().optional().describe("Поиск по названию, описанию и тегам."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, query }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Требуется авторизация." }], isError: true };
    }
    const { products, availabilityLabel } = await import("@/data/products");
    const q = query?.trim().toLowerCase();
    const rows = products
      .filter((p) => !category || p.category.toLowerCase() === category.toLowerCase())
      .filter(
        (p) =>
          !q ||
          [p.name, p.description, p.brand, ...p.tags].join(" ").toLowerCase().includes(q),
      )
      .map((p) => ({
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        category: p.category,
        description: p.description,
        price: p.price,
        currency: p.currency,
        availability: availabilityLabel[p.availability],
        specifications: p.specifications,
        tags: p.tags,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { products: rows },
    };
  },
});
