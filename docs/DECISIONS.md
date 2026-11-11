# Registro de decisões arquiteturais

Decisões relevantes são registradas aqui para evitar redefinições sem contexto. O escopo vigente abaixo é a fonte canônica para limites do produto e do piloto; decisões de evidência e risco ficam em [SECURITY_MODEL.md](SECURITY_MODEL.md), e a ordem das entregas fica em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## Escopo vigente — fonte canônica

**Problema central:** dificuldade para criar automações no Systêxtil, principalmente por não compreender suficientemente a tela, os campos, as inserções de dados e a troca de telas antes de escrever código.

**Objetivo do projeto:** fornecer método, modelos e ferramentas de apoio para mapear as telas antes da codificação, reduzindo redescoberta, tentativas e retrabalho. A investigação deve identificar campos e tipos, ações de inserção, dependências e navegação entre telas, sem presumir comportamentos não observados.

**Conteúdo deste repositório:** método de trabalho, documentação, modelos, checklists e ferramentas de apoio. Não é o local de armazenamento das automações de produção.

**Piloto escolhido:** consulta em lote de títulos, somente leitura, contemplando título, cliente, código de barras e linha digitável.

**Fora do piloto:** prorrogação e emissão de boleto. Também ficam fora baixa, exclusão e qualquer outra operação de escrita ou alteração persistente no ERP.

O piloto depende de ambiente e massa de dados autorizados. Esta decisão de escopo não autoriza publicar dados reais do ERP nem altera os controles de segurança definidos em [SECURITY_MODEL.md](SECURITY_MODEL.md).

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

## ADR-012 — Userscripts de produção mantidos no repositório de automações
**Status:** aceita.  
**Decisão:** Este repositório não guarda userscripts de produção. Eles ficam no repositório de automações (Systextil-envio-mensagem ou outro indicado pelo mantenedor). A documentação e as ferramentas de apoio deste projeto podem orientar o desenvolvimento, mas não devem duplicar, espelhar ou manter cópias de automações de produção.  
**Motivo:** separar o método e as ferramentas de engenharia do ciclo de vida e do código operacional, mantendo uma única fonte de verdade para cada userscript de produção.
