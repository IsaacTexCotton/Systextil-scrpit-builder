# Systextil Script Builder

Ferramenta de engenharia para investigar telas do Systextil NXJ e transformar necessidades operacionais em especificações técnicas e pacotes de contexto para desenvolvimento assistido de userscripts.

> **Estado atual:** fundação do repositório. A estrutura, os contratos JSON e a validação local estão sendo estabelecidos. O Inspector de telas, a interface do Studio e a geração final de pacotes ainda serão implementados em etapas posteriores.

## Objetivo

Padronizar o ciclo de vida de automações Systextil: registrar a necessidade operacional; investigar a tela e coletar evidências técnicas sanitizadas; produzir uma especificação verificável; gerar um pacote de contexto para IA; desenvolver uma automação específica; revisar, testar e homologar com uma pessoa responsável.

O Studio não será um executor universal de operações do ERP. Cada automação de produção será um userscript independente, com escopo e risco explícitos.

## Princípios

- Evidências distinguem fatos confirmados, inferências e pontos desconhecidos.
- A IA não inventa seletores, campos, APIs, comandos NXJ ou regras de negócio.
- Operações que alteram dados exigem confirmação humana explícita e critérios de sucesso observáveis.
- Nenhuma evidência deve conter credenciais, tokens, dados pessoais desnecessários, dados financeiros reais ou payloads de transações.
- Nenhum código gerado é considerado aprovado apenas porque foi produzido por IA.
- Toda mudança de código passa por branch, testes locais, revisão e Pull Request.
- A branch main é a referência estável; não desenvolver diretamente nela.
- Não há GitHub Actions, CI/CD ou automações de publicação configuradas.

## Arquitetura prevista

- userscripts/: scripts executados no navegador, independentes e específicos do Systextil.
- src/core/: regras e serviços reutilizáveis do Studio.
- src/cli/: comandos locais para validar e gerar artefatos.
- schemas/: contratos versionados para evidências, especificações e pacotes.
- docs/: arquitetura, decisões, segurança, processo de IA e homologação.
- examples/: dados fictícios para demonstração e testes.
- tests/: testes automatizados locais, sem serviço externo.

## Requisitos locais

- Node.js 24 ou superior.
- npm compatível com a versão do Node.js.
- Google Chrome e Tampermonkey serão necessários para a futura homologação do Inspector.

## Preparação

    npm install
    npm test
    npm run check
    npm run validate:examples

O primeiro npm install gera package-lock.json. Esse arquivo deve ser versionado. Depois que ele existir no repositório, prefira npm ci para instalações reproduzíveis.

## Fluxo de contribuição

1. Atualize main e crie uma branch feat/, fix/, docs/ ou chore/.
2. Leia AGENTS.md e a documentação aplicável antes de alterar arquivos.
3. Declare objetivo, escopo, riscos, hipóteses e critérios de aceite.
4. Implemente a menor mudança coerente.
5. Execute os testes e verificações locais aplicáveis.
6. Abra um Pull Request com evidências de validação e limitações conhecidas.
7. Faça revisão humana antes de integrar.

Consulte CONTRIBUTING.md e docs/AI_WORKFLOW.md.

## Licença

A licença ainda não foi definida. Não presuma autorização de reutilização ou redistribuição até que uma licença seja escolhida e adicionada.
