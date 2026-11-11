# Mapa de tela — consulta de títulos

> Estado inicial do mapa, elaborado a partir de duas capturas estáticas fornecidas pelo mantenedor em 2026-11-11. As imagens originais não devem ser versionadas. Os valores visíveis nos campos de data, hora e empresa da primeira captura foram omitidos deste documento. Nenhuma consulta ou interação foi executada para produzir este mapa.

## Identificação

- **Nome da tela:** Consulta de Títulos.
- **Como chegar nela:** desconhecido. A captura mostra o menu lateral, mas não registra o caminho usado para abrir a tela.
- **Data da observação:** 2026-11-11.
- **Responsável pela captura/observação:** [RESPONSAVEL].
- **Escopo observado:** cabeçalho, campos das áreas superior e inferior do formulário, botões visíveis no rodapé e mensagem informativa inferior.
- **Limite da evidência:** as duas capturas cobrem as áreas superior e inferior visíveis do formulário, mas não demonstram todos os estados possíveis, resultados de consulta, navegação por grade ou interações. Rótulos abreviados/truncados foram preservados como aparecem.

## Campos

Os rótulos abaixo foram transcritos da captura. “Controle de entrada aparente” descreve somente a aparência visual; o tipo técnico, a máscara, o vínculo NXJ e a semântica ainda precisam de confirmação. Campos com o mesmo rótulo foram diferenciados pela seção visual em que aparecem.

