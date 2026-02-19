-- Kalendar Database Schema
-- Run these migrations in Supabase SQL Editor

-- ============================================
-- 1. Profiles table (extends auth.users)
-- ============================================
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  timezone text default 'Asia/Bangkok',
  theme text default 'dark',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- 2. Events table
-- ============================================
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  location text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  all_day boolean default false,
  color text default '#3b82f6',
  recurrence_rule text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table events enable row level security;

create policy "Users can view own events"
  on events for select using (auth.uid() = user_id);
create policy "Users can insert own events"
  on events for insert with check (auth.uid() = user_id);
create policy "Users can update own events"
  on events for update using (auth.uid() = user_id);
create policy "Users can delete own events"
  on events for delete using (auth.uid() = user_id);

-- ============================================
-- 3. Tasks table
-- ============================================
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  status text default 'todo' check (status in ('todo', 'in_progress', 'done')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  due_date date,
  block_date date,
  block_start_time time,
  block_end_time time,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table tasks enable row level security;

create policy "Users can view own tasks"
  on tasks for select using (auth.uid() = user_id);
create policy "Users can insert own tasks"
  on tasks for insert with check (auth.uid() = user_id);
create policy "Users can update own tasks"
  on tasks for update using (auth.uid() = user_id);
create policy "Users can delete own tasks"
  on tasks for delete using (auth.uid() = user_id);

-- ============================================
-- 4. Habits table
-- ============================================
create table if not exists habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  color text default '#10b981',
  icon text,
  frequency text default 'daily' check (frequency in ('daily', 'weekly', 'custom')),
  custom_days integer[],
  target_count integer default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table habits enable row level security;

create policy "Users can view own habits"
  on habits for select using (auth.uid() = user_id);
create policy "Users can insert own habits"
  on habits for insert with check (auth.uid() = user_id);
create policy "Users can update own habits"
  on habits for update using (auth.uid() = user_id);
create policy "Users can delete own habits"
  on habits for delete using (auth.uid() = user_id);

-- ============================================
-- 5. Habit Logs table
-- ============================================
create table if not exists habit_logs (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references habits on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  logged_date date not null,
  count integer default 1,
  created_at timestamptz default now(),
  unique (habit_id, logged_date)
);

alter table habit_logs enable row level security;

create policy "Users can view own habit logs"
  on habit_logs for select using (auth.uid() = user_id);
create policy "Users can insert own habit logs"
  on habit_logs for insert with check (auth.uid() = user_id);
create policy "Users can update own habit logs"
  on habit_logs for update using (auth.uid() = user_id);
create policy "Users can delete own habit logs"
  on habit_logs for delete using (auth.uid() = user_id);
