# Banco de Dados

Este diretorio contem o schema e seeds iniciais do PostgreSQL.

## Arquivos
- schema.sql: estrutura base do banco
- seeds.sql: roles e permissoes iniciais
- docker-compose.yml: ambiente local (Postgres, Redis, MinIO)

## Uso rapido (Postgres local)
1) Crie o banco e habilite a extensao pgcrypto
2) Rode o schema:
   psql -d instituto_potiguar -f db/schema.sql
3) Rode as seeds:
   psql -d instituto_potiguar -f db/seeds.sql
