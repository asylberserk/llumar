import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { FilmCategory, Product, Project, Service } from "@/data/types";
import { availabilityLabel } from "@/data/products";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="card-lift group flex flex-col border border-border bg-surface hover:border-primary/60"
    >
      <div className="media-zoom aspect-[4/3] w-full">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{service.index}</span>
        <h3 className="mt-3 font-display text-xl font-medium">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.16em] text-primary uppercase">
          Подробнее <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function FilmCard({ film }: { film: FilmCategory }) {
  return (
    <article className="card-lift flex flex-col border border-border bg-surface hover:border-primary/50">
      <div className="media-zoom aspect-[16/10] w-full">
        <img src={film.image} alt={film.title} loading="lazy" className="size-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{film.brand}</span>
        <h3 className="mt-3 font-display text-xl font-medium">{film.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {film.description}
        </p>
        <dl className="hairline mt-6 grid grid-cols-2 gap-4 pt-5 text-xs">
          <div>
            <dt className="text-muted-foreground">Применение</dt>
            <dd className="mt-1 text-foreground">{film.application}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Технология</dt>
            <dd className="mt-1 text-foreground">{film.technology}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="card-lift group flex flex-col border border-border bg-surface hover:border-primary/60"
    >
      <div className="media-zoom aspect-square w-full">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
          {product.brand}
        </span>
        <h3 className="mt-2 font-display text-base font-medium">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="text-primary">
            {product.price === null
              ? "Цена по запросу"
              : `${product.price.toLocaleString("ru-RU")} сом`}
          </span>
          <span className="text-muted-foreground">{availabilityLabel[product.availability]}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="card-lift group flex flex-col border border-border bg-surface hover:border-primary/60"
    >
      <div className="media-zoom aspect-[3/2] w-full">
        <img
          src={project.image}
          alt={`${project.vehicle} — ${project.service}`}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{project.category}</span>
        <h3 className="mt-3 font-display text-xl font-medium">{project.vehicle}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.service}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.16em] text-primary uppercase">
          Смотреть <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
