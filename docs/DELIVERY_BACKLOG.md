# Backlog de implementação

Os itens abaixo são propostas de entrega, não funcionalidades já implementadas. Cada item precisa de critérios de aceite, testes e PR própria ou escopo pequeno.

## Piloto escolhido

**Estado:** escolhido e confirmado pelo mantenedor.

**Escopo:** consulta em lote de títulos, somente leitura, contemplando:
- título;
- cliente;
- código de barras;
- linha digitável.

O primeiro entregável de E2 será **um único mapa da consulta de títulos** em `docs/telas/`, usado como teste prático do método. O mapa deve cobrir campos e tipos, inserções, dependências, navegação e, por ação, sequência de eventos/comandos NXJ e sinais independentes de confirmação. CLI, schemas e validadores só serão reconsiderados se o mapa revelar fricção concreta que justifique essas ferramentas e houver decisão explícita do mantenedor. O piloto de software continua estritamente read-only e não amplia automaticamente o escopo do Inspector.

**Ambiente e execução:** não há ambiente de teste/homologação; a consulta read-only será feita somente em produção, após autorização aplicável registrada na PR. Executar um título por vez, sem paralelismo, com pausa entre consultas; registrar na PR o intervalo aprovado e interromper no primeiro timeout, resposta ambígua, divergência, perda de sincronismo ou estado incerto. Não repetir automaticamente.

**Fora do piloto:** prorrogação, emissão de boleto, baixa, exclusão e qualquer outra operação de escrita. A prorrogação é a segunda automação pretendida, posterior ao piloto, com simulação sem persistência, lista de títulos aprovada previamente pelo mantenedor e log local mínimo por título alterado. A autoridade para autorizar prorrogação de títulos vencidos permanece pendente e deve ser definida antes de qualquer desenho executável dessa operação.

Antes de executar, confirmar ambiente e massa de dados autorizados. A verificação de dados sensíveis deve ser concluída antes de qualquer commit que adicione evidência de tela ou dado operacional. Nenhum valor real ou captura não sanitizada entra neste repositório.

## E0 — Fundação executável (adiado)

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E0-01 | P0 | Gerar/versionar package-lock.json | npm ci reproduz instalação |
| E0-02 | P0 | Validar com Node 24+ | npm test/check/validate passam |
| E0-03 | P1 | Testar CLI | argumentos, arquivo e JSON inválidos cobertos |
| E0-04 | P1 | Testar schema do prompt | fixture passa e casos inválidos falham |
| E0-05 | P1 | Rever formatos | decisão sobre formatos documentada |

## E1 — Solicitação (adiado)

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E1-01 | P0 | Schema Automation Request | processo, regras, inputs/outputs e unknowns validados |
| E1-02 | P0 | Fixture fictícia | passa no schema |
| E1-03 | P1 | CLI de validação | erros com caminho, sem eco de conteúdo |
| E1-04 | P1 | Relatório de completude | lacunas listadas sem inventar |
| E1-05 | P1 | Checklist de investigação | itens rastreiam a solicitação |

## E2 — Investigação de tela e Inspector

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E2-01 | P0 | Criar `docs/telas/README.md` e `docs/telas/_modelo.md` | regra de um arquivo por tela; status/origem em todas as tabelas; mascaramento documentado |
| E2-02 | P0 | Guia de preenchimento assistido por IA | IA organiza apenas relato já sanitizado do mantenedor; não inventa evidências |
| E2-03 | P0 | Primeiro mapa: consulta de títulos | um mapa em docs/telas/ documenta campos/controles, inserções, dependências, atalhos, navegação, sequência de comandos/eventos NXJ e confirmação por ação |
| E2-04 | P0 | Revisão do primeiro mapa antes da especificação | mapa da consulta de títulos revisado; cada linha tem Status e Origem; lacunas e fricções do método registradas |
| E2-05 | P0 | Preservar o Inspector read-only atual | respeita ADR-008; sem valores de campos ou captura de rede; observação manual de rede segue ADR-012 |
| E2-06 | P1 | Avaliar proposta ADR-013 | decisão explícita antes de qualquer ampliação |
| E2-07 | P0 | Sanitização e revisão | valores reais substituídos por marcadores antes de qualquer commit com evidência |
| E2-08 | P1 | Exportação de evidências aprovadas | contrato vigente validado |
| E2-09 | P0 | Homologação | Chrome/Tampermonkey autorizado e aceite do mantenedor |

