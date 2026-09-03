import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Вход для администрации — LUXFIL" },
      {
        name: "description",
        content: "Панель управления каталогом LUXFIL: вход для сотрудников студии детейлинга.",
      },
      { property: "og:title", content: "Вход для администрации LUXFIL" },
      { property: "og:description", content: "Управление карточками товаров и ценами." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMessage(error.message);
      navigate({ to: "/admin" });
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });
    setBusy(false);
    if (error) return setMessage(error.message);
    setMessage("Аккаунт создан. Подтвердите почту, затем войдите.");
    setMode("signin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">LUXFIL</p>
        <h1 className="mt-3 font-display text-2xl text-foreground">
          {mode === "signin" ? "Вход для администрации" : "Регистрация сотрудника"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Панель управления каталогом товаров и ценами.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          {message ? <p className="text-sm text-destructive">{message}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Подождите…" : mode === "signin" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {mode === "signin" ? "Создать аккаунт сотрудника" : "У меня уже есть аккаунт"}
        </button>
      </div>
    </div>
  );
}
