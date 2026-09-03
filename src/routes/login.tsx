import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageHeader } from "@/components/site/PageHeader";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Вход — LUXFIL" },
      {
        name: "description",
        content: "Вход в аккаунт LUXFIL для подключения внешних AI-клиентов к данным компании.",
      },
      { property: "og:title", content: "Вход в аккаунт LUXFIL" },
      { property: "og:description", content: "Авторизация для доступа к интеграциям LUXFIL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s["next"]) }),
  component: LoginPage,
});

function LoginPage() {
  const next = Route.useSearch()["next"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const returnUrl = new URL(next, typeof window === "undefined" ? "http://localhost" : window.location.origin).toString();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMessage(error.message);
      window.location.href = next;
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: returnUrl },
    });
    setBusy(false);
    if (error) return setMessage(error.message);
    setMessage("Проверьте почту для подтверждения регистрации.");
  }

  async function google() {
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: returnUrl });
    if (result.error) return setMessage(String(result.error));
    if (result.redirected) return;
    window.location.href = next;
  }

  return (
    <>
      <PageHeader
        eyebrow="Аккаунт"
        title={mode === "signin" ? "Вход" : "Регистрация"}
        description="Нужен для подключения внешних AI-клиентов к данным LUXFIL."
      />
      <section className="py-16 md:py-24">
        <div className="shell max-w-md">
          <form onSubmit={submit} className="grid gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-sm border border-border bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-primary"
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="rounded-sm border border-border bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-primary"
            />
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            <button
              type="submit"
              disabled={busy}
              className="rounded-sm bg-primary px-6 py-3 text-xs tracking-[0.16em] text-primary-foreground uppercase disabled:opacity-60"
            >
              {mode === "signin" ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>
          <button
            onClick={google}
            className="mt-3 w-full rounded-sm border border-border px-6 py-3 text-xs tracking-[0.16em] uppercase"
          >
            Войти через Google
          </button>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 text-sm text-muted-foreground underline underline-offset-4"
          >
            {mode === "signin" ? "Создать аккаунт" : "У меня уже есть аккаунт"}
          </button>
        </div>
      </section>
    </>
  );
}
