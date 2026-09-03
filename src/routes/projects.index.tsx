import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { ProjectCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Работы — LUXFIL" },
      {
        name: "description",
        content: "Примеры работ: защита кузова пленкой, тонирование, детейлинг и работа с салоном.",
      },
      { property: "og:title", content: "Работы LUXFIL" },
      { property: "og:description", content: "Портфолио проектов студии LUXFIL." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const [category, setCategory] = useState("Все");
  const filtered = projects.filter((p) => category === "Все" || p.category === category);

  return (
    <>
      <PageHeader
        eyebrow="Портфолио"
        title="Работы студии"
        description="Отдельные проекты с описанием задачи и использованных материалов."
      />
      <section className="py-12 md:py-20">
        <div className="shell">
          <div className="flex flex-wrap gap-3">
            {projectCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  "rounded-sm border px-5 py-2.5 text-xs tracking-[0.14em] uppercase transition-colors",
                  category === item
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={i * 50}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
