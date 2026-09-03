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
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef<number | null>(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setInteractive(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!interactive) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(0.5 - py) * 12}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--tx", `${(px - 0.5) * 10}px`);
      el.style.setProperty("--ty", `${(py - 0.5) * 10}px`);
      el.style.setProperty("--glow", "1");
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
    el.style.setProperty("--glow", "0");
  };

  return (
    <div className="tilt-scene">
      <Link
        ref={ref}
        to="/products/$slug"
        params={{ slug: product.slug }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="tilt-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 glass-card"
      >
        <span aria-hidden className="tilt-sheen" />
        <div className="tilt-depth relative aspect-square w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="tilt-image size-full object-cover"
          />
        </div>
        <div className="tilt-content relative flex flex-1 flex-col p-5">
          <span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
            {product.brand}
          </span>
          <h3 className="mt-2 font-display text-base font-medium">{product.name}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{product.category}</p>
          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="font-display text-primary">
              {product.price === null
                ? "Цена по запросу"
                : `${product.price.toLocaleString("ru-RU")} сом`}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              {availabilityLabel[product.availability]}
              <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </span>
          </div>
        </div>
      </Link>
    </div>
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
