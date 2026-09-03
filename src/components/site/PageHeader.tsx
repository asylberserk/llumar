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
    <header className="relative overflow-hidden border-b border-border pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_20%_0%,color-mix(in_oklab,var(--champagne)_10%,transparent),transparent_70%)]" />
      <div className="shell relative">
        <Reveal>
          <div className="mb-5 flex items-center gap-4">
            <span className="rule-glow block w-12" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
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
