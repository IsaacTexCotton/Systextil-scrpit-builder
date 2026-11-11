# Systextil Script Builder

Ferramenta local de engenharia para investigar telas do Systextil NXJ e transformar necessidades operacionais em especificações técnicas e pacotes de contexto rastreáveis para desenvolvimento assistido de userscripts.

> **Estado atual:** fundação organizacional integrada à main. O planejamento completo está documentado em uma branch de planejamento e aguarda revisão. Solicitação operacional, Inspector, especificador e gerador de pacotes ainda não estão implementados.

## Objetivo

Padronizar o ciclo de vida: entender a necessidade; confirmar regras; investigar telas; registrar evidências técnicas sanitizadas; produzir especificação verificável; gerar pacote de contexto para IA; desenvolver userscript específico; testar, revisar e homologar.

O Studio não será executor universal do ERP. Cada automação final será um userscript independente, com escopo, risco e homologação próprios.

## Princípios

- Evidence-first: fatos, inferências e desconhecidos separados.
- Human-in-the-loop: IA não aprova regras nem homologação.
- Local-first e least privilege.
- Fail-safe: estado incerto interrompe; não provoca repetição cega.
- Privacy by default: metadados mínimos; sem valores de campos por padrão.
- Código gerado por IA não é automaticamente aprovado.
- Toda mudança passa por branch, testes locais, revisão e PR.
- Sem GitHub Actions, CI/CD ou publicação automática nesta fase.

## Planejamento

1. [Plano mestre](docs/IMPLEMENTATION_PLAN.md)
2. [Backlog de entregas](docs/DELIVERY_BACKLOG.md)
3. [Arquitetura](docs/ARCHITECTURE.md)
4. [Ferramentas e versões](docs/TOOLING.md)
5. [Quality Gates](docs/QUALITY_GATES.md)
6. [Fluxo de uso](docs/UX_WORKFLOW.md)
7. [Especificação do pacote de IA](docs/CONTEXT_PACKAGE_SPEC.md)
8. [Release e homologação](docs/RELEASE_AND_HOMOLOGATION.md)
9. [Estado do projeto](docs/PROJECT_STATUS.md)
10. [Roadmap resumido](docs/ROADMAP.md)

## Arquitetura prevista

- userscripts/: Inspector e automações específicas independentes.
- src/core/: modelos, validações e regras puras.
- src/cli/: comandos locais.
- src/context/: seleção e leitura segura de contexto.
- src/generators/: geração determinística.
- schemas/: contratos JSON versionados.
- docs/: planejamento, segurança e decisões.
- examples/: fixtures fictícias.
- tests/: testes locais sem acesso ao ERP/rede.

## Ferramentas do MVP

Node.js 24+, npm, Ajv 8.20.0, node:test, Tampermonkey, Chrome, Git/GitHub e Context7 para documentação atualizada.

React, Electron, Playwright, SQLite, backend e API paga de IA ficam adiados até necessidade comprovada e decisão registrada.

## Preparação local

    npm install
    npm test
    npm run check
    npm run validate:examples

Após gerar e versionar package-lock.json, usar npm ci em instalações limpas.

## Contribuição

Atualize main, crie branch, leia AGENTS.md e o plano, implemente um item do backlog, execute testes reais e abra PR focada. Sem merge automático.

Consulte CONTRIBUTING.md, docs/AI_WORKFLOW.md e docs/GITHUB_GOVERNANCE.md.

## Licença

Ainda não definida. Não presuma autorização de redistribuição até a escolha e inclusão de uma licença.
