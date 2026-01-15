# Controle de Acesso (RBAC/ABAC/Field-level)

## 1. Conceitos
- RBAC: roles x permissoes por modulo e acao
- ABAC: escopo por cidade/projeto/secretaria/estabelecimento
- Field-level: mascaramento/ocultacao de campos sensiveis

## 2. Roles base
- ADMIN
- RH
- FINANCEIRO
- CONTABIL
- GESTOR_PROJETO
- AUDITOR

## 3. Modulos e acoes
Modulos:
- colaboradores
- contratos
- estabelecimentos
- aps
- prestacao_contas
- administracao

Acoes:
- read, create, update, delete
- generate_pdf, download_pdf, export
- approve, close, cancel
- upload, download

## 4. Matriz inicial (resumo)
### Colaboradores
- ADMIN: CRUD + anexos + export + auditoria
- RH: CRUD + anexos + export (escopo)
- FINANCEIRO: leitura limitada (sem PII/banco)
- CONTABIL: sem acesso ou leitura minima sem PII
- GESTOR/AUDITOR: leitura sem PII

### Contratos
- ADMIN: CRUD + gerar em lote + cancelar/encerrar + download
- RH: gerar em lote + editar antes de assinar + download
- FINANCEIRO: leitura + download + export
- CONTABIL: leitura + download
- AUDITOR: leitura + download (se permitido)

### Estabelecimentos
- ADMIN: CRUD
- RH/FINANCEIRO/CONTABIL/GESTOR/AUDITOR: leitura

### APS
- ADMIN: CRUD (se APS editavel)
- Demais: leitura

### Prestacao de contas
- ADMIN: CRUD + workflow completo + export
- FINANCEIRO: criar/editar + anexar evidencias + gerar PDF
- CONTABIL: visualizar/baixar + revisar/aprovar (opcional) sem excluir
- GESTOR/AUDITOR: leitura + download do escopo

## 5. Escopo (ABAC)
- usuario possui escopos: cidades, projetos, secretarias, estabelecimentos
- todas as consultas filtram pelo escopo permitido
- escopo pode ser herdado por role ou atribuido direto ao usuario

## 6. Field-level (dados sensiveis)
Campos sensiveis:
- CPF, RG
- dados bancarios (agencia, conta)
- endereco completo
- anexos pessoais

Regras:
- mascarar ou ocultar campos por role
- logs de acesso quando dados sensiveis forem exibidos

## 7. Enforcement
- API sempre valida auth + role + acao + escopo + field-level
- UI apenas reflete permissoes (nao e controle de seguranca)
