# Governança do GitHub

Este documento registra o rito proporcional ao tamanho atual do projeto. A documentação versionada não ativa configurações do GitHub por si só.

## 1. Responsabilidade e revisão

Isaac é o único mantenedor e a única pessoa no projeto. Ele acumula os papéis de solicitante, especialista, investigador, desenvolvedor, revisor e homologador.

**Enquanto houver uma única pessoa no projeto, o rito de revisão separada não se aplica.** O mantenedor revisa o próprio diff, verifica os testes locais e registra o aceite/aprovação na conversa da própria PR. Não há revisor separado a solicitar.

O GitHub não permite que o autor envie um review formal `Approve` na própria PR. Portanto, a aprovação do mantenedor é registrada por comentário explícito na conversa da PR, sem fingir que houve aprovação formal de outra pessoa. Se o projeto passar a ter outro mantenedor/revisor, a governança deverá ser revista.

## 2. Branch padrão

- Manter `main` como branch padrão.
- Não desenvolver diretamente em `main`.
- Criar uma branch por tarefa, sempre a partir da `main` atualizada.
- Não permitir force push ou exclusão acidental da `main`.

## 3. Regras recomendadas para main

Em Settings → Rules → Rulesets, direcionar as regras à branch `main`.

Configuração proporcional ao mantenedor único:
- Exigir Pull Request antes do merge.
- Bloquear force pushes.
- Restringir exclusão da branch.
- Não exigir aprovação formal de revisor separado enquanto houver apenas uma pessoa no projeto.
- Não exigir status checks enquanto as validações forem executadas localmente.
- Não habilitar auto-merge.

O comentário de auto-revisão/aceite do mantenedor deve registrar o diff revisado, validações executadas e limitações. O merge continua manual e depende de ação explícita do mantenedor.

Não configurar required status checks sem verificações automatizadas. Não criar GitHub Actions para satisfazer artificialmente essa regra.

## 4. CODEOWNERS e instruções para IA

O arquivo `.github/CODEOWNERS` permanece no repositório e identifica @IsaacTexCotton como responsável. Ele não representa um revisor independente; com uma única pessoa, o rito de revisão separada não se aplica.

As instruções em `.github/copilot-instructions.md` e `.github/instructions/` também permanecem. Não remover nem substituir essas regras sem decisão explícita.

A existência de CODEOWNERS, sozinha, não exige aprovação. A exigência depende das regras de proteção configuradas no GitHub. Não habilitar exigência de aprovação de code owner que pressuponha outra pessoa.

## 5. Pull Requests

- Manter e usar o template `.github/pull_request_template.md`.
- Manter PRs pequenas e focadas.
- Usar Draft quando a implementação ainda não estiver pronta.
- Declarar testes executados e não executados.
- O mantenedor faz a auto-revisão e registra o próprio aceite na PR.
- Não solicitar revisor separado enquanto houver apenas uma pessoa no projeto.
- Não habilitar auto-merge.
- Não fazer merge automático nem integrar sem autorização manual explícita.

## 6. Issues

Os formulários em `.github/ISSUE_TEMPLATE` organizam defeitos, melhorias e solicitações de automação. Não anexar dados reais do ERP ou evidências não sanitizadas.

## 7. Segurança e visibilidade

O repositório está público por decisão do mantenedor e isso é um risco aberto. Os metadados dos commits públicos expõem o e-mail de autoria. Consultar [SECURITY_MODEL.md](SECURITY_MODEL.md) antes de adicionar dados ou evidências. Não alterar a visibilidade nem reescrever o histórico sem decisão explícita.

A licença permanece pendente conforme ADR-006 em [DECISIONS.md](DECISIONS.md).

## 8. Releases e automações

- Não há workflows do GitHub Actions.
- Não há CI/CD, deploy, release ou publicação automática.
- Não usar bots de atualização automática nesta fundação.
- Atualizações de dependência devem ser avaliadas, testadas localmente e submetidas por Pull Request.
- Homologação aplicável é executada pelo mantenedor e registrada na PR.

## 9. Fontes canônicas

- Escopo e decisões: [DECISIONS.md](DECISIONS.md).
- Evidências, status, origem, níveis de risco e privacidade: [SECURITY_MODEL.md](SECURITY_MODEL.md).
- Ordem e prioridades das entregas: [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## 10. Referências oficiais

- [Approving a pull request](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews) — limitações de aprovação pelo próprio autor.
- [Custom instructions para Copilot](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [Proteção de branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
