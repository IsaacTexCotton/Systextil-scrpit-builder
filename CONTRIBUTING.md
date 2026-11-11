# Como contribuir

Este projeto utiliza um fluxo simples baseado em branches e Pull Requests. Não há CI/CD configurado; validações são executadas localmente.

## Antes de começar

1. Leia AGENTS.md, README.md e os documentos relevantes de docs/.
2. Procure implementação, issue ou decisão existente antes de duplicar trabalho.
3. Para automações Systextil, confirme se há evidência da tela e regra de negócio.
4. Não use dados de clientes, títulos, credenciais ou sessões reais em exemplos.

## Branches

Crie cada mudança a partir de main atualizada:

- feat/nome-curto: funcionalidade.
- fix/nome-curto: correção.
- docs/nome-curto: documentação.
- test/nome-curto: testes.
- chore/nome-curto: manutenção e organização.

Não desenvolva diretamente em main.

## Commits

Use mensagens no padrão Conventional Commits, por exemplo:

- feat: adicionar exportação de evidências
- fix: impedir captura de valores de campos
- docs: documentar fluxo de homologação
- test: cobrir validação de especificações
- chore: atualizar estrutura do projeto

Mantenha cada commit focado e evite misturar refatoração não relacionada.

## Desenvolvimento local

Requisitos: Node.js 24+.

    npm install
    npm test
    npm run check
    npm run validate:examples

Após a primeira instalação, versione package-lock.json e utilize npm ci em instalações limpas.

## Pull Request

- Use o template do repositório.
- Explique objetivo, escopo, risco, evidências e critérios de aceite.
- Informe comandos de teste realmente executados.
- Atualize schemas, exemplos e documentação quando mudar contratos.
- Marque explicitamente homologações pendentes.
- Não faça merge sem revisão e autorização do responsável.

## Dependências e automações de GitHub

Adicione dependências somente quando houver benefício claro e alternativa avaliada. Não adicione workflows, Actions, CI/CD, deploy ou publicação automática sem decisão explícita do mantenedor.
