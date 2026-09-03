import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { useConsult } from "./ConsultModal";

export function MobileCta() {
  const consult = useConsult();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur sm:hidden">
      <a
        href={site.whatsapp}
        className="flex items-center justify-center gap-2 border-r border-border py-4 text-xs tracking-[0.14em] text-foreground uppercase"
      >
        <MessageCircle className="size-4" /> WhatsApp
      </a>
      <button
        type="button"
        onClick={() => consult.open()}
        className="flex items-center justify-center gap-2 py-4 text-xs tracking-[0.14em] text-primary uppercase"
      >
        <Phone className="size-4" /> Заявка
      </button>
    </div>
  );
}
