-- RH
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'colaboradores.read', 'colaboradores.create', 'colaboradores.update', 'colaboradores.delete',
  'contratos.read', 'contratos.create', 'contratos.update',
  'estabelecimentos.read',
  'aps.read',
  'servicos.read', 'servicos.create', 'servicos.update',
  'projetos.read', 'projetos.create', 'projetos.update',
  'fornecedores.read', 'fornecedores.create',
  'agenda.read', 'agenda.create',
  'cidades.read'
)
WHERE r.name = 'RH'
ON CONFLICT DO NOTHING;

-- Financeiro
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'prestacao_contas.read', 'prestacao_contas.create', 'prestacao_contas.update',
  'contratos.read',
  'estabelecimentos.read',
  'aps.read',
  'fornecedores.read',
  'agenda.read',
  'cidades.read',
  'financeiro_folha.read', 'financeiro_folha.create',
  'financeiro_despesas.read', 'financeiro_despesas.create'
)
WHERE r.name = 'FINANCEIRO'
ON CONFLICT DO NOTHING;

-- Contabil
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'prestacao_contas.read',
  'contratos.read',
  'estabelecimentos.read',
  'aps.read',
  'financeiro_folha.read',
  'financeiro_despesas.read'
)
WHERE r.name = 'CONTABIL'
ON CONFLICT DO NOTHING;

-- Gestor
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'estabelecimentos.read',
  'aps.read',
  'projetos.read'
)
WHERE r.name = 'GESTOR_PROJETO'
ON CONFLICT DO NOTHING;

-- Auditor
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'prestacao_contas.read',
  'contratos.read',
  'estabelecimentos.read',
  'aps.read'
)
WHERE r.name = 'AUDITOR'
ON CONFLICT DO NOTHING;
