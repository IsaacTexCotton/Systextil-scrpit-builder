# Como contribuir

Fluxo baseado em branches e Pull Requests. Não há CI/CD; validações são locais.

## Antes de começar
1. Leia AGENTS.md e README.md.
2. Leia docs/IMPLEMENTATION_PLAN.md, docs/PROJECT_STATUS.md e docs/DELIVERY_BACKLOG.md.
3. Confirme item autorizado, dependências e Quality Gate.
4. Procure implementação, issue e ADR existente.
5. Confirme evidências e regras de negócio para automações Systextil.
6. Não use dados reais, credenciais ou sessões em exemplos.

## Branches
Crie cada mudança a partir da main atualizada:
- feat/nome-curto
- fix/nome-curto
- docs/nome-curto
- test/nome-curto
- chore/nome-curto

Não desenvolva diretamente em main.

## Commits
Use Conventional Commits, por exemplo feat:, fix:, docs:, test: e chore:. Mantenha cada commit focado.

## Desenvolvimento local
Requisitos: Node.js 24+.

    npm install
    npm test
    npm run check
    npm run validate:examples

Após gerar e versionar package-lock.json, prefira npm ci em instalações limpas.

## Pull Request
- Use o template.
- Referencie item do backlog.
- Explique objetivo, escopo, risco, evidências e critérios de aceite.
- Informe testes realmente executados.
- Atualize schemas, fixtures e docs quando contratos mudarem.
- Declare homologações pendentes.
- Não faça merge sem revisão e autorização.

## Dependências e GitHub
Dependência nova exige benefício, alternativa, risco e decisão. Não adicionar Actions, CI/CD, deploy ou publicação automática sem autorização explícita.
