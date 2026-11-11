# Mapa de tela — [IDENTIFICADOR_SANITIZADO]

> Copie este arquivo para `docs/telas/[nome-funcional-sanitizado].md`. Preencha com informações descritas ou coladas pelo mantenedor, sempre já mascaradas. A IA pode organizar o relato, mas não deve inventar comportamento nem alterar status sem evidência.

## Identificação

- **Nome da tela:** [NOME_OU_IDENTIFICADOR_SANITIZADO]
- **Como chegar nela:** [MENU, ATALHO OU TELA ANTERIOR]
- **Data da observação:** [AAAA-MM-DD]
- **Responsável pela captura/observação:** [RESPONSAVEL]

## Campos

Registre cada campo ou controle de entrada separadamente. Em **Tipo**, identifique a função no fluxo (consulta, inserção ou seleção/lista) e o tipo de controle observado (texto, número, data/hora, autocomplete, lista suspensa, checkbox, radio, botão, célula/coluna de grade, somente leitura, desabilitado, diálogo etc.). A lista é exemplificativa: todo tipo que aparecer deve receber uma linha própria, mesmo que não esteja nomeado aqui. Não registre o valor real; use o marcador da categoria (por exemplo, [CLIENTE], [TITULO], [CODIGO_BARRAS] ou [DADO_SENSIVEL]).

| Campo | Tipo | Obrigatório | Valor de exemplo mascarado | Dependências | Status | Origem |
|---|---|---|---|---|---|---|
| [CAMPO_SANITIZADO] | [consulta/inserção/seleção-lista + tipo do controle] | [sim/não/condicional/desconhecido] | [DADO_SENSIVEL] | [campo/ação que influencia ou desconhecido] | desconhecido | dedução |

### Cobertura de campos e controles

Verifique quais categorias existem nesta tela. Registre cada ocorrência na tabela Campos e mantenha como desconhecida a categoria ainda não verificada.

| Categoria a verificar | Referência do campo/controle | Observação | Status | Origem |
|---|---|---|---|---|
| Campo de consulta/pesquisa | [CAMPO_SANITIZADO] | [tipo e comportamento] | desconhecido | dedução |
| Campo de inserção/digitação | [CAMPO_SANITIZADO] | [tipo e comportamento] | desconhecido | dedução |
| Campo de seleção/lista | [CAMPO_SANITIZADO] | [lista, combo, autocomplete ou outro] | desconhecido | dedução |
| Controle de texto/número/data/hora | [CONTROLE_SANITIZADO] | [tipo técnico observado] | desconhecido | dedução |
| Autocomplete/lista suspensa | [CONTROLE_SANITIZADO] | [origem das opções e seleção] | desconhecido | dedução |
| Checkbox/radio/outro controle | [CONTROLE_SANITIZADO] | [opção e efeito] | desconhecido | dedução |
| Controle somente leitura/desabilitado | [CONTROLE_SANITIZADO] | [estado e condição] | desconhecido | dedução |
| Campo/coluna de grade ou lista | [COLUNA_SANITIZADA] | [edição, foco e navegação] | desconhecido | dedução |
| Botão/ação visível | [BOTAO_SANITIZADO] | [ação a confirmar] | desconhecido | dedução |
| Atalho de teclado | [TECLA] | [função a confirmar] | desconhecido | dedução |
| Mensagem de erro/confirmação | [PADRAO_DA_MENSAGEM] | [condição em que aparece] | desconhecido | dedução |

## Ações e atalhos

Registre botões, comandos e atalhos separadamente. Não presuma a função de uma tecla pelo costume de outros sistemas: confirme na tela e registre a pré-condição (foco, campo ativo, seleção ou estado).

