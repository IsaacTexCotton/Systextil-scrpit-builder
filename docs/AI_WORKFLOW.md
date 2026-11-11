# Fluxo de desenvolvimento com IA

## Objetivo

Fazer a IA trabalhar com contexto verificável e limites claros, reduzindo invenções, retrabalho e alterações inseguras.

## Etapa 1 — Entender

Antes de editar:
- identificar objetivo e usuário operacional;
- ler instruções e documentação aplicáveis;
- localizar código existente relacionado;
- descrever comportamento atual e esperado;
- identificar compatibilidade e riscos.

## Etapa 2 — Construir o contexto

O contexto deve conter somente material necessário:
- AGENTS.md e instruções aplicáveis;
- especificação da automação;
- evidências sanitizadas;
- documentação NXJ e padrões existentes;
- interfaces/contratos dos módulos envolvidos;
- exemplos claramente identificados como fictícios.

Não inclua diretórios inteiros sem justificativa. Não inclua arquivos privados, dados reais, cookies, tokens, HARs ou dumps de transações.

## Etapa 3 — Separar níveis de certeza

Cada informação relevante deve ser identificada como:
- **Confirmada:** observada diretamente ou documentada por fonte confiável.
- **Inferida:** explicação provável ainda não demonstrada.
- **Desconhecida:** falta evidência para decidir.

A IA deve preservar essa classificação no código, na especificação e no relatório. Não deve preencher lacunas com nomes plausíveis.

## Etapa 4 — Planejar a mudança

O plano precisa declarar arquivos que serão criados ou alterados, abordagem técnica e alternativas descartadas, efeitos colaterais possíveis, testes necessários, critérios de aceite e pontos que exigem validação no ERP.

Mudanças extensas devem ser divididas em entregas pequenas e revisáveis.

## Etapa 5 — Implementar

- Desenvolver em branch própria.
- Seguir as instruções e padrões já existentes.
- Preferir funções puras e pequenas.
- Validar entradas externas.
- Evitar dependências e abstrações prematuras.
- Não executar comandos de escrita no ERP.
- Não alterar automações de produção sem escopo e aprovação.

## Etapa 6 — Validar

A IA deve executar testes disponíveis e informar os resultados reais. Para userscripts, separar análise estática, testes unitários, teste em DOM/browser, homologação em ambiente Systextil e aceite do responsável operacional.

Um teste unitário aprovado não comprova funcionamento no NXJ.

## Etapa 7 — Revisar

Revisar o diff procurando mudanças fora do escopo, regressões, permissões amplas, dados sensíveis, timers e listeners sem limpeza, estados de erro ignorados, sucesso baseado apenas em envio de requisição, repetição de comandos ou gravações e falta de timeout ou parada segura.

## Etapa 8 — Entregar

O resultado da IA deve incluir arquivos alterados, decisões, testes executados, limitações, pendências e instruções de homologação. Abrir Pull Request; não integrar automaticamente.
