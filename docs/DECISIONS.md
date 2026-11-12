# Registro de decisões arquiteturais

Decisões relevantes são registradas aqui para evitar redefinições sem contexto.

## ADR-001 — Studio local antes de serviço remoto
**Status:** aceita.  
**Decisão:** Node.js local, arquivos JSON/Markdown e GitHub.  
**Motivo:** reduzir infraestrutura, custo e exposição de dados.

## ADR-002 — Userscripts independentes
**Status:** aceita.  
**Decisão:** cada automação final é um userscript específico; Inspector separado.  
**Motivo:** reduzir acoplamento e limitar impacto de falhas.

## ADR-003 — IA como assistente
**Status:** aceita.  
**Decisão:** IA prepara especificação/código; revisão e homologação são humanas.  
**Motivo:** comportamento NXJ e efeitos operacionais exigem evidência.

## ADR-004 — Sem CI/CD nesta fase
**Status:** aceita.  
**Decisão:** não criar Actions ou pipelines; testes locais e registro no PR.  
**Motivo:** restrição operacional e preferência do mantenedor.

## ADR-005 — Ajv e Node Test Runner
**Status:** aceita para fundação.  
**Decisão:** Ajv 8.20.0, node:test e Draft-07 nos schemas atuais; strict e allErrors.  
**Motivo:** contratos explícitos e poucas dependências. Formatos adicionais somente quando necessários e testados.

## ADR-006 — Licença pendente
**Status:** pendente.  
**Decisão:** não adicionar licença até o mantenedor escolher termos de distribuição.

## ADR-007 — CLI-first
**Status:** aceita para o MVP.  
**Decisão:** validar fluxo via CLI/arquivos antes de escolher framework de UI.  
**Motivo:** evitar frontend prematuro.

## ADR-008 — Inspector read-only
**Status:** aceita para o MVP.  
**Alteração parcial:** ver ADR-019 (leitura de comprimento e comparação por HMAC de campos listados pelo operador).  
**Decisão:** coletar metadados allowlisted, sem valores de campos nem interceptação de rede.  
**Motivo:** reduzir exposição de dados e risco operacional.

## ADR-009 — Exportação manual do pacote IA
**Status:** aceita para o MVP.  
**Decisão:** gerar pacote local revisável, sem envio automático a serviços externos.  
**Motivo:** controle de privacidade, custo e provedor.

## ADR-010 — Ferramentas adiadas
**Status:** aceita.  
**Decisão:** não adicionar React, Electron, Playwright, SQLite, backend ou API de IA antes de existir necessidade demonstrada.  
**Motivo:** reduzir dependências e manutenção.

## ADR-011 — Pacotes de contexto com allowlist e proveniência
**Status:** aceita como requisito de projeto.  
**Decisão:** incluir somente arquivos autorizados, com finalidade, confiança, versão/commit, hash e tamanho.  
**Motivo:** reduzir vazamento, prompt injection por conteúdo externo e contexto excessivo.

## Risco aberto — visibilidade pública do repositório

**Status:** aberto.  
**Fato:** o repositório está público em 2026-11-11. A decisão atual do mantenedor é mantê-lo público até nova orientação explícita.  
**Risco:** documentação e metadados técnicos podem revelar detalhes internos mesmo sem conter dados de clientes. A verificação de dados sensíveis e o procedimento de captura segura estão descritos em [SECURITY_MODEL.md](SECURITY_MODEL.md).  
**Controle:** não incluir dados reais do ERP, capturas brutas ou conteúdo identificável. Não alterar a visibilidade nem reescrever o histórico sem autorização explícita do mantenedor.

## ADR-012 — Captura manual de requisições de rede, separada do Inspector

**Status:** aceita.  
**Decisão:** quando a investigação exigir observar uma requisição de rede, a captura será feita manualmente pelo mantenedor/investigador autorizado nas ferramentas de desenvolvimento do navegador, fora do Inspector. A captura nunca será automática e não será incorporada ao Inspector. Valores sensíveis devem ser mascarados antes de qualquer registro; nenhum dado real, arquivo bruto ou payload identificável pode entrar no repositório, em uma PR ou em pacote de contexto.  
**Motivo:** permitir análise técnica pontual sem transformar o Inspector em coletor de tráfego nem ampliar a coleta automática de dados sensíveis.  
**Procedimento:** seguir a seção "Captura manual de rede" de [SECURITY_MODEL.md](SECURITY_MODEL.md). Em caso de dúvida sobre a eficácia da máscara, descartar a captura e registrar a lacuna sem anexar o material original.

## ADR-013 — Proposta de ampliação da allowlist do Inspector para mapeamento de campos editáveis

