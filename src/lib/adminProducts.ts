import { supabase } from "@/integrations/supabase/client";
import type { Currency, Product } from "@/data/types";

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
  /** Original stored value (storage path) before signed-URL resolution. */
  image_path?: string | null;
}

export interface AdminProductInput {
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

function parseSpecs(value: unknown): Product["specifications"] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const spec = item as { label?: unknown; value?: unknown };
    if (typeof spec.label !== "string" || typeof spec.value !== "string") return [];
    return [{ label: spec.label, value: spec.value }];
  });
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
    currency: (row.currency === "USD" ? "USD" : "KGS") as Currency,
    availability: (row.availability as Product["availability"]) ?? "ask",
    image: row.image_url || productImageBySlug[row.slug] || fallbackImage,
    specifications: parseSpecs(row.specifications),
    ...(row.application ? { application: row.application } : {}),
    tags: row.tags ?? [],
  };
}

export const PRODUCT_IMAGE_BUCKET = "product-images";

function isExternalUrl(value: string) {
  return /^(https?:|data:|blob:|\/)/i.test(value);
}

/** Turns stored storage paths into usable (signed) image URLs. */
async function withResolvedImages(rows: AdminProductRow[]): Promise<AdminProductRow[]> {
  const paths = Array.from(
    new Set(rows.map((r) => r.image_url).filter((v): v is string => !!v && !isExternalUrl(v))),
  );
  if (paths.length === 0) return rows;

  const { data } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .createSignedUrls(paths, 60 * 60 * 24 * 7);

  const map = new Map<string, string>();
  for (const item of data ?? []) {
    if (item.path && item.signedUrl) map.set(item.path, item.signedUrl);
  }
  return rows.map((row) =>
    row.image_url && map.has(row.image_url)
      ? { ...row, image_path: row.image_url, image_url: map.get(row.image_url)! }
      : row,
  );
}

/** Uploads an image file and returns the storage path to persist. */
export async function uploadProductImage(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `products/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw error;
  return path;
}

export async function getImagePreviewUrl(pathOrUrl: string): Promise<string> {
  if (!pathOrUrl || isExternalUrl(pathOrUrl)) return pathOrUrl;
  const { data } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .createSignedUrl(pathOrUrl, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? "";
}

export async function fetchPublishedProducts(): Promise<AdminProductRow[]> {
  const { data, error } = await supabase
    .from("admin_products")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return withResolvedImages((data ?? []) as unknown as AdminProductRow[]);
}

export async function fetchAllProducts(): Promise<AdminProductRow[]> {
  const { data, error } = await supabase
    .from("admin_products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return withResolvedImages((data ?? []) as unknown as AdminProductRow[]);
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
