# Quality Gates

Nenhuma fase é concluída apenas porque arquivos foram criados. Os gates definem a evidência para avançar.

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
- [ ] Regras confirmadas separadas de hipóteses.
- [ ] Inputs, outputs, exceções e responsáveis identificados.
- [ ] Critérios de aceite mensuráveis.
- [ ] Risco preliminar justificado.

## G2 — Evidência Inspector
- [ ] Metadados limitados por allowlist.
- [ ] Nenhum valor de campo coletado.
- [ ] Nenhuma requisição/payload interceptado.
- [ ] @match/@grant revisados.
- [ ] Idempotência e limpeza de listeners.
- [ ] Exportação explícita pelo operador.
- [ ] JSON validado e privacidade revisada.
- [ ] Homologação Chrome/Tampermonkey autorizada.

## G3 — Especificação aprovada
- [ ] Referências resolvidas.
- [ ] Passos e resultados esperados.
- [ ] Critérios de sucesso observáveis.
- [ ] Falhas, timeout e recuperação definidos.
- [ ] Unknowns críticos resolvidos ou bloqueados.
- [ ] Regras L2/L3 aplicadas.
- [ ] Especialista de negócio aprovou.

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
- [ ] Testes e revisão do diff.

## G6 — Homologação
- [ ] Versões Chrome/Tampermonkey registradas.
- [ ] Ambiente Systextil identificado.
- [ ] Casos positivos, negativos e limites.
- [ ] Estado final verificado por sinal independente.
- [ ] Repetição/timeout/estado incerto testados quando aplicável.
- [ ] L3 exige confirmação antes de cada gravação.
- [ ] Recuperação validada e aceite humano registrado.

## G7 — Release interna
- [ ] PR revisada e aprovada.
- [ ] Docs/changelog atualizados.
- [ ] Versão do userscript atualizada.
- [ ] Evidências sanitizadas arquivadas no local autorizado.
- [ ] Instalação/rollback documentados.
- [ ] Integração autorizada.

Se um gate falhar, interromper avanço e registrar causa, responsável e correção. Falta de evidência não equivale a aprovação.
