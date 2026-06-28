-- supabase/migrations/002_atomic_points_rpcs.sql
-- Atomic point operations to prevent race conditions

create or replace function add_points(child_id uuid, delta int)
returns void language sql as $$
  update children
  set total_points = total_points + delta
  where id = child_id;
$$;

create or replace function deduct_points(child_id uuid, delta int)
returns void language sql as $$
  update children
  set total_points = greatest(0, total_points - delta)
  where id = child_id;
$$;
