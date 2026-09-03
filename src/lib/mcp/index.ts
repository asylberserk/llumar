import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getCompanyInfo from "./tools/get-company-info";
import listFilms from "./tools/list-films";
import listProducts from "./tools/list-products";
import listProjects from "./tools/list-projects";
import listServices from "./tools/list-services";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "21st-dev-api-setup",
  title: "21st Dev API Setup",
  version: "0.1.0",
  instructions:
    "Инструменты сайта LUXFIL (детейлинг, плёнки, оборудование, Бишкек). Используйте list_services, list_films, list_products, list_projects и get_company_info для получения данных каталога и контактов.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServices, listFilms, listProducts, listProjects, getCompanyInfo] as Parameters<
    typeof defineMcp
  >[0]["tools"],
});
