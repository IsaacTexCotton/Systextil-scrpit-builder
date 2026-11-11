# Roadmap

Resumo do [plano mestre](IMPLEMENTATION_PLAN.md); tarefas detalhadas em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## Estado

- [x] Fundação organizacional integrada à main.
- [ ] Fundação executável validada em Node 24+.
- [ ] Solicitação operacional.
- [ ] Inspector read-only.
- [ ] Especificador técnico.
- [ ] Gerador de contexto.
- [ ] Decisão e aprovação do piloto — **pendente de decisão do mantenedor**.

**Candidato registrado, sem aprovação:** consulta em lote de títulos, somente leitura, com título, cliente, código de barras e linha digitável. É apenas uma opção a avaliar; não representa piloto escolhido.

**Fora do piloto:** prorrogação, emissão de boleto, baixa, exclusão e demais operações de escrita.

## Fase 0 — Fundação executável

- [ ] Gerar/versionar package-lock.json.
- [ ] npm ci em Node 24+.
- [ ] npm test, npm run check e npm run validate:examples.
- [ ] Testar CLI com entradas inválidas.

## Fase 1 — Solicitação

- [ ] Schema e fixture fictícia.
- [ ] Validação de completude e relatório de lacunas.
- [ ] Checklist de investigação da dificuldade percebida.

## Fase 2 — Inspector

- [ ] Allowlist de metadados DOM.
- [ ] Userscript de apoio independente e estritamente read-only.
- [ ] Inventário de views/forms/controles.
- [ ] Sanitização, revisão e exportação JSON.
- [ ] Homologação Chrome/Tampermonkey autorizada.

A captura manual de rede, quando necessária, permanece separada do Inspector, nunca é automática e segue a ADR-012.

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

- [ ] Avaliar CLI com o mantenedor.
- [ ] ADR antes de framework/servidor.
- [ ] UI somente com ganho demonstrável.

## Fase 6 — Validação assistida

- [ ] Auto-revisão do mantenedor e checklists de homologação.
- [ ] Selecionar e aprovar um piloto L0/L1.
- [ ] Registrar linha de base.
- [ ] Medir esforço, lacunas, retrabalho e defeitos após executar o piloto.

## Fora do escopo

Executor universal; escrita autônoma; prorrogação ou emissão de boleto no piloto; API paga/upload automático; backend/banco remoto; GitHub Actions/CI/CD/publicação automática.
