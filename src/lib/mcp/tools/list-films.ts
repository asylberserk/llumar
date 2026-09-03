import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_films",
  title: "Каталог плёнок",
  description: "Категории защитных и тонировочных плёнок LUXFIL с брендом и технологией.",
  inputSchema: {
    application: z.string().optional().describe("Фильтр по применению, например «Кузов»."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ application }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Требуется авторизация." }], isError: true };
    }
    const { films } = await import("@/data/films");
    const rows = films
      .filter((f) => !application || f.application.toLowerCase() === application.toLowerCase())
      .map(({ slug, title, brand, application: app, technology, description }) => ({
        slug,
        title,
        brand,
        application: app,
        technology,
        description,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { films: rows },
    };
  },
});