| Campo | Tipo | Obrigatório | Valor de exemplo mascarado | Dependências | Status | Origem |
|---|---|---|---|---|---|---|
| Data | Controle de entrada aparente; subtipo desconhecido | desconhecido | [DATA] | desconhecido | confirmado | captura |
| Hora | Controle de entrada aparente; subtipo desconhecido | desconhecido | [HORA] | desconhecido | confirmado | captura |
| Empresa — código | Controle curto de entrada aparente | desconhecido | [CODIGO_EMPRESA] | Mensagem inferior menciona empresa; obrigatoriedade e vínculo não verificados | confirmado | captura |
| Empresa — descrição | Controle longo de entrada aparente | desconhecido | [DESCRICAO_EMPRESA] | Relação com o campo de código desconhecida | confirmado | captura |
| Ult.ocorr. | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | desconhecido | confirmado | captura |
| Nr título — grupo | Grupo de controles adjacentes; quantidade e função de cada segmento desconhecidas | desconhecido | [TITULO] | Relação entre segmentos desconhecida | confirmado | captura |
| Situação | Controle curto de entrada aparente | desconhecido | [SITUACAO] | Opções e dependências desconhecidas | confirmado | captura |
| Emissão | Controle de entrada aparente | desconhecido | [DATA] | Formato e dependências desconhecidos | confirmado | captura |
| Cliente — grupo | Grupo com controles curtos, controle longo e segmento adicional entre delimitadores visuais | desconhecido | [CLIENTE] | Relação entre segmentos desconhecida | confirmado | captura |
| Responsável — grupo | Grupo com controles curtos e controle longo | desconhecido | [PESSOA] | Relação entre segmentos desconhecida | confirmado | captura |
| Endosso — grupo | Grupo com controles curtos e controle longo | desconhecido | [DADO_SENSIVEL] | Relação entre segmentos desconhecida | confirmado | captura |
| Pedido | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | desconhecido | confirmado | captura |
| Representante | Controle longo de entrada aparente | desconhecido | [PESSOA] | desconhecido | confirmado | captura |
| %Comissão | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Formato e regra de cálculo desconhecidos | confirmado | captura |
| Base cálculo | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Regra de cálculo desconhecida | confirmado | captura |
| Valor — seção de comissão | Controle de entrada aparente | desconhecido | [VALOR_MONETARIO] | Semântica desconhecida | confirmado | captura |
| Portador | Grupo com controle curto e controle longo | desconhecido | [DADO_SENSIVEL] | Relação entre segmentos desconhecida | confirmado | captura |
| Bord: | Controle curto de entrada aparente; significado da abreviação desconhecido | desconhecido | [DADO_SENSIVEL] | desconhecido | confirmado | captura |
| Rem: | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Significado e dependências desconhecidos | confirmado | captura |
| Nr.banco | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Formato e dependências desconhecidos | confirmado | captura |
| Conta corrente | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Formato e dependências desconhecidos | confirmado | captura |
| Carteira | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Opções e dependências desconhecidas | confirmado | captura |
| Transação | Controle longo de entrada aparente | desconhecido | [DADO_SENSIVEL] | Opções e dependências desconhecidas | confirmado | captura |
| Perc.desc.título | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Regra de cálculo desconhecida | confirmado | captura |
| Solicitação | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Significado e dependências desconhecidos | confirmado | captura |
| Saldo movto de perda | Controle de entrada aparente | desconhecido | [VALOR_MONETARIO] | Regra de cálculo desconhecida | confirmado | captura |
| Saldo com cheques | Controle de entrada aparente | desconhecido | [VALOR_MONETARIO] | Regra de cálculo desconhecida | confirmado | captura |
| Vencimento | Controle de entrada aparente | desconhecido | [DATA] | Formato e dependências desconhecidos | confirmado | captura |
| Valor — seção de vencimento | Controle de entrada aparente | desconhecido | [VALOR_MONETARIO] | Semântica desconhecida | confirmado | captura |
| Saldo | Controle de entrada aparente | desconhecido | [VALOR_MONETARIO] | Regra de cálculo desconhecida | confirmado | captura |
| Moeda tit. | Grupo com controles adjacentes; funções dos segmentos desconhecidas | desconhecido | [MOEDA] | Relação entre segmentos desconhecida | confirmado | captura |
| Vl.moeda | Controle de entrada aparente | desconhecido | [VALOR_MONETARIO] | Regra de cálculo desconhecida | confirmado | captura |
| Sal.moeda | Controle de entrada aparente | desconhecido | [VALOR_MONETARIO] | Regra de cálculo desconhecida | confirmado | captura |
| Prorrogação | Controle de entrada aparente | desconhecido | [DATA] | Regra operacional e efeito desconhecidos | confirmado | captura |
| Posição | Grupo com controle curto e controle longo | desconhecido | [DADO_SENSIVEL] | Relação entre segmentos desconhecida | confirmado | captura |
| Previsão | Grupo com controle curto e controle longo | desconhecido | [DATA] | Relação entre segmentos desconhecida | confirmado | captura |
| Local | Grupo com controle curto e controle longo | desconhecido | [DADO_SENSIVEL] | Relação entre segmentos desconhecida | confirmado | captura |
| Dupl.emitida | Controle pequeno; aparência de indicador/seleção, tipo não confirmado | desconhecido | [ESTADO] | Condição de habilitação e efeito desconhecidos | inferido | captura |
| Histórico | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Significado e dependências desconhecidos | confirmado | captura |
| Compl.hist. | Controle longo de entrada aparente | desconhecido | [DADO_SENSIVEL] | Relação com Histórico desconhecida | confirmado | captura |
| Duplic.impressa | Controle pequeno; aparência de indicador/seleção, tipo não confirmado | desconhecido | [ESTADO] | Condição de habilitação e efeito desconhecidos | inferido | captura |
| Num.contábil | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Formato e dependências desconhecidos | confirmado | captura |
| Docto reneg. | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Significado e dependências desconhecidos | confirmado | captura |
| Tem informação | Controle pequeno; aparência de indicador/seleção, tipo não confirmado | desconhecido | [ESTADO] | Condição de habilitação e efeito desconhecidos | inferido | captura |
| Num.cupom | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Formato e dependências desconhecidos | confirmado | captura |
| Forma pagto. | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Opções e dependências desconhecidas | confirmado | captura |
| Adiantamen.: | Controle pequeno de entrada aparente; rótulo abreviado/truncado na captura | desconhecido | [ESTADO] | Significado e efeito desconhecidos | confirmado | captura |
| Nr. remessa scpc | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Relação com Sit. remessa scpc desconhecida | confirmado | captura |
| Sit. remessa scpc | Controle pequeno de entrada aparente | desconhecido | [ESTADO] | Opções, significado e dependências desconhecidos | confirmado | captura |
| Situação renegociação | Grupo com controle pequeno e controle longo | desconhecido | [DADO_SENSIVEL] | Relação entre segmentos desconhecida | confirmado | captura |
| Número da renegociação | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Relação com Situação renegociação desconhecida | confirmado | captura |
| Codigos de barras | Controle longo de entrada aparente | desconhecido | [CODIGO_BARRAS] | Formato, máscara e uso como filtro desconhecidos | confirmado | captura |
| Linha digitável | Controle longo de entrada aparente | desconhecido | [LINHA_DIGITAVEL] | Formato, máscara e uso como filtro desconhecidos | confirmado | captura |
| Pix copia e cola | Controle longo de entrada aparente | desconhecido | [DADO_SENSIVEL] | Formato, máscara e uso como filtro desconhecidos | confirmado | captura |
| Num. remessa fdc | Controle curto de entrada aparente | desconhecido | [DADO_SENSIVEL] | Relação com Situação fdc desconhecida | confirmado | captura |
| Situação fdc | Controle pequeno de entrada aparente | desconhecido | [ESTADO] | Opções, significado e dependências desconhecidos | confirmado | captura |
| Data remessa fdc | Controle de entrada aparente | desconhecido | [DATA] | Formato e dependências desconhecidos | confirmado | captura |
| Num. ident. fdc | Controle de entrada aparente | desconhecido | [DADO_SENSIVEL] | Significado e dependências desconhecidos | confirmado | captura |

