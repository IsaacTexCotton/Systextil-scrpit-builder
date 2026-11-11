# Fluxo de desenvolvimento com IA

## Entender
Ler AGENTS.md, plano mestre, estado do projeto e backlog. Localizar item, dependências, código e testes. Descrever atual/esperado, riscos e aceite.

## Construir contexto
Incluir somente instruções, item do backlog, especificação, evidências sanitizadas, documentação NXJ pertinente, código homologado e contratos necessários. Não incluir diretórios inteiros, dados reais, cookies, tokens, HARs ou dumps.

## Classificar certeza
- Confirmada: observada ou documentada por fonte confiável.
- Inferida: provável, ainda não demonstrada.
- Desconhecida: falta evidência.
Nunca completar lacunas com nomes plausíveis.

## Planejar
Declarar escopo, arquivos, dependências, alternativas, riscos, aceite, testes e homologação. Dividir mudanças extensas em PRs pequenas.

## Implementar
Branch própria; padrões existentes; funções pequenas; entradas validadas; sem comandos de escrita no ERP; sem alterar automações de produção fora do escopo.

## Validar e revisar
Separar análise estática, unitários, integração local, browser, homologação Systextil e aceite. Revisar permissões, vazamento, timers/listeners, timeout, repetição e estado incerto.

## Entregar
Item do backlog, arquivos, decisões, testes reais, limitações e homologação pendente. Abrir PR; não integrar automaticamente.

## Requisitos do prompt de implementação
A IA deve ler instruções, confirmar item e dependências, listar fatos/inferências/unknowns, apresentar plano, consultar Context7/docs oficiais, implementar menor escopo, executar testes reais, revisar segurança e declarar pendências. Nunca fazer merge nem escrever no ERP sem autorização.
