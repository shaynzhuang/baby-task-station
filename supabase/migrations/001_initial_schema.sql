-- supabase/migrations/001_initial_schema.sql

-- Children table (extensible: no limit on number of children)
create table children (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar text not null default '🧒',
  color text not null default '#FFB3CB',
  total_points int not null default 0,
  created_at timestamptz not null default now()
);

-- Tasks table (extensible: category_id for future grouping)
create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  points int not null default 1,
  type text not null check (type in ('daily', 'once')),
  child_id uuid references children(id) on delete set null,  -- null = all children
  category text not null default 'general',  -- extensibility: future categories
  enabled bool not null default true,
  created_at timestamptz not null default now()
);

-- Task completion logs (append-only, never delete)
create table task_logs (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  task_id uuid not null references tasks(id) on delete cascade,
  points_earned int not null,
  completed_at timestamptz not null default now()
);

-- Rewards table
create table rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  points_required int not null,
  stock int not null default -1,  -- -1 = unlimited
  enabled bool not null default true,
  created_at timestamptz not null default now()
);

-- Reward redemption logs (append-only, never delete)
create table reward_logs (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  reward_id uuid not null references rewards(id) on delete cascade,
  points_spent int not null,
  redeemed_at timestamptz not null default now()
);

-- Seed initial children
insert into children (name, avatar, color) values
  ('大女儿', '👧', '#FFB3CB'),
  ('小女儿', '👶', '#A0E8D4');
