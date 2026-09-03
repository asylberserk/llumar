import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_services",
  title: "Услуги LUXFIL",
  description: "Список услуг студии LUXFIL: защита кузова, тонирование, детейлинг и другое.",
  inputSchema: {
    slug: z.string().optional().describe("Слаг конкретной услуги, чтобы вернуть только её."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Требуется авторизация." }], isError: true };
    }
    const { services } = await import("@/data/services");
    const rows = services
      .filter((s) => !slug || s.slug === slug)
      .map(({ slug: s, title, short, description, points }) => ({
        slug: s,
        title,
        short,
        description,
        points,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { services: rows },
    };
  },
});
