import llumar from "@/assets/film-llumar.jpg.asset.json";
import hexis from "@/assets/film-hexis.jpg.asset.json";
import membrane from "@/assets/film-membrane.jpg.asset.json";
import versa from "@/assets/film-versa.jpg.asset.json";
import monoppf from "@/assets/film-monoppf.jpg.asset.json";
import type { FilmCategory } from "./types";

export const films: FilmCategory[] = [
  {
    id: "f1",
    slug: "llumar",
    title: "LLumar",
    brand: "LLumar",
    application: "Кузов / Стекла / Здания",
    technology: "Полиуретан, многослойные пленки",
    description:
      "Защитные, тонировочные и архитектурные пленки. LUXFIL — официальный дистрибьютор в Кыргызстане.",
    image: llumar.url,
  },
  {
    id: "f2",
    slug: "hexis-bodyfence",
    title: "HEXIS Bodyfence",
    brand: "HEXIS",
    application: "Кузов",
    technology: "Paint Protection Film",
    description:
      "Полиуретановая защитная пленка с самовосстанавливающимся слоем и высокой прозрачностью.",
    image: hexis.url,
  },
  {
    id: "f3",
    slug: "membrane",
    title: "Membrane",
    brand: "Membrane",
    application: "Кузов",
    technology: "PPF",
    description: "Защита лакокрасочного покрытия от сколов, песка и абразивного износа.",
    image: membrane.url,
  },
  {
    id: "f4",
    slug: "versa",
    title: "Versa",
    brand: "Versa",
    application: "Стекла",
    technology: "Тонировочные пленки",
    description: "Пленки для стекол с разным уровнем светопропускания и теплозащиты.",
    image: versa.url,
  },
  {
    id: "f5",
    slug: "monoppf",
    title: "MONOPPF",
    brand: "MONOPPF",
    application: "Кузов",
    technology: "PPF / оклейка",
    description: "Материалы для оклейки и защиты кузова — перезагрузка мира оклейки.",
    image: monoppf.url,
  },
];

export const filmApplications = ["Все", "Кузов", "Стекла", "Здания"];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);
