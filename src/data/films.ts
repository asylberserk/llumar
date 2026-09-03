import ppf from "@/assets/ppf-install.jpg";
import tint from "@/assets/tint.jpg";
import rolls from "@/assets/film-rolls.jpg";
import detailing from "@/assets/detailing.jpg";
import interior from "@/assets/interior.jpg";
import studio from "@/assets/studio.jpg";
import type { FilmCategory } from "./types";

export const films: FilmCategory[] = [
  {
    id: "f1",
    slug: "ppf-clear",
    title: "Прозрачная защитная пленка",
    brand: "LLumar",
    application: "Кузов",
    technology: "Полиуретан",
    description:
      "Прозрачный полиуретан для защиты лакокрасочного покрытия от сколов и абразивного износа.",
    image: ppf,
  },
  {
    id: "f2",
    slug: "ppf-matte",
    title: "Матовая защитная пленка",
    brand: "LLumar",
    application: "Кузов",
    technology: "Полиуретан",
    description: "Защита кузова с изменением фактуры покрытия на матовую без перекраса.",
    image: detailing,
  },
  {
    id: "f3",
    slug: "auto-tint",
    title: "Автомобильная тонировка",
    brand: "LLumar",
    application: "Стекла",
    technology: "Металлизированная / окрашенная",
    description: "Пленки для стекол автомобиля с разным уровнем светопропускания.",
    image: tint,
  },
  {
    id: "f4",
    slug: "atr",
    title: "Атермальные пленки",
    brand: "LLumar",
    application: "Стекла",
    technology: "Многослойная",
    description: "Снижение теплового потока в салон при сохранении обзорности.",
    image: interior,
  },
  {
    id: "f5",
    slug: "architectural",
    title: "Архитектурные пленки",
    brand: "LLumar",
    application: "Здания",
    technology: "Солнцезащитная",
    description: "Пленки для остекления офисов и жилых помещений.",
    image: studio,
  },
  {
    id: "f6",
    slug: "safety",
    title: "Защитные пленки для стекла",
    brand: "LLumar",
    application: "Здания",
    technology: "Ударопрочная",
    description: "Многослойные пленки, удерживающие осколки при разрушении стекла.",
    image: rolls,
  },
];

export const filmApplications = ["Все", "Кузов", "Стекла", "Здания"];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);
