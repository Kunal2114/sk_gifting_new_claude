-- Run once in Supabase: SQL Editor -> New query -> paste -> Run
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text,
  phone text,
  occasion text,
  deadline text,
  message text,
  items jsonb not null default '[]'::jsonb,
  status text not null default 'new'
);

-- RLS on with no public policies: the browser can never read or write this table.
-- The Next.js API route writes with the service-role key, which bypasses RLS.
alter table enquiries enable row level security;