| Tecla ou botão | Ação | Pré-condição | Resultado esperado | Próxima tela | Status | Origem |
|---|---|---|---|---|---|---|
| F2 | [ação observada ou "a confirmar"] | [foco/estado necessário] | [resultado observável] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |
| F7 | [ação observada ou "a confirmar"] | [foco/estado necessário] | [resultado observável] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |
| F9 | [ação observada ou "a confirmar"] | [foco/estado necessário] | [resultado observável] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |
| Enter | [ação observada ou "a confirmar"] | [foco/estado necessário] | [resultado observável] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |
| Tab | [ação observada ou "a confirmar"] | [controle com foco] | [próximo foco/ação] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |
| Esc | [ação observada ou "a confirmar"] | [foco/estado necessário] | [resultado observável] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |
| [OUTRA_TECLA] | [ação observada ou "a confirmar"] | [foco/estado necessário] | [resultado observável] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |
| [BOTAO_SANITIZADO] | [ação observada ou "a confirmar"] | [pré-condição] | [resultado observável] | [tela ou nenhuma/desconhecida] | desconhecido | dedução |

### Navegação por colunas

Registre movimento do foco, seleção e deslocamento em grades/listas. Considere Tab, Shift+Tab, Enter, setas e outras teclas ou botões que forem encontrados. Não suponha que mover o foco equivale a executar a ação da célula.

| Coluna/célula de origem | Tecla, botão ou ação | Coluna/célula de destino | Efeito observado (foco/seleção/ação) | Status | Origem |
|---|---|---|---|---|---|
| [COLUNA_ORIGEM] | [TECLA_OU_BOTAO] | [COLUNA_DESTINO] | [efeito ou desconhecido] | desconhecido | dedução |

## Inserções

Descreva o passo a passo da inserção/seleção sem registrar o conteúdo digitado. Inclua a sequência de campos, mudanças de foco, teclas e botões, dependências e confirmação observável.

| Ordem | Campo/controle | Ação de inserção/seleção | Tecla/botão/evento | Pré-condição/dependência | Resultado observado | Status | Origem |
|---|---|---|---|---|---|---|---|
| 1 | [CAMPO_SANITIZADO] | [digitar/selecionar/consultar/outra] | [TECLA_BOTAO_EVENTO] | [pré-condição ou desconhecido] | [resultado sem valor real] | desconhecido | dedução |
| 2 | [CAMPO_SANITIZADO] | [digitar/selecionar/consultar/outra] | [TECLA_BOTAO_EVENTO] | [pré-condição ou desconhecido] | [resultado sem valor real] | desconhecido | dedução |

## Sequência de comandos/eventos NXJ e confirmação por ação

Para cada ação relevante (por exemplo, uma consulta), registre a sequência técnica observada que conecta a interação visível ao processamento do Systêxtil. Relacione esta seção à linha correspondente em **Inserções** ou **Ações e atalhos**.

Registre somente o que foi observado: eventos de foco/blur, tecla ou botão, comando/evento NXJ, chamada de rede observada manualmente, resposta/retorno, mudança de estado e sinal posterior de confirmação. Separe os passos em linhas distintas e preserve a ordem temporal. Não deduza comandos, parâmetros, tempos ou respostas que não tenham evidência.

A inspeção de rede, quando necessária e autorizada, é manual nas ferramentas do navegador e segue a ADR-012. Ela não é feita pelo Inspector, userscript, extensão ou coletor automático. Registre apenas metadados técnicos mínimos, já sanitizados; nunca copie payloads brutos, valores de campos, cabeçalhos com credenciais, cookies, tokens, sessões, HARs ou respostas que contenham dados operacionais.

| Ação associada | Ordem | Evento/comando observado (sem payload) | Estado/pré-condição | Resposta/efeito observado | Sinal independente de confirmação | Timeout/condição de parada | Status | Origem |
|---|---|---|---|---|---|---|---|---|
| [AÇÃO_ID_OU_DESCRIÇÃO] | 1 | [foco/blur/tecla/botão/comando/evento] | [estado inicial] | [efeito observado, sem valores] | [sinal ou desconhecido] | [limite observado ou não definido] | desconhecido | dedução |
| [AÇÃO_ID_OU_DESCRIÇÃO] | 2 | [evento/comando/resposta seguinte] | [estado necessário] | [efeito observado, sem valores] | [sinal ou desconhecido] | [limite observado ou não definido] | desconhecido | dedução |

