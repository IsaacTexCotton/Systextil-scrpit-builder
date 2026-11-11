# Roadmap

Resumo do [plano mestre](IMPLEMENTATION_PLAN.md); tarefas detalhadas em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## Estado
- [x] Fundação organizacional integrada à main.
- [ ] Fundação executável validada em Node 24+.
- [ ] Solicitação operacional.
- [ ] Inspector read-only.
- [ ] Especificador técnico.
- [ ] Gerador de contexto/prompt.
- [ ] Piloto L0/L1.

## Fase 0 — Fundação executável
- [ ] Gerar/versionar package-lock.json.
- [ ] npm ci em Node 24+.
- [ ] npm test, npm run check e npm run validate:examples.
- [ ] Testar CLI com entradas inválidas.

## Fase 1 — Solicitação
- [ ] Schema e fixture fictícia.
- [ ] Validação de completude e relatório de lacunas.
- [ ] Checklist de investigação.

## Fase 2 — Inspector
- [ ] Allowlist de metadados DOM.
- [ ] Userscript independente e restrito.
- [ ] Inventário de views/forms/controles.
- [ ] Sanitização, revisão e exportação JSON.
- [ ] Homologação Chrome/Tampermonkey.

## Fase 3 — Especificador
- [ ] Schema completo.
- [ ] Referências e regras de risco.
- [ ] Relatório de unknowns/bloqueios.
- [ ] Exportação Markdown.

## Fase 4 — Gerador
- [ ] Manifesto allowlist.
- [ ] Resolução segura de arquivos e versões.
- [ ] Limites, deduplicação e sanitização.
- [ ] Pacote Markdown/JSON determinístico.

## Fase 5 — Interface
- [ ] Avaliar CLI com usuários.
- [ ] ADR antes de framework/servidor.
- [ ] UI somente com ganho demonstrável.

## Fase 6 — Validação assistida
- [ ] Checklists de revisão/homologação.
- [ ] Piloto L0/L1.
- [ ] Medir tempo, lacunas, retrabalho e defeitos.

## Fora do escopo
Executor universal; escrita autônoma; API paga/upload automático; backend/banco remoto; GitHub Actions/CI/CD/publicação automática.
