# Registro de decisões arquiteturais

Decisões relevantes são registradas aqui para evitar que a arquitetura seja redefinida sem contexto.

## ADR-001 — Studio local antes de serviço remoto

**Status:** aceita.

**Decisão:** iniciar com Node.js local, arquivos JSON/Markdown e GitHub para versionamento.

**Motivo:** reduzir infraestrutura, custo, exposição de dados e manutenção no MVP.

## ADR-002 — Userscripts independentes

**Status:** aceita.

**Decisão:** cada automação de produção será um userscript específico. O Inspector é uma ferramenta separada.

**Motivo:** reduzir acoplamento, facilitar revisão e limitar o impacto de falhas.

## ADR-003 — IA como assistente, não autoridade de homologação

**Status:** aceita.

**Decisão:** a IA prepara especificação e código; testes e homologação exigem evidência e revisão humana.

**Motivo:** comportamento do NXJ e efeitos operacionais não podem ser presumidos a partir de código gerado.

## ADR-004 — Sem CI/CD nesta fase

**Status:** aceita.

**Decisão:** não criar GitHub Actions ou pipelines. Executar testes locais e registrar resultados no Pull Request.

**Motivo:** restrição operacional e preferência explícita do mantenedor.

## ADR-005 — Ajv e Node Test Runner

**Status:** proposta para a fundação.

**Decisão:** usar Ajv para JSON Schema e node:test para testes, evitando framework de testes adicional.

**Motivo:** contratos explícitos e menor número de dependências.

## ADR-006 — Licença pendente

**Status:** pendente.

**Decisão:** não adicionar licença até o mantenedor escolher os termos de distribuição.
