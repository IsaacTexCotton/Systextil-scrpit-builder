# Plano mestre de implementação

**Status:** plano organizacional sujeito à execução incremental.  
**Produto:** Systextil Script Builder.  
**Referência:** 2026-11-11.

## 1. Visão

Construir um conjunto local de método, modelos, checklists e ferramentas de apoio para reduzir a dificuldade de criar automações no Systêxtil.

A principal necessidade é entender a tela antes de escrever código: campos e tipos, ações de inserção, dependências e transições entre telas. O objetivo é apoiar o mantenedor a mapear esse comportamento e registrar o que foi observado ou ainda precisa ser confirmado.

Os limites do produto, o piloto escolhido e as atividades fora do escopo têm uma única fonte em [DECISIONS.md](DECISIONS.md). Este plano descreve como organizar o trabalho, sem redefinir esses limites.

## 2. Objetivos

- Documentar campos, inserções e navegação entre telas antes de automatizar.
- Apoiar o mantenedor a compreender telas e fluxos antes de escrever código.
- Reduzir redescoberta, tentativas e retrabalho na implementação.
- Evitar invenção de campos, seletores, comandos e regras.
- Produzir especificações verificáveis com entradas, pré-condições, passos e critérios de sucesso.
- Gerar pacotes de contexto rastreáveis para assistência de IA.
- Padronizar testes locais, auto-revisão e homologação pelo mantenedor.

Os critérios de evidência, os significados de status/origem e os níveis de risco são definidos em [SECURITY_MODEL.md](SECURITY_MODEL.md). A ordem das entregas é definida em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## 3. Limites do produto

Consultar a seção **Escopo vigente — fonte canônica** e as ADRs em [DECISIONS.md](DECISIONS.md). Não duplicar neste plano a lista de inclusões e exclusões.

## 4. Responsabilidade e aprovação

O mantenedor é a única pessoa responsável e acumula os papéis do projeto. A governança, o registro de auto-revisão e o aceite das PRs estão definidos em [GITHUB_GOVERNANCE.md](GITHUB_GOVERNANCE.md). Não pressupor a existência de revisor separado.

## 5. Princípios de implementação

Local-first; human-in-the-loop; evidence-first; least privilege; fail-safe; pequenas mudanças; reprodutibilidade; privacidade por padrão; dados declarativos nunca executáveis; separação entre apoio metodológico e código de produção.

Para a definição operacional de evidência, certeza e risco, usar [SECURITY_MODEL.md](SECURITY_MODEL.md).

## 6. Arquitetura alvo

### Inspector

Ferramenta de apoio read-only, dentro do escopo da ADR-008. Não ler valores de campos, interceptar rede, preencher filtros ou gravar dados. Qualquer revisão da allowlist deve ser decidida em ADR própria antes de implementação.

### Núcleo local

CLI e módulos para validar contratos, gerenciar solicitações, selecionar contexto, sanitizar e gerar Markdown/JSON determinísticos. Sem serviço remoto no MVP.

### Especificador

Converte solicitação e evidências revisadas em objetivo, regras, inputs/outputs, pré-condições, passos, riscos, critérios de sucesso, timeouts, recuperação e pontos desconhecidos.

### Gerador de pacote

Monta instruções, especificação, evidências permitidas, documentos técnicos, manifesto de fontes e checklist. Não envia pacotes automaticamente a serviços externos.

### Código operacional

Desenvolvido e mantido no repositório de automações indicado pelo mantenedor, conforme ADR-012 em [DECISIONS.md](DECISIONS.md).

## 7. Fluxo de trabalho

O fluxo de investigação deve anteceder a especificação e a codificação. Cada etapa precisa das evidências e critérios aplicáveis definidos em [SECURITY_MODEL.md](SECURITY_MODEL.md).

A sequência de fases, prioridades e dependências é mantida somente em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## 8. Critérios gerais de conclusão

- A necessidade e o resultado esperado estão descritos.
- As telas e interações relevantes foram investigadas antes de escrever código.
- As evidências foram revisadas e classificadas segundo [SECURITY_MODEL.md](SECURITY_MODEL.md).
- As regras de negócio e os pontos desconhecidos estão explícitos.
- A especificação possui pré-condições, passos, critérios observáveis de sucesso, falhas e recuperação.
- O pacote de contexto inclui somente fontes permitidas e rastreáveis.
- Os testes locais aplicáveis foram executados e reportados honestamente.
- A auto-revisão, o aceite e a homologação aplicável foram registrados conforme a governança do projeto.

## 9. Métricas de sucesso

Avaliar o resultado pela redução observável do esforço de investigação e implementação, pela quantidade de lacunas descobertas antes da codificação, pelo retrabalho evitado e pelos defeitos encontrados na homologação. Metas quantitativas devem ser definidas no contexto do piloto aprovado.

Aumentar a quantidade de documentação ou o tamanho dos prompts, isoladamente, não demonstra sucesso.

## 10. Riscos e referências

Os níveis de risco, controles por nível, regras de evidência e procedimento de verificação de dados sensíveis são definidos em [SECURITY_MODEL.md](SECURITY_MODEL.md). O escopo é definido em [DECISIONS.md](DECISIONS.md). A ordem de execução é definida em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).
