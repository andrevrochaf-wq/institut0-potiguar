CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payroll_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competency_month INT NOT NULL,
  competency_year INT NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS indirect_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  competency_month INT NOT NULL,
  competency_year INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
