# Registro de decisões arquiteturais

Decisões relevantes são registradas aqui para evitar redefinições sem contexto.

## ADR-001 — Studio local antes de serviço remoto
**Status:** aceita.  
**Decisão:** Node.js local, arquivos JSON/Markdown e GitHub.  
**Motivo:** reduzir infraestrutura, custo e exposição de dados.

## ADR-002 — Userscripts independentes
**Status:** aceita.  
**Decisão:** cada automação final é um userscript específico; Inspector separado.  
**Motivo:** reduzir acoplamento e limitar impacto de falhas.

## ADR-003 — IA como assistente
**Status:** aceita.  
**Decisão:** IA prepara especificação/código; revisão e homologação são humanas.  
**Motivo:** comportamento NXJ e efeitos operacionais exigem evidência.

## ADR-004 — Sem CI/CD nesta fase
**Status:** aceita.  
**Decisão:** não criar Actions ou pipelines; testes locais e registro no PR.  
**Motivo:** restrição operacional e preferência do mantenedor.

## ADR-005 — Ajv e Node Test Runner
**Status:** aceita para fundação.  
**Decisão:** Ajv 8.20.0, node:test e Draft-07 nos schemas atuais; strict e allErrors.  
**Motivo:** contratos explícitos e poucas dependências. Formatos adicionais somente quando necessários e testados.

## ADR-006 — Licença pendente
**Status:** pendente.  
**Decisão:** não adicionar licença até o mantenedor escolher termos de distribuição.

## ADR-007 — CLI-first
**Status:** aceita para o MVP.  
**Decisão:** validar fluxo via CLI/arquivos antes de escolher framework de UI.  
**Motivo:** evitar frontend prematuro.

## ADR-008 — Inspector read-only
**Status:** aceita para o MVP.  
**Decisão:** coletar metadados allowlisted, sem valores de campos nem interceptação de rede.  
**Motivo:** reduzir exposição de dados e risco operacional.

## ADR-009 — Exportação manual do pacote IA
**Status:** aceita para o MVP.  
**Decisão:** gerar pacote local revisável, sem envio automático a serviços externos.  
**Motivo:** controle de privacidade, custo e provedor.

## ADR-010 — Ferramentas adiadas
**Status:** aceita.  
**Decisão:** não adicionar React, Electron, Playwright, SQLite, backend ou API de IA antes de existir necessidade demonstrada.  
**Motivo:** reduzir dependências e manutenção.

## ADR-011 — Pacotes de contexto com allowlist e proveniência
**Status:** aceita como requisito de projeto.  
**Decisão:** incluir somente arquivos autorizados, com finalidade, confiança, versão/commit, hash e tamanho.  
**Motivo:** reduzir vazamento, prompt injection por conteúdo externo e contexto excessivo.

## Risco aberto — visibilidade pública do repositório

**Status:** aberto.  
**Fato:** o repositório está público em 2026-11-11. A decisão atual do mantenedor é mantê-lo público até nova orientação explícita.  
**Risco:** documentação e metadados técnicos podem revelar detalhes internos mesmo sem conter dados de clientes. A verificação de dados sensíveis e o procedimento de captura segura estão descritos em [SECURITY_MODEL.md](SECURITY_MODEL.md).  
**Controle:** não incluir dados reais do ERP, capturas brutas ou conteúdo identificável. Não alterar a visibilidade nem reescrever o histórico sem autorização explícita do mantenedor.

## ADR-012 — Captura manual de requisições de rede, separada do Inspector

**Status:** aceita.  
**Decisão:** quando a investigação exigir observar uma requisição de rede, a captura será feita manualmente pelo mantenedor/investigador autorizado nas ferramentas de desenvolvimento do navegador, fora do Inspector. A captura nunca será automática e não será incorporada ao Inspector. Valores sensíveis devem ser mascarados antes de qualquer registro; nenhum dado real, arquivo bruto ou payload identificável pode entrar no repositório, em uma PR ou em pacote de contexto.  
**Motivo:** permitir análise técnica pontual sem transformar o Inspector em coletor de tráfego nem ampliar a coleta automática de dados sensíveis.  
**Procedimento:** seguir a seção "Captura manual de rede" de [SECURITY_MODEL.md](SECURITY_MODEL.md). Em caso de dúvida sobre a eficácia da máscara, descartar a captura e registrar a lacuna sem anexar o material original.
