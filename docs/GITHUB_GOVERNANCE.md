# Governança do GitHub

Este documento descreve o fluxo adotado pelo projeto. A documentação versionada não ativa configurações do GitHub por si só.

## 1. Responsabilidade única

Isaac é o único mantenedor e responsável pelo projeto. Ele acumula os papéis de solicitante, especialista de negócio, investigador, desenvolvedor, revisor e homologador. Não há revisor separado nem aprovação por uma segunda pessoa.

O mantenedor é responsável pela auto-revisão e pelo aceite final de cada PR. A PR permanece obrigatória para manter histórico, diff e registro de validação; os testes continuam locais e a homologação é registrada na própria PR.

## 2. Branch padrão

- Manter `main` como branch padrão.
- Não desenvolver diretamente em `main`.
- Criar uma branch por tarefa, sempre a partir da `main` atualizada.
- Não permitir force push ou exclusão acidental da `main`.

## 3. Regras recomendadas para main

Em Settings → Rules → Rulesets, direcionar as regras à branch `main`.

Configuração compatível com o mantenedor único:
- Exigir Pull Request antes do merge.
- Bloquear force pushes.
- Restringir exclusão da branch.
- Não exigir aprovação formal de um segundo revisor, pois não existe revisor separado.
- Não exigir status checks enquanto as validações forem executadas localmente.
- Não habilitar auto-merge.

**Limitação da plataforma:** o GitHub não permite que o autor aprove formalmente a própria PR com um review `Approve`. Por isso, o aceite do mantenedor deve ser registrado como comentário explícito na conversa da PR, após ler o diff e executar as validações. Esse registro é o aceite do projeto; não deve ser confundido com um review formal do GitHub. O mantenedor com permissão administrativa pode integrar a PR após esse aceite, conforme as regras efetivamente configuradas.

Não configurar uma regra que exija uma aprovação formal impossível para o autor. Não criar GitHub Actions para satisfazer artificialmente required status checks.

## 4. CODEOWNERS

O arquivo `.github/CODEOWNERS` identifica @IsaacTexCotton como responsável inicial. Como o próprio mantenedor pode ser o autor da PR, CODEOWNERS não representa um revisor independente e não deve ser usado para impor aprovação de uma segunda pessoa.

A existência de CODEOWNERS, sozinha, não exige aprovação. A exigência depende das regras de proteção configuradas no GitHub.

## 5. Pull Requests

- Usar o template `.github/pull_request_template.md`.
- Manter PRs pequenas e focadas.
- Usar Draft quando a implementação ainda não estiver pronta.
- Declarar objetivo, escopo, risco, evidências, critérios de aceite e testes realmente executados.
- O mantenedor deve revisar o diff, conferir os testes locais e registrar o aceite final em comentário na PR.
- Quando aplicável, o mantenedor deve homologar no Systêxtil autorizado e registrar o resultado na PR.
- Não solicitar nem depender de revisor separado.
- Não habilitar auto-merge.
- Não fazer merge automático ou sem o aceite explícito do mantenedor.

## 6. Issues

Os formulários em `.github/ISSUE_TEMPLATE` organizam defeitos, melhorias e solicitações de automação. Eles orientam a não publicar dados sensíveis. Não anexar exports reais do ERP.

## 7. Segurança e visibilidade

O repositório está público em 2026-11-11 e deve permanecer público até nova decisão explícita do mantenedor. A exposição é um risco aberto; aplicar a verificação de dados sensíveis de [SECURITY_MODEL.md](SECURITY_MODEL.md) antes de adicionar evidências técnicas. Não alterar a visibilidade ou reescrever histórico sem autorização explícita.

Quando aplicável, habilitar em Settings → Advanced Security o recurso de Private vulnerability reporting. A disponibilidade depende das configurações e do plano do GitHub.

## 8. Releases e automações

- Não há workflows do GitHub Actions.
- Não há deploy, release ou publicação automática.
- Não usar Dependabot ou bots de atualização automática nesta fundação.
- Atualizações de dependência devem ser avaliadas, testadas localmente e submetidas por Pull Request.
- O resultado da homologação pelo mantenedor deve ser registrado na PR antes do aceite final.

## 9. Referências oficiais

- [Aprovar uma PR com revisões obrigatórias](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews) — inclui a limitação de que o autor não pode aprovar a própria PR.
- [Custom instructions para Copilot](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [Proteção de branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
