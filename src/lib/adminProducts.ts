import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/types";

export interface AdminProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number | null;
  currency: string;
  availability: string;
  image_url: string | null;
  application: string | null;
  tags: string[];
  published: boolean;
}

export interface AdminProductInput {
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number | null;
  availability: string;
  image_url: string | null;
  application: string | null;
  tags: string[];
  published: boolean;
}

export function rowToProduct(row: AdminProductRow, fallbackImage: string): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    description: row.description,
    price: row.price,
    currency: "KGS",
    availability: (row.availability as Product["availability"]) ?? "ask",
    image: row.image_url || fallbackImage,
    specifications: [],
    ...(row.application ? { application: row.application } : {}),
    tags: row.tags ?? [],
  };
}

export async function fetchPublishedProducts(): Promise<AdminProductRow[]> {
  const { data, error } = await supabase
    .from("admin_products")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as AdminProductRow[];
}

export async function fetchAllProducts(): Promise<AdminProductRow[]> {
  const { data, error } = await supabase
    .from("admin_products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as AdminProductRow[];
}

export async function createProduct(input: AdminProductInput) {
  const { error } = await supabase.from("admin_products").insert(input);
  if (error) throw error;
}

export async function updateProduct(id: string, input: AdminProductInput) {
  const { error } = await supabase.from("admin_products").update(input).eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("admin_products").delete().eq("id", id);
  if (error) throw error;
}

export function slugify(value: string) {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
    й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
    у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
    э: "e", ю: "yu", я: "ya",
  };
  return value
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
