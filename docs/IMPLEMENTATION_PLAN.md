# Plano mestre de implementação

**Status:** plano proposto para execução incremental.  
**Produto:** Systextil Script Builder.  
**Referência:** 2026-11-11.

## 1. Visão

Construir uma ferramenta local de engenharia que transforme uma necessidade operacional em um pacote técnico verificável para desenvolvimento assistido de um userscript específico do Systextil NXJ.

O Studio não é executor universal de comandos NXJ. O Inspector é read-only. A IA não aprova regras de negócio nem homologação. Cada automação final permanece um userscript independente.

## 2. Objetivos

- Reduzir redescoberta de telas e comportamento NXJ.
- Evitar invenção de campos, seletores, comandos e regras.
- Separar fatos confirmados, inferências e desconhecidos.
- Produzir especificações com entradas, pré-condições, passos, risco, falhas e sucesso.
- Gerar pacotes de contexto pequenos, rastreáveis e sanitizados.
- Padronizar revisão, testes e homologação.
- Preservar automações existentes e minimizar risco operacional.

## 3. Fora do escopo do MVP

- Executor genérico de ações NXJ ou agente autônomo no ERP.
- Escrita, emissão, baixa, prorrogação ou exclusão sem confirmação humana.
- Captura indiscriminada de valores, tráfego de rede ou payloads.
- Backend, banco remoto, autenticação própria ou sincronização em nuvem.
- Integração paga de IA/API e upload automático.
- Geração/publicação automática em produção.
- GitHub Actions, CI/CD ou deploy automático.

## 4. Papéis

Solicitante descreve problema e processo; especialista confirma regras; investigador opera a tela autorizada e revisa evidências; desenvolvedor/IA implementa; revisor técnico verifica código e segurança; responsável operacional homologa. Uma pessoa pode acumular papéis, mas a aprovação operacional deve ser explícita.

## 5. Princípios

Local-first; human-in-the-loop; evidence-first; least privilege; fail-safe; pequenas mudanças; reprodutibilidade; privacidade por padrão; dados declarativos nunca executáveis; compatibilidade com userscripts independentes.

## 6. Arquitetura alvo

### Inspector (Tampermonkey)
Identifica view/forms e metadados de controles, registra observações com nível de certeza e exporta JSON sanitizado após ação explícita. Não lê valores de campos, intercepta XHR/fetch, aciona F7/Find, preenche filtros, navega registros ou grava dados.

### Núcleo local (Node.js)
CLI e módulos coesos para validar schemas, gerenciar solicitações, verificar referências, selecionar contexto, sanitizar e gerar Markdown/JSON determinísticos. Sem servidor ou rede no MVP.

### Especificador
Converte solicitação e evidências em objetivo, escopo, regras, inputs/outputs, pré-condições, passos, risco, critérios de sucesso, timeouts, recuperação e unknowns.

### Gerador de pacote
Monta instruções, especificação aprovada, evidências sanitizadas, documentos técnicos, manifesto de fontes e checklist. Não envia pacote automaticamente para serviços externos.

### Userscripts finais
Arquivos independentes, específicos, com permissões mínimas, evidências, testes e homologação próprios.

## 7. Fluxo ponta a ponta

1. Criar projeto.
2. Descrever objetivo, processo atual, regras e exceções.
3. Registrar inputs, outputs e critérios de aceite.
4. Classificar risco preliminar.
5. Gerar checklist de investigação.
6. Investigar tela manualmente com Inspector.
7. Revisar e validar evidências sanitizadas.
8. Completar e aprovar especificação.
9. Gerar pacote local rastreável.
10. Enviar manualmente à IA escolhida.
11. Desenvolver userscript em branch.
12. Executar testes e revisar diff.
13. Homologar em ambiente autorizado.
14. Abrir PR e obter aprovação.
15. Registrar versão homologada.

## 8. Fases e critérios de aceite

### Fase 0 — Fundação executável (P0)
Entregas: lockfile, Node 24+, Ajv estrito, node:test, schemas, fixtures e CLI.
Aceite: npm ci, npm test, npm run check e npm run validate:examples passam; CLI cobre arquivo inválido, caminho inexistente e argumentos incorretos; erros não imprimem conteúdo sensível.
Bloqueio: não iniciar features antes de validar em Node 24+.

