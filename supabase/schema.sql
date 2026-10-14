-- FJ Cab Services: run this whole file once in Supabase > SQL Editor.

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('Sedans','SUVs','Buses & Vans','Luxury/Executive')),
  tag text,
  capacity int not null default 4,
  luggage int not null default 2,
  drive_type text not null default 'Chauffeur-driven',
  insurance text not null default 'Comprehensive',
  coverage_area text not null default 'Lagos & Nationwide',
  features text[] not null default '{}',
  daily_rate int not null,
  weekly_rate int not null,
  image_url text not null,
  description text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text,
  phone text not null check (char_length(phone) between 5 and 30),
  vehicle text,
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.vehicles enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "public read vehicles" on public.vehicles;
create policy "public read vehicles" on public.vehicles for select using (published or public.is_admin());
drop policy if exists "admin manage vehicles" on public.vehicles;
create policy "admin manage vehicles" on public.vehicles for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "anyone send enquiry" on public.enquiries;
create policy "anyone send enquiry" on public.enquiries for insert to anon, authenticated with check (true);
drop policy if exists "admin read enquiries" on public.enquiries;
create policy "admin read enquiries" on public.enquiries for select to authenticated using (public.is_admin());
drop policy if exists "admin delete enquiries" on public.enquiries;
create policy "admin delete enquiries" on public.enquiries for delete to authenticated using (public.is_admin());

drop policy if exists "admin read self" on public.admin_users;
create policy "admin read self" on public.admin_users for select to authenticated using (user_id = auth.uid());

-- Photo storage
insert into storage.buckets (id, name, public) values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do nothing;
drop policy if exists "public view vehicle images" on storage.objects;
create policy "public view vehicle images" on storage.objects for select using (bucket_id = 'vehicle-images');
drop policy if exists "admin upload vehicle images" on storage.objects;
create policy "admin upload vehicle images" on storage.objects for insert to authenticated with check (bucket_id = 'vehicle-images' and public.is_admin());
drop policy if exists "admin delete vehicle images" on storage.objects;
create policy "admin delete vehicle images" on storage.objects for delete to authenticated using (bucket_id = 'vehicle-images' and public.is_admin());

-- Sample fleet
insert into public.vehicles (slug,name,category,tag,capacity,luggage,drive_type,features,daily_rate,weekly_rate,image_url,featured,description) values
('mercedes-s-class','Mercedes-Benz S-Class','Luxury/Executive','Ultra Luxury',4,3,'Chauffeur-driven','{"Climate control","VIP glove service","Weddings & events","Leather interior"}',250000,1500000,'/images/hero.jpg',true,'Our flagship executive saloon for VIP movement, weddings and corporate guests.'),
('cadillac-escalade','Cadillac Escalade','SUVs','Executive',7,5,'Chauffeur-driven','{"Climate control","Spacious cabin","VIP glove service","Airport pickups"}',300000,1800000,'/images/suv.jpg',true,null),
('armoured-lexus-lx570','Armoured Lexus LX 570','SUVs','Armoured',5,4,'Chauffeur-driven','{"B6 armour","High security","Escort available","Climate control"}',450000,2800000,'/images/suv.jpg',true,null),
('toyota-camry','Toyota Camry','Sedans','Business',4,2,'Self-drive or chauffeur','{"Climate control","Fuel efficient","Bluetooth audio"}',70000,420000,'/images/sedan.jpg',false,null),
('lexus-es350','Lexus ES 350','Sedans','Executive',4,2,'Self-drive or chauffeur','{"Climate control","Leather seats","Corporate trips"}',110000,650000,'/images/sedan.jpg',false,null),
('toyota-hiace','Toyota Hiace Executive','Buses & Vans','Group Travel',14,10,'Chauffeur-driven','{"Climate control","Events & tours","Staff transport"}',150000,900000,'/images/bus.jpg',true,null),
('toyota-coaster','Toyota Coaster Bus','Buses & Vans','Group Travel',30,20,'Chauffeur-driven','{"Climate control","Weddings & events","Long distance"}',220000,1300000,'/images/bus.jpg',false,null),
('range-rover-vogue','Range Rover Vogue','Luxury/Executive','Ultra Luxury',4,3,'Chauffeur-driven','{"Climate control","VIP glove service","Panoramic roof"}',350000,2100000,'/images/suv.jpg',false,null)
on conflict (slug) do nothing;

-- AFTER creating your admin user in Authentication > Users, run:
-- insert into public.admin_users (user_id) select id from auth.users where email = 'you@example.com';
