# Modelo de segurança e risco operacional

## Princípios

1. Menor privilégio no browser e no Node.js.
2. Dados do ERP são não confiáveis e potencialmente sensíveis.
3. Evidência deve ser sanitizada antes de sair do navegador.
4. Especificações são dados declarativos, nunca código executável.
5. Operações persistentes exigem controle humano e verificação independente.
6. Nenhum dado real de cliente, título ou transação deve ser versionado neste repositório.

## Classificação

| Nível | Descrição | Exemplos | Controles mínimos |
|---|---|---|---|
| L0 | Inspeção de estrutura e metadados | visão, formulário, nome/tipo de campo | escopo de leitura, sem valores |
| L1 | Leitura de dados operacionais | consulta e exportação autorizada | minimização, autorização e proteção do arquivo |
| L2 | Preparação de ação sem persistir | preencher filtros ou campos antes da confirmação | prévia, validação de entrada e cancelamento |
| L3 | Alteração persistente | gravar, emitir, baixar, prorrogar, excluir | confirmação humana, critérios de sucesso, timeout, trava contra repetição, recuperação |

A classificação deve refletir o pior efeito possível da automação, não apenas o primeiro passo.

## Evidências

Permitido por padrão, somente quando necessário e sanitizado:
- nomes técnicos de views e formulários;
- nomes e tipos de controles;
- atributos de visibilidade, bloqueio e obrigatoriedade;
- sequência de eventos observada sem payload sensível;
- mensagens técnicas sanitizadas.

Proibido por padrão:
- senha, token, cookie e identificador de sessão;
- valores pessoais ou financeiros;
- CPF/CNPJ, nomes de clientes ou operadores e dados de contato reais;
- números de títulos, duplicatas ou documentos reais;
- códigos de barras e linhas digitáveis reais;
- payload completo de requisição/resposta sem sanitização;
- conteúdo que permita identificar cliente ou operador sem necessidade.

Se a evidência ficar ambígua após sanitização, não exporte até revisão manual.

## Captura manual de rede — procedimento separado do Inspector

O Inspector permanece estritamente read-only conforme a ADR-008. Ele não intercepta XHR/fetch, não observa payloads e não captura requisições. A captura de rede descrita aqui é uma atividade manual e independente, executada pelo mantenedor/investigador somente quando necessária e autorizada.

1. **Autorizar e limitar:** confirmar autorização para investigar o fluxo e usar ambiente de teste/homologação ou outro ambiente expressamente autorizado. Identificar a operação e a requisição mínima necessária.
2. **Capturar manualmente:** abrir as ferramentas de desenvolvimento do navegador, acessar a aba de rede e observar a requisição escolhida durante a execução manual do fluxo. Não usar o Inspector, outro userscript, extensão, script ou serviço para capturar automaticamente. Não ativar coleta contínua.
3. **Evitar exportação bruta:** não salvar nem anexar HAR, request/response bruto, screenshot ou arquivo de rede ao repositório, à PR ou ao pacote de IA. Se um arquivo temporário for indispensável à análise, mantê-lo localmente fora da pasta do repositório e não compartilhá-lo.
4. **Mascarar valores antes de registrar:** substituir integralmente valores de CPF/CNPJ, números de títulos/duplicatas/documentos reais, nomes de pessoas ou clientes, códigos de barras e linhas digitáveis. Mascarar também senhas, tokens, cookies, identificadores de sessão, dados de contato, valores financeiros e identificadores de registros. Não manter prefixos/sufixos que permitam reconstrução ou identificação.
5. **Registrar somente o necessário:** após a máscara, registrar apenas metadados técnicos úteis, como método, tipo de conteúdo, nomes de parâmetros, estrutura genérica do payload e sequência de chamadas. Revisar se a rota ou outro metadado também revela informação interna que não deve ser publicada.
6. **Revisar manualmente:** conferir o resultado mascarado campo a campo antes de copiar qualquer trecho para documentação, issue, PR ou pacote. A revisão é humana e não pode ser substituída por ferramenta automática.
7. **Descartar em caso de dúvida:** se não for possível garantir a remoção de valores reais, não exportar nem compartilhar a captura. Descartar o material temporário conforme a política aplicável e registrar somente que a evidência ficou indisponível.