### Fase 1 — Solicitação operacional (P0)
Entregas: schema da solicitação, fixture fictícia, validação de completude, relatório de lacunas e checklist de investigação.
Aceite: solicitação incompleta informa o que falta; fatos e hipóteses ficam separados; risco é justificável; nenhum código é gerado.

### Fase 2 — Inspector (P0)
Entregas: userscript independente, allowlist DOM, catálogo de views/forms/controles, observações, sanitização, revisão e exportação JSON.
Aceite: @match/@grant mínimos; idempotência; nenhum valor de campo ou tráfego exportado; ação explícita para exportar; schema válido; testes DOM e homologação Chrome/Tampermonkey.

### Fase 3 — Especificador (P0)
Entregas: schema completo, referências de evidência, regras de risco, relatório de unknowns e exportação Markdown.
Aceite: cada passo tem evidência ou unknown; critérios de sucesso são observáveis; L2/L3 exigem controles adicionais; especificação incompleta não recebe estado aprovado.

### Fase 4 — Gerador de contexto (P0)
Entregas: manifesto allowlist, resolvedor seguro, limite de tamanho, deduplicação, sanitização e geração Markdown/JSON.
Aceite: arquivos existem e têm finalidade; versões/commits são registrados; traversal e arquivos privados são bloqueados; pacote é determinístico; nenhuma chamada de rede automática.

### Fase 5 — Interface (P2, condicionada)
Começar por CLI/arquivos. Avaliar UI estática, desktop ou servidor local somente após observar fricções reais e registrar ADR com custo, segurança e manutenção. Não escolher React/Electron antecipadamente.

### Fase 6 — Validação assistida (P1)
Entregas: checklists de revisão/homologação, piloto L0/L1 e métricas de tempo/lacunas/retrabalho.
Aceite: fluxo ponta a ponta concluído; pacote suficiente e rastreável; script testado e homologado; benefício medido.

## 9. MVP e piloto

MVP cobre fases 0–4 sem UI obrigatória. Piloto inicial deve ser L0/L1, sem gravação. Não começar por emissão de boleto, baixa, prorrogação ou exclusão.

## 10. Gestão de mudanças

Uma fase por PR quando possível; PR pequena e focada; schema change atualiza fixtures, testes e docs; quebra de compatibilidade exige nova versão e migração; sem merge automático; sem CI/CD nesta etapa.

## 11. Métricas de sucesso

Tempo até especificação aprovada; lacunas encontradas antes da codificação; invenções NXJ corrigidas; retrabalho; defeitos na homologação; etapas com evidência; tempo de homologação; reprodutibilidade em outro computador.

Gerar prompts maiores não é critério de sucesso: o Studio precisa reduzir redescoberta, ambiguidade e retrabalho.

## 12. Riscos

| Risco | Mitigação |
|---|---|
| Dados sensíveis na evidência | allowlist, sanitização e revisão humana |
| IA inventar comportamento | evidência por passo e status de certeza |
| Schema inadequado | fixtures reais sanitizadas e versionamento |
| Virar executor universal | fronteiras arquiteturais explícitas |
| UI prematura | CLI-first e decisão por uso |
| Dependências desnecessárias | Node nativo e ADR |
| Erro em L3 | confirmação, sinal independente e parada segura |
| Contexto excessivo | allowlist, limites e manifesto |

## 13. Decisões pendentes

Confirmar ambiente autorizado para homologar Inspector; telas permitidas; validar metadados com tela sanitizada; escolher piloto L0/L1; definir licença antes de distribuição.

## 14. Referências atualizadas

Context7 consultado em 2026-11-11:
- Node.js 24 packages/test: https://nodejs.org/docs/latest-v24.x/api/packages.html e https://nodejs.org/docs/latest-v24.x/api/test.html
- Ajv 8.20.0 options/strict: https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/options.md e https://github.com/ajv-validator/ajv/blob/v8.20.0/docs/strict-mode.md
- GitHub Copilot custom instructions: https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
- GitHub branch protection: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- GitHub issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
