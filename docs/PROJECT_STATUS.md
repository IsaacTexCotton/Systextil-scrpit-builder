# Estado do projeto

**Referência:** 2026-11-11.  
**Status:** planejamento completo proposto; implementação funcional ainda não iniciada.

| Fase | Estado | Evidência para concluir |
|---|---|---|
| Fundação organizacional | Concluída | PR #1 integrada à main |
| Fundação executável | Pendente | lockfile, npm ci e testes em Node 24+ |
| Solicitação operacional | Não iniciada | schema, CLI e fixtures |
| Inspector | Não iniciado | userscript read-only homologado |
| Especificador | Não iniciado | especificação validada com evidências |
| Gerador de contexto | Não iniciado | pacote determinístico e sanitizado |
| Interface visual | Adiada | decisão baseada em uso real |
| Piloto L0/L1 | Não iniciado | fluxo completo homologado |

## Próximo trabalho
1. Concluir Gate G0.
2. Criar schema de solicitação (E1-01).
3. Criar fixture e testes (E1-02).
4. Implementar relatório de completude (E1-04) após validar o contrato.

## Restrições
- Sem GitHub Actions/CI/CD.
- Sem UI antes de avaliar CLI.
- Sem API de IA ou upload automático.
- Sem executor universal.
- Sem testes de escrita no ERP.
- Planejamento não equivale a funcionalidade pronta.

Atualizar somente com evidências verificáveis: PR, commit, comandos e resultados.
