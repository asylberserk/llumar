import { X } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { ContactForm } from "./ContactForm";

const ConsultContext = createContext<{ open: () => void }>({ open: () => {} });

export const useConsult = () => useContext(ConsultContext);

export function ConsultProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConsultContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {isOpen ? (
        <div
          className="fixed inset-0 z-100 flex items-end justify-center bg-background/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto border border-border bg-surface p-6 sm:rounded-sm sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow mb-3">Консультация</p>
                <h2 className="text-2xl font-medium">Оставьте заявку</h2>
              </div>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <X className="size-5" />
              </button>
            </div>
            <ContactForm compact />
          </div>
        </div>
      ) : null}
    </ConsultContext.Provider>
  );
}
