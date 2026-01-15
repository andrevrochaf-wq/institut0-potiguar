# Modelo de Dados (alto nivel)

## 1. Entidades principais
- users
- roles
- permissions
- role_permissions
- user_roles
- user_scopes

- collaborators
- collaborator_documents
- establishments
- establishment_classes
- establishment_categories

- aps_catalog
- contracts
- contract_templates
- contract_versions
- contract_documents

- accountability_reports
- accountability_attachments
- accountability_status_history

- audit_logs
- download_logs (opcional)

## 2. Relacoes chave
- users <-> roles (many-to-many)
- roles <-> permissions (many-to-many)
- users <-> scopes (many-to-many por tipo de escopo)

- establishments -> cities (1..n)
- collaborators -> establishments (n..n, via alocacoes)
- contracts -> collaborators (n..1)
- contracts -> contract_templates (n..1)

- accountability_reports -> establishments/cities/secretarias
- accountability_reports -> accountability_attachments (1..n)

## 3. Campos sensiveis
- collaborators.cpf, collaborators.rg
- collaborators.bank_agency, collaborators.bank_account
- collaborators.address_full

## 4. Auditar sempre
- alteracoes em dados pessoais e bancarios
- geracao e download de PDFs
- mudancas de status em prestacoes e contratos
