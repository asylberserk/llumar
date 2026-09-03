import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2 className="text-3xl leading-[1.1] font-medium sm:text-4xl md:text-5xl">{title}</h2>
        {description ? (
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
