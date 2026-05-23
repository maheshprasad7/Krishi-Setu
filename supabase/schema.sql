-- =========================================================================================
-- AGRI-MITHRA SUPABASE DATABASE SCHEMA
-- Instructions: Copy this entire file and paste it into the Supabase SQL Editor, then hit "Run".
-- =========================================================================================

-- 1. PROFILES TABLE (Stores user profile data from the settings page)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  phone text unique,
  email text unique,
  district text,
  age text,
  gender text,
  village text,
  state text,
  experience_years text,
  total_acres text,
  soil_type text,
  water_source text,
  irrigation_method text,
  current_crop text,
  previous_crop text,
  fertilizers_used text[],
  pesticides_used text[],
  machinery_owned text[],
  annual_income text,
  existing_loans text,
  selling_method text,
  market_used text,
  farming_type text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. SCAN REPORTS TABLE (Stores the AI disease scanning history)
create table if not exists public.scan_reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date text not null,
  image_name text,
  image_url text,
  status text check (status in ('healthy', 'diseased')),
  confidence numeric,
  disease_name_en text,
  disease_name_kn text,
  symptoms_en text,
  symptoms_kn text,
  prevention_en text,
  prevention_kn text,
  remedy_en text,
  remedy_kn text,
  chemicals_en text,
  chemicals_kn text,
  severity text check (severity in ('Low', 'Medium', 'High', 'Unknown')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. VOICE QUERIES TABLE (Stores the AI Voice Assistant history)
create table if not exists public.voice_queries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date text not null,
  query text not null,
  reply text not null,
  lang text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. RECYCLER LISTINGS TABLE (Stores marketplace items for farm waste)
create table if not exists public.recycler_listings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_en text not null,
  item_kn text not null,
  quantity text not null,
  price text not null,
  distance text,
  farmer_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures that farmers can only see and edit their own data.
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.scan_reports enable row level security;
alter table public.voice_queries enable row level security;
alter table public.recycler_listings enable row level security;

-- Profiles Policies
create policy "Users can view own profile" on public.profiles for select using ( auth.uid() = id );
create policy "Users can insert own profile" on public.profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile" on public.profiles for update using ( auth.uid() = id );

-- Scan Reports Policies
create policy "Users can view own scan reports" on public.scan_reports for select using ( auth.uid() = user_id );
create policy "Users can insert own scan reports" on public.scan_reports for insert with check ( auth.uid() = user_id );
create policy "Users can delete own scan reports" on public.scan_reports for delete using ( auth.uid() = user_id );

-- Voice Queries Policies
create policy "Users can view own voice queries" on public.voice_queries for select using ( auth.uid() = user_id );
create policy "Users can insert own voice queries" on public.voice_queries for insert with check ( auth.uid() = user_id );
create policy "Users can delete own voice queries" on public.voice_queries for delete using ( auth.uid() = user_id );

-- Recycler Listings Policies (Listings are public to read, but only owner can edit/delete)
create policy "Anyone can view recycler listings" on public.recycler_listings for select using ( true );
create policy "Users can insert own recycler listings" on public.recycler_listings for insert with check ( auth.uid() = user_id );
create policy "Users can update own recycler listings" on public.recycler_listings for update using ( auth.uid() = user_id );
create policy "Users can delete own recycler listings" on public.recycler_listings for delete using ( auth.uid() = user_id );

-- ==============================================================================
-- AUTO-CREATE PROFILE TRIGGER
-- Automatically creates a profile row when a new user signs up via OTP.
-- ==============================================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, phone, email, name)
  values (
    new.id, 
    new.phone, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'name', 'Farmer')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
