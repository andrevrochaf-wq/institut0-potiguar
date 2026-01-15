# Seguranca e LGPD

## Objetivos
- Garantir acesso minimo necessario por setor
- Evitar vazamento de dados sensiveis
- Manter trilha de auditoria completa

## Controles obrigatorios
- Autenticacao com JWT + refresh
- RBAC: permissoes por modulo/acao
- ABAC: escopo por cidade/projeto/secretaria/estabelecimento
- Field-level: mascarar/ocultar CPF, RG, dados bancarios e endereco

## Boas praticas
- Senhas com hash forte (bcrypt/argon2)
- Rate limit e bloqueio por tentativas
- MFA para ADMIN e FINANCEIRO
- TLS em todas as rotas

## Auditoria
- Registrar: quem, quando, acao, antes/depois
- Logar downloads de PDF
- Monitorar erros 403 para ajustes de permissao
