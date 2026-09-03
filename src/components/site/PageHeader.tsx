import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-border pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl leading-[1.05] font-medium sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}
