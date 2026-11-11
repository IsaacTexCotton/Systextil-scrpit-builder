## Objetivo

Descreva o problema e o resultado esperado.

## Escopo

- [ ] Código de ferramenta de apoio deste repositório
- [ ] Userscript de produção (alteração deve ocorrer no repositório de produção)
- [ ] Schema/contrato
- [ ] Documentação
- [ ] Testes
- [ ] Segurança

## Risco operacional

- [ ] L0 — inspeção/metadados
- [ ] L1 — leitura de dados
- [ ] L2 — preparação/preenchimento sem gravação
- [ ] L3 — alteração persistente no ERP
- [ ] Não se aplica

Explique o risco e os controles necessários:

## Evidências e decisões

- Evidências confirmadas:
- Inferências:
- Pontos desconhecidos:
- Regras de negócio confirmadas:
- Captura manual de rede (se aplicável): confirmar ADR-012 e máscara revisada.

## Validação local

Informe os comandos realmente executados e seus resultados.

- [ ] npm test
- [ ] npm run check
- [ ] npm run validate:examples
- [ ] Revisão manual do diff pelo mantenedor
- [ ] Homologação em Chrome/Tampermonkey
- [ ] Homologação no Systêxtil autorizado (quando aplicável)

## Homologação no Systêxtil

- Responsável: mantenedor
- Data:
- Ambiente autorizado:
- Versão/commit testado:
- Casos executados:
- Resultado observado:
- Limitações/incidentes:
- Evidência sanitizada ou motivo de pendência:

## Segurança

- [ ] Não inclui credenciais, tokens ou dados pessoais/financeiros reais.
- [ ] Não inclui HAR, payload bruto ou captura não sanitizada.
- [ ] Imports e entradas externas foram validados.
- [ ] Permissões Tampermonkey foram minimizadas.
- [ ] Operações persistentes exigem confirmação humana.
- [ ] Logs e screenshots foram sanitizados.

## Compatibilidade e recuperação

Descreva impactos, limitações, como interromper a automação e como recuperar o estado em caso de falha.

## Auto-revisão e aceite do mantenedor

- [ ] O mantenedor revisou o diff completo.
- [ ] Os testes aplicáveis foram executados localmente e os resultados estão descritos.
- [ ] A homologação foi executada e registrada, ou marcada como pendente com justificativa.
- [ ] O aceite final do mantenedor foi registrado em comentário na conversa da PR.

Nota: o GitHub não permite ao autor enviar um review formal `Approve` na própria PR. O comentário de aceite do mantenedor é o registro adotado pelo projeto.

## Checklist de processo

- [ ] Li as instruções aplicáveis em AGENTS.md.
- [ ] Mantive o escopo do PR focado.
- [ ] Atualizei documentação e exemplos quando necessário.
- [ ] Não adicionei CI/CD ou dependência sem aprovação.
- [ ] Não copiei código de produção para este repositório.
