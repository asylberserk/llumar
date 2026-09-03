import { useState } from "react";
import { LuxButton } from "./LuxButton";

const interests = [
  "Защита кузова пленкой",
  "Тонирование",
  "Детейлинг",
  "Салон и интерьер",
  "Оборудование и материалы",
  "Другое",
];

const fieldClass =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    interest: interests[0],
    comment: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-sm border border-primary/40 bg-surface p-8 text-center">
        <p className="eyebrow mb-3">Заявка принята</p>
        <p className="text-lg text-foreground">Спасибо. Мы свяжемся с вами в рабочее время.</p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues({ name: "", phone: "", interest: interests[0], comment: "" });
          }}
          className="glass-btn glass-btn-quiet mt-6 px-5 py-2.5 text-xs tracking-[0.16em] uppercase"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (values.name.trim().length < 2) {
          setError("Укажите имя");
          return;
        }
        if (values.phone.replace(/\D/g, "").length < 9) {
          setError("Укажите корректный номер телефона");
          return;
        }
        setError(null);
        setSent(true);
      }}
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="grid gap-2">
          <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Имя</span>
          <input
            className={fieldClass}
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            placeholder="Как к вам обращаться"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Телефон</span>
          <input
            className={fieldClass}
            value={values.phone}
            inputMode="tel"
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            placeholder="+996 ___ __ __ __"
          />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
          Что интересует
        </span>
        <select
          className={fieldClass}
          value={values.interest}
          onChange={(e) => setValues({ ...values, interest: e.target.value })}
        >
          {interests.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2">
        <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
          Комментарий
        </span>
        <textarea
          className={`${fieldClass} min-h-28 resize-none`}
          value={values.comment}
          onChange={(e) => setValues({ ...values, comment: e.target.value })}
          placeholder="Автомобиль, задача, сроки"
        />
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <LuxButton type="submit" className="w-full sm:w-auto">
        Отправить заявку
      </LuxButton>
      <p className="text-xs text-muted-foreground">
        Отправляя форму, вы соглашаетесь на обработку контактных данных.
      </p>
    </form>
  );
}
