ALTER TABLE accountability_reports
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id),
  ADD COLUMN IF NOT EXISTS secretariat_type TEXT,
  ADD COLUMN IF NOT EXISTS responsible_name TEXT,
  ADD COLUMN IF NOT EXISTS object_description TEXT,
  ADD COLUMN IF NOT EXISTS pdf_url TEXT;

UPDATE accountability_reports
SET secretariat_type = COALESCE(secretariat_type, 'education'),
    responsible_name = COALESCE(responsible_name, 'Nao informado')
WHERE secretariat_type IS NULL OR responsible_name IS NULL;

ALTER TABLE accountability_reports
  ALTER COLUMN secretariat_type SET NOT NULL,
  ALTER COLUMN responsible_name SET NOT NULL;

CREATE TABLE IF NOT EXISTS accountability_aps_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES accountability_reports(id) ON DELETE CASCADE,
  aps_id UUID NOT NULL REFERENCES aps_catalog(id),
  aps_code TEXT NOT NULL,
  aps_title TEXT NOT NULL,
  description TEXT,
  amount NUMERIC(12,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
