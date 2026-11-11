# Modelo de segurança e risco operacional

## Princípios

1. Menor privilégio no browser e no Node.js.
2. Dados do ERP são não confiáveis e potencialmente sensíveis.
3. Evidência deve ser sanitizada antes de sair do ambiente de investigação.
4. Especificações são dados declarativos, nunca código executável.
5. Operações persistentes exigem controle humano e verificação independente.
6. Nenhum dado real de cliente, título ou transação deve ser versionado neste repositório.
7. O repositório permanece público até nova decisão explícita do mantenedor; essa condição é um risco aberto, não uma autorização para publicar dados reais.

## Classificação

| Nível | Descrição | Exemplos | Controles mínimos |
|---|---|---|---|
| L0 | Inspeção de estrutura e metadados | visão, formulário, nome/tipo de campo | escopo de leitura, sem valores |
| L1 | Leitura de dados operacionais | consulta e exportação autorizada | minimização, autorização e proteção do arquivo |
| L2 | Preparação de ação sem persistir | preencher filtros ou campos antes da confirmação | prévia, validação de entrada e cancelamento |
| L3 | Alteração persistente | gravar, emitir, baixar, prorrogar, excluir | confirmação humana, critérios de sucesso, timeout, trava contra repetição, recuperação |

A classificação deve refletir o pior efeito possível da automação, não apenas o primeiro passo.

## Evidências

Permitido por padrão, somente quando necessário, autorizado e sanitizado:
- nomes técnicos de views e formulários, quando a divulgação for permitida;
- nomes e tipos de controles, quando não revelarem informação restrita;
- atributos de visibilidade, bloqueio e obrigatoriedade;
- sequência de eventos observada sem payload sensível;
- mensagens técnicas sanitizadas;
- mapas manuais de telas que usem identificadores genéricos sempre que os nomes internos não puderem ser publicados.

Proibido por padrão:
- senha, token, cookie e identificador de sessão;
- valores pessoais ou financeiros;
- CPF/CNPJ, nomes de clientes ou operadores e dados de contato reais;
- números de títulos, duplicatas ou documentos reais;
- códigos de barras e linhas digitáveis reais;
- payload completo de requisição/resposta sem sanitização;
- conteúdo que permita identificar cliente, operador ou transação sem necessidade.

Se a evidência ficar ambígua após sanitização, não exporte até revisão manual.

## Mascaramento obrigatório por marcadores

Antes de qualquer tela, captura, texto, observação ou dado operacional entrar no repositório, substitua integralmente os valores reais por marcadores de categoria. A regra vale para telas descritas ou capturadas, campos preenchidos, texto colado para a IA, mensagens, tabelas, listas, anexos e requisições/respostas de rede.

| Categoria de dado | Marcador obrigatório |
|---|---|
| CPF/CNPJ | `[CPF_CNPJ]` |
| Nome de cliente | `[CLIENTE]` |
| Título/duplicata/documento | `[TITULO]` |
| Código de barras | `[CODIGO_BARRAS]` |
| Linha digitável | `[LINHA_DIGITAVEL]` |
| Valor monetário | `[VALOR_MONETARIO]` |
| Dados de contato | `[DADO_CONTATO]` |
| Pessoa/operador | `[PESSOA]` |
| Credencial/token/cookie/sessão | `[CREDENCIAL]`, `[TOKEN]`, `[COOKIE]`, `[SESSAO]`, conforme a categoria |

Os marcadores substituem o valor completo: não conservar prefixos, sufixos, dígitos parciais, nomes incompletos ou qualquer fragmento que permita reconstrução. Se a categoria não estiver listada, use `[DADO_SENSIVEL]` ou um marcador mais específico sem incorporar partes do dado original.

A mesma regra vale para material encaminhado à IA: o mantenedor deve mascarar os valores antes de colar ou descrever a evidência. A IA não deve receber valores reais para depois mascará-los.

## Piloto read-only em produção

**Ambiente disponível:** o piloto não dispõe de ambiente de homologação/teste; a consulta em lote será avaliada somente em produção. Isso não equivale a autorização automática para executar. Antes da execução, a autorização operacional aplicável, o escopo exato, o responsável pela autorização e o intervalo entre consultas devem estar registrados na PR.

Controles obrigatórios do piloto:
- somente consulta/read-only; nenhuma gravação, prorrogação, emissão, baixa ou exclusão;
- consultar um título por vez, sem paralelismo, mantendo uma pausa entre consultas;
- definir e registrar na PR o intervalo operacional aprovado antes de iniciar; não presumir um intervalo padrão;
- interromper imediatamente no primeiro timeout, resposta ambígua, divergência, perda de sincronismo ou outro estado incerto;
- não repetir automaticamente uma consulta após estado incerto; conferir manualmente o estado antes de qualquer retomada;
- registrar na PR o resultado, as interrupções e a decisão de continuar/parar, sem incluir dados reais;
- manter valores operacionais dentro do ERP; não copiar títulos, clientes, códigos de barras ou linhas digitáveis reais para o repositório, logs versionados ou evidências compartilhadas.

