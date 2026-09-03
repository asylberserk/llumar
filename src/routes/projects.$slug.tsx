import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/data/projects";
import { ProjectCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { LuxButton } from "@/components/site/LuxButton";
import { useConsult } from "@/components/site/ConsultModal";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Проект недоступен — LUXFIL" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.vehicle} — ${project.service} | LUXFIL` },
        { name: "description", content: project.summary },
        { property: "og:title", content: `${project.vehicle} — ${project.service}` },
        { property: "og:description", content: project.summary },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const consult = useConsult();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={project.category} title={project.vehicle} description={project.summary} />

      <section className="py-12 md:py-20">
        <div className="shell">
          <Reveal className="media-zoom border border-border">
            <img
              src={project.image}
              alt={`${project.vehicle} — ${project.service}`}
              loading="lazy"
              className="size-full object-cover"
            />
          </Reveal>

          <dl className="mt-10 grid gap-6 border border-border bg-surface p-8 sm:grid-cols-3">
            <div>
              <dt className="eyebrow">Услуга</dt>
              <dd className="mt-2 text-sm text-foreground">{project.service}</dd>
            </div>
            <div>
              <dt className="eyebrow">Материал</dt>
              <dd className="mt-2 text-sm text-foreground">{project.material}</dd>
            </div>
            <div>
              <dt className="eyebrow">Категория</dt>
              <dd className="mt-2 text-sm text-foreground">{project.category}</dd>
            </div>
          </dl>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Reveal key={img + i} delay={i * 60} className="media-zoom border border-border">
                <img
                  src={img}
                  alt={`${project.vehicle} — кадр ${i + 1}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <LuxButton onClick={() => consult.open()}>Обсудить похожий проект</LuxButton>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-8">Другие работы</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
