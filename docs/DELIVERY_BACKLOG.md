# Backlog de implementação

Este arquivo é a **fonte única da ordem, das prioridades e das dependências das entregas**. Os demais documentos devem referenciá-lo, sem reproduzir a sequência.

Os itens são trabalho planejado, não funcionalidades concluídas. Cada item exige critérios de aceite, testes e PR focada.

## M0 — Mapeamento de telas

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| M0-01 | P0 | Criar `docs/telas/README.md` e `docs/telas/_modelo.md` | O modelo contém identificação, campos, ações e atalhos, inserções, navegação, mensagens, sinal de sucesso e desconhecidos. Todas as tabelas têm colunas de status e origem, conforme `SECURITY_MODEL.md`. |
| M0-02 | P0 | Mapear a consulta de títulos (F7) em `docs/telas/consulta-titulos.md` | Cada linha tem status e origem; valores reais estão mascarados; nenhum item está como confirmado sem origem captura ou teste manual. |
| M0-03 | P1 | Mapear a manutenção de títulos e a troca de telas entre elas | A navegação registra tela de origem, gatilho/ação, tecla ou botão e tela de destino; o sinal independente de sucesso está documentado. |

**Pré-condições de evidência:** antes de adicionar qualquer arquivo com evidência ou dado operacional, executar a verificação de dados sensíveis definida em `SECURITY_MODEL.md`. Não usar valores reais nos relatos enviados à IA.

## E0 — Fundação executável (adiado pelo mantenedor)

<badge-placeholder>ADIADO PELO MANTENEDOR</badge-placeholder>

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E0-01 | P0 | Gerar/versionar package-lock.json | npm ci reproduz instalação |
| E0-02 | P0 | Validar com Node 24+ | npm test/check/validate passam |
| E0-03 | P1 | Testar CLI | argumentos, arquivo e JSON inválidos cobertos |
| E0-04 | P1 | Testar schema do prompt | fixture passa e casos inválidos falham |
| E0-05 | P1 | Rever formatos | decisão sobre formatos documentada |

## E1 — Solicitação operacional

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E1-01 | P0 | Schema Automation Request | processo, regras, inputs/outputs e unknowns validados |
| E1-02 | P0 | Fixture fictícia | passa no schema |
| E1-03 | P1 | CLI de validação | erros com caminho, sem eco de conteúdo |
| E1-04 | P1 | Relatório de completude | lacunas listadas sem inventar |
| E1-05 | P1 | Checklist de investigação | itens rastreiam a solicitação |

## E2 — Inspector (adiado pelo mantenedor)

<badge-placeholder>ADIADO PELO MANTENEDOR</badge-placeholder>

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E2-01 | P0 | Allowlist de metadados | valores de campos excluídos |
| E2-02 | P0 | Userscript Inspector | @match/@grant mínimos, idempotente |
| E2-03 | P0 | Inventário de views/forms/controles | metadados limitados |
| E2-04 | P1 | Observações e certeza | status e origem seguem SECURITY_MODEL.md |
| E2-05 | P0 | Sanitização e revisão | dados sensíveis bloqueados |
| E2-06 | P1 | Exportação JSON | contrato válido |
| E2-07 | P0 | Homologação | Chrome/Tampermonkey autorizado e aceite humano |

## E3 — Especificador (adiado pelo mantenedor)

<badge-placeholder>ADIADO PELO MANTENEDOR</badge-placeholder>

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E3-01 | P0 | Schema de especificação completo | processo e passos representados |
| E3-02 | P1 | Referências de evidência | referência quebrada bloqueia |
| E3-03 | P1 | Regras de risco | controles conforme SECURITY_MODEL.md |
| E3-04 | P1 | Exportação Markdown | saída determinística |
| E3-05 | P1 | Gate de desconhecidos | lacuna crítica impede aprovação sem decisão explícita |

## E4 — Pacote de contexto (adiado pelo mantenedor)

<badge-placeholder>ADIADO PELO MANTENEDOR</badge-placeholder>

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E4-01 | P0 | Manifesto allowlist | caminhos e finalidade explícitos |
| E4-02 | P0 | Resolvedor seguro | inexistente/traversal rejeitados |
| E4-03 | P1 | Limites e deduplicação | tamanho limitado e hashes repetidos excluídos |
| E4-04 | P0 | Sanitização | segredo e diretório privado bloqueados |
| E4-05 | P1 | Prompt de implementação | exige plano, testes, segurança e lacunas |
| E4-06 | P1 | Relatório de fontes | incluídos/excluídos rastreáveis |
| E4-07 | P1 | Exportação local | sem upload automático |

## E5 — Interface (condicionada)

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E5-01 | P2 | Avaliar CLI com o mantenedor | fricções observadas |
| E5-02 | P2 | Comparar UI estática/desktop/servidor local | ADR com custo e risco |
| E5-03 | P2 | UI somente após decisão | ganho demonstrado e segurança validada |

E5 não faz parte da ordem padrão. Só pode ser iniciada mediante evidência de necessidade e decisão arquitetural.

## E6 — Qualidade e operação

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E6-01 | P0 | Checklist de auto-revisão do mantenedor | segurança, risco NXJ e diff cobertos |
| E6-02 | P0 | Checklist de homologação | critérios por nível de risco; resultado registrado na PR |
| E6-03 | P1 | Executar piloto escolhido | consulta em lote read-only; ambiente e massa autorizados; PR e homologação registradas |
| E6-04 | P1 | Medir dificuldade e resultado | linha de base e medidas comparáveis do processo apoiado |
| E6-05 | P2 | Revisar roadmap | decisão registrada após evidência do piloto |

## Ordem oficial das entregas

**M0 → E0 → E1 → E2 → E3 → E4 → E6.**

E5 permanece condicionado e fora da sequência padrão.

E0, E2, E3 e E4 estão **adiados pelo mantenedor**. Os itens foram mantidos para preservar o histórico do planejamento; não iniciar essas etapas até nova decisão.

## Definition of Done

Critérios atendidos; testes locais executados e reportados; documentação atualizada; evidências e riscos tratados conforme `SECURITY_MODEL.md`; diff auto-revisado pelo mantenedor; nenhum dado real/segredo; limitações declaradas; PR focada; homologação pelo mantenedor em ambiente autorizado quando aplicável, com resultado registrado na PR; sem merge automático.