Sem autorização registrada e controles definidos na PR, o piloto não deve ser executado.

## Captura manual de rede — procedimento separado do Inspector

O Inspector permanece estritamente read-only conforme a ADR-008. Ele não intercepta XHR/fetch, não observa payloads e não captura requisições. A captura de rede descrita aqui é uma atividade manual e independente, executada pelo mantenedor/investigador somente quando necessária e autorizada, conforme ADR-012.

1. **Autorizar e limitar:** confirmar autorização para investigar o fluxo e usar ambiente expressamente autorizado. Para o piloto atual, que só dispõe de produção, aplicar também os controles da seção “Piloto read-only em produção”. Identificar a operação e a requisição mínima necessária.
2. **Capturar manualmente:** abrir as ferramentas de desenvolvimento do navegador, acessar a aba de rede e observar a requisição escolhida durante a execução manual do fluxo. Não usar o Inspector, outro userscript, extensão, script ou serviço para capturar automaticamente. Não ativar coleta contínua.
3. **Evitar exportação bruta:** não salvar nem anexar HAR, request/response bruto, screenshot ou arquivo de rede ao repositório, à PR ou ao pacote de IA. Se um arquivo temporário for indispensável à análise, mantê-lo localmente fora da pasta do repositório e não compartilhá-lo.
4. **Mascarar valores antes de registrar:** substituir integralmente CPF/CNPJ por `[CPF_CNPJ]`, nomes de clientes por `[CLIENTE]`, títulos/duplicatas/documentos por `[TITULO]`, códigos de barras por `[CODIGO_BARRAS]`, linhas digitáveis por `[LINHA_DIGITAVEL]` e valores monetários por `[VALOR_MONETARIO]`. Usar também marcadores específicos para dados de contato, pessoas, credenciais, tokens, cookies e sessões. Não manter prefixos, sufixos ou fragmentos que permitam reconstrução.
5. **Registrar somente o necessário:** após a máscara, registrar apenas metadados técnicos úteis, como método, tipo de conteúdo, nomes de parâmetros, estrutura genérica do payload e sequência de chamadas. Revisar se a rota ou outro metadado também revela informação interna que não deve ser publicada.
6. **Revisar manualmente:** conferir o resultado mascarado campo a campo antes de copiar qualquer trecho para documentação, issue, PR ou pacote. A revisão é humana e não pode ser substituída por ferramenta automática.
7. **Descartar em caso de dúvida:** se não for possível garantir a remoção de valores reais, não exportar nem compartilhar a captura. Descartar o material temporário conforme a política aplicável e registrar somente que a evidência ficou indisponível.

**Regra absoluta:** nenhum valor real ou artefato bruto de rede entra neste repositório, em PR, fixture, log, screenshot ou pacote de contexto. A captura nunca é automática e nunca é responsabilidade do Inspector.

## Capturas de tela e campos com valores

Capturas de tela são manuais e não fazem parte da coleta automatizada do Inspector. Uma tela que exiba campos preenchidos deve ser considerada sensível mesmo quando o objetivo da captura for demonstrar apenas estrutura, sequência ou navegação.

Antes de registrar, anexar ou compartilhar qualquer imagem ou observação derivada dela, substituir os valores completos por marcadores:
- CPF/CNPJ por `[CPF_CNPJ]`;
- nomes de clientes por `[CLIENTE]` e pessoas/operadores por `[PESSOA]`;
- títulos/duplicatas/documentos por `[TITULO]`;
- códigos de barras por `[CODIGO_BARRAS]`;
- linhas digitáveis por `[LINHA_DIGITAVEL]`;
- valores financeiros por `[VALOR_MONETARIO]`;
- dados de contato, credenciais, tokens, cookies e identificadores de sessão por marcadores de sua categoria;
- ocultar também conteúdo em cabeçalhos, rodapés, tabelas, listas suspensas, mensagens, abas, URL e outros elementos visíveis;
- usar tarja opaca que não permita recuperar o conteúdo; não usar desfoque fraco, pixelização reversível ou máscara que preserve prefixos/sufixos;
- achatar a imagem sanitizada e remover metadados desnecessários antes de compartilhar;
- revisar a imagem final em tamanho integral e verificar que não restaram valores sensíveis.

