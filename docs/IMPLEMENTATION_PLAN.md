# Plano mestre de implementação

**Status:** escopo e planejamento registrados; implementação incremental pendente.  
**Produto:** Systextil Script Builder.  
**Referência:** 2026-11-11.

## 1. Visão

Construir um conjunto local de método, modelos, checklists e ferramentas de apoio para reduzir a dificuldade de criar automações no Systêxtil.

A dificuldade foi delimitada: antes de escrever código, o mantenedor precisa entender a tela, os campos, as inserções de dados e as transições entre telas. Ele precisa de apoio para mapear esse comportamento e registrar o que foi observado, o que foi inferido e o que ainda é desconhecido.

Este repositório não armazena código de automações de produção. Userscripts de produção permanecem no repositório Systextil-envio-mensagem ou em outro repositório indicado pelo mantenedor. O Inspector é uma ferramenta de apoio separada e read-only, conforme a ADR-008.

O produto não é um executor universal de comandos NXJ. A IA não substitui a decisão, a revisão ou a homologação do mantenedor.

## 2. Problema central, objetivos e critério de sucesso

**Problema central:** a criação de automações é dificultada pela necessidade de entender a tela do Systêxtil antes de escrever código. O mantenedor precisa de apoio para mapear a tela e seu comportamento.

O mapeamento inclui quatro dimensões:
1. **Campos e tipos:** identificar os campos relevantes e seus tipos/metadados.
2. **Ações de inserção:** documentar como os dados são inseridos, em que sequência, por qual ação e qual é o resultado observável.
3. **Dependências entre campos:** registrar qual campo/ação influencia outro campo, incluindo habilitação, obrigatoriedade, opções, preenchimento ou validação.
4. **Navegação entre telas:** registrar tela de origem, ação que causa a transição, tecla ou botão que a dispara e tela de destino.

Objetivos:
- **documentar campos, inserções e navegação entre telas antes de automatizar**;
- apoiar o mantenedor a mapear a tela antes de escrever código;
- identificar dependências entre campos e a sequência necessária de interação;
- registrar os fatos, inferências, desconhecidos e evidências que sustentam o mapeamento;
- evitar invenção de campos, seletores, comandos e regras;
- tornar explícitos inputs, outputs, pré-condições, riscos, falhas e critérios de sucesso;
- reduzir tentativa e erro, retrabalho e esforço entre investigação, implementação e validação.

**Critério de sucesso do produto:** no piloto escolhido, demonstrar que o processo apoiado pelo método reduz o esforço necessário para compreender a tela, implementar e validar a automação em comparação com uma linha de base. A linha de base e metas quantitativas devem medir o esforço e o retrabalho reais. Mais documentação, mais páginas ou prompts maiores, isoladamente, não demonstram sucesso.

## 3. Fora do escopo do MVP

- Executor genérico de ações NXJ ou agente autônomo no ERP.
- Escrita, baixa, prorrogação, emissão de boleto ou exclusão no piloto.
- Captura automática de valores, tráfego de rede ou payloads.
- Leitura de valores de campos pelo Inspector.
- Backend, banco remoto, autenticação própria ou sincronização em nuvem.
- Integração paga de IA/API e upload automático.
- Cópias de userscripts de produção neste repositório.
- Geração/publicação automática em produção.
- GitHub Actions, CI/CD ou deploy automático.

## 4. Papéis e responsabilidade

Isaac é o único mantenedor e responsável pelo projeto. Ele acumula os papéis de solicitante, especialista de negócio, investigador, desenvolvedor, revisor e homologador. Não existe revisor separado nem uma segunda pessoa responsável pela aprovação.

O mantenedor deve deixar explícito, na solicitação e na PR, quando estiver atuando em cada papel relevante. A auto-revisão do diff e o aceite final devem ser registrados na PR. A homologação é feita pelo próprio mantenedor no Systêxtil autorizado, quando aplicável, e seu resultado também é registrado na PR.

A acumulação de papéis não reduz os controles técnicos: testes locais, evidências sanitizadas, critérios de aceite, parada segura e registro de homologação continuam obrigatórios.

## 5. Princípios

Local-first; human-in-the-loop; evidence-first; least privilege; fail-safe; pequenas mudanças; reprodutibilidade; privacidade por padrão; dados declarativos nunca executáveis; separação entre ferramentas de apoio e código de produção; aprovação e homologação explícitas pelo mantenedor.

## 6. Arquitetura alvo

### Inspector (Tampermonkey)

