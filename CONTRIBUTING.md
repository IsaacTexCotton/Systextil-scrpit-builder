# Como contribuir

O projeto tem um único mantenedor, Isaac, que acumula os papéis de solicitante, especialista, investigador, desenvolvedor, revisor e homologador. O fluxo usa branches e Pull Requests; as validações são locais, sem CI/CD.

## Antes de começar

1. Leia AGENTS.md e README.md.
2. Leia docs/IMPLEMENTATION_PLAN.md, docs/PROJECT_STATUS.md e docs/DELIVERY_BACKLOG.md.
3. Confirme item autorizado, dependências e Quality Gate.
4. Procure implementação, issue e ADR existente.
5. Confirme evidências e regras de negócio para automações Systêxtil.
6. Não use dados reais, credenciais ou sessões em exemplos.
7. Consulte as fontes canônicas: escopo em docs/DECISIONS.md; evidências, status, origem e níveis de risco em docs/SECURITY_MODEL.md; ordem das entregas em docs/DELIVERY_BACKLOG.md.

## Branches

Crie cada mudança a partir da `main` atualizada:
- `feat/nome-curto`
- `fix/nome-curto`
- `docs/nome-curto`
- `test/nome-curto`
- `chore/nome-curto`

Não desenvolva diretamente em `main`.

## Commits

Use Conventional Commits, por exemplo `feat:`, `fix:`, `docs:`, `test:` e `chore:`. Mantenha cada commit focado.

## Desenvolvimento local

Requisitos: Node.js 24+.

    npm install
    npm test
    npm run check
    npm run validate:examples

Após gerar e versionar `package-lock.json`, prefira `npm ci` em instalações limpas. Informe somente comandos realmente executados e seus resultados.

## Pull Request e aceite

- Use o template `.github/pull_request_template.md`.
- Referencie item do backlog.
- Explique objetivo, escopo, risco, evidências e critérios de aceite.
- Informe testes realmente executados e não executados.
- Declare homologações pendentes.
- O mantenedor revisa o próprio diff, verifica os testes locais e registra seu aceite/aprovação por comentário na própria PR.
- Não há revisor separado enquanto houver apenas uma pessoa no projeto.
- Não faça merge automático; a integração é manual e depende de autorização explícita do mantenedor.

O GitHub não permite ao autor enviar um review formal `Approve` na própria PR. O comentário de auto-revisão/aceite é o registro adotado pelo projeto e não representa revisão independente.

## Dependências e GitHub

Dependência nova exige benefício, alternativa, risco e decisão. Não adicionar Actions, CI/CD, deploy ou publicação automática sem autorização explícita.
