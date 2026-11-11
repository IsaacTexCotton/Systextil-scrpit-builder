# Estado do projeto

**Referência:** 2026-11-11.  
**Status:** escopo reduzido ao método de mapeamento de telas; consulta de títulos definida como piloto; implementação funcional ainda não iniciada.

## Decisões atuais

- O escopo do projeto está reduzido ao método de mapeamento de telas antes da codificação. A fonte canônica é [DECISIONS.md](DECISIONS.md).
- O piloto definido é a consulta em lote de títulos, somente leitura. Os limites do piloto estão em [DECISIONS.md](DECISIONS.md).
- O repositório está público; isso permanece como risco aberto. Os metadados dos commits públicos expõem o e-mail de autoria. Achados e procedimento de verificação estão em [SECURITY_MODEL.md](SECURITY_MODEL.md).
- A licença permanece pendente, conforme ADR-006 em [DECISIONS.md](DECISIONS.md).
- A verificação de dados sensíveis foi realizada nesta rodada sobre os arquivos e os 27 commits alcançáveis pela main: não foram identificados dados reais de clientes ou transações do ERP; foi identificada exposição de e-mail nos metadados de autoria. Não houve reescrita do histórico.
- Isaac é o único mantenedor e acumula os papéis do projeto. O rito de revisão separada não se aplica enquanto houver uma única pessoa.

## Situação das entregas

A ordem, os estados de adiamento e os critérios das entregas são mantidos exclusivamente em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

- M0 — mapeamento de telas: etapa prioritária planejada; ainda não executada.
- E0, E2, E3 e E4: adiados pelo mantenedor.
- E1 e E6: permanecem planejados conforme dependências do backlog.
- E5: condicionado a decisão arquitetural.

## Próximas ações

1. Executar M0-01 e criar os arquivos do modelo de telas.
2. Após revisar o mascaramento e as evidências, executar M0-02 para mapear a consulta de títulos (F7).
3. Executar M0-03 para mapear a manutenção de títulos e as transições entre telas.
4. Reavaliar etapas adiadas somente mediante nova decisão do mantenedor.

## Restrições e referências

- Sem GitHub Actions/CI/CD ou merge automático.
- Sem reescrita do histórico nesta rodada.
- Não alterar a visibilidade pública sem decisão explícita.
- Nenhum dado real do ERP deve ser incluído nos arquivos ou exemplos.

Para regras de evidência, status, origem, níveis de risco e verificação de dados sensíveis, consultar [SECURITY_MODEL.md](SECURITY_MODEL.md). Para escopo e decisões, consultar [DECISIONS.md](DECISIONS.md).
