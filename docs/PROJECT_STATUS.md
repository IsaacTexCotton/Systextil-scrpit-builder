# Estado do projeto

**Referência:** 2026-11-11.  
**Status:** decisões da rodada 2 registradas; método de investigação de tela documentado; implementação funcional ainda não iniciada.

## Decisões de escopo — rodada 2 (2026-11-11)

- Problema central confirmado: a dificuldade é entender a tela do Systêxtil antes de escrever código, incluindo campos e tipos, inserções de dados, dependências entre campos e navegação entre telas.
- O mantenedor precisa de apoio para mapear a tela antes da codificação. O mapa identifica qual ação leva de uma tela a outra e qual tecla ou botão dispara a transição.
- O guia de investigação foi documentado em `docs/SCREEN_INVESTIGATION.md`.
- O Inspector permanece read-only conforme ADR-008. A ADR-013 é apenas uma proposta para avaliar metadados adicionais de controles editáveis; não foi aceita e não autoriza implementação.
- **Piloto escolhido:** consulta em lote de títulos, somente leitura, contemplando título, cliente, código de barras e linha digitável.
- Prorrogação e emissão de boleto ficam fora do piloto. Baixa, exclusão e demais operações de escrita também ficam fora.
- Isaac é o único mantenedor e acumula os papéis de solicitante, especialista, investigador, desenvolvedor, revisor e homologador.
- Captura de rede é manual, separada do Inspector e sujeita à ADR-012. Capturas de tela e campos com valores devem seguir as mesmas regras de mascaramento.
- O repositório permanece público por decisão do mantenedor. A visibilidade pública é um risco aberto; não alterá-la sem nova decisão explícita.
- A verificação de dados sensíveis permanece pendente e será obrigatória antes de qualquer novo commit que inclua evidência de tela ou dado operacional.

## Estado por fase

| Fase | Estado | Evidência para concluir |
|---|---|---|
| Fundação organizacional | Concluída | PR #1 integrada à main |
| Planejamento e decisões de escopo | Registrados nesta branch de documentação | PR revisada e aceite do mantenedor |
| Fundação executável | Pendente | lockfile, npm ci e testes em Node 24+ |
| Solicitação operacional | Não iniciada | schema, CLI e fixtures |
| Guia de investigação de tela | Documentado | revisão do mantenedor e aplicação ao piloto |
| Inspector | Não iniciado | ferramenta read-only homologada conforme escopo aprovado |
| Proposta ADR-013 | Proposta | decisão explícita do mantenedor antes de eventual implementação |
| Especificador | Não iniciado | especificação validada com mapeamento e evidências |
| Gerador de contexto | Não iniciado | pacote determinístico e sanitizado |
| Interface visual | Adiada | decisão baseada em fricção observada |
| Piloto de consulta em lote | Escolhido; execução pendente | ambiente autorizado, mapeamento, implementação, testes e homologação |

## Próximas atividades

1. Confirmar ambiente e massa de dados autorizados para o piloto.
2. Aplicar o guia de investigação à consulta em lote e mapear campos/tipos, inserções, dependências e navegação.
3. Concluir a verificação de dados sensíveis antes de qualquer commit futuro que adicione evidência de tela ou dado.
4. Decidir se a proposta ADR-013 é necessária antes de alterar o escopo do Inspector.
5. Retomar a sequência técnica do backlog, começando pela Fase 0 e avançando conforme os Quality Gates.

## Papéis

Isaac é o único responsável pelo projeto e executa todos os papéis. Não há revisor separado. O mantenedor faz auto-revisão, registra seu aceite na PR, executa a homologação no Systêxtil autorizado e registra o resultado na própria PR.

## Restrições

- Sem GitHub Actions/CI/CD.
- Sem UI antes de avaliar CLI.
- Sem API de IA ou upload automático.
- Sem executor universal.
- Sem operações de escrita no ERP no piloto.
- Sem dados reais do ERP, capturas brutas ou payloads no repositório.
- A documentação de planejamento não equivale a funcionalidade pronta.

Atualizar somente com evidências verificáveis: PR, commit, comandos e resultados.
