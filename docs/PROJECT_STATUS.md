# Estado do projeto

**Referência:** 2026-11-11.  
**Status:** decisões da rodada 2 registradas; método de investigação de tela documentado; implementação funcional ainda não iniciada.

## Decisões de escopo — rodada 2 (2026-11-11)

- Problema central confirmado: a dificuldade é entender a tela do Systêxtil antes de escrever código, incluindo campos e tipos, inserções de dados, dependências entre campos e navegação entre telas.
- O mantenedor precisa de apoio para mapear a tela antes da codificação. O mapa identifica qual ação leva de uma tela a outra e qual tecla ou botão dispara a transição.
- O guia de investigação foi documentado em `docs/SCREEN_INVESTIGATION.md`.
- O Inspector permanece read-only conforme ADR-008. A ADR-013 é apenas uma proposta para avaliar metadados adicionais de controles editáveis; não foi aceita e não autoriza implementação.
- **Piloto escolhido:** consulta em lote de títulos, somente leitura, contemplando título, cliente, código de barras e linha digitável. Não há ambiente de teste/homologação; o piloto ocorrerá somente em produção, um título por vez e com pausa entre consultas, após autorização e intervalo registrados na PR. Abortar no primeiro estado incerto e não repetir automaticamente.
- **Primeiro teste do método:** produzir um único mapa da consulta de títulos em `docs/telas/`; E0/E1 só serão reconsideradas se o mapa revelar fricção concreta que justifique CLI, schemas ou validadores.
- Este repositório mantém conhecimento das telas e o método; o mapa é o contrato com `Systextil-envio-mensagem`, onde ficarão o userscript do piloto e o núcleo compartilhado.
- Prorrogação é a segunda automação, após o piloto, com simulação sem persistência, lista aprovada previamente pelo mantenedor e log local mínimo por título alterado. A autoridade para prorrogar títulos vencidos permanece sem definição; nenhuma implementação/execução desse caso pode avançar antes dessa decisão.
- Isaac é o único mantenedor e acumula os papéis de solicitante, especialista, investigador, desenvolvedor, revisor e homologador.
- Captura de rede é manual, separada do Inspector e sujeita à ADR-012. Capturas de tela e campos com valores devem seguir as mesmas regras de mascaramento.
- O repositório permanece público por decisão do mantenedor. A visibilidade pública é um risco aberto; não alterá-la sem nova decisão explícita.
- A verificação de dados sensíveis permanece pendente e será obrigatória antes de qualquer novo commit que inclua evidência de tela ou dado operacional.

## Estado por fase

| Fase | Estado | Evidência para concluir |
|---|---|---|
| Fundação organizacional | Concluída | PR #1 integrada à main |
| Planejamento e decisões de escopo | Concluído: PR #3 mesclada na main | PR revisada e aceite do mantenedor |
| Fundação executável | Adiada | Retomada somente após decisão explícita do mantenedor |
| Solicitação operacional | Não iniciada | schema, CLI e fixtures |
| Guia de investigação de tela | Documentado | revisão do mantenedor e aplicação ao piloto |
| Inspector | Não iniciado | ferramenta read-only homologada conforme escopo aprovado |
| Proposta ADR-013 | Proposta | decisão explícita do mantenedor antes de eventual implementação |
| Especificador | Não iniciado | especificação validada com mapeamento e evidências |
| Gerador de contexto | Não iniciado | pacote determinístico e sanitizado |
| Interface visual | Adiada | decisão baseada em fricção observada |
| Piloto de consulta em lote | Escolhido; execução pendente | primeiro mapa revisado; autorização e intervalo na PR; execução read-only controlada em produção |

## Próximas atividades

1. Concluir a verificação de dados sensíveis antes do primeiro commit com evidência de tela ou dado operacional.
2. Produzir e revisar o primeiro mapa da consulta de títulos, incluindo a sequência de comandos/eventos NXJ e a confirmação independente por ação.
3. Registrar na PR a autorização operacional aplicável e o intervalo entre consultas antes de executar o piloto read-only em produção.
4. Após o primeiro mapa, avaliar se existe fricção concreta que justifique retomar E0/E1; sem essa evidência, manter CLI/schemas/validadores adiados.
5. Decidir se a proposta ADR-013 é necessária antes de alterar o escopo do Inspector.

## Papéis

Isaac é o único responsável pelo projeto e executa todos os papéis. Não há revisor separado. O mantenedor faz auto-revisão, registra seu aceite na PR, executa a homologação no Systêxtil autorizado e registra o resultado na própria PR.

## Restrições

- Sem GitHub Actions/CI/CD.
- Sem UI antes de avaliar CLI.
- Sem API de IA ou upload automático.
- Sem executor universal.
- Sem operações de escrita no ERP no piloto. Prorrogação será a segunda automação, sob simulação, lista previamente aprovada e log local; a autoridade para títulos vencidos ainda precisa ser definida.
- Sem dados reais do ERP, capturas brutas ou payloads no repositório.
- A documentação de planejamento não equivale a funcionalidade pronta.

Atualizar somente com evidências verificáveis: PR, commit, comandos e resultados.
