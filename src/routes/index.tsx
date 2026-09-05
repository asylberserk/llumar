import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ExternalLink, MapPin } from "lucide-react";
import logo from "@/assets/luxfil-logo.png.asset.json";
import rolls from "@/assets/film-rolls.jpg";
import studio from "@/assets/studio.jpg";
import { services } from "@/data/services";
import { films } from "@/data/films";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { defaultProductImage } from "@/data/productImages";
import { fetchPublishedProducts, rowToProduct } from "@/lib/adminProducts";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import { FilmCard, ProductCard, ProjectCard, ServiceCard } from "@/components/site/Cards";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton, LuxLink } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";
import { Map2GIS } from "@/components/site/Map2GIS";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUXFIL — детейлинг, защитные пленки и оборудование в Бишкеке" },
      {
        name: "description",
        content:
          "Студия детейлинга и поставщик профессиональных пленок, инструмента и материалов. Официальный дистрибьютор LLumar в Кыргызстане.",
      },
      { property: "og:title", content: "LUXFIL — детейлинг и защитные пленки" },
      {
        property: "og:description",
        content: "Защита кузова, тонирование, детейлинг и поставка материалов для студий.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const values = [
  { title: "Материалы", text: "Работаем с пленками LLumar и профессиональной химией." },
  { title: "Условия", text: "Монтаж в закрытом помещении с контролем чистоты и света." },
  { title: "Снабжение", text: "Поставляем инструмент и расходники студиям и мастерам." },
  { title: "Прозрачность", text: "Объем работ и материалы согласуем до начала." },
];

function Index() {
  const consult = useConsult();
  const { data: dbRows = [] } = useQuery({
    queryKey: ["catalog-products"],
    queryFn: fetchPublishedProducts,
  });
  const featuredProducts = useMemo(
    () => dbRows.map((row) => rowToProduct(row, defaultProductImage)),
    [dbRows],
  );


  return (
    <>
      <section className="relative flex min-h-[94vh] items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
        <div className="shell relative w-full pt-40 pb-20 md:pb-28">
          <div className="flex items-center gap-4">
            <span className="rule-glow block w-16" />
            <p className="eyebrow">Бишкек · Кыргызстан</p>
          </div>
          <img
            src={logo.url}
            alt="LUXFIL"
            width={1007}
            height={464}
            className="mt-8 w-[180px] max-w-full md:w-[300px]"
          />
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.95] font-medium">
            Технологии защиты.
            <br />
            <span className="text-primary">Без компромиссов.</span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Детейлинг, защитные и тонировочные пленки, поставка профессионального инструмента и
              материалов. Официальный дистрибьютор LLumar.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <LuxButton onClick={() => consult.open()}>Оставить заявку</LuxButton>
              <LuxLink to="/services" variant="ghost">
                Услуги
              </LuxLink>
            </div>
          </div>
          <div className="mt-16 hidden items-center gap-3 text-xs tracking-[0.2em] text-muted-foreground uppercase md:flex">
            <ArrowDown className="size-4 animate-bounce" /> Листайте
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="shell grid gap-5 md:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="rounded-[28px] border border-border/60 bg-background/45 p-7 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md md:p-8">
              <h2 className="font-display text-sm tracking-[0.18em] text-primary uppercase">
                {v.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <div className="media-zoom border border-border">
              <img
                src={rolls}
                alt="Рулоны профессиональной пленки на складе"
                loading="lazy"
                width={1600}
                height={1000}
                className="size-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-6 md:pl-8" delay={100}>
            <p className="eyebrow mb-5">LLumar</p>
            <h2 className="text-3xl leading-tight font-medium sm:text-4xl">
              Официальная дистрибуция в Кыргызстане
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              LUXFIL поставляет продукцию LLumar в Кыргызстане: защитные, тонировочные и
              архитектурные пленки. Работаем со студиями, мастерами и частными клиентами.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxLink to="/llumar" variant="outline">
                О LLumar
              </LuxLink>
              <LuxLink to="/films" variant="ghost">
                Каталог пленок
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Услуги"
            title="Работа с автомобилем от подготовки до передачи"
            description="Защита кузова, тонирование, детейлинг и работа с интерьером."
            action={
              <LuxLink to="/services" variant="outline">
                Все услуги
              </LuxLink>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => (
              <Reveal key={service.id} delay={i * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Пленки"
            title="Материалы под задачу"
            description="Категории пленок для кузова, стекол и архитектурного остекления."
            action={
              <LuxLink to="/films" variant="outline">
                Все пленки
              </LuxLink>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {films.slice(0, 3).map((film, i) => (
              <Reveal key={film.id} delay={i * 60}>
                <FilmCard film={film} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Оборудование"
            title="Инструмент и расходники для студий"
            description="Ракели, ножи, химия и оборудование для монтажа пленки."
            action={
              <LuxLink to="/products" variant="outline">
                В каталог
              </LuxLink>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <Reveal key={product.id} delay={i * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-5">Почему LUXFIL</p>
            <h2 className="text-3xl leading-tight font-medium sm:text-4xl">
              Студия и снабжение в одной экосистеме
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Мы работаем с автомобилями и одновременно снабжаем мастеров материалами. Это значит,
              что каждый материал в каталоге проходит проверку в собственной студии.
            </p>
            <div className="mt-8">
              <LuxLink to="/about" variant="outline">
                О компании
              </LuxLink>
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={100}>
            <div className="media-zoom border border-border">
              <img
                src={studio}
                alt="Интерьер детейлинг-студии"
                loading="lazy"
                width={1600}
                height={1000}
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Работы"
            title="Примеры проектов"
            action={
              <LuxLink to="/projects" variant="outline">
                Все работы
              </LuxLink>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, i) => (
              <Reveal key={project.id} delay={i * 60}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Адрес"
            title="Как нас найти"
            description={site.address}
            action={
              <LuxLink to="/contacts" variant="outline">
                Контакты
              </LuxLink>
            }
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-center">
            <Reveal>
              <a
                href={site.map2gis}
                target="_blank"
                rel="noreferrer"
                aria-label="Открыть адрес в 2GIS"
                className="group relative mx-auto block aspect-square w-full max-w-lg overflow-hidden rounded-full border border-border bg-surface shadow-2xl transition-colors hover:border-primary/60"
              >
                <Map2GIS />
                <span className="absolute inset-0 z-[500] cursor-pointer" />
                <span className="glass-btn glass-btn-quiet glass-btn-2gis pointer-events-none absolute bottom-6 left-1/2 z-[501] inline-flex -translate-x-1/2 items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <MapPin className="size-4" />
                  Открыть в 2GIS
                  <ExternalLink className="size-3.5" />
                </span>
              </a>

              <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Карта © 2GIS
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mx-auto flex aspect-square w-full max-w-lg items-center justify-center rounded-full border border-dashed border-border bg-surface/50 p-8 text-center">
                <div>
                  <span className="eyebrow">Скоро</span>
                  <h3 className="mt-3 font-display text-xl font-medium">Сертификат дистрибьютора</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Здесь будет размещён официальный сертификат и галерея документов.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