### Cobertura de campos e controles

| Categoria a verificar | Referência do campo/controle | Observação | Status | Origem |
|---|---|---|---|---|
| Campo de consulta/pesquisa | Nr título; Cliente; Responsável; Endosso; demais campos visíveis | Os rótulos e controles aparentes estão visíveis; quais participam da pesquisa ainda não foi testado | inferido | captura |
| Campo de inserção/digitação | Campos retangulares do formulário | A possibilidade de digitação e o comportamento de cada controle não foram testados | desconhecido | dedução |
| Campo de seleção/lista | Situação; Portador; Carteira; Transação e outros candidatos | A captura não mostra listas abertas nem opções | desconhecido | dedução |
| Controle de texto/número/data/hora | Campos com aparência de entrada | Subtipos, máscaras e validação não foram confirmados | desconhecido | dedução |
| Autocomplete/lista suspensa | Cliente; Responsável; Portador e outros candidatos | Não foi aberta nenhuma lista | desconhecido | dedução |
| Checkbox/radio/outro controle | Dupl.emitida; Duplic.impressa; Tem informação | A aparência sugere indicadores, mas não confirma o tipo nem o estado | inferido | captura |
| Controle somente leitura/desabilitado | Campos com valores iniciais e demais controles | Não houve teste de foco ou edição | desconhecido | dedução |
| Campo/coluna de grade ou lista | Área de resultados | Não está visível na captura inicial | desconhecido | dedução |
| Botão/ação visível | Buscar | Rótulo visível; efeito não executado | confirmado | captura |
| Atalho de teclado | F2, F7, F9, Enter, Tab, Esc e outros | Nenhuma tecla foi testada nesta observação | desconhecido | dedução |
| Mensagem de erro/confirmação | Mensagem informativa inferior | Há uma mensagem informativa inicial; mensagens após pesquisa são desconhecidas | confirmado | captura |
| Botões adicionais | Manut. títulos; Histórico título; Imagem do título; Emite boleto; Emite nota fiscal | Rótulos visíveis na parte inferior; funções, pré-condições e efeitos não foram executados | confirmado | captura |

## Ações e atalhos

| Tecla ou botão | Ação | Pré-condição | Resultado esperado | Próxima tela | Status | Origem |
|---|---|---|---|---|---|---|
| Buscar | Rótulo sugere início da pesquisa | Empresa e demais critérios conforme regra ainda desconhecida | Consulta de títulos; efeito ainda não observado | Desconhecida | inferido | captura |
| F2 | desconhecido | desconhecida | desconhecido | desconhecida | desconhecido | dedução |
| F7 | desconhecido nesta tela | desconhecida | desconhecido | desconhecida | desconhecido | dedução |
| F9 | desconhecido | desconhecida | desconhecido | desconhecida | desconhecido | dedução |
| Enter | desconhecido | desconhecida | desconhecido | desconhecida | desconhecido | dedução |
| Tab / Shift+Tab | Ordem de foco desconhecida | Controle com foco | Próximo/anterior controle ainda não observado | desconhecida | desconhecido | dedução |
| Esc | desconhecido | desconhecida | desconhecido | desconhecida | desconhecido | dedução |
| Manut. títulos | Rótulo visível; função e efeito não executados | desconhecida | desconhecido | desconhecida | confirmado | captura |
| Histórico título | Rótulo visível; função e efeito não executados | desconhecida | desconhecido | desconhecida | confirmado | captura |
| Imagem do título | Rótulo visível; função e efeito não executados | desconhecida | desconhecido | desconhecida | confirmado | captura |
| Emite boleto | Rótulo visível; função e efeito não executados; tratar como ação potencialmente operacional até esclarecer | desconhecida | desconhecido | desconhecida | confirmado | captura |
| Emite nota fiscal | Rótulo visível; função e efeito não executados; tratar como ação potencialmente operacional até esclarecer | desconhecida | desconhecido | desconhecida | confirmado | captura |
| Ícones da barra superior | Há vários ícones visíveis, sem descrição textual nas capturas | desconhecida | desconhecido | desconhecida | desconhecido | captura |

