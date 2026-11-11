# Plano mestre de implementação

**Status:** escopo e planejamento registrados; implementação incremental pendente.  
**Produto:** Systextil Script Builder.  
**Referência:** 2026-11-11.

## 1. Visão

Construir um conjunto local de método, modelos, checklists e ferramentas de apoio para reduzir a dificuldade de criar automações no Systêxtil.

Este repositório não armazena código de automações de produção. Userscripts de produção permanecem no repositório Systextil-envio-mensagem ou em outro repositório indicado pelo mantenedor. O Inspector é uma ferramenta de apoio separada e read-only.

O produto não é um executor universal de comandos NXJ. A IA não substitui a decisão, a revisão ou a homologação do mantenedor.

## 2. Problema central, objetivos e critério de sucesso

**Problema central:** existe dificuldade para criar automações no Systêxtil.

A etapa exata em que a dificuldade aparece, suas causas, frequência e impacto ainda não foram determinados. Essa definição está **pendente de investigação**. Não assumir que a causa seja falta de documentação, ausência de prompts, desconhecimento das telas, limitação técnica ou qualquer outro fator sem evidência.

O objetivo principal é reduzir essa dificuldade real. Para isso, o projeto deve primeiro permitir que o mantenedor observe e descreva o processo de criação de uma automação sem antecipar a causa do problema.

Objetivos de apoio:
- Identificar em que etapas o trabalho exige esforço, espera, repetição ou retrabalho.
- Evitar invenção de campos, seletores, comandos e regras.
- Separar fatos confirmados, inferências e desconhecidos.
- Tornar explícitos os inputs, outputs, pré-condições, riscos, falhas e critérios de sucesso.
- Apoiar desenvolvimento, teste e homologação com evidências rastreáveis.
- Preservar automações existentes e minimizar risco operacional.

**Critério de sucesso do produto:** demonstrar, em um piloto escolhido pelo mantenedor, redução observável do esforço necessário para criar e validar uma automação, comparada a uma linha de base do processo atual. A forma de medir e a meta numérica serão definidas depois de conhecer a dificuldade e aprovar o piloto. Mais documentação, mais páginas ou prompts maiores, isoladamente, não demonstram sucesso.

## 3. Fora do escopo do MVP

- Executor genérico de ações NXJ ou agente autônomo no ERP.
- Escrita, emissão, baixa, prorrogação ou exclusão no piloto inicial.
- Captura automática de valores, tráfego de rede ou payloads.
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

Identifica view/forms e metadados de controles, registra observações com nível de certeza e exporta JSON sanitizado após ação explícita. É read-only e não lê valores de campos nem intercepta requisições de rede. A captura manual de rede, se necessária, é feita separadamente pelo investigador, seguindo a ADR-012 e o procedimento de segurança.

### Núcleo local (Node.js)

CLI e módulos coesos para validar schemas, gerenciar solicitações, verificar referências, selecionar contexto, sanitizar e gerar Markdown/JSON determinísticos. Sem servidor ou rede no MVP.

### Especificador

Converte solicitação e evidências em objetivo, escopo, regras, inputs/outputs, pré-condições, passos, risco, critérios de sucesso, timeouts, recuperação e unknowns.

### Gerador de pacote

Monta instruções, especificação aprovada, evidências sanitizadas, documentos técnicos, manifesto de fontes e checklist. Não envia pacote automaticamente para serviços externos.

### Código de produção

Cada automação final permanece um userscript independente no repositório de produção indicado pelo mantenedor. Este repositório fornece o método e as ferramentas de apoio; não recebe cópias do código de produção.

## 7. Fluxo ponta a ponta

1. Registrar a necessidade e a dificuldade percebida, sem presumir sua causa.
2. Descrever o processo atual, regras, exceções e resultado esperado.
3. Registrar inputs, outputs e critérios de aceite.
4. Classificar risco preliminar.
5. Gerar checklist de investigação.
6. Investigar manualmente a tela autorizada com Inspector read-only.
7. Quando necessário, capturar requisições manualmente e em separado, com valores mascarados.
8. Revisar e validar evidências sanitizadas.
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
Aceite: solicitação incompleta informa o que falta; fatos e hipóteses ficam separados; risco é justificável; nenhum código é gerado.

### Fase 2 — Inspector (P0)

Entregas: userscript de apoio independente, allowlist DOM, catálogo de views/forms/controles, observações, sanitização, revisão e exportação JSON.  
Aceite: @match/@grant mínimos; idempotência; nenhum valor de campo ou tráfego exportado; ação explícita para exportar; schema válido; testes DOM e homologação Chrome/Tampermonkey autorizada.

### Fase 3 — Especificador (P0)

