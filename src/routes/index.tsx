import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import logo from "@/assets/luxfil-logo.png.asset.json";
import rolls from "@/assets/film-rolls.jpg";
import studio from "@/assets/studio.jpg";
import tools from "@/assets/tools.jpg";
import { services } from "@/data/services";
import { films } from "@/data/films";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { FilmCard, ProductCard, ProjectCard, ServiceCard } from "@/components/site/Cards";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton, LuxLink } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

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

      <section className="border-b border-border py-16 md:py-20">
        <div className="shell grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="bg-background/55 p-7 backdrop-blur-sm md:p-8">
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

      <section className="border-t border-border py-20 md:py-28">
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

      <section className="border-t border-border py-20 md:py-28">
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

      <section className="border-t border-border py-20 md:py-28">
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
            {products.slice(0, 4).map((product, i) => (
              <Reveal key={product.id} delay={i * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
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

      <section className="border-t border-border py-20 md:py-28">
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

      <section className="relative overflow-hidden border-t border-border">
        <img
          src={tools}
          alt="Профессиональный инструмент для монтажа пленки"
          loading="lazy"
          width={1600}
          height={1000}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="shell relative py-24 text-center md:py-32">
          <Reveal>
            <p className="eyebrow mb-5">Мастерам и студиям</p>
            <h2 className="mx-auto max-w-3xl text-3xl leading-tight font-medium sm:text-5xl">
              Подберем материалы и оборудование под вашу студию
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <LuxButton onClick={() => consult.open()}>Запросить условия</LuxButton>
              <LuxLink to="/contacts" variant="outline">
                Контакты
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
