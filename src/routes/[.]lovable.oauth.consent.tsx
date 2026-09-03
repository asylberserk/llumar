import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthClient = { name?: string; redirect_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search["authorization_id"]) throw new Error("Отсутствует authorization_id");
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: "/login", search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="shell py-24">
      <h1 className="font-display text-2xl">Не удалось загрузить запрос авторизации</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const authorizationId = Route.useSearch()["authorization_id"];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "приложение";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error: err } = approve
      ? await api.approveAuthorization(authorizationId)
      : await api.denyAuthorization(authorizationId);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Сервер авторизации не вернул адрес перенаправления.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="shell flex min-h-screen items-center py-24">
      <div className="w-full max-w-lg">
        <p className="eyebrow mb-4">Подключение</p>
        <h1 className="font-display text-3xl font-medium">Подключить {clientName} к LUXFIL</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {clientName} сможет вызывать инструменты этого приложения от вашего имени, пока вы вошли в
          аккаунт.
        </p>
        {details?.client?.redirect_uri && (
          <p className="mt-2 text-xs break-all text-muted-foreground">
            Адрес возврата: {details.client.redirect_uri}
          </p>
        )}
        {details?.scope && (
          <p className="mt-2 text-xs text-muted-foreground">Запрошенные доступы: {details.scope}</p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          Это не обходит правила доступа приложения и политики бэкенда.
        </p>
        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="rounded-sm bg-primary px-6 py-3 text-xs tracking-[0.16em] text-primary-foreground uppercase disabled:opacity-60"
          >
            Разрешить
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="rounded-sm border border-border px-6 py-3 text-xs tracking-[0.16em] uppercase disabled:opacity-60"
          >
            Отменить подключение
          </button>
        </div>
      </div>
    </main>
  );
}
