# Requisitos do Sistema (v2)

## 1. Visao geral
Portal administrativo (backoffice) para o Instituto Potiguar, com foco em:
- Gestao de colaboradores (RH/contratos/alocacao por cidade, projeto, estabelecimento, servico)
- Catalogo APS (Atividades e Projetos - lista padronizada)
- Cadastro e estrutura de estabelecimentos (escolas/creches, INEP, alunos, turmas, etapas)
- Gestao de contratos (selecao, geracao em lote, PDF)
- Prestacao de contas (relatorios por competencia, PDF, edicao, exclusao controlada, filtros)

Interface esperada:
- Menu lateral em "Gestao"
- Busca global no topo
- Usuario logado + setor no canto superior direito
- Listagens com filtro, ordenacao, paginacao e acoes (editar/excluir/baixar)

## 2. Controle de acesso (essencial)
### 2.1 Camadas
1) Permissao por modulo (menu/rotas)
2) Permissao por acao (CRUD, gerar PDF, exportar, aprovar, etc)
3) Escopo de dados (ABAC: cidade/projeto/secretaria/estabelecimento)
4) Restricao por campo (field-level: CPF, RG, dados bancarios, endereco completo)

### 2.2 Setores/Perfis base
- ADMIN: acesso total, parametros, usuarios, permissoes
- RH: colaboradores + contratos (CRUD conforme regra), leitura de estabelecimentos
- FINANCEIRO: prestacao de contas + evidencias + PDF
- CONTABIL: acesso limitado (consulta/revisao/download)
- GESTOR_PROJETO: leitura por escopo (sem dados sensiveis)
- AUDITOR/LEITOR: somente leitura + download + logs

### 2.3 Requisito de ouro
Backend valida tudo: autenticacao, permissao de acao, escopo e field-level.

## 3. Requisitos funcionais (base)
- Autenticacao e sessao segura
- Autorizacao por setor/perfil (RBAC) em rotas, UI e API
- Escopo por cidade/projeto/secretaria (ABAC)
- Field-level para dados sensiveis
- Listagens: paginacao, ordenacao, busca, filtros combinaveis
- CRUD com validacao
- Soft delete + trilha de auditoria
- Upload/download de documentos (PDF/anexos)
- Exportacoes (CSV/XLSX/PDF) conforme permissao
- Logs/auditoria (quem, quando, antes/depois)
- Estados de tela (empty/loading/erro)

## 4. Requisitos por modulo
### 4.1 Colaboradores
- Cadastro completo (dados pessoais, vinculo, banco, anexos)
- Listar/filtrar (cidade, projeto, banco, contrato, estabelecimento, servico, situacao)
- Editar com auditoria
- Inativar/reativar
- Historico do colaborador
- Importacao em lote (CSV/XLSX)

Acesso: RH/ADMIN completo; demais leitura limitada ou sem acesso

### 4.2 Contratos
- Listar colaboradores aptos
- Selecao em lote
- Geracao de contrato (template + variaveis + PDF)
- Gestao de templates (versao, placeholders, ativo/inativo)
- Assinatura (upload assinado / integracao futura)
- Download em lote (zip)

Acesso: RH/ADMIN geram; Financeiro/Contabil consultam e baixam

### 4.3 Estabelecimentos
- Cadastro/edicao (INEP, cidade, status)
- Estrutura por categorias/etapas e turmas
- Calculo automatico de totais
- Importacao base (opcional)
- Vinculo com colaboradores
- Escopo por cidade (se aplicavel)

### 4.4 APS
- Catalogo APS (codigo unico APS001...)
- Consulta e busca
- Administracao somente ADMIN (se necessario)

### 4.5 Prestacao de contas
- Criar prestacao (titulo, secretaria, cidade, competencia mes/ano, conteudo)
- Workflow (rascunho -> revisao -> aprovado -> fechado)
- Anexos/evidencias com metadados
- Gerar/baixar PDF
- Versionamento e auditoria

Acesso: Financeiro cria/edita; Contabil revisa/baixa; Auditor leitura

## 5. Regras de negocio transversais
- Dados bancarios: alteracao gera log e pode exigir permissao especial
- Contratos: nao apagar, apenas cancelar/inativar
- Prestacao de contas rastreavel: anexos, versoes, aprovadores, data/hora
- Integridade referencial: parametros em uso apenas inativar
- Competencia mes/ano padronizada
- Excluir "de verdade" apenas rascunho ou ADMIN (preferir cancelar)

## 6. Requisitos nao funcionais
### 6.1 Seguranca e LGPD
- RBAC + ABAC + field-level obrigatorio
- TLS e criptografia em repouso
- MFA para ADMIN/FINANCEIRO (recomendado)
- Rate limit e protecao OWASP
- Politica de senha e bloqueio por tentativa
- Auditoria de downloads

### 6.2 Performance
- Indices para cidade, mes, ano, status, projeto
- Cache para tabelas de referencia
- PDFs via fila (assincrono)

### 6.3 Confiabilidade
- Backup DB e arquivos com restore testado
- Retencao documental definida

### 6.4 Usabilidade e acessibilidade
- Padrao consistente, navegacao por teclado, contraste (WCAG AA)

### 6.5 Observabilidade
- Logs estruturados
- Alertas para falhas de PDF/upload
- Registro de acessos negados (403)