Não anexar capturas brutas ao repositório, PR, issue, fixture ou pacote de IA. Não registrar valores reais dos campos em texto. Para documentar inserções e dependências, registrar a ação e o efeito observado, não o conteúdo digitado. Os mesmos marcadores definidos em “Mascaramento obrigatório por marcadores” se aplicam a capturas de tela, campos preenchidos e capturas de rede (ADR-012). Se a máscara não puder ser garantida, não compartilhar o artefato; descartá-lo ou mantê-lo temporariamente fora do repositório em local autorizado.

## Verificação de dados sensíveis

### Estado de visibilidade e risco aberto

O repositório está **público por decisão do mantenedor** e deve permanecer público até nova orientação explícita. A visibilidade pública é um **risco aberto**: documentação técnica, capturas, nomes de telas/campos, endpoints ou metadados podem revelar detalhes internos do ERP.

Não alterar a visibilidade, tornar o repositório privado ou reescrever o histórico sem nova confirmação explícita do mantenedor. O fato de o repositório permanecer público não suspende as regras de mascaramento nem autoriza publicar dados reais.

### Status da verificação

**Status: PENDENTE.** A verificação de dados sensíveis deve ser executada **antes de qualquer novo commit que inclua evidência de tela, captura, nome/identificador técnico derivado da tela, valor de campo ou dado operacional**.

A revisão pontual registrada em 2026-11-11 descreve apenas o estado então examinado. Ela é um registro histórico e **não quita a verificação exigida antes do próximo commit com evidências**. Atualizar este documento ou outros documentos de método sem adicionar evidência real não substitui nem dispara essa verificação.

### Escopo obrigatório da verificação antes do commit com evidência

Antes de criar o commit que adicionará evidência, revisar os arquivos atuais, os novos arquivos/diffs e o histórico de commits alcançável em busca de:
- telas, views e nomes de formulários;
- nomes técnicos de campos e metadados de controles;
- endpoints, incluindo UnifyNXJ.jsp e similares;
- nomes de clientes, pessoas e operadores;
- números de títulos, duplicatas e documentos;
- códigos de barras e linhas digitáveis;
- CPF/CNPJ, telefones, e-mails, valores financeiros, credenciais, tokens, cookies e identificadores de sessão;
- capturas de tela, HARs, payloads, logs, anexos e arquivos exportados.

Combinar busca por padrões com revisão manual do contexto. Registrar no relatório da PR somente categorias e caminhos dos achados, sem reproduzir valores ou dados sensíveis. Se houver achados, removê-los da proposta antes de criar o commit, após decisão do mantenedor; não publicar valores para explicar o problema.

**Condição de parada:** se a revisão identificar dados reais ou outros dados operacionais sensíveis no histórico ou nos arquivos atuais, interromper a preparação do commit com evidência e reportar ao mantenedor antes de prosseguir com essa alteração. Não apagar arquivos, reescrever histórico, remover branches ou alterar visibilidade como resposta automática. A remediação requer decisão explícita.

### Checklist por commit com evidência

- [ ] Revisar arquivos atuais e diffs novos.
- [ ] Pesquisar o histórico alcançável pelas categorias acima.
- [ ] Revisar manualmente screenshots e documentos, além dos resultados automatizados.
- [ ] Mascarar integralmente valores de telas/campos e capturas de rede.
- [ ] Confirmar que exemplos e placeholders são fictícios e não reconstruíveis.
- [ ] Listar achados apenas por categoria/caminho, sem reproduzir valores.
- [ ] Registrar a verificação na PR antes do commit com evidência.

## Userscripts

- Restringir @match ao host e caminho necessários.
- Declarar apenas @grant necessário.
- Usar unsafeWindow somente com justificativa documentada.
- Não introduzir dependências remotas.
- Evitar alteração de protótipos globais.
- Garantir inicialização idempotente e limpeza de listeners.
- Tratar dados do DOM e da página como não confiáveis.
- Manter o Inspector read-only; ele não é coletor de rede e não lê valores de campos.

## Operações L3

Antes de qualquer operação L3:
- identificar registro-alvo sem ambiguidade;
- validar entradas e pré-condições;
- apresentar ação e consequência à pessoa;
- exigir confirmação explícita imediatamente antes da gravação;
- impedir duplo envio/repetição após timeout incerto;
- observar confirmação posterior confiável;
- registrar resultado mínimo sem valores sensíveis;
- oferecer procedimento de interrupção e recuperação.

Não considerar uma requisição enviada como sucesso. Em caso de estado incerto, interromper e exigir conferência humana.

## Arquivos e pacotes

- Ignorar diretórios de evidência privada no Git.
- Não adicionar HAR, traces, screenshots sem sanitização ou exports operacionais.
- Validar JSON contra schemas estritos.
- Não executar conteúdo importado nem interpolar dados importados em comandos de shell.
- Revisar o conteúdo do pacote de IA antes de compartilhá-lo com serviços externos.