O Inspector aprovado pela ADR-008 permanece read-only: coleta somente metadados allowlisted, não lê valores de campos e não intercepta requisições de rede. O escopo vigente não permite preencher campos, executar ações de inserção, disparar teclas/botões ou navegar registros.

A investigação de inserções, dependências e navegação será documentada manualmente pelo investigador com o procedimento de [SCREEN_INVESTIGATION.md](SCREEN_INVESTIGATION.md). A proposta ADR-013 avalia se o catálogo read-only pode ser ampliado para metadados de controles editáveis; ela não está aceita e não autoriza implementação. Qualquer ampliação depende de decisão posterior, sem alterar ADR-008 por esta atualização.

### Núcleo local (Node.js)

CLI e módulos coesos para validar schemas, gerenciar solicitações, verificar referências, selecionar contexto, sanitizar e gerar Markdown/JSON determinísticos. Sem servidor ou rede no MVP.

### Especificador

Converte solicitação e mapeamento de tela em objetivo, escopo, regras, campos, ações de inserção, dependências, transições, inputs/outputs, pré-condições, passos, risco, critérios de sucesso, timeouts, recuperação e unknowns.

### Gerador de pacote

Monta instruções, especificação aprovada, evidências sanitizadas, documentos técnicos, manifesto de fontes e checklist. Não envia pacote automaticamente para serviços externos.

### Código de produção

Cada automação final permanece um userscript independente no repositório de produção indicado pelo mantenedor. Este repositório fornece o método e as ferramentas de apoio; não recebe cópias do código de produção.

## 7. Fluxo ponta a ponta

1. Registrar a necessidade e o resultado esperado.
2. Descrever processo, regras, exceções e risco.
3. Investigar a tela antes de escrever código.
4. Mapear campos/tipos, ações e sequência de inserção, dependências e navegação entre telas.
5. Marcar cada observação como confirmada, inferida ou desconhecida e associar evidências sanitizadas.
6. Usar o Inspector apenas dentro do escopo read-only da ADR-008; registrar manualmente ações, dependências e transições.
7. Quando necessário, capturar requisições manualmente e em separado, seguindo ADR-012; capturas de tela e campos com valores seguem as mesmas regras de mascaramento.
8. Revisar e validar o mapeamento e as evidências antes da especificação.
9. Completar e aprovar a especificação.
10. Gerar pacote local rastreável e enviar manualmente à IA escolhida.
11. Desenvolver o userscript específico no repositório de produção indicado pelo mantenedor.
12. Executar testes locais e revisar o diff.
13. Homologar no Systêxtil autorizado.
14. Abrir PR, registrar o auto-aceite do mantenedor e o resultado da homologação.
15. Integrar somente por ação explícita do mantenedor.

## 8. Fases e critérios de aceite

### Fase 0 — Fundação executável (P0)

Entregas: lockfile, Node 24+, Ajv estrito, node:test, schemas, fixtures e CLI.  
Aceite: npm ci, npm test, npm run check e npm run validate:examples passam; CLI cobre arquivo inválido, caminho inexistente e argumentos incorretos; erros não imprimem conteúdo sensível.  
Bloqueio: não iniciar features antes de validar em Node 24+.

### Fase 1 — Solicitação operacional (P0)

Entregas: schema da solicitação, fixture fictícia, validação de completude, relatório de lacunas e checklist de investigação.  
Aceite: solicitação incompleta informa o que falta; dificuldade de mapeamento é descrita; fatos e hipóteses ficam separados; risco é justificável; nenhum código é gerado.

### Fase 2 — Investigação de tela e Inspector (P0)

Entregas: guia de investigação; procedimento para mapear campos e tipos, ações de inserção, dependências e navegação; userscript de apoio read-only dentro da ADR-008; proposta ADR-013 avaliada separadamente.  
Aceite: o mapeamento registra tela de origem/destino, campos/tipos relevantes, sequência e gatilhos de inserção, dependências observadas, tecla/botão e transição; desconhecidos ficam explícitos; evidências e capturas seguem mascaramento; nenhum valor real entra no repositório. Qualquer alteração de escopo do Inspector exige decisão explícita sobre ADR-013 antes de codificar.

### Fase 3 — Especificador (P0)

Entregas: schema completo, referências de evidência, regras de risco, relatório de unknowns e exportação Markdown.  
Aceite: cada passo tem evidência ou unknown; campos, inserções, dependências e transições relevantes estão mapeados; critérios de sucesso são observáveis; L2/L3 exigem controles adicionais; especificação incompleta não recebe estado aprovado.

