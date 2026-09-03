import type { Currency } from "@/data/types";

export const currencyOptions: { value: Currency; label: string }[] = [
  { value: "KGS", label: "сом (KGS)" },
  { value: "USD", label: "доллар ($)" },
];

/** Formats a product price with its currency, or the "on request" label. */
export function formatPrice(price: number | null, currency: Currency = "KGS") {
  if (price === null) return "Цена по запросу";
  const amount = price.toLocaleString("ru-RU");
  return currency === "USD" ? `$${amount}` : `${amount} сом`;
}
