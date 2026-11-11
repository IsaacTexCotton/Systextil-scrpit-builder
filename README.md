# Systextil Script Builder

Ferramenta local de método, modelos, checklists e apoio técnico para reduzir a dificuldade de criar automações no Systêxtil.

## Problema central

A principal dificuldade identificada é **entender a tela antes de escrever código**. O mantenedor precisa de apoio para mapear como o Systêxtil funciona em cada etapa: quais campos existem e seus tipos, como os dados são inseridos, quais campos dependem de outros e como uma ação ou tecla/botão leva de uma tela a outra.

O mapeamento prévio deve documentar:
- campos, tipos e metadados relevantes;
- ações e sequência de inserção de dados;
- dependências e efeitos entre campos;
- navegação entre telas: tela de origem, ação que dispara a transição, tecla ou botão utilizado e tela de destino;
- sequência temporal de comandos/eventos NXJ e sinal independente de confirmação para cada ação, quando observáveis.

O objetivo do projeto é apoiar esse mapeamento antes da automação, reduzindo tentativa e erro durante a implementação. Cada tela terá seu próprio arquivo em `docs/telas/`, copiado do modelo padrão e preenchido com ajuda da IA a partir do relato do mantenedor, sempre com valores já mascarados. Consulte o [Guia de investigação de telas](docs/SCREEN_INVESTIGATION.md) e as [regras e modelos de docs/telas](docs/telas/README.md).

> **Estado em 2026-11-11:** planejamento e método de investigação em documentação. O piloto escolhido é consulta em lote de títulos, somente leitura. A implementação do fluxo completo e do Inspector ainda não foi iniciada.

## Limite deste repositório

Este repositório guarda exclusivamente o método de trabalho, modelos, schemas, checklists, documentação e ferramentas de apoio ao processo de criação de automações.

**Userscripts de produção não pertencem a este repositório.** O userscript do piloto e o núcleo compartilhado ficam no [Systextil-envio-mensagem](https://github.com/IsaacTexCotton/Systextil-envio-mensagem). Este repositório mantém o conhecimento das telas e o método; cada mapa em `docs/telas/` é o contrato entre os dois repositórios. Não copiar, espelhar ou manter aqui cópias do código de produção. A pasta `userscripts/` deste repositório é reservada a ferramentas de apoio do próprio projeto, como o Inspector read-only.

## Visibilidade e risco

O repositório continua **público por decisão do mantenedor**, até nova orientação explícita. Isso é um risco aberto porque documentação técnica, capturas de tela, nomes de campos, endpoints ou metadados podem revelar detalhes internos do ERP.

A verificação de dados sensíveis está **pendente** e deve ser executada antes de qualquer novo commit que inclua evidência de tela ou dados operacionais. Consulte [SECURITY_MODEL.md](docs/SECURITY_MODEL.md). Não incluir dados reais do ERP no repositório.

## Piloto escolhido

**Consulta em lote de títulos, somente leitura**, limitada à consulta de título, cliente, código de barras e linha digitável. Não há ambiente de teste/homologação; a execução será somente em produção, após autorização operacional e intervalo entre consultas registrados na PR. Consultar um título por vez, com pausa, sem paralelismo; interromper no primeiro estado incerto e não repetir automaticamente. Nenhum valor real deve ser incluído neste repositório.

Prorrogação fica fora do piloto e é a segunda automação pretendida, após avaliação do piloto. Seu desenho deverá prever simulação sem persistência, lista de títulos aprovada previamente pelo mantenedor e log local mínimo por título alterado. A autoridade para autorizar a prorrogação de títulos vencidos ainda está pendente. Emissão de boleto, baixa, exclusão e outras operações de escrita também ficam fora do piloto.

## Objetivo e princípios

O projeto deve facilitar o caminho entre uma necessidade operacional e uma automação Systêxtil validada, com o mapeamento da tela como etapa anterior à codificação.

- Evidence-first: fatos, inferências e desconhecidos separados.
- Human-in-the-loop: a IA auxilia; o mantenedor decide, revisa e homologa.
- Local-first e least privilege.
- Fail-safe: estado incerto interrompe; não provoca repetição cega.
- Privacy by default: metadados mínimos; valores reais não entram no repositório.
- Código gerado por IA não é automaticamente aprovado.
- Mudanças passam por branch, Pull Request, testes locais e registro de aceite.
- Sem GitHub Actions, CI/CD, merge automático ou publicação automática.

## Planejamento e investigação

1. [Plano mestre](docs/IMPLEMENTATION_PLAN.md)
2. [Guia de investigação de telas](docs/SCREEN_INVESTIGATION.md)
3. [Backlog de entregas](docs/DELIVERY_BACKLOG.md)
4. [Arquitetura](docs/ARCHITECTURE.md)
5. [Ferramentas e versões](docs/TOOLING.md)
6. [Quality Gates](docs/QUALITY_GATES.md)
7. [Fluxo de uso](docs/UX_WORKFLOW.md)
8. [Especificação do pacote de IA](docs/CONTEXT_PACKAGE_SPEC.md)
9. [Segurança](docs/SECURITY_MODEL.md)
10. [Ciclo de vida](docs/AUTOMATION_LIFECYCLE.md)
11. [Release e homologação](docs/RELEASE_AND_HOMOLOGATION.md)
12. [Governança do GitHub](docs/GITHUB_GOVERNANCE.md)
13. [Estado do projeto](docs/PROJECT_STATUS.md)
14. [Roadmap resumido](docs/ROADMAP.md)
15. [Mapas de tela: regras e modelo](docs/telas/README.md)

## Estrutura de apoio

- `userscripts/`: ferramentas de apoio do projeto, incluindo o Inspector read-only; nunca código de automações de produção.
- `src/core/` (adiado): modelos, validações e regras puras.
- `src/cli/` (adiado): comandos locais.
- `schemas/` (adiado): contratos JSON versionados.
- `docs/`: método, investigação, planejamento, segurança e decisões.
- `examples/`: fixtures fictícias.
- `tests/`: testes locais sem acesso ao ERP/rede.

Os componentes `src/core/`, `src/cli/`, `schemas/` e a dependência Ajv estão adiados. Criar somente quando houver consumidor real e decisão do mantenedor.

## Ferramentas previstas

Node.js 24+, npm, Ajv 8.20.0 (adiado), node:test, Tampermonkey, Chrome, Git/GitHub e Context7 para consulta de documentação atualizada.

React, Electron, Playwright, SQLite, backend e API paga de IA ficam adiados até necessidade comprovada e decisão registrada.

## Preparação local

**Status:** preparação da fundação técnica adiada com E0. Retomar os comandos abaixo somente após decisão explícita do mantenedor.

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