**Regra absoluta:** nenhum valor real ou artefato bruto de rede entra neste repositório, em PR, fixture, log, screenshot ou pacote de contexto. A captura nunca é automática e nunca é responsabilidade do Inspector.

## Verificação de dados sensíveis

### Estado de visibilidade

O repositório está **público em 2026-11-11**. Manter público é a decisão atual do mantenedor até nova orientação explícita. A visibilidade pública é um **risco aberto**: mesmo documentação sem dados transacionais pode expor nomes de telas, campos, rotas e detalhes internos do ERP. Não mudar para privado nem alterar configurações de visibilidade sem confirmação explícita.

### Escopo e achados da verificação de 2026-11-11

Foi feita uma revisão pontual dos 49 arquivos de texto versionados no estado atual e dos diffs dos 27 commits alcançáveis pela branch principal. A busca automatizada foi complementada pela leitura dos documentos e fixtures pertinentes.

Achados, sem reproduzir valores:
- **Telas/views e formulários reais:** nenhum identificador específico de tela de produção foi identificado. As fixtures contêm somente metadados demonstrativos fictícios.
- **Nomes de campos reais do ERP:** nenhum identificador de campo de produção foi identificado; há apenas nomes genéricos/demonstrativos de schema e fixture.
- **Endpoints como UnifyNXJ.jsp e similares:** nenhuma ocorrência identificada.
- **Nomes de clientes ou pessoas em conteúdo operacional:** nenhuma ocorrência identificada.
- **Números de títulos/documentos reais:** nenhum candidato identificado.
- **Códigos de barras e linhas digitáveis reais:** nenhum candidato identificado.
- **Padrões numéricos compatíveis com CPF/CNPJ, telefones ou e-mails em conteúdo de arquivo/diff:** nenhum candidato identificado.

Este resultado descreve somente o estado revisado nesta data. Não é garantia para commits futuros, conteúdo não versionado, anexos de PR ou objetos Git não alcançáveis pelas referências examinadas.

### Procedimento obrigatório para próximas alterações

Antes de concluir uma PR que adicione ou altere evidências, documentação técnica ou fixtures:
- revisar os arquivos atuais e os novos diffs;
- pesquisar no histórico alcançável por referências a telas, nomes de campos, endpoints (incluindo UnifyNXJ.jsp e similares), nomes de clientes/pessoas, títulos, códigos de barras e linhas digitáveis;
- revisar manualmente resultados e contexto, pois buscas por padrão não detectam todos os nomes ou identificadores;
- listar somente categorias e caminhos dos achados, sem reproduzir valores;
- confirmar que exemplos são fictícios e que toda captura manual foi mascarada;
- não anexar capturas brutas à PR.

**Condição de parada:** se for identificado dado real de cliente, título, documento, código de barras, linha digitável, credencial ou outro dado operacional sensível no histórico ou nos arquivos atuais, interromper a tarefa antes de qualquer outra alteração e reportar ao mantenedor. Não apagar arquivos, reescrever histórico, remover branches ou alterar visibilidade como resposta automática. A remediação precisa de decisão explícita do mantenedor.

## Userscripts

- Restringir @match ao host e caminho necessários.
- Declarar apenas @grant necessário.
- Usar unsafeWindow somente com justificativa documentada.
- Não introduzir dependências remotas.
- Evitar alteração de protótipos globais.
- Garantir inicialização idempotente e limpeza de listeners.
- Tratar dados do DOM e da página como não confiáveis.
- Manter o Inspector read-only; ele não é coletor de rede.

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