### Navegação por colunas

| Coluna/célula de origem | Tecla, botão ou ação | Coluna/célula de destino | Efeito observado (foco/seleção/ação) | Status | Origem |
|---|---|---|---|---|---|
| Área de formulário | Tab / Shift+Tab | desconhecida | Ordem de foco não testada | desconhecido | dedução |
| Grade de resultados | desconhecida | desconhecida | A grade não aparece na área capturada | desconhecido | dedução |

## Inserções

Nenhuma inserção, seleção ou alteração de campo foi executada durante esta observação. A sequência de preenchimento e os efeitos de foco permanecem desconhecidos.

| Ordem | Campo/controle | Ação de inserção/seleção | Tecla/botão/evento | Pré-condição/dependência | Resultado observado | Status | Origem |
|---|---|---|---|---|---|---|---|
| — | Formulário de consulta | Não observado nesta etapa | Nenhum evento executado | Aguardar autorização e definição do escopo de consulta | Sem alteração deliberada de campos | desconhecido | dedução |

## Sequência de comandos/eventos NXJ e confirmação por ação

Nenhum comando ou evento NXJ foi provocado ou capturado para este mapa. Não foi aberta a aba de rede e não houve consulta. O Inspector não foi usado para interceptar tráfego.

| Ação associada | Ordem | Evento/comando observado (sem payload) | Estado/pré-condição | Resposta/efeito observado | Sinal independente de confirmação | Timeout/condição de parada | Status | Origem |
|---|---|---|---|---|---|---|---|---|
| Buscar | 1 | Não observado; ação não executada | Formulário inicial | Nenhum efeito observado | Desconhecido | Não definido; qualquer teste futuro deve seguir ADR-016 | desconhecido | dedução |

## Navegação

| Tela de origem | Gatilho/ação | Tecla ou botão | Tela de destino | Pré-condição | Status | Origem |
|---|---|---|---|---|---|---|
| Desconhecida | Caminho até Consulta de Títulos não registrado | Desconhecido | Consulta de Títulos | Menu lateral visível, mas sem sequência de abertura | desconhecido | dedução |
| Consulta de Títulos | Buscar (efeito não executado) | Botão Buscar | Desconhecida | Regras de preenchimento e autorização ainda não verificadas | desconhecido | dedução |

## Mensagens

| Texto ou padrão da mensagem (sanitizado) | Quando aparece | Bloqueia a operação? | Ação/recuperação indicada | Status | Origem |
|---|---|---|---|---|---|
| “Informe empresa a ser considerada na pesquisa.” | Visível na área informativa inferior na abertura da tela | Desconhecido | Verificar regra de empresa e se a mensagem é orientação ou validação; não executar pesquisa nesta etapa | confirmado | captura |

## Sinal de sucesso

Ainda não existe sinal de sucesso confirmado para a consulta. O rótulo Buscar, o preenchimento visual dos campos, uma tecla pressionada ou uma requisição isolada não serão considerados confirmação.

| Sinal independente | Como observar/verificar | Consulta posterior necessária? | Status | Origem |
|---|---|---|---|---|
| Resultado da consulta associado ao critério pesquisado | Investigar somente em execução autorizada; identificar sinal independente do campo de entrada e da requisição | Desconhecido | desconhecido | dedução |
| Mensagem de resultado/vazio/erro | Registrar padrão sanitizado e sua relação com o estado final | Desconhecido | desconhecido | dedução |

## Desconhecidos

