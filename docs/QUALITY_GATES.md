# Quality Gates

Nenhuma fase é concluída apenas porque arquivos foram criados. Os gates definem a evidência para avançar. O mantenedor único executa os papéis de negócio, investigação, revisão e homologação; não há revisor separado.

## G0 — Repositório executável
- [ ] Node 24+.
- [ ] package-lock.json versionado.
- [ ] npm ci concluído.
- [ ] npm test, npm run check e npm run validate:examples aprovados.
- [ ] CLI testada com JSON inválido, caminho inexistente e argumentos incorretos.
- [ ] Fixtures sem dados reais.

## G1 — Solicitação completa
- [ ] Schema de solicitação aprovado.
- [ ] Processo atual e resultado desejado descritos.
- [ ] Dificuldade observada separada de sua hipótese de causa.
- [ ] Regras confirmadas separadas de hipóteses.
- [ ] Inputs, outputs, exceções e responsáveis identificados.
- [ ] Critérios de aceite mensuráveis.
- [ ] Risco preliminar justificado.

## G2 — Evidência Inspector
- [ ] Metadados limitados por allowlist.
- [ ] Nenhum valor de campo coletado.
- [ ] Nenhuma requisição/payload interceptado pelo Inspector.
- [ ] @match/@grant revisados.
- [ ] Idempotência e limpeza de listeners.
- [ ] Exportação explícita pelo operador.
- [ ] JSON validado e privacidade revisada.
- [ ] Homologação Chrome/Tampermonkey autorizada.
- [ ] Captura manual de rede, se necessária, separada do Inspector e sanitizada conforme ADR-012.

## G3 — Especificação aprovada
- [ ] Referências resolvidas.
- [ ] Passos e resultados esperados.
- [ ] Critérios de sucesso observáveis.
- [ ] Falhas, timeout e recuperação definidos.
- [ ] Unknowns críticos resolvidos ou bloqueados.
- [ ] Regras L2/L3 aplicadas.
- [ ] O mantenedor, atuando como especialista de negócio, registra a confirmação das regras.

## G4 — Pacote IA
- [ ] Apenas fontes allowlisted.
- [ ] Caminhos, versões/commits e hashes registrados.
- [ ] Conteúdo sensível excluído.
- [ ] Limites respeitados.
- [ ] Prompt exige plano, testes e relatório honesto.
- [ ] Exportação local sem upload automático.

## G5 — Userscript
- [ ] Metadados e permissões mínimos.
- [ ] Host/caminho restritos.
- [ ] Sem dependência remota não aprovada.
- [ ] Entradas e estados validados.
- [ ] Idempotência, limpeza, timeout e cancelamento.
- [ ] Logs sanitizados.
- [ ] Testes locais e auto-revisão do diff pelo mantenedor.

## G6 — Homologação
- [ ] Versões Chrome/Tampermonkey registradas quando aplicável.
- [ ] Ambiente Systêxtil autorizado identificado.
- [ ] Casos positivos, negativos e limites.
- [ ] Estado final verificado por sinal independente.
- [ ] Repetição/timeout/estado incerto testados quando aplicável.
- [ ] L3 exige confirmação antes de cada gravação.
- [ ] Recuperação validada.
- [ ] Resultado e decisão do mantenedor registrados na PR; se não executada, homologação marcada como pendente.

## G7 — Release interna
- [ ] PR aberta e diff auto-revisado pelo mantenedor.
- [ ] Aceite explícito do mantenedor registrado na conversa da PR.
- [ ] Docs/changelog atualizados.
- [ ] Versão do userscript atualizada no repositório de produção, quando aplicável.
- [ ] Evidências sanitizadas arquivadas no local autorizado.
- [ ] Instalação/rollback documentados.
- [ ] Integração manual e explicitamente autorizada pelo mantenedor.

O autor da PR não pode enviar um review formal `Approve` na própria PR no GitHub; o aceite deste projeto é o registro explícito do mantenedor na conversa da PR. Não existe exigência de um segundo revisor, CI/CD ou merge automático.

Se um gate falhar, interromper avanço e registrar causa, responsável e correção. Falta de evidência não equivale a aprovação.
