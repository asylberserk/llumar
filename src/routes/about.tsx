import { createFileRoute } from "@tanstack/react-router";
import studio from "@/assets/studio.jpg";
import tools from "@/assets/tools.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxLink } from "@/components/site/LuxButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании — LUXFIL" },
      {
        name: "description",
        content:
          "LUXFIL — детейлинг-студия и поставщик профессиональных пленок и оборудования в Кыргызстане.",
      },
      { property: "og:title", content: "О компании LUXFIL" },
      {
        property: "og:description",
        content: "Студия детейлинга и снабжение профессионалов в одной экосистеме.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const directions = [
  {
    title: "Студия",
    text: "Защита кузова, тонирование, детейлинг и работа с интерьером автомобиля.",
  },
  {
    title: "Дистрибуция",
    text: "Официальная поставка продукции LLumar в Кыргызстане.",
  },
  {
    title: "Снабжение",
    text: "Инструмент, химия и расходные материалы для студий и частных мастеров.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="О компании"
        title="LUXFIL"
        description="Мы работаем с автомобилями и снабжаем профессионалов материалами — эти два направления усиливают друг друга."
      />

      <section className="py-16 md:py-24">
        <div className="shell grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="media-zoom border border-border">
              <img src={studio} alt="Студия LUXFIL" loading="lazy" className="size-full object-cover" />
            </div>
          </Reveal>
          <Reveal className="md:col-span-5" delay={80}>
            <h2 className="text-3xl leading-tight font-medium">Подход</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Мы не обещаем невозможного и не оперируем цифрами, которые нельзя подтвердить. Вместо
              этого показываем материалы, условия работы и результат.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Каждый материал, который попадает в каталог, мы используем в собственной студии — так
              мы понимаем, что рекомендуем мастерам.
            </p>
            <div className="mt-8">
              <LuxLink to="/contacts" variant="outline">
                Связаться
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="shell grid gap-10 md:grid-cols-3">
          {directions.map((d, i) => (
            <Reveal key={d.title} delay={i * 80}>
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="mt-3 font-display text-xl font-medium">{d.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="shell grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="text-3xl leading-tight font-medium">Для мастеров и студий</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Комплектуем студии материалами и инструментом, консультируем по подбору пленок и
              помогаем с расчетом объемов.
            </p>
            <div className="mt-8">
              <LuxLink to="/products" variant="outline">
                Каталог оборудования
              </LuxLink>
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={80}>
            <div className="media-zoom border border-border">
              <img
                src={tools}
                alt="Профессиональный инструмент"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
