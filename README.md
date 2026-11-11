# Systextil Script Builder

Ferramenta local de método, modelos, checklists e apoio técnico para reduzir a dificuldade de criar automações no Systêxtil.

## Problema central

A dificuldade para criar automações no Systêxtil é o problema central que orienta o projeto. A etapa exata em que essa dificuldade ocorre, suas causas e seus impactos ainda não foram determinados. Essa definição permanece pendente; o projeto não presume que a causa seja falta de documentação, de prompts ou de conhecimento técnico.

O primeiro objetivo é entender a dificuldade real e, depois, verificar se o método e as ferramentas de apoio reduzem o esforço para desenvolver e validar automações.

> **Estado em 2026-11-11:** planejamento e decisões de escopo registrados. Ainda não há piloto escolhido. A causa específica da dificuldade permanece desconhecida. Os fluxos completos de solicitação, investigação, especificação e montagem de contexto ainda não estão implementados.

## Limite deste repositório

Este repositório guarda exclusivamente o método de trabalho, modelos, schemas, checklists, documentação e ferramentas de apoio ao processo de criação de automações.

**Userscripts de produção não pertencem a este repositório.** O código de produção continua no [Systextil-envio-mensagem](https://github.com/IsaacTexCotton/Systextil-envio-mensagem) ou em outro repositório indicado explicitamente pelo mantenedor. Não copiar, espelhar ou manter aqui cópias do código de produção. A pasta `userscripts/` deste repositório é reservada a ferramentas de apoio do próprio projeto, como o Inspector read-only.

O repositório está público neste momento. Essa exposição é um risco aberto e está sujeita à verificação de dados sensíveis descrita em [SECURITY_MODEL.md](docs/SECURITY_MODEL.md). A visibilidade deve permanecer pública até nova decisão explícita do mantenedor; não publicar dados reais do ERP.

## Objetivo e princípios

O projeto deve facilitar o caminho entre uma necessidade operacional e uma automação Systêxtil validada, sem presumir antecipadamente qual etapa causa maior dificuldade.

- Evidence-first: fatos, inferências e desconhecidos separados.
- Human-in-the-loop: a IA auxilia; o mantenedor decide, revisa e homologa.
- Local-first e least privilege.
- Fail-safe: estado incerto interrompe; não provoca repetição cega.
- Privacy by default: metadados mínimos; valores reais não entram no repositório.
- Código gerado por IA não é automaticamente aprovado.
- Mudanças passam por branch, Pull Request, testes locais e registro de aceite.
- Sem GitHub Actions, CI/CD, merge automático ou publicação automática.

## Planejamento

1. [Plano mestre](docs/IMPLEMENTATION_PLAN.md)
2. [Backlog de entregas](docs/DELIVERY_BACKLOG.md)
3. [Arquitetura](docs/ARCHITECTURE.md)
4. [Ferramentas e versões](docs/TOOLING.md)
5. [Quality Gates](docs/QUALITY_GATES.md)
6. [Fluxo de uso](docs/UX_WORKFLOW.md)
7. [Especificação do pacote de IA](docs/CONTEXT_PACKAGE_SPEC.md)
8. [Segurança](docs/SECURITY_MODEL.md)
9. [Ciclo de vida](docs/AUTOMATION_LIFECYCLE.md)
10. [Release e homologação](docs/RELEASE_AND_HOMOLOGATION.md)
11. [Governança do GitHub](docs/GITHUB_GOVERNANCE.md)
12. [Estado do projeto](docs/PROJECT_STATUS.md)
13. [Roadmap resumido](docs/ROADMAP.md)

## Estrutura de apoio

- `userscripts/`: ferramentas de apoio do projeto, incluindo o Inspector read-only; nunca código de automações de produção.
- `src/core/`: modelos, validações e regras puras.
- `src/cli/`: comandos locais.
- `schemas/`: contratos JSON versionados.
- `docs/`: método, planejamento, segurança e decisões.
- `examples/`: fixtures fictícias.
- `tests/`: testes locais sem acesso ao ERP/rede.

## Ferramentas previstas

Node.js 24+, npm, Ajv 8.20.0, node:test, Tampermonkey, Chrome, Git/GitHub e Context7 para consulta de documentação atualizada.

React, Electron, Playwright, SQLite, backend e API paga de IA ficam adiados até necessidade comprovada e decisão registrada.

## Preparação local

    npm install
    npm test
    npm run check
    npm run validate:examples

Após gerar e versionar `package-lock.json`, usar `npm ci` em instalações limpas.

## Contribuição

Trabalhe em branch própria, leia [AGENTS.md](AGENTS.md) e o plano, execute as validações locais aplicáveis e abra uma PR focada. O mantenedor é o único responsável e registra seu próprio aceite; não há revisor separado. O resultado da homologação, quando aplicável, deve constar na PR. Não fazer merge automático.

Consulte [CONTRIBUTING.md](CONTRIBUTING.md), [AI_WORKFLOW.md](docs/AI_WORKFLOW.md) e [GITHUB_GOVERNANCE.md](docs/GITHUB_GOVERNANCE.md).

## Licença

Ainda não definida. Não presuma autorização de redistribuição até a escolha e inclusão de uma licença.