**Status:** proposta (não aceita).  
**Contexto:** a dificuldade central inclui entender campos de inserção, seus tipos e metadados, dependências e efeitos antes da codificação. O guia de investigação atual permite documentar manualmente essas informações, mas pode ser útil avaliar se parte do inventário pode ser obtida como metadado read-only.  
**Proposta:** avaliar uma ampliação controlada da allowlist para identificar metadados de controles editáveis relevantes ao mapeamento (por exemplo, rótulo, tipo, editabilidade, obrigatoriedade e atributos declarativos). A proposta não inclui leitura de valores digitados, captura de conteúdo pessoal/financeiro, preenchimento, seleção, acionamento de teclas/botões, navegação automatizada ou interceptação de rede. Dependências e transições continuam sendo observações manuais, a menos que uma decisão futura aprove expressamente outra abordagem.  
**Restrições:** não implementar nem alterar o Inspector por causa desta proposta. Antes de qualquer implementação, o mantenedor deve avaliar necessidade, minimização, risco de exposição em repositório público, mascaramento, testes e compatibilidade com a ADR-008. Uma eventual aceitação deve delimitar precisamente metadados permitidos e atualizar a decisão de forma explícita.  
**Motivo:** estudar se o inventário de metadados pode reduzir o esforço de mapear campos sem comprometer a natureza read-only do Inspector.


## ADR-014 — Escopo reduzido ao método de mapeamento de telas

**Status:** aceita.  
**Decisão:** produzir e revisar primeiro um único mapa funcional da consulta de títulos em `docs/telas/` como teste do método. E0 e E1 não precedem esse mapa; CLI, schemas e validadores só serão retomados se o mapa revelar fricção concreta que essa infraestrutura resolva e houver decisão explícita do mantenedor.  
**Motivo:** a dificuldade central é entender a tela do Systêxtil antes de escrever código, e a infraestrutura técnica ainda não tem consumidor real.


## ADR-015 — Mapeamento de sequência de comandos/eventos NXJ e confirmação por ação

**Status:** aceita.  
**Alteração parcial:** ver ADR-019 (leitura de comprimento e comparação por HMAC de campos listados pelo operador).  
**Decisão:** cada mapa de tela deve registrar, por ação e em ordem temporal, a sequência observável de eventos de interface, comandos/eventos NXJ, respostas, mudanças de estado e sinais independentes de confirmação. Quando necessário, a observação de rede será manual nas ferramentas do navegador, fora do Inspector, conforme ADR-012; somente metadados mínimos e sanitizados poderão ser documentados.  
**Motivo:** o comportamento necessário à automação não se limita aos campos e teclas visíveis; depende também da ordem dos eventos/comandos e de como o ERP confirma cada etapa.  
**Limites:** não introduzir interceptação automática, não ampliar o Inspector, não registrar payloads, credenciais, valores reais ou artefatos brutos. Comando enviado ou resposta genérica não equivalem a sucesso.

## ADR-016 — Piloto de consulta read-only em ambiente de produção

**Status:** aceita com condições.  
**Decisão:** como não há ambiente de teste/homologação disponível, o piloto de consulta em lote de títulos poderá ser executado somente em produção, estritamente read-only, um título por vez e com pausa entre consultas. O intervalo operacional, a autorização aplicável, o escopo e o responsável pela autorização devem ser registrados na PR antes da execução.  
**Motivo:** viabilizar a validação do método e da consulta sem introduzir operações de escrita no ERP.  
**Controles:** interromper no primeiro timeout, resposta ambígua, divergência, perda de sincronismo ou estado incerto; não repetir automaticamente; exigir conferência manual antes de retomar. Nenhum dado real será incluído no repositório, em logs versionados ou evidências compartilhadas.

## ADR-017 — Prorrogação como segunda automação, após o piloto

**Status:** aceita como direção futura; autorização para títulos vencidos pendente.  
**Decisão:** prorrogação será tratada como segunda automação, somente após conclusão e avaliação do piloto. O desenho deverá prever modo de simulação sem persistência, lista de títulos aprovada pelo mantenedor antes da execução e log local mínimo por título efetivamente alterado.  
**Motivo:** separar o piloto read-only de uma operação de escrita e exigir revisão explícita do conjunto de registros antes de qualquer alteração.  
**Ponto em aberto obrigatório:** quem tem autoridade para autorizar a prorrogação de títulos vencidos e como essa autorização será comprovada/registrada ainda não foi definido. Não implementar nem executar prorrogação de título vencido até essa regra ser esclarecida e registrada. A regra operacional vigente de que títulos vencidos não são prorrogados no fluxo de cobrança deve ser respeitada.

# ADR-019 — Conferência de valores digitados por comprimento e HMAC, sem registro de valores

**Status:** aceita pelo mantenedor (2026-11-12).
**Relação com outras ADRs:** altera parcialmente a ADR-008 e a ADR-015, somente para a leitura de comprimento e a comparação por HMAC de campos listados pelo operador durante a gravação. Mantém a proibição de registrar valores em texto claro. Não altera a ADR-012 (captura de rede manual) nem a ADR-016 (piloto em produção).

## Contexto

