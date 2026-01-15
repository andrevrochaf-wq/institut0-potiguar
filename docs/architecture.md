# Arquitetura (proposta)

## 1. Visao geral
Arquitetura em camadas com separacao clara entre UI, API, dominio e infraestrutura.

Frontend (Next.js)
- Backoffice com rotas protegidas
- Autorizacao no UI (somente para UX)
- Consumo de API REST/JSON

Backend (NestJS)
- Auth (JWT + refresh)
- RBAC (roles e permissoes)
- ABAC (filtros por escopo)
- Field-level (serializacao por role)
- Auditoria e logs estruturados

Banco (PostgreSQL)
- Migrations e seeds
- Indices por cidade, competencia e status

Infra
- Storage S3 para documentos
- Redis + worker para PDF/ZIP/importacao

## 2. Enforcement de seguranca
- Guards/middlewares validam role/acao por rota
- Repositorios aplicam filtros de escopo
- Serializadores removem/mascaram campos sensiveis

## 3. Modulos backend (sugestao)
- auth
- users/roles/permissions
- collaborators
- contracts
- establishments
- aps
- accountability
- audit
- files

## 4. Observabilidade
- logs estruturados (request_id)
- audit_logs para eventos criticos
- alertas para falhas em PDF/upload
