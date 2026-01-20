ALTER TABLE establishments
  ADD COLUMN IF NOT EXISTS total_students INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_classes INTEGER NOT NULL DEFAULT 0;

ALTER TABLE establishment_classes
  ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;

UPDATE establishments
SET total_students = COALESCE((
  SELECT SUM(ec.total_students)
  FROM establishment_classes ec
  WHERE ec.establishment_id = establishments.id
), 0),
total_classes = COALESCE((
  SELECT COUNT(ec.id)
  FROM establishment_classes ec
  WHERE ec.establishment_id = establishments.id
), 0);
