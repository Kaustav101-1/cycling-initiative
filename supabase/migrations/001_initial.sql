-- Run this in your Supabase SQL editor to create the required tables.

CREATE TABLE IF NOT EXISTS campus_views (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  campus      TEXT        NOT NULL CHECK (campus IN ('iim-calcutta', 'nit-trichy', 'bits-pilani')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interest_responses (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  campus      TEXT        NOT NULL CHECK (campus IN ('iim-calcutta', 'nit-trichy', 'bits-pilani')),
  interested  BOOLEAN     NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS registrations (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  campus      TEXT        NOT NULL CHECK (campus IN ('iim-calcutta', 'nit-trichy', 'bits-pilani')),
  name        TEXT        NOT NULL,
  batch       TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