| Item/pergunta a confirmar | Impacto da lacuna | Como confirmar com segurança | Status | Origem |
|---|---|---|---|---|
| Caminho de menu para abrir Consulta de Títulos | Não é possível reproduzir a navegação de entrada | Descrever o caminho observado, sem executar consulta | desconhecido | dedução |
| Nome técnico da view/formulário e vínculo com os rótulos visuais | Não é possível associar com segurança campos visuais a identificadores NXJ | Consultar metadados read-only autorizados e evidência técnica sanitizada | desconhecido | dedução |
| Relação de forms.crec.crec_f090, num_duplicata. e seq_duplicatas. com esta tela | São pistas de contexto técnico, não confirmadas por esta captura | Correlacionar individualmente com a tela por observação autorizada, sem presumir equivalência | desconhecido | dedução |
| Significado e composição dos segmentos de Nr título, Cliente, Responsável e Endosso | Automação pode preencher ou interpretar o segmento errado | Observar cada controle e sua resposta, sem valores reais no registro | desconhecido | dedução |
| Obrigatoriedade e validação do campo Empresa | A consulta pode ser bloqueada ou usar escopo incorreto | Confirmar regra com responsável funcional e em observação autorizada | desconhecido | dedução |
| Tipos técnicos, máscaras, limites e formatos dos campos | Risco de entrada inválida ou interpretação incorreta | Investigar metadados allowlisted e teste manual autorizado | desconhecido | dedução |
| Significado das abreviações Bord:, Rem:, Perc.desc.título, Compl.hist. e Docto reneg. | Semântica de negócio não confirmada | Confirmar com documentação/área responsável | desconhecido | dedução |
| Estado, tipo e efeito de Dupl.emitida, Duplic.impressa e Tem informação | Não se sabe se são indicadores, filtros ou controles editáveis | Inspecionar metadados sem ler valores operacionais e confirmar comportamento autorizado | desconhecido | dedução |
| Ordem de foco, Tab, Shift+Tab e navegação por teclado | Sequência de interação não pode ser especificada | Teste manual autorizado, sem executar pesquisa | desconhecido | dedução |
| Função dos ícones da barra superior e atalhos F2/F7/F9/Enter/Esc | Pode haver comandos não identificados ou dependentes do foco | Identificar rótulos/tooltips e testar somente ações não operacionais autorizadas | desconhecido | dedução |
| Efeito do botão Buscar, sequência NXJ e resposta | Não há fluxo técnico nem critério de confirmação | Somente após autorização registrada conforme ADR-016; uma consulta por vez, com pausa e parada segura | desconhecido | dedução |
| Grade/resultados e comportamento após consulta | Campos, colunas, paginação e seleção não foram observados | Captura sanitizada posterior, dentro do piloto autorizado | desconhecido | dedução |
| Mensagens de vazio, erro, timeout e sucesso | Tratamento de falhas e confirmação não pode ser definido | Registrar padrões sanitizados em observação autorizada | desconhecido | dedução |
| Conteúdo abaixo da área visível | O mapa cobre somente a primeira área da tela | Completar inventário por rolagem manual, sem acionar consulta | desconhecido | dedução |
| Intervalo entre consultas e autorização operacional do piloto | Sem isso, o piloto em produção não pode ser executado | Registrar autorização, responsável, escopo e intervalo na PR antes de qualquer execução | desconhecido | dedução |

## Revisão antes de salvar

- [x] Rótulos e controles aparentes das áreas superior e inferior foram registrados a partir de duas capturas.
- [x] Valores exibidos em Data, Hora e Empresa na primeira captura foram omitidos do documento.
- [x] Imagens originais não serão incluídas no repositório.
- [x] Status e Origem foram preenchidos nas linhas registradas.
- [x] Itens não observados permanecem desconhecidos.
- [x] Nenhuma consulta, tecla ou ação de ERP foi executada nesta etapa.
- [ ] Verificar se ainda há campos ou ações abaixo do trecho final capturado.
- [ ] Confirmar caminho de acesso e metadados técnicos.
- [ ] Investigar sequência NXJ e sinal independente de confirmação somente após autorização aplicável.
- [ ] Revisão final do mantenedor antes de considerar o mapa completo.

**Estado do mapa:** inicial e incompleto. As capturas confirmam rótulos, disposição aparente, campos adicionais e presença de botões; não comprovam tipo técnico, comportamento, obrigatoriedade, efeito de ações, consulta, resposta NXJ ou sucesso operacional. Os botões “Emite boleto” e “Emite nota fiscal” foram apenas inventariados; não foram acionados.
