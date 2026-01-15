-- New permissions
INSERT INTO permissions (module, action, key, description) VALUES
  ('dashboard', 'read', 'dashboard.read', 'Visualizar dashboard'),
  ('notifications', 'read', 'notifications.read', 'Listar notificacoes'),
  ('notifications', 'update', 'notifications.update', 'Marcar notificacoes como lidas'),
  ('fornecedores', 'read', 'fornecedores.read', 'Listar fornecedores'),
  ('fornecedores', 'create', 'fornecedores.create', 'Criar fornecedor'),
  ('fornecedores', 'update', 'fornecedores.update', 'Editar fornecedor'),
  ('fornecedores', 'delete', 'fornecedores.delete', 'Excluir fornecedor'),

  ('agenda', 'read', 'agenda.read', 'Listar agenda'),
  ('agenda', 'create', 'agenda.create', 'Criar agenda'),
  ('agenda', 'update', 'agenda.update', 'Editar agenda'),
  ('agenda', 'delete', 'agenda.delete', 'Excluir agenda'),

  ('servicos', 'read', 'servicos.read', 'Listar servicos'),
  ('servicos', 'create', 'servicos.create', 'Criar servico'),
  ('servicos', 'update', 'servicos.update', 'Editar servico'),
  ('servicos', 'delete', 'servicos.delete', 'Excluir servico'),

  ('projetos', 'read', 'projetos.read', 'Listar projetos'),
  ('projetos', 'create', 'projetos.create', 'Criar projeto'),
  ('projetos', 'update', 'projetos.update', 'Editar projeto'),
  ('projetos', 'delete', 'projetos.delete', 'Excluir projeto'),

  ('cidades', 'read', 'cidades.read', 'Listar cidades'),
  ('cidades', 'create', 'cidades.create', 'Criar cidade'),
  ('cidades', 'update', 'cidades.update', 'Editar cidade'),
  ('cidades', 'delete', 'cidades.delete', 'Excluir cidade'),

  ('noticias', 'read', 'noticias.read', 'Listar noticias'),
  ('noticias', 'create', 'noticias.create', 'Criar noticia'),
  ('noticias', 'update', 'noticias.update', 'Editar noticia'),
  ('noticias', 'delete', 'noticias.delete', 'Excluir noticia'),

  ('usuarios', 'read', 'usuarios.read', 'Listar usuarios'),
  ('usuarios', 'create', 'usuarios.create', 'Criar usuario'),
  ('usuarios', 'update', 'usuarios.update', 'Atualizar usuario'),

  ('financeiro_folha', 'read', 'financeiro_folha.read', 'Listar resumo folha'),
  ('financeiro_folha', 'create', 'financeiro_folha.create', 'Criar resumo folha'),
  ('financeiro_despesas', 'read', 'financeiro_despesas.read', 'Listar despesas indiretas'),
  ('financeiro_despesas', 'create', 'financeiro_despesas.create', 'Criar despesa indireta')
ON CONFLICT DO NOTHING;

-- Map roles to permissions
WITH
  admin AS (SELECT id FROM roles WHERE name = 'ADMIN'),
  rh AS (SELECT id FROM roles WHERE name = 'RH'),
  financeiro AS (SELECT id FROM roles WHERE name = 'FINANCEIRO'),
  contabil AS (SELECT id FROM roles WHERE name = 'CONTABIL'),
  gestor AS (SELECT id FROM roles WHERE name = 'GESTOR_PROJETO'),
  auditor AS (SELECT id FROM roles WHERE name = 'AUDITOR'),
  perms AS (SELECT id, key FROM permissions)
INSERT INTO role_permissions (role_id, permission_id)
SELECT admin.id, perms.id FROM admin, perms
ON CONFLICT DO NOTHING;

-- RH
INSERT INTO role_permissions (role_id, permission_id)
SELECT rh.id, perms.id FROM rh, perms
WHERE perms.key IN (
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
ON CONFLICT DO NOTHING;

-- Financeiro
INSERT INTO role_permissions (role_id, permission_id)
SELECT financeiro.id, perms.id FROM financeiro, perms
WHERE perms.key IN (
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
ON CONFLICT DO NOTHING;

-- Contabil
INSERT INTO role_permissions (role_id, permission_id)
SELECT contabil.id, perms.id FROM contabil, perms
WHERE perms.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'prestacao_contas.read',
  'contratos.read',
  'estabelecimentos.read',
  'aps.read',
  'financeiro_folha.read',
  'financeiro_despesas.read'
)
ON CONFLICT DO NOTHING;

-- Gestor
INSERT INTO role_permissions (role_id, permission_id)
SELECT gestor.id, perms.id FROM gestor, perms
WHERE perms.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'estabelecimentos.read',
  'aps.read',
  'projetos.read'
)
ON CONFLICT DO NOTHING;

-- Auditor
INSERT INTO role_permissions (role_id, permission_id)
SELECT auditor.id, perms.id FROM auditor, perms
WHERE perms.key IN (
  'dashboard.read',
  'notifications.read', 'notifications.update',
  'prestacao_contas.read',
  'contratos.read',
  'estabelecimentos.read',
  'aps.read'
)
ON CONFLICT DO NOTHING;
