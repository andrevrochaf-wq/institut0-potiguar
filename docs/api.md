# API (especificacao inicial)

Base URL: /api

## Auth
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh

## Usuarios e Acesso
- GET /users
- POST /users
- GET /users/:id
- PATCH /users/:id
- PATCH /users/:id/activate
- PATCH /users/:id/deactivate

- GET /roles
- POST /roles
- GET /roles/:id
- PATCH /roles/:id

- GET /permissions
- POST /permissions

- POST /users/:id/roles (atribuir role)
- DELETE /users/:id/roles/:roleId
- POST /users/:id/scopes
- DELETE /users/:id/scopes/:scopeId

## Colaboradores
- GET /collaborators
- POST /collaborators
- GET /collaborators/:id
- PATCH /collaborators/:id
- DELETE /collaborators/:id (soft delete)
- POST /collaborators/:id/documents
- GET /collaborators/:id/history
- POST /collaborators/import

## Contratos
- GET /contracts
- POST /contracts
- GET /contracts/:id
- PATCH /contracts/:id
- POST /contracts/bulk
- POST /contracts/:id/generate-pdf
- GET /contracts/:id/download

- GET /contract-templates
- POST /contract-templates
- PATCH /contract-templates/:id

## Estabelecimentos
- GET /establishments
- POST /establishments
- GET /establishments/:id
- PATCH /establishments/:id
- DELETE /establishments/:id (soft delete)
- POST /establishments/:id/classes

## APS
- GET /aps
- POST /aps
- PATCH /aps/:id

## Prestacao de contas
- GET /accountability
- POST /accountability
- GET /accountability/:id
- PATCH /accountability/:id
- DELETE /accountability/:id (soft delete)
- POST /accountability/:id/attachments
- POST /accountability/:id/generate-pdf
- GET /accountability/:id/download
- POST /accountability/:id/approve
- POST /accountability/:id/reject

## Auditoria
- GET /audit-logs
- GET /download-logs

## Notas
- Todas as rotas validam RBAC + ABAC
- Campos sensiveis sao retornados apenas para roles autorizadas
