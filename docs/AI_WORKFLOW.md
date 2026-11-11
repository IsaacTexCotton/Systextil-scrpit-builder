# Fluxo de desenvolvimento com IA

## Responsabilidade e papéis

Isaac é o único mantenedor e acumula os papéis de solicitante, especialista de negócio, investigador, desenvolvedor, revisor e homologador. Não existe revisor separado. A IA pode auxiliar em qualquer etapa técnica, mas não toma decisões de negócio, não aprova PRs e não homologa o Systêxtil.

O mantenedor registra as decisões, faz a auto-revisão do diff, executa os testes locais e registra o aceite e o resultado da homologação na PR. O GitHub não permite que o autor envie um review formal `Approve` na própria PR; o aceite do projeto é registrado por comentário explícito na conversa da PR, conforme [GITHUB_GOVERNANCE.md](GITHUB_GOVERNANCE.md).

## Entender

Ler AGENTS.md, plano mestre, estado do projeto e backlog. Localizar item, dependências, código e testes. Descrever atual/esperado, riscos e aceite. Não presumir a causa da dificuldade para criar automações antes de observá-la.

## Construir contexto

Incluir somente instruções, item do backlog, especificação, evidências sanitizadas, documentação NXJ pertinente, código homologado e contratos necessários. Não incluir diretórios inteiros, dados reais, cookies, tokens, HARs ou dumps.

Se for necessária uma captura de rede, ela deve ser manual, separada do Inspector e seguir a ADR-012 e o [procedimento de segurança](SECURITY_MODEL.md#captura-manual-de-rede--procedimento-separado-do-inspector).

## Classificar certeza

- Confirmada: observada ou documentada por fonte confiável.
- Inferida: provável, ainda não demonstrada.
- Desconhecida: falta evidência.

Nunca completar lacunas com nomes plausíveis.

## Planejar

Declarar escopo, arquivos, dependências, alternativas, riscos, aceite, testes e homologação. Dividir mudanças extensas em PRs pequenas. Registrar se o mantenedor está atuando como solicitante, especialista, investigador ou outro papel relevante.

## Implementar

Branch própria; padrões existentes; funções pequenas; entradas validadas; sem comandos de escrita no ERP; sem alterar automações de produção fora do escopo. Userscripts de produção são mantidos no repositório de produção indicado pelo mantenedor, não neste repositório de método e ferramentas de apoio.

## Validar e revisar

Separar análise estática, unitários, integração local, browser e homologação Systêxtil. O próprio mantenedor revisa o diff e verifica permissões, vazamento, timers/listeners, timeout, repetição e estado incerto. Registrar testes executados e não executados. Não inventar uma segunda etapa de aprovação por pessoa inexistente.

## Homologar

O mantenedor testa no Systêxtil autorizado. Quando não houver ambiente ou autorização, marcar a homologação como pendente; não presumir que um teste local a substitui. Registrar o resultado na PR.

## Entregar

Registrar item do backlog, arquivos, decisões, testes reais, limitações, auto-revisão e homologação. Abrir PR; não integrar automaticamente.

## Requisitos do prompt de implementação

A IA deve ler instruções, confirmar item e dependências, listar fatos/inferências/unknowns, apresentar plano, consultar Context7/docs oficiais, implementar o menor escopo, executar testes locais, revisar segurança e declarar pendências. A IA não aprova a própria entrega, não solicita revisor separado como pré-condição do processo e nunca faz merge ou escreve no ERP sem autorização.
