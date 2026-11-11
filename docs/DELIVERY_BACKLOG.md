# Backlog de implementação

Os itens abaixo são propostas de entrega, não funcionalidades já implementadas. Cada item precisa de critérios de aceite, testes e PR própria ou escopo pequeno.

## Piloto escolhido

**Estado:** escolhido e confirmado pelo mantenedor.

**Escopo:** consulta em lote de títulos, somente leitura, contemplando:
- título;
- cliente;
- código de barras;
- linha digitável.

O piloto também deve validar o método de investigação e mapeamento da tela antes da codificação: campos e tipos, ações e sequência de inserção, dependências entre campos e navegação com o gatilho de tecla/botão. O piloto não autoriza escrita no ERP nem amplia automaticamente o escopo do Inspector.

**Fora do piloto:** prorrogação, emissão de boleto, baixa, exclusão e qualquer outra operação de escrita.

Antes de executar, confirmar ambiente e massa de dados autorizados. A verificação de dados sensíveis deve ser concluída antes de qualquer commit que adicione evidência de tela ou dado operacional. Nenhum valor real ou captura não sanitizada entra neste repositório.

## E0 — Fundação executável

| ID | Prioridade | Entrega | Aceite |
|---|---|---|---|
| E0-01 | P0 | Gerar/versionar package-lock.json | npm ci reproduz instalação |
| E0-02 | P0 | Validar com Node 24+ | npm test/check/validate passam |
| E0-03 | P1 | Testar CLI | argumentos, arquivo e JSON inválidos cobertos |
| E0-04 | P1 | Testar schema do prompt | fixture passa e casos inválidos falham |
| E0-05 | P1 | Rever formatos | decisão sobre formatos documentada |

## E1 — Solicitação

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
| E2-01 | P0 | Guia e checklist de mapeamento | campos/tipos, inserções, dependências e navegação cobertos |
| E2-02 | P0 | Allowlist do Inspector atual | respeita ADR-008; sem valores de campos |
| E2-03 | P1 | Avaliar proposta ADR-013 | decisão explícita antes de qualquer ampliação |
| E2-04 | P1 | Observações e certeza | confirmed/inferred/unknown |
| E2-05 | P0 | Sanitização e revisão | dados sensíveis bloqueados |
| E2-06 | P1 | Exportação de evidências aprovadas | contrato vigente validado |
| E2-07 | P0 | Homologação | Chrome/Tampermonkey autorizado e aceite do mantenedor |

## E3 — Especificador

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
| E6-03 | P1 | Executar piloto escolhido | consulta em lote read-only dos quatro dados; ambiente e massa autorizados; PR e homologação registradas |
| E6-04 | P1 | Medir dificuldade e resultado | linha de base e medidas comparáveis do processo apoiado |
| E6-05 | P2 | Revisar roadmap | decisão registrada após evidência do piloto |

## Ordem

E0 → E1 → E2 → E3 → E4 → E6. E5 só após evidência de necessidade. A execução do piloto depende de ambiente autorizado e da investigação/mapa de tela necessários ao desenvolvimento seguro.

## Definition of Done

Critérios atendidos; testes locais executados e reportados; docs/fixtures atualizados; diff auto-revisado pelo mantenedor; nenhum dado real/segredo; verificação de dados sensíveis concluída antes de commit com evidência de tela ou dado; limitações declaradas; PR focada; homologação pelo mantenedor em Systêxtil autorizado quando aplicável, com resultado registrado na PR; sem merge automático.
