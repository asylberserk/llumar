import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Boxes,
  EyeOff,
  LayoutDashboard,
  Loader2,
  Package,
  Pencil,
  Plus,
  ShieldCheck,
  Tag,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  slugify,
  uploadProductImage,
  getImagePreviewUrl,
  updateProduct,
  rowToProduct,
  type AdminProductRow,
} from "@/lib/adminProducts";
import { productCategories, products as staticProducts } from "@/data/products";
import { ProductCard } from "@/components/site/Cards";
import fallbackImage from "@/assets/tools.jpg";


export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Панель администрации — LUXFIL" },
      {
        name: "description",
        content: "Управление карточками товаров, ценами и наличием в каталоге LUXFIL.",
      },
      { property: "og:title", content: "Панель администрации LUXFIL" },
      { property: "og:description", content: "Добавление товаров и назначение цен." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPanel,
});

const categories = productCategories.filter((c) => c !== "Все");

const emptyForm = {
  name: "",
  slug: "",
  brand: "LUXFIL Supply",
  category: categories[0] ?? "Инструмент",
  description: "",
  price: "",
  availability: "in-stock",
  image_url: "",
  application: "",
  tags: "",
  published: true,
};

type FormState = typeof emptyForm;

function AdminPanel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "catalog" | "account">("overview");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [accountMsg, setAccountMsg] = useState<string | null>(null);


  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (!session) {
        navigate({ to: "/admin/login" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      if (!active) return;
      setUserId(session.user.id);
      setEmail(session.user.email ?? "");

      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));
      setChecking(false);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchAllProducts,
    enabled: isAdmin,
  });

  const stats = useMemo(() => {
    const published = rows.filter((r) => r.published).length;
    const priced = rows.filter((r) => r.price !== null);
    const avg = priced.length
      ? Math.round(priced.reduce((s, r) => s + (r.price ?? 0), 0) / priced.length)
      : 0;
    return {
      total: rows.length,
      published,
      hidden: rows.length - published,
      avg,
      catalogTotal: rows.filter((r) => r.published).length + staticProducts.length,
    };
  }, [rows]);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setAccountMsg(null);
    const { error: err } = await supabase.auth.updateUser({ password: newPassword });
    setAccountMsg(err ? err.message : "Пароль обновлён");
    if (!err) setNewPassword("");
  }



  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const path = await uploadProductImage(file);
      setForm((f) => ({ ...f, image_url: path }));
      setPreview(await getImagePreviewUrl(path));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить изображение");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setPreview("");
    setEditingId(null);
    setError(null);
  }

  function startEdit(row: AdminProductRow) {
    setEditingId(row.id);
    setPreview(row.image_url ?? "");
    setError(null);
    setForm({
      name: row.name,
      slug: row.slug,
      brand: row.brand,
      category: row.category,
      description: row.description,
      price: row.price === null ? "" : String(row.price),
      availability: row.availability,
      image_url: row.image_path ?? row.image_url ?? "",
      application: row.application ?? "",
      tags: (row.tags ?? []).join(", "),
      published: row.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name.trim(),
      slug: (form.slug.trim() || slugify(form.name)) || `product-${Date.now()}`,
      brand: form.brand.trim() || "LUXFIL Supply",
      category: form.category,
      description: form.description.trim(),
      price: form.price.trim() === "" ? null : Number(form.price),
      availability: form.availability,
      image_url: form.image_url.trim() || null,
      application: form.application.trim() || null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published: form.published,
    };
    try {
      if (editingId) await updateProduct(editingId, payload);
      else await createProduct(payload);
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["catalog-products"] });
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось сохранить товар");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Удалить товар?")) return;
    try {
      await deleteProduct(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["catalog-products"] });
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось удалить товар");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="font-display text-xl text-foreground">Доступ ограничен</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Аккаунт авторизован, но не имеет прав администратора. Передайте этот ID владельцу
            проекта, чтобы выдать доступ.
          </p>
          <code className="mt-4 block rounded-md bg-secondary px-3 py-2 text-xs break-all text-secondary-foreground">
            {userId}
          </code>
          <button
            type="button"
            onClick={signOut}
            className="mt-6 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">LUXFIL</p>
          <h1 className="mt-2 font-display text-3xl text-foreground">Каталог товаров</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Добавляйте карточки товаров, назначайте цены и управляйте наличием.
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Выйти
        </button>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <form
          onSubmit={submit}
          className="h-fit rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="font-display text-lg text-foreground">
            {editingId ? "Редактирование товара" : "Новый товар"}
          </h2>

          <div className="mt-6 space-y-4">
            <Field label="Название">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Цена, KGS (пусто = по запросу)">
              <input
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Категория">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Наличие">
              <select
                value={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.value })}
                className={inputClass}
              >
                <option value="in-stock">В наличии</option>
                <option value="on-order">Под заказ</option>
                <option value="ask">Уточнить</option>
              </select>
            </Field>
            <Field label="Бренд">
              <input
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Описание">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Изображение товара">
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-foreground file:px-3 file:py-2 file:text-background file:text-sm"
                />
                {uploading ? (
                  <p className="text-xs text-muted-foreground">Загрузка изображения…</p>
                ) : null}
                {preview ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={preview}
                      alt="Предпросмотр"
                      className="h-20 w-20 rounded-md object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setForm((f) => ({ ...f, image_url: "" }));
                        setPreview("");
                      }}
                      className="text-xs underline text-muted-foreground"
                    >
                      Удалить
                    </button>
                  </div>
                ) : null}
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="или вставьте ссылку https://…"
                  className={inputClass}
                />
              </div>
            </Field>
            <Field label="Применение">
              <input
                value={form.application}
                onChange={(e) => setForm({ ...form, application: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Теги через запятую">
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className={inputClass}
              />
            </Field>
            <label className="flex items-center gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="size-4 accent-[var(--primary)]"
              />
              Показывать в каталоге
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Plus className="size-4" />
              {saving ? "Сохранение…" : editingId ? "Сохранить" : "Добавить товар"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-border px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                Отмена
              </button>
            ) : null}
          </div>
        </form>

        <section>
          <h2 className="font-display text-lg text-foreground">
            Товары ({rows.length})
          </h2>
          {isLoading ? (
            <p className="mt-6 text-sm text-muted-foreground">Загрузка…</p>
          ) : rows.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Пока нет добавленных товаров. Создайте первую карточку слева.
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {rows.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <div className="size-16 shrink-0 overflow-hidden rounded-md bg-secondary">
                    {row.image_url ? (
                      <img
                        src={row.image_url}
                        alt={row.name}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{row.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {row.category} · {row.price === null ? "цена по запросу" : `${row.price} KGS`}
                      {row.published ? "" : " · скрыт"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => startEdit(row)}
                    aria-label="Редактировать"
                    className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(row.id)}
                    aria-label="Удалить"
                    className="rounded-md border border-border p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <span className="block text-xs tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}
