# Ferramentas e versões

Este documento registra escolhas e condições de reavaliação. Versões fixadas no projeto não significam que sejam as últimas versões disponíveis.

## MVP

| Ferramenta | Linha | Finalidade | Decisão |
|---|---|---|---|
| Node.js | 24+ | Runtime local, ESM, CLI, testes | Base |
| npm | distribuído com Node | Dependências e scripts | Lockfile + npm ci |
| Ajv | 8.20.0 | JSON Schema Draft-07 atual | Dependência local |
| node:test | nativo | Testes unitários/integração | Sem framework adicional |
| Tampermonkey | versão homologada | Inspector futuro | Browser |
| Chrome | versão estável homologada | Inspeção e testes | Registrar versão |
| Git/GitHub | hospedado | Branch, commit, PR | Sem Actions/CI |
| Context7 | consultivo | Documentação atual | Não é dependência do produto |

## Adiadas

React/Vue/Svelte: somente se UI provar necessidade. Electron/Tauri: somente se desktop for requisito. Playwright: quando houver fluxo browser real para automatizar. jsdom/happy-dom: se DOM controlado for insuficiente. SQLite: se arquivos JSON não atenderem. Backend/API de IA: após necessidade, privacidade, custo e consentimento aprovados. GitHub Actions: somente com autorização explícita.

## Regras de dependências

1. Preferir APIs nativas.
2. Dependência nova exige problema concreto, alternativa, risco, licença e manutenção documentados.
3. Fixar versões exatas quando compatibilidade for importante.
4. Versionar package-lock.json e usar npm ci em instalação limpa.
5. Não atualizar dependências em massa junto de feature.
6. Revisar changelog, breaking changes, vulnerabilidades e engines antes de atualizar.
7. Userscripts não herdam dependências Node; não adicionar @require/CDN.

## Context7 — consulta em 2026-11-11

### Node.js 24
Library ID: /websites/nodejs_latest-v24_x_api

Confirmado: package.json com type=module define ES Modules para .js; node --test executa o runner nativo e descobre arquivos *.test.js.

Fontes: https://nodejs.org/docs/latest-v24.x/api/packages.html e https://nodejs.org/docs/latest-v24.x/api/test.html

### Ajv 8.20.0
Library ID: /ajv-validator/ajv/v8.20.0

Confirmado: allErrors coleta múltiplos erros; strict mode é recomendado para evitar keywords ignoradas/ambiguidade; formatos adicionais exigem ajv-formats quando necessários.

Decisão: manter Draft-07 nos schemas atuais, strict:true e allErrors:true; não adicionar ajv-formats até existir necessidade; compilar schemas uma vez e reutilizar validadores.

Fontes: https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/options.md e https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/strict-mode.md

### GitHub Docs
Library ID: /github/docs

Confirmado: instruções globais Copilot em .github/copilot-instructions.md; instruções por caminho em .github/instructions/*.instructions.md com applyTo; suporte a AGENTS.md varia entre recursos Copilot; templates, CODEOWNERS e regras de proteção são recursos distintos.

Fontes: https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions e https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches

## Revalidação

Revalidar no início de cada fase técnica e em mudanças major/breaking. Registrar data, fonte e decisão em ADR.
