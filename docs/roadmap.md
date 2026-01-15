# Planejamento e Backlog Inicial

## Fase 0 - Descoberta
- Mapa de processos
- Catalogo de dados e validacoes
- Matriz de permissoes (setor x modulo x acao)
- Matriz de escopo (usuario x cidade/projeto/secretaria)
- Politica de dados sensiveis

## Fase 1 - Fundacao tecnica
- Auth + RBAC inicial
- ABAC (escopo) e field-level
- Auditoria
- Layout base e rotas protegidas

## Fase 2 - Tabelas de referencia
- cidades, bancos, projetos, servicos, tipos contrato, secretarias, APS

## Fase 3 - Estabelecimentos
- CRUD + categorias/turmas + totais

## Fase 4 - Colaboradores
- Cadastro + historico + anexos
- LGPD por setor

## Fase 5 - Contratos
- Selecao em lote + templates versionados + PDF worker
- Download individual e em lote

## Fase 6 - Prestacao de contas
- CRUD + anexos/evidencias + workflow + PDF
- Perfis: Financeiro (edicao) / Contabil (revisao) / Auditor (leitura)

## Fase 7 - Hardening
- Testes e2e de permissoes e escopo
- Observabilidade e backup/restore

## Epicos
- Acesso por setor (RBAC/ABAC/field-level)
- Colaboradores
- Contratos
- Estabelecimentos
- Prestacao de contas
