# Como contribuir

O projeto tem um único mantenedor responsável: Isaac. Ele acumula os papéis de solicitante, especialista, investigador, desenvolvedor, revisor e homologador. Não há revisor separado. O processo permanece baseado em branches e Pull Requests, com testes locais e registro explícito do aceite do mantenedor. Não há CI/CD.

## Antes de começar

1. Leia AGENTS.md e README.md.
2. Leia docs/IMPLEMENTATION_PLAN.md, docs/PROJECT_STATUS.md e docs/DELIVERY_BACKLOG.md.
3. Confirme item autorizado, dependências e Quality Gate.
4. Procure implementação, issue e ADR existente.
5. Confirme evidências e regras de negócio para automações Systêxtil.
6. Não use dados reais, credenciais ou sessões em exemplos.
7. Não presuma a causa da dificuldade para criar automações sem observar o processo.

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

## Pull Request, auto-revisão e aceite

- Use o template.
- Referencie item do backlog.
- Explique objetivo, escopo, risco, evidências e critérios de aceite.
- Informe testes realmente executados e não executados.
- O mantenedor deve revisar o diff e conferir os testes locais.
- Não solicitar nem depender de revisor separado.
- O aceite final do mantenedor deve ser registrado em comentário explícito na conversa da PR.
- Quando aplicável, o próprio mantenedor deve homologar no Systêxtil autorizado e registrar o resultado na PR.
- Declare homologação pendente quando não houver autorização ou ambiente adequado.
- Não faça merge automático; a integração é manual e depende do aceite explícito do mantenedor.

**Nota sobre o GitHub:** a plataforma não permite que o autor aprove formalmente a própria PR com um review `Approve`. O comentário explícito de auto-revisão/aceite é o registro adotado pelo projeto; não representa um segundo revisor.

## Dependências e GitHub

Dependência nova exige benefício, alternativa, risco e decisão. Não adicionar Actions, CI/CD, deploy ou publicação automática sem autorização explícita.