### Fase 4 — Gerador de contexto (P0)

Entregas: manifesto allowlist, resolvedor seguro, limite de tamanho, deduplicação, sanitização e geração Markdown/JSON.  
Aceite: arquivos existem e têm finalidade; versões/commits são registrados; traversal e arquivos privados são bloqueados; pacote é determinístico; nenhuma chamada de rede automática.

### Fase 5 — Interface (P2, condicionada)

Começar por CLI/arquivos. Avaliar UI estática, desktop ou servidor local somente após observar fricções reais e registrar ADR com custo, segurança e manutenção. Não escolher React/Electron antecipadamente.

### Fase 6 — Validação assistida (P1)

Entregas: checklists de revisão/homologação, execução do piloto L1 e métricas de esforço, lacunas e retrabalho.  
Aceite: linha de base registrada; mapeamento da tela concluído antes da codificação; fluxo ponta a ponta concluído; script desenvolvido no repositório de produção indicado, testado e homologado; resultado comparado à linha de base.

## 9. MVP e piloto

O MVP cobre fases 0–4 sem UI obrigatória.

**Piloto escolhido:** consulta em lote de títulos, somente leitura. O escopo de leitura abrange título, cliente, código de barras e linha digitável. O piloto deve validar o fluxo de investigação e mapeamento da tela antes do desenvolvimento. O acesso, o ambiente e a massa de dados precisam ser autorizados; valores operacionais reais não entram neste repositório, em fixtures, capturas ou pacotes de contexto.

Prorrogação e emissão de boleto ficam fora do piloto. Baixa, exclusão e qualquer outra operação de escrita também ficam fora.

## 10. Gestão de mudanças

Uma fase por PR quando possível; PR pequena e focada; schema change atualiza fixtures, testes e docs; quebra de compatibilidade exige nova versão e migração; o mantenedor registra o próprio aceite; sem merge automático; sem CI/CD nesta etapa.

## 11. Métricas e critério de sucesso

O resultado principal será a redução observável da dificuldade para entender a tela, mapear os campos e interações, implementar e validar a automação.

Métricas candidatas, a selecionar e medir no piloto:
- tempo e esforço do mantenedor para mapear telas antes da codificação;
- quantidade de campos, ações de inserção, dependências e transições que precisaram ser redescobertos durante a implementação;
- tentativas, interrupções e retrabalho causados por mapeamento incompleto;
- problemas desconhecidos encontrados antes de codificar, em vez de durante a homologação;
- defeitos ou correções após a primeira validação local e na homologação;
- capacidade de repetir o processo com resultado consistente.

A linha de base e metas quantitativas serão registradas durante a execução do piloto. Quantidade de documentação, quantidade de prompts ou tamanho do contexto não são métricas independentes de sucesso. Só contam quando contribuem para reduzir esforço ou retrabalho medido.

## 12. Riscos

| Risco | Mitigação |
|---|---|
| Mapeamento incompleto da tela | checklist obrigatório para campos, inserções, dependências e navegação antes da codificação |
| Dados sensíveis na evidência | mascaramento de valores e revisão antes de qualquer commit com evidência |
| Inspector ultrapassar read-only | manter ADR-008; ADR-013 permanece proposta até decisão explícita |
| IA inventar comportamento | evidência por passo e status de certeza |
| Schema inadequado | fixtures fictícias e versionamento |
| Virar executor universal | fronteiras arquiteturais explícitas |
| UI prematura | CLI-first e decisão por uso |
| Dependências desnecessárias | Node nativo e ADR |
| Erro em L3 | confirmação, sinal independente e parada segura |
| Exposição do repositório público | risco aberto, verificação de dados sensíveis antes de commits com evidências e nenhuma inclusão de dados reais |

## 13. Decisões pendentes

- Confirmar ambiente autorizado e massa controlada para homologar Inspector e piloto.
- Definir linha de base e metas quantitativas do piloto.
- Avaliar e decidir a proposta ADR-013 antes de qualquer alteração no escopo do Inspector.
- Definir licença antes de distribuição.

## 14. Referências atualizadas

Context7 consultado em 2026-11-11:
- Node.js 24 packages/test: https://nodejs.org/docs/latest-v24.x/api/packages.html e https://nodejs.org/docs/latest-v24.x/api/test.html
- Ajv 8.20.0 options/strict: https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/options.md e https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/strict-mode.md
- GitHub Copilot custom instructions: https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
- GitHub branch protection: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- GitHub issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
