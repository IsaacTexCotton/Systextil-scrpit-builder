# Systextil Script Builder

Ferramenta de engenharia para investigar telas do Systextil NXJ e transformar necessidades operacionais em especificações técnicas e pacotes de contexto para desenvolvimento de userscripts.

> O projeto está em fase de estruturação. Consulte a documentação em `docs/` antes de implementar funcionalidades.

## Objetivo

Padronizar o ciclo de vida das automações Systextil: investigação, especificação, geração assistida por IA, revisão, testes e homologação humana.

## Princípios

- Cada automação de produção será um userscript independente.
- Evidências devem separar fatos confirmados, inferências e pontos desconhecidos.
- Operações que alterem dados exigem critérios explícitos e confirmação humana.
- Nenhuma evidência deve conter credenciais, dados pessoais desnecessários ou payloads financeiros.
- Toda alteração será desenvolvida em branch e submetida a Pull Request.
- Não há CI/CD configurado neste projeto.

## Estado

A estrutura inicial do projeto será organizada em uma branch de fundação. A branch `main` permanecerá como base estável.
