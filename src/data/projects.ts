import hero from "@/assets/hero-car.jpg";
import ppf from "@/assets/ppf-install.jpg";
import tint from "@/assets/tint.jpg";
import detailing from "@/assets/detailing.jpg";
import interior from "@/assets/interior.jpg";
import studio from "@/assets/studio.jpg";
import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "p1",
    slug: "coupe-full-ppf",
    vehicle: "Премиальное купе",
    category: "Защита кузова",
    service: "Полная оклейка полиуретаном",
    material: "LLumar PPF",
    summary:
      "Полная оклейка кузова прозрачным полиуретаном с раскроем по месту и обработкой кромок.",
    image: hero,
    gallery: [ppf, detailing, studio],
  },
  {
    id: "p2",
    slug: "sedan-front-ppf",
    vehicle: "Седан бизнес-класса",
    category: "Защита кузова",
    service: "Защита фронтальной зоны",
    material: "LLumar PPF",
    summary: "Фронтальный комплект: капот, крылья, бампер, зеркала и зоны под ручками.",
    image: ppf,
    gallery: [ppf, hero],
  },
  {
    id: "p3",
    slug: "suv-tint",
    vehicle: "Внедорожник",
    category: "Тонирование",
    service: "Тонирование по кругу",
    material: "LLumar",
    summary: "Подбор светопропускания по задачам владельца, монтаж на все стекла.",
    image: tint,
    gallery: [tint, interior],
  },
  {
    id: "p4",
    slug: "interior-care",
    vehicle: "Кроссовер",
    category: "Салон",
    service: "Химчистка и защита интерьера",
    material: "Профессиональная химия",
    summary: "Полная химчистка салона с последующей защитой кожи и пластика.",
    image: interior,
    gallery: [interior, detailing],
  },
  {
    id: "p5",
    slug: "paint-correction",
    vehicle: "Спортивный автомобиль",
    category: "Детейлинг",
    service: "Коррекция ЛКП и защитный состав",
    material: "Защитное покрытие",
    summary: "Полировка кузова с последующим нанесением защитного состава.",
    image: detailing,
    gallery: [detailing, hero],
  },
];

export const projectCategories = ["Все", "Защита кузова", "Тонирование", "Салон", "Детейлинг"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
