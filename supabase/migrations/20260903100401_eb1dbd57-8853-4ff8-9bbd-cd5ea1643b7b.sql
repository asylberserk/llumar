create type public.app_role as enum ('admin','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create table public.admin_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text not null default 'LUXFIL Supply',
  category text not null default 'Инструмент',
  description text not null default '',
  price numeric,
  currency text not null default 'KGS',
  availability text not null default 'in-stock',
  image_url text,
  specifications jsonb not null default '[]'::jsonb,
  application text,
  tags text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.admin_products to anon;
grant select, insert, update, delete on public.admin_products to authenticated;
grant all on public.admin_products to service_role;
alter table public.admin_products enable row level security;

create policy "Anyone can view published products" on public.admin_products
  for select to anon, authenticated using (published = true);
create policy "Admins can view all products" on public.admin_products
  for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins can insert products" on public.admin_products
  for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "Admins can update products" on public.admin_products
  for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins can delete products" on public.admin_products
  for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger update_admin_products_updated_at before update on public.admin_products
for each row execute function public.update_updated_at_column();