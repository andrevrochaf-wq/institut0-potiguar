-- Seed roles
INSERT INTO roles (name, description) VALUES
  ('ADMIN', 'Acesso total ao sistema'),
  ('RH', 'Gestao de colaboradores e contratos'),
  ('FINANCEIRO', 'Prestacao de contas e evidencias'),
  ('CONTABIL', 'Consulta e revisao com acesso limitado'),
  ('GESTOR_PROJETO', 'Leitura por escopo'),
  ('AUDITOR', 'Somente leitura e auditoria')
ON CONFLICT DO NOTHING;

-- Seed permissions (exemplos base)
INSERT INTO permissions (module, action, key, description) VALUES
  ('colaboradores', 'read', 'colaboradores.read', 'Listar e visualizar colaboradores'),
  ('colaboradores', 'create', 'colaboradores.create', 'Criar colaborador'),
  ('colaboradores', 'update', 'colaboradores.update', 'Editar colaborador'),
  ('colaboradores', 'delete', 'colaboradores.delete', 'Inativar colaborador'),

  ('contratos', 'read', 'contratos.read', 'Listar e visualizar contratos'),
  ('contratos', 'create', 'contratos.create', 'Criar contrato'),
  ('contratos', 'update', 'contratos.update', 'Editar contrato'),
  ('contratos', 'delete', 'contratos.delete', 'Cancelar contrato'),
  ('contratos', 'generate_pdf', 'contratos.generate_pdf', 'Gerar PDF de contrato'),
  ('contratos', 'download_pdf', 'contratos.download_pdf', 'Baixar PDF de contrato'),

  ('estabelecimentos', 'read', 'estabelecimentos.read', 'Listar e visualizar estabelecimentos'),
  ('estabelecimentos', 'create', 'estabelecimentos.create', 'Criar estabelecimento'),
  ('estabelecimentos', 'update', 'estabelecimentos.update', 'Editar estabelecimento'),
  ('estabelecimentos', 'delete', 'estabelecimentos.delete', 'Excluir estabelecimento'),

  ('aps', 'read', 'aps.read', 'Listar APS'),
  ('aps', 'create', 'aps.create', 'Criar APS'),
  ('aps', 'update', 'aps.update', 'Editar APS'),
  ('aps', 'delete', 'aps.delete', 'Excluir APS'),

  ('prestacao_contas', 'read', 'prestacao_contas.read', 'Listar e visualizar prestacoes'),
  ('prestacao_contas', 'create', 'prestacao_contas.create', 'Criar prestacao de contas'),
  ('prestacao_contas', 'update', 'prestacao_contas.update', 'Editar prestacao de contas'),
  ('prestacao_contas', 'delete', 'prestacao_contas.delete', 'Excluir prestacao de contas'),
  ('prestacao_contas', 'generate_pdf', 'prestacao_contas.generate_pdf', 'Gerar PDF de prestacao de contas'),
  ('prestacao_contas', 'download_pdf', 'prestacao_contas.download_pdf', 'Baixar PDF de prestacao de contas'),
  ('prestacao_contas', 'approve', 'prestacao_contas.approve', 'Aprovar prestacao de contas')
ON CONFLICT DO NOTHING;