Entregas: schema completo, referências de evidência, regras de risco, relatório de unknowns e exportação Markdown.  
Aceite: cada passo tem evidência ou unknown; critérios de sucesso são observáveis; L2/L3 exigem controles adicionais; especificação incompleta não recebe estado aprovado.

### Fase 4 — Gerador de contexto (P0)

Entregas: manifesto allowlist, resolvedor seguro, limite de tamanho, deduplicação, sanitização e geração Markdown/JSON.  
Aceite: arquivos existem e têm finalidade; versões/commits são registrados; traversal e arquivos privados são bloqueados; pacote é determinístico; nenhuma chamada de rede automática.

### Fase 5 — Interface (P2, condicionada)

Começar por CLI/arquivos. Avaliar UI estática, desktop ou servidor local somente após observar fricções reais e registrar ADR com custo, segurança e manutenção. Não escolher React/Electron antecipadamente.

### Fase 6 — Validação assistida (P1)

Entregas: checklists de revisão/homologação, piloto L0/L1 aprovado pelo mantenedor e métricas de esforço, lacunas e retrabalho.  
Aceite: dificuldade inicial descrita; linha de base registrada; fluxo ponta a ponta concluído; script desenvolvido no repositório de produção indicado, testado e homologado; resultado comparado à linha de base.

## 9. MVP e piloto

O MVP cobre fases 0–4 sem UI obrigatória. **Não há piloto escolhido; a escolha está pendente de decisão do mantenedor.**

Candidato registrado, ainda sem aprovação: consulta em lote de títulos, somente leitura, limitada à consulta de título, cliente, código de barras e linha digitável. Como o candidato envolve dados operacionais, a amostra e o ambiente precisam ser autorizados e os dados devem ser protegidos; dados reais não entram neste repositório.

Prorrogação e emissão de boleto ficam fora do piloto. Baixa, exclusão e qualquer outra operação de escrita também ficam fora.

## 10. Gestão de mudanças

Uma fase por PR quando possível; PR pequena e focada; schema change atualiza fixtures, testes e docs; quebra de compatibilidade exige nova versão e migração; o mantenedor registra o próprio aceite; sem merge automático; sem CI/CD nesta etapa.

## 11. Métricas e critério de sucesso

O resultado principal será a redução observável da dificuldade para criar e validar automações no Systêxtil, comparando o processo apoiado pelo projeto com uma linha de base definida para o piloto.

Métricas candidatas, a selecionar conforme a dificuldade identificada:
- Tempo e esforço do mantenedor entre a solicitação compreendida e uma automação validada.
- Quantidade de etapas manuais, tentativas ou interrupções necessárias.
- Retrabalho durante investigação, desenvolvimento, revisão e homologação.
- Problemas desconhecidos encontrados antes de codificar, em vez de durante a homologação.
- Defeitos ou correções após a primeira validação local e na homologação.
- Capacidade de repetir o processo com resultado consistente.

A linha de base, as métricas finais e as metas quantitativas permanecem pendentes até a escolha e aprovação do piloto. Quantidade de documentação, quantidade de prompts ou tamanho do contexto não são métricas independentes de sucesso. Só contam quando contribuem para reduzir esforço ou retrabalho medido.

## 12. Riscos

| Risco | Mitigação |
|---|---|
| Dificuldade central mal compreendida | observar o processo antes de definir causa ou solução |
| Dados sensíveis na evidência | allowlist, captura manual controlada, sanitização e revisão |
| IA inventar comportamento | evidência por passo e status de certeza |
| Schema inadequado | fixtures fictícias e versionamento |
| Virar executor universal | fronteiras arquiteturais explícitas |
| UI prematura | CLI-first e decisão por uso |
| Dependências desnecessárias | Node nativo e ADR |
| Erro em L3 | confirmação, sinal independente e parada segura |
| Exposição do repositório público | verificação recorrente de dados sensíveis e nenhuma inclusão de dados reais |

## 13. Decisões pendentes

- Definir precisamente em que consiste a dificuldade para criar automações e quais impactos devem ser medidos.
- Escolher e aprovar o piloto L0/L1.
- Confirmar ambiente autorizado para homologar Inspector e piloto.
- Confirmar telas permitidas e validar metadados com evidências sanitizadas.
- Definir licença antes de distribuição.

## 14. Referências atualizadas

Context7 consultado em 2026-11-11:
- Node.js 24 packages/test: https://nodejs.org/docs/latest-v24.x/api/packages.html e https://nodejs.org/docs/latest-v24.x/api/test.html
- Ajv 8.20.0 options/strict: https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/options.md e https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/strict-mode.md
- GitHub Copilot custom instructions: https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
- GitHub branch protection: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- GitHub issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
