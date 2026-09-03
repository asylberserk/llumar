import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_company_info",
  title: "Контакты и информация о компании",
  description: "Контакты LUXFIL: телефон, email, адрес, часы работы и мессенджеры.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Требуется авторизация." }], isError: true };
    }
    const { site } = await import("@/lib/site");
    const info = {
      name: site.name,
      tagline: site.tagline,
      description: site.description,
      phone: site.phone,
      email: site.email,
      address: site.address,
      hours: site.hours,
      whatsapp: site.whatsapp,
      telegram: site.telegram,
      instagram: site.instagram,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
