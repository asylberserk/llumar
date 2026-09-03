export type Availability = "in-stock" | "on-order" | "ask";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number | null;
  currency: "KGS";
  availability: Availability;
  image: string;
  specifications: Spec[];
  application?: string;
  tags: string[];
}

export interface Service {
  id: string;
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  image: string;
  points: string[];
}

export interface FilmCategory {
  id: string;
  slug: string;
  title: string;
  brand: string;
  application: string;
  technology: string;
  description: string;
  image: string;
}

export interface Project {
  id: string;
  slug: string;
  vehicle: string;
  category: string;
  service: string;
  material: string;
  summary: string;
  image: string;
  gallery: string[];
}