Uma gravação de pesquisa (consulta de títulos, F7) mostrou que o comando chegou ao Systêxtil e foi respondido (HTTP 200, marcador `nxjOnLoad`), mas não foi possível confirmar que o número do título e a parcela foram reconhecidos e usados no filtro. A causa é que, pela ADR-008 e pela ADR-015, o registro não guarda valores. A linha `texto(1-10)` informa apenas a classe de tamanho do conteúdo.

Sem alguma forma de conferência, a automação não pode afirmar que a pesquisa executada corresponde ao título solicitado.

## Decisão

Durante a gravação, o Mapeador pode conferir campos de entrada, e só estes:

1. **Campos listados.** Antes de gravar, o operador informa no painel o identificador (`id` ou `name`) de até dois campos. Só esses campos são lidos.
2. **Comprimento.** Ao pressionar F7 ou Enter no campo listado, e ao alterá-lo, o script registra o número de caracteres do valor. O conteúdo não é guardado.
3. **Comparação por HMAC-SHA-256 (opcional).** Se o operador informar também o valor esperado, o script calcula o HMAC desse valor com uma chave local, guarda só o digest, apaga o valor digitado do painel e registra apenas se o valor atual do campo é igual ao esperado (`igual: true|false`).

Os campos lidos são somente dos tipos texto, busca, telefone, número, data e e-mail. Campos ocultos (`hidden`), seleções, senhas, caixas de seleção, botões e arquivos nunca são lidos.

Regras:

- A chave é gerada no primeiro uso, guardada no `localStorage` do próprio navegador e nunca enviada a lugar algum. Ela fica acessível a qualquer script que rode na mesma origem, inclusive o do próprio Systêxtil. Esse risco é aceito: se a origem for comprometida, os digests podem ser testados contra valores candidatos.
- O repositório e o JSON exportado não contêm chave, digest, nem valor digitado. O JSON só contém comprimentos, booleanos de igualdade e marcadores.
- A conferência manual do operador é registrada por dois botões (`OK` e `divergente`), sem texto livre.
- O resultado da pesquisa é aferido pela contagem de linhas da grade em faixas (`0`, `1`, `2-10`, `11-50`, `>50`), e só é registrado quando a contagem muda.

## Consequências

- A gravação passa a provar, com um mecanismo verificável, que o campo conferido tinha o valor esperado no momento do F7, sem expor o valor.
- O JSON continua sem dados de cliente, mas agora inclui comprimentos dos campos listados pelo operador. Esses comprimentos são dados estruturais, e o operador deve revisá-los antes de versionar.
- O HMAC é reversível apenas por quem tiver a chave local. Um arquivo copiado para outro navegador não pode ser conferido contra os digests, porque a chave muda.
- Se o `localStorage` estiver bloqueado, a chave existe só na memória da aba. Nesse caso, a conferência funciona na própria gravação, mas não entre sessões.
- Em quadros diferentes (iframes), a chave é compartilhada pela origem. Quadros de origens diferentes não participam da conferência.

## Limites e não-objetivos

- Esta ADR não autoriza leitura de valores de campos fora da lista informada pelo operador.
- O campo do marcador de passo (texto livre) não deve receber valores de clientes, títulos ou parcelas. Use-o só para nomes de etapa.
- Esta ADR não autoriza envio de nenhum dado a serviços externos.
- A conferência verifica que o valor está no campo e que a pesquisa foi disparada. Ela não prova que o Systêxtil interpretou o valor como filtro. Essa prova continua exigindo a conferência humana do resultado na tela, registrada pelos botões de conferência manual.
- Qualquer mudança para registro de valores em texto claro exige nova ADR, revisão de privacidade e aprovação expressa do mantenedor.

## Alternativas consideradas

- **Registrar o valor mascarado** (por exemplo, só os últimos dígitos): rejeitado, porque ainda expõe parte do dado e não prova a igualdade completa.
- **Hash sem chave (SHA-256 puro ou hash de 53 bits):** rejeitado. CPF, número de título e parcela têm espaço de busca pequeno, e um hash sem chave pode ser revertido por força bruta.
- **`crypto.subtle`:** rejeitado como única opção, porque o ERP roda em `http://`, que não é contexto seguro, e a API não estaria disponível.

## Verificação

- SHA-256 e HMAC-SHA-256 implementados em JavaScript puro e comparados com a implementação do Node em 60 casos (mensagens de 0 a 199 bytes, chaves de 1 a 150 bytes).
- Não há teste automatizado da captura no DOM real. Deve ser feita uma gravação de controle no Systêxtil (ver procedimento abaixo).

## Procedimento de gravação de controle (obrigatório antes de usar em produção)

1. Gravar a pesquisa com os campos **vazios** e F7. Registrar a sequência de alterações de `readonly`.
2. Gravar a pesquisa com o título e a parcela corretos, informando-os como valores esperados. Conferir se os eventos `campo` aparecem com `igual: true`.
3. Gravar a pesquisa com um valor esperado errado de propósito. Conferir se aparece `igual: false`.
4. Só depois disso usar a conferência como evidência de uma ação.
