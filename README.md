# Instituto Potiguar - Sistema Web (Backoffice)

Este repositorio contem o projeto do sistema web administrativo do Instituto Potiguar, com foco em gestao de colaboradores, contratos, APS, estabelecimentos e prestacao de contas.

## Stack recomendada
- Frontend: Next.js (React + TypeScript)
- Backend: NestJS (Node.js + TypeScript)
- Banco de dados: PostgreSQL
- Storage: S3 compativel (arquivos e PDFs)
- Fila: Redis + worker para PDF/ZIP/importacao

## Estrutura de pastas
- `frontend/`: app web (backoffice)
- `backend/`: API, RBAC/ABAC e servicos
- `db/`: schemas, migrations, seeds
- `docs/`: requisitos, arquitetura, permissoes, modelo de dados e planejamento

## Documentacao
- `docs/requirements.md`: requisitos funcionais e nao funcionais
- `docs/permissions.md`: RBAC/ABAC/field-level e matriz inicial
- `docs/data-model.md`: entidades e relacoes
- `docs/architecture.md`: arquitetura e decisoes tecnicas
- `docs/roadmap.md`: fases e backlog inicial
- `docs/api.md`: endpoints base
- `docs/security.md`: controles de seguranca e LGPD

## Ambiente e configuracao
- `backend/.env.example`: variaveis do backend
- `frontend/.env.example`: variavel da API para o frontend
- `db/docker-compose.yml`: Postgres + Redis + MinIO (local)

## Uso rapido (desenvolvimento)
1) Subir infraestrutura local:
   - `docker compose -f db/docker-compose.yml up -d`
2) Backend:
   - `cd backend`
   - `cp .env.example .env`
   - `npm run start:dev`
3) Frontend:
   - `cd frontend`
   - `cp .env.example .env`
   - `npm run dev`

## Credenciais iniciais (dev)
- Email: `admin@instituto-potiguar.local`
- Senha: `Admin@123`
- Troque a senha apos o primeiro acesso.

## Proximos passos
1. Aprovar stack e versoes (Node, Postgres, Redis)
2. Gerar projetos base (frontend/backed) com scaffolding
3. Definir roles, permissoes e escopos iniciais (seed)
4. Iniciar modulo de Estabelecimentos (base do escopo)
