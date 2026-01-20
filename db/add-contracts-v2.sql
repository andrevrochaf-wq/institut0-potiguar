ALTER TABLE contracts
  ADD COLUMN IF NOT EXISTS city_id UUID,
  ADD COLUMN IF NOT EXISTS bank_name TEXT,
  ADD COLUMN IF NOT EXISTS contract_type TEXT;

UPDATE contracts
SET city_id = COALESCE(city_id, (SELECT id FROM cities LIMIT 1)),
    bank_name = COALESCE(bank_name, 'Nao informado'),
    contract_type = COALESCE(contract_type, 'RPA')
WHERE city_id IS NULL OR bank_name IS NULL OR contract_type IS NULL;

ALTER TABLE contracts
  ALTER COLUMN city_id SET NOT NULL,
  ALTER COLUMN bank_name SET NOT NULL,
  ALTER COLUMN contract_type SET NOT NULL,
  ALTER COLUMN start_date SET NOT NULL,
  ALTER COLUMN amount SET NOT NULL;