**Dependência de E3:** a especificação só começa após existir um arquivo revisado em `docs/telas/` para cada tela relevante do fluxo. Os mapas são registros de investigação, não especificações aprovadas.

## E3 — Especificador

Pré-condição: um arquivo por tela relevante em `docs/telas/`, derivado de `_modelo.md`, revisado pelo mantenedor. Itens desconhecidos permanecem visíveis e são avaliados como lacunas; não bloqueiam automaticamente quando explicitamente aceitos como fora do escopo.

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E3-01 | P0 | Schema de especificação completo | processo e passos representados |
| E3-02 | P1 | Referências de evidência | referência quebrada bloqueia |
| E3-03 | P1 | Regras de risco | L2/L3 exigem controles |
| E3-04 | P1 | Exportação Markdown | saída determinística |
| E3-05 | P1 | Gate de unknowns | unknown crítico bloqueia aprovação |

## E4 — Pacote de contexto

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E4-01 | P0 | Manifesto allowlist | caminhos e finalidade explícitos |
| E4-02 | P0 | Resolvedor seguro | inexistente/traversal rejeitados |
| E4-03 | P1 | Limites e deduplicação | tamanho limitado e hashes repetidos excluídos |
| E4-04 | P0 | Sanitização | segredo e diretório privado bloqueados |
| E4-05 | P1 | Prompt de implementação | exige plano, testes, segurança e lacunas |
| E4-06 | P1 | Relatório de fontes | incluídos/excluídos rastreáveis |
| E4-07 | P1 | Exportação local | sem upload automático |

## E5 — Interface

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E5-01 | P2 | Avaliar CLI com usuários | fricções observadas |
| E5-02 | P2 | Comparar UI estática/desktop/servidor local | ADR com custo e risco |
| E5-03 | P2 | UI somente após decisão | ganho demonstrado e segurança validada |

## E6 — Qualidade e operação

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E6-01 | P0 | Checklist de auto-revisão do mantenedor | segurança, risco NXJ e diff cobertos |
| E6-02 | P0 | Checklist de homologação | critérios por L0–L3; resultado registrado na PR |
| E6-03 | P1 | Executar piloto escolhido em produção | consulta read-only, um título por vez e com pausa; autorização e intervalo registrados na PR; aborto no primeiro estado incerto; sem repetição automática |
| E6-04 | P1 | Medir dificuldade e resultado | linha de base e medidas comparáveis do processo apoiado |
| E6-05 | P2 | Revisar roadmap | decisão registrada após evidência do piloto |

## Ordem

E2 (primeiro mapa da consulta de títulos) → E3 → E4 → E6. E0 e E1 ficam adiadas até o primeiro mapa estar pronto e só serão retomadas se ele revelar fricção concreta que CLI/schemas/validadores resolvam, mediante decisão do mantenedor. E5 só após evidência de necessidade. O piloto read-only depende de autorização registrada na PR e dos controles de produção definidos.

## Definition of Done

Critérios atendidos; testes locais executados e reportados; docs/fixtures atualizados; um arquivo de mapeamento revisado por tela relevante antes da especificação; cada linha das tabelas dos mapas com Status e Origem; diff auto-revisado pelo mantenedor; nenhum dado real/segredo; verificação de dados sensíveis concluída antes de commit com evidência de tela ou dado; limitações declaradas; PR focada; homologação pelo mantenedor em Systêxtil autorizado quando aplicável, com resultado registrado na PR; sem merge automático.
