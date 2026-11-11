# Systextil Script Builder

Ferramenta local de método, modelos, checklists e apoio técnico para reduzir a dificuldade de criar automações no Systêxtil, com foco no mapeamento da tela antes da codificação.

## Escopo e decisões

O escopo vigente, o piloto e as exclusões estão definidos em [DECISIONS.md](docs/DECISIONS.md). Este README não duplica essas regras.

O objetivo imediato é apoiar o mantenedor a entender a tela, os campos, as inserções e as transições antes de escrever código.

## Fontes canônicas

- **Escopo do produto e decisões:** [DECISIONS.md](docs/DECISIONS.md).
- **Evidências, status, origem, níveis de risco e proteção de dados:** [SECURITY_MODEL.md](docs/SECURITY_MODEL.md).
- **Ordem, prioridades e estado das entregas:** [DELIVERY_BACKLOG.md](docs/DELIVERY_BACKLOG.md).
- **Situação atual do projeto:** [PROJECT_STATUS.md](docs/PROJECT_STATUS.md).
- **Arquitetura:** [ARCHITECTURE.md](docs/ARCHITECTURE.md).
- **Governança:** [GITHUB_GOVERNANCE.md](docs/GITHUB_GOVERNANCE.md).

## Repositório de userscripts

**Este repositório não guarda userscripts de produção. Eles ficam no repositório de automações (Systextil-envio-mensagem ou outro indicado pelo mantenedor).**

## Risco aberto — repositório público

**RISCO ABERTO:** o repositório está público. Os metadados dos commits públicos também expõem o e-mail de autoria. A exposição deve ser considerada ao publicar documentos, exemplos ou evidências. Não foi solicitada nem realizada alteração de visibilidade ou reescrita do histórico. Os achados e o procedimento de verificação estão em [SECURITY_MODEL.md](docs/SECURITY_MODEL.md).

## Ferramentas previstas

Node.js 24+, npm, Ajv 8.20.0, node:test, Tampermonkey, Chrome, Git/GitHub e Context7 para consulta de documentação atualizada.

Framework de UI, desktop, Playwright, SQLite, backend e API paga de IA não fazem parte da fundação atual; consultar as decisões arquiteturais antes de propor dependências.

## Preparação local

    npm install
    npm test
    npm run check
    npm run validate:examples

Após gerar e versionar `package-lock.json`, usar `npm ci` em instalações limpas.

## Contribuição

Siga [AGENTS.md](AGENTS.md) e [CONTRIBUTING.md](CONTRIBUTING.md). Use branch própria, commits Conventional Commits, testes locais e Pull Request. Não há merge automático. O rito de revisão separada não se aplica enquanto houver um mantenedor; consulte [GITHUB_GOVERNANCE.md](docs/GITHUB_GOVERNANCE.md).

## Licença

**PENDENTE:** a licença ainda não foi definida. Não presuma autorização de redistribuição até a escolha e inclusão de uma licença.