**Critérios de confirmação:** enviar um comando, observar uma requisição, receber uma resposta genérica, preencher visualmente um campo ou pressionar uma tecla não comprovam, isoladamente, que a ação foi concluída. Identifique o sinal independente que confirma o estado esperado. Se houver timeout, resposta ambígua, perda de sincronismo ou qualquer estado incerto, registre a interrupção e a conferência manual necessária; não presuma que uma repetição seja segura.

## Navegação

Registre uma linha para cada transição. O gatilho deve identificar qual ação leva da tela de origem à tela de destino e qual tecla ou botão a dispara, quando houver.

| Tela de origem | Gatilho/ação | Tecla ou botão | Tela de destino | Pré-condição | Status | Origem |
|---|---|---|---|---|---|---|
| [TELA_ORIGEM] | [ação que inicia a transição] | [TECLA/BOTAO] | [TELA_DESTINO] | [pré-condição] | desconhecido | dedução |

## Mensagens

Registre padrões sanitizados de erro, aviso e confirmação. Remova nomes, documentos, títulos, valores, códigos e qualquer trecho que identifique uma transação.

| Texto ou padrão da mensagem (sanitizado) | Quando aparece | Bloqueia a operação? | Ação/recuperação indicada | Status | Origem |
|---|---|---|---|---|---|
| [PADRAO_DA_MENSAGEM] | [condição observada] | [sim/não/condicional/desconhecido] | [ação ou desconhecido] | desconhecido | dedução |

## Sinal de sucesso

Descreva como confirmar o resultado por um sinal independente da ação que iniciou a operação. Exemplos de sinal que pode ser investigado: mudança em um campo de status/resultado diferente do campo digitado, mensagem de confirmação vinculada ao resultado, ou consulta posterior que recupera o registro esperado.

**Não são sinais suficientes isoladamente:** campo de entrada preenchido, foco alterado, botão clicado ou tecla pressionada.

| Sinal independente | Como observar/verificar | Consulta posterior necessária? | Status | Origem |
|---|---|---|---|---|
| [CAMPO_DE_STATUS/MENSAGEM/CONSULTA_POSTERIOR] | [passo de verificação] | [sim/não/desconhecido] | desconhecido | dedução |

## Desconhecidos

Liste explicitamente tudo que falta confirmar. Cada item deve indicar a pergunta, a consequência de não saber e como poderá ser investigado.

| Item/pergunta a confirmar | Impacto da lacuna | Como confirmar com segurança | Status | Origem |
|---|---|---|---|---|
| [PERGUNTA_EM_ABERTO] | [risco ou impacto] | [teste manual/captura autorizada/outra investigação] | desconhecido | dedução |

## Revisão antes de salvar

- [ ] Todas as linhas das tabelas têm Status e Origem preenchidos.
- [ ] Status usa somente confirmado, inferido ou desconhecido.
- [ ] Origem usa somente captura, teste manual ou dedução.
- [ ] F2, F7, F9, Enter, Tab, Esc e outros atalhos encontrados foram avaliados, sem presumir funções.
- [ ] Navegação por colunas e controles de grade foi avaliada.
- [ ] Mensagens de erro e confirmação foram descritas por padrão sanitizado.
- [ ] O sinal de sucesso é independente da tecla/botão/entrada que iniciou a operação.
- [ ] A sequência de comandos/eventos NXJ foi registrada por ação, em ordem temporal, ou marcada como desconhecida.
- [ ] Quando usada, a observação de rede foi manual conforme ADR-012 e contém somente metadados mínimos sanitizados.
- [ ] Cada ação tem sinal independente de confirmação ou lacuna explícita; timeout/estado incerto interrompe a sequência.
- [ ] Todos os valores reais foram substituídos por marcadores antes de salvar.
- [ ] O mantenedor revisou o arquivo. Este mapa continua sendo material de investigação, não especificação aprovada.
