# Roadmap

Resumo do [plano mestre](IMPLEMENTATION_PLAN.md); tarefas detalhadas em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## Estado

- [x] Fundação organizacional integrada à main.
- [ ] Fundação executável validada em Node 24+.
- [ ] Solicitação operacional.
- [ ] Guia de investigação e mapeamento de tela.
- [ ] Inspector read-only conforme ADR-008.
- [ ] Especificador técnico.
- [ ] Gerador de contexto.
- [x] Piloto definido: consulta em lote de títulos, somente leitura.

## Piloto escolhido

Consulta em lote de títulos, somente leitura, contemplando título, cliente, código de barras e linha digitável.

A investigação que antecede a codificação deve mapear campos e tipos, ações e sequência de inserção, dependências entre campos e navegação (ação, tecla/botão e tela de destino). O piloto depende de ambiente e massa autorizados.

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

## Fase 2 — Investigação de tela e Inspector

- [ ] Guia para inventário de telas, campos e tipos.
- [ ] Mapa de ações e sequência de inserção.
- [ ] Mapa de dependências entre campos.
- [ ] Mapa de navegação com origem, ação, tecla/botão e destino.
- [ ] Userscript de apoio estritamente read-only dentro da ADR-008.
- [ ] Avaliar ADR-013 antes de qualquer eventual ampliação da allowlist.
- [ ] Sanitização, revisão e exportação de evidências.
- [ ] Homologação Chrome/Tampermonkey autorizada.

A captura manual de rede continua separada do Inspector, nunca é automática e segue a ADR-012. Capturas de tela e campos com valores seguem o mesmo mascaramento.

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
- [ ] Executar piloto read-only de consulta em lote de títulos.
- [ ] Registrar linha de base.
- [ ] Medir esforço, lacunas de mapeamento, retrabalho e defeitos após executar o piloto.

## Fora do escopo

Executor universal; escrita autônoma; prorrogação ou emissão de boleto no piloto; API paga/upload automático; backend/banco remoto; GitHub Actions/CI/CD/publicação automática.
