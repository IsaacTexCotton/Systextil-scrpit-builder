# Roadmap

Resumo do [plano mestre](IMPLEMENTATION_PLAN.md); tarefas detalhadas em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

**Ordem de execução vigente:** E2 → E3 → E4 → E6, com E0 e E1 adiados até decisão do mantenedor. E5 só após evidência de necessidade.

## Estado

- [x] Fundação organizacional integrada à main.
- [ ] Guia de investigação e mapeamento de tela (E2; prioridade atual).
- [ ] Inspector read-only conforme ADR-008.
- [ ] Especificador técnico (E3).
- [ ] Gerador de contexto (E4).
- [x] Piloto definido: consulta em lote de títulos, somente leitura.
- [ ] Validação assistida e execução do piloto (E6).
- [ ] Fundação executável (E0; adiada até decisão explícita do mantenedor).
- [ ] Solicitação operacional (E1; adiada até decisão explícita do mantenedor).
- [ ] Interface (E5; condicionada a evidência de necessidade).

## Piloto escolhido

Consulta em lote de títulos, somente leitura, contemplando título, cliente, código de barras e linha digitável.

A investigação que antecede a codificação deve mapear campos e tipos, ações e sequência de inserção, dependências entre campos e navegação (ação, tecla/botão e tela de destino). O piloto depende de ambiente e massa autorizados.

**Fora do piloto:** prorrogação, emissão de boleto, baixa, exclusão e demais operações de escrita.

## Fase 2 — Investigação de tela e Inspector (E2; prioridade atual)

Começar pelo mapeamento manual de telas em `docs/telas/`, com um arquivo por tela e revisão das evidências sanitizadas.

- [ ] Guia para inventário de telas, campos e tipos.
- [ ] Mapa de ações e sequência de inserção.
- [ ] Mapa de dependências entre campos.
- [ ] Mapa de navegação com origem, ação, tecla/botão e destino.
- [ ] Userscript de apoio estritamente read-only dentro da ADR-008.
- [ ] Avaliar ADR-013 antes de qualquer eventual ampliação da allowlist.
- [ ] Sanitização, revisão e exportação de evidências.
- [ ] Homologação Chrome/Tampermonkey autorizada.

A captura manual de rede continua separada do Inspector, nunca é automática e segue a ADR-012. Capturas de tela e campos com valores seguem o mesmo mascaramento. A verificação de dados sensíveis é obrigatória antes de qualquer commit que inclua evidência de tela ou dado operacional.

## Fase 3 — Especificador (E3)

- [ ] Schema completo.
- [ ] Referências e regras de risco.
- [ ] Relatório de unknowns/bloqueios.
- [ ] Exportação Markdown.

## Fase 4 — Gerador (E4)

- [ ] Manifesto allowlist.
- [ ] Resolução segura de arquivos e versões.
- [ ] Limites, deduplicação e sanitização.
- [ ] Pacote Markdown/JSON determinístico.

## Fase 6 — Validação assistida (E6)

- [ ] Auto-revisão do mantenedor e checklists de homologação.
- [ ] Executar piloto read-only de consulta em lote de títulos.
- [ ] Registrar linha de base.
- [ ] Medir esforço, lacunas de mapeamento, retrabalho e defeitos após executar o piloto.

## Fase 0 — Fundação executável (E0; adiada)

- [ ] Gerar/versionar package-lock.json.
- [ ] npm ci em Node 24+.
- [ ] npm test, npm run check e npm run validate:examples.
- [ ] Testar CLI com entradas inválidas.

Retomar somente após decisão explícita do mantenedor. Esta fase não bloqueia o início do mapeamento manual de telas.

## Fase 1 — Solicitação (E1; adiada)

- [ ] Schema e fixture fictícia.
- [ ] Validação de completude e relatório de lacunas.
- [ ] Checklist de investigação da dificuldade percebida.

Retomar somente após decisão explícita do mantenedor.

## Fase 5 — Interface (E5; condicionada)

- [ ] Avaliar a necessidade com base em evidência de uso.
- [ ] Registrar ADR antes de framework/servidor.
- [ ] Escolher uma interface somente com ganho demonstrável.

## Fora do escopo

Executor universal; escrita autônoma; prorrogação ou emissão de boleto no piloto; API paga/upload automático; backend/banco remoto; GitHub Actions/CI/CD/publicação automática.
