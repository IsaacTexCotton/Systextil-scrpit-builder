# Estado do projeto

**Referência:** 2026-11-11.  
**Status:** decisões de escopo registradas nesta rodada; implementação funcional do fluxo completo ainda não iniciada.

## Decisões de escopo desta rodada — 2026-11-11

- Problema central: dificuldade para criar automações no Systêxtil.
- A etapa exata, a causa e o impacto dessa dificuldade permanecem desconhecidos e pendentes de investigação. Nenhuma causa foi presumida.
- O repositório guarda método, modelos, checklists e ferramentas de apoio; não recebe código de userscripts de produção.
- Isaac é o único mantenedor e acumula os papéis de solicitante, especialista, investigador, desenvolvedor, revisor e homologador.
- O Inspector permanece read-only. Quando necessária, a captura de rede é manual, separada do Inspector e sujeita à ADR-012.
- Não há piloto definido ou aprovado. A decisão está pendente do mantenedor.
- Candidato não aprovado: consulta em lote de títulos, somente leitura, com título, cliente, código de barras e linha digitável.
- Prorrogação e emissão de boleto ficam fora do piloto.
- O repositório permanece público conforme decisão atual do mantenedor; a exposição pública é um risco aberto acompanhado pelo modelo de segurança.

## Estado por fase

| Fase | Estado | Evidência para concluir |
|---|---|---|
| Fundação organizacional | Concluída | PR #1 integrada à main |
| Planejamento e decisões de escopo | Registrados nesta branch de documentação | PR revisada e aceite do mantenedor |
| Fundação executável | Pendente | lockfile, npm ci e testes em Node 24+ |
| Solicitação operacional | Não iniciada | schema, CLI e fixtures |
| Inspector | Não iniciado | userscript de apoio read-only homologado |
| Especificador | Não iniciado | especificação validada com evidências |
| Gerador de contexto | Não iniciado | pacote determinístico e sanitizado |
| Interface visual | Adiada | decisão baseada em fricção observada |
| Piloto L0/L1 | Pendente de decisão do mantenedor | candidato selecionado, aprovado, medido e homologado |

## Próximas decisões e atividades

1. Descrever em que etapa(s) aparece a dificuldade para criar automações e quais impactos devem ser medidos.
2. Escolher ou rejeitar o candidato de consulta em lote e aprovar formalmente o escopo do piloto.
3. Definir ambiente e massa autorizados para homologação.
4. Retomar a sequência técnica do backlog, começando pela Fase 0 após confirmar o recorte de trabalho.

## Papéis

Isaac é o único responsável pelo projeto e executa todos os papéis. Não há revisor separado. O mantenedor faz auto-revisão, registra seu aceite na PR, executa a homologação no Systêxtil autorizado e registra o resultado na própria PR.

## Restrições

- Sem GitHub Actions/CI/CD.
- Sem UI antes de avaliar CLI.
- Sem API de IA ou upload automático.
- Sem executor universal.
- Sem testes de escrita no ERP no piloto inicial.
- Sem dados reais do ERP, capturas brutas ou payloads no repositório.
- A documentação de planejamento não equivale a funcionalidade pronta.

Atualizar somente com evidências verificáveis: PR, commit, comandos e resultados.
