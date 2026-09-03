export const site = {
  name: "LUXFIL",
  tagline: "Детейлинг, профессиональные пленки и оборудование",
  description:
    "LUXFIL — студия детейлинга и поставщик профессиональных пленок и оборудования в Кыргызстане. Официальный дистрибьютор LLumar.",
  // Замените плейсхолдеры на реальные контакты — они подставятся по всему сайту.
  phone: "+996 (077) 000-4873",
  phoneHref: "tel:+996770004873",
  email: "info@luxfil.kg",
  address: "г. Бишкек, ул. Максима Горького, 150",
  hours: "Пн — Сб, 09:00 — 19:00",
  whatsapp: "http://wa.me/996777937308",
  telegram: "https://t.me/luxfil",
  instagram: "https://www.instagram.com/luxfil_kg?igsh=MXhncGh0cDM1OTE1eQ==",
  map: "https://www.openstreetmap.org/export/embed.html?bbox=74.565%2C42.863%2C74.585%2C42.873&layer=mapnik&marker=42.868%2C74.575",
  map2gis: "https://2gis.kg/bishkek/geo/15763234351027757",
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
