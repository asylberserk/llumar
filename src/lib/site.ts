export const site = {
  name: "LUXFIL",
  tagline: "Детейлинг, профессиональные пленки и оборудование",
  description:
    "LUXFIL — студия детейлинга и поставщик профессиональных пленок и оборудования в Кыргызстане. Официальный дистрибьютор LLumar.",
  // Замените плейсхолдеры на реальные контакты — они подставятся по всему сайту.
  phone: "+996 (555) 00-00-00",
  phoneHref: "tel:+99655500000",
  email: "info@luxfil.kg",
  address: "г. Бишкек, Кыргызская Республика",
  hours: "Пн — Сб, 09:00 — 19:00",
  whatsapp: "https://wa.me/99655500000",
  telegram: "https://t.me/luxfil",
  instagram: "https://instagram.com/luxfil",
  map: "https://www.openstreetmap.org/export/embed.html?bbox=74.55%2C42.83%2C74.65%2C42.90&layer=mapnik",
};

export const nav = [
  { to: "/services", label: "Услуги" },
  { to: "/llumar", label: "LLumar" },
  { to: "/films", label: "Пленки" },
  { to: "/products", label: "Оборудование" },
  { to: "/projects", label: "Работы" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
] as const;
