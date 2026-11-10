# Governança do GitHub

Este documento descreve as configurações que devem ser aplicadas no repositório. A documentação versionada não ativa essas configurações por si só.

## 1. Branch padrão

- Manter main como branch padrão.
- Não desenvolver diretamente em main.
- Criar uma branch por tarefa, sempre a partir da main atualizada.
- Não permitir force push ou exclusão acidental da main.

## 2. Regras recomendadas para main

Em Settings → Rules → Rulesets, criar um ruleset de branch direcionado à branch main.

Configuração recomendada:
- Exigir Pull Request antes do merge.
- Bloquear force pushes.
- Restringir exclusão da branch.
- Exigir aprovação de revisão quando houver outro mantenedor/revisor disponível.
- Descartar aprovações obsoletas quando novos commits alterarem o PR, se a equipe utilizar revisão formal.

Como este repositório pode ter um único mantenedor, não configure uma aprovação obrigatória que impeça o próprio mantenedor de integrar alterações quando não houver segundo revisor. Nesse cenário, mantenha o Pull Request obrigatório e faça revisão humana documentada antes do merge.

Não configure required status checks enquanto o projeto não tiver verificações automatizadas. Não criar GitHub Actions para satisfazer artificialmente essa regra.

## 3. CODEOWNERS

O arquivo .github/CODEOWNERS define @IsaacTexCotton como responsável inicial. O GitHub usa esse arquivo para sugerir/solicitar revisão de código quando a regra correspondente estiver habilitada.

A existência de CODEOWNERS, sozinha, não exige aprovação. A exigência depende das regras de proteção configuradas no GitHub.

## 4. Pull Requests

- Usar o template .github/pull_request_template.md.
- Manter PRs pequenos e focados.
- Usar Draft quando a implementação ainda não estiver pronta para revisão final.
- Declarar testes executados e não executados.
- Não habilitar auto-merge.
- Não fazer merge sem autorização do mantenedor.

## 5. Issues

Os formulários em .github/ISSUE_TEMPLATE organizam defeitos, melhorias e solicitações de automação. Eles orientam a não publicar dados sensíveis. Não anexar exports reais do ERP.

## 6. Segurança

Quando aplicável, habilitar em Settings → Advanced Security o recurso de Private vulnerability reporting. A disponibilidade depende das configurações e do plano do GitHub.

Enquanto o canal privado não estiver habilitado, o SECURITY.md orienta a contatar o mantenedor sem publicar detalhes exploráveis.

## 7. Releases e automações

- Não há workflows do GitHub Actions.
- Não há deploy, release ou publicação automática.
- Não use Dependabot ou bots de atualização automática nesta fundação.
- Atualizações de dependência devem ser avaliadas, testadas localmente e submetidas por Pull Request.

## 8. Referências oficiais

- Custom instructions para Copilot: https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
- Proteção de branches: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- CODEOWNERS: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- Issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
