import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_projects",
  title: "Выполненные работы",
  description: "Портфолио LUXFIL: автомобиль, услуга, материал и краткое описание работы.",
  inputSchema: {
    category: z.string().optional().describe("Фильтр по категории работ, например «Тонирование»."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Требуется авторизация." }], isError: true };
    }
    const { projects } = await import("@/data/projects");
    const rows = projects
      .filter((p) => !category || p.category.toLowerCase() === category.toLowerCase())
      .map(({ slug, vehicle, category: c, service, material, summary }) => ({
        slug,
        vehicle,
        category: c,
        service,
        material,
        summary,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { projects: rows },
    };
  },
});
