# Modelo de segurança e risco operacional

Este documento é a **fonte única** para classificação de risco, evidências, status, origem e verificação de dados sensíveis. Os demais documentos devem referenciar estas definições, sem copiá-las.

## Princípios

1. Menor privilégio no browser e no Node.js.
2. Dados do ERP são não confiáveis e potencialmente sensíveis.
3. Evidências só podem ser compartilhadas depois de autorização, minimização e sanitização.
4. Especificações são dados declarativos, nunca código executável.
5. Operações persistentes exigem controle humano e verificação independente.
6. Nenhum dado real de cliente, título ou transação deve ser versionado neste repositório.
7. O repositório permanece público por decisão atual do mantenedor; essa condição é um risco aberto e não autoriza publicar dados reais.

## Níveis de risco

Classificar pelo pior efeito possível da automação:

| Nível | Definição | Exemplos | Controles mínimos |
|---|---|---|---|
| L0 | Inspeção de estrutura e metadados, sem leitura de valores operacionais | views, formulários e metadados de controles | escopo mínimo, allowlist e revisão de exposição |
| L1 | Leitura de dados operacionais | consultas e exportações autorizadas | autorização, minimização, proteção dos arquivos e sanitização |
| L2 | Preparação de ação sem persistência | preenchimento/preparação de campos antes de confirmação | prévia, validação, cancelamento e bloqueio contra avanço indevido |
| L3 | Alteração persistente | gravar, emitir, baixar, prorrogar ou excluir | confirmação humana, alvo inequívoco, sinal independente de sucesso, timeout, trava contra repetição e recuperação |

## Evidências, status e origem

Toda afirmação sobre tela, campo, controle, inserção, dependência, atalho, mensagem ou navegação deve preservar sua rastreabilidade.

### Status

| Status | Significado | Quando usar |
|---|---|---|
| **confirmado** | Observado diretamente em fonte ou teste autorizado e rastreável | Existe captura sanitizada ou teste manual que sustenta a afirmação |
| **inferido** | Interpretação plausível, ainda não verificada diretamente | A hipótese tem fundamento, mas precisa de confirmação |
| **desconhecido** | Não observado, sem evidência suficiente ou com fontes conflitantes | A lacuna deve permanecer explícita |

Um item **confirmado** só pode ter origem **captura** ou **teste manual**. Uma dedução não pode, isoladamente, confirmar uma afirmação.

### Origem

| Origem | Significado |
|---|---|
| **captura** | Captura visual ou registro autorizado, sanitizado e revisado |
| **teste manual** | Comportamento observado pelo mantenedor em ambiente Systêxtil autorizado |
| **dedução** | Interpretação de outras informações, sem observação direta daquele comportamento |

Cada linha de tabela deve ter exatamente um status e uma origem. Se a informação não foi observada, usar desconhecido + dedução e registrar a pergunta em aberto. A origem indica de onde veio a afirmação; não é, por si só, uma medida de certeza.

## Dados que não podem ser publicados

Não versionar nem compartilhar:
- CPF/CNPJ, nomes de clientes, pessoas ou operadores e dados de contato;
- títulos, duplicatas, números de documentos ou identificadores de transações reais;
- códigos de barras e linhas digitáveis reais;
- valores monetários, saldos ou condições financeiras reais;
- senhas, tokens, cookies, identificadores de sessão ou credenciais;
- e-mails pessoais ou corporativos quando associados a pessoas/contas internas;
- payloads, HARs, logs ou capturas brutas que contenham os dados acima;
- nomes de telas, campos, views, endpoints ou outros metadados internos cuja divulgação não esteja autorizada.

## Mascaramento obrigatório

Antes de qualquer tela, captura, texto, observação ou dado operacional entrar no repositório, substituir o valor real por marcador de categoria:

| Categoria | Marcador |
|---|---|
| CPF/CNPJ | `[CPF_CNPJ]` |
| Cliente | `[CLIENTE]` |
| Título/duplicata/documento | `[TITULO]` |
| Código de barras | `[CODIGO_BARRAS]` |
| Linha digitável | `[LINHA_DIGITAVEL]` |
| Valor monetário | `[VALOR_MONETARIO]` |
| Pessoa/operador | `[PESSOA]` |
| E-mail/dado de contato | `[DADO_CONTATO]` |
| Credencial/token/cookie/sessão | `[CREDENCIAL]`, `[TOKEN]`, `[COOKIE]`, `[SESSAO]` |

Os marcadores substituem o valor completo. Não conservar prefixos, sufixos, dígitos parciais, nomes incompletos ou fragmentos que permitam reconstrução. Para outras categorias, usar `[DADO_SENSIVEL]` ou marcador mais específico sem incorporar trecho do valor original.

A IA só deve receber texto ou evidência depois de o mantenedor mascarar os valores. Não colar valores reais para pedir que a IA faça a sanitização depois.

## Capturas de tela e campos com valores

Capturas de tela são manuais e devem ser consideradas sensíveis quando contiverem campos preenchidos. Antes de compartilhar:
- substituir os valores pelas categorias de marcador acima;
- ocultar conteúdo sensível em cabeçalhos, rodapés, tabelas, listas, mensagens, abas, URL e áreas secundárias;
- usar tarja opaca, sem desfoque fraco ou pixelização reversível;
- achatar a imagem sanitizada e remover metadados desnecessários;
- revisar a imagem final em tamanho integral.

Não anexar imagens brutas ao repositório, PR, issue, fixture ou pacote de IA. Para documentar inserções e dependências, registrar a ação e o efeito observado, não o conteúdo digitado. Se não for possível garantir a máscara, não compartilhar o artefato.

## Captura manual de rede — procedimento separado do Inspector

O Inspector read-only não intercepta XHR/fetch, não observa payloads e não captura requisições. Quando uma investigação exigir observar rede, a captura será manual, separada do Inspector e nunca automática, conforme ADR-012 se aplicável.

1. Confirmar autorização e limitar a captura à requisição necessária.
2. Usar as ferramentas de desenvolvimento do navegador durante a execução manual do fluxo autorizado. Não usar userscript, extensão, script ou serviço para capturar automaticamente.
3. Não salvar nem anexar HAR, request/response bruto ou export de rede ao repositório, PR ou pacote de IA.
4. Mascarar CPF/CNPJ, nomes, títulos, códigos de barras, linhas digitáveis, valores monetários, e-mails, dados de contato e credenciais com os marcadores definidos nesta seção.
5. Registrar somente metadados técnicos necessários e sanitizados; revisar também rota e parâmetros por possível exposição interna.
6. Revisar manualmente o conteúdo mascarado antes de copiar qualquer trecho.
7. Se a sanitização não puder ser garantida, descartar a captura ou mantê-la localmente fora do repositório em local autorizado; registrar apenas a lacuna.

Nenhum valor real ou artefato bruto de rede entra neste repositório, PR, fixture, log, screenshot ou pacote de contexto.

## Verificação de dados sensíveis

### Risco de visibilidade pública

<badge-placeholder>RISCO ABERTO</badge-placeholder> O repositório está público por decisão do mantenedor. Os metadados dos commits públicos também expõem o e-mail de autoria. O endereço não é reproduzido aqui.

A visibilidade pública não será alterada sem decisão explícita do mantenedor. Não reescrever o histórico como parte desta verificação. A existência de dados de autoria nos commits deve ser considerada risco de exposição mesmo que os arquivos versionados não contenham dados de clientes.

### Resultado da verificação de 2026-11-11

Foram revisados os arquivos versionados na `main`, as instruções em `.github/` e o conteúdo/diff dos 27 commits alcançáveis pela branch principal.

Achados, sem reproduzir valores sensíveis:
- **Telas/views e nomes de campos de produção:** nenhum identificador real de tela/campo foi identificado.
- **Endpoints de produção (incluindo padrões como UnifyNXJ.jsp):** nenhuma ocorrência identificada.
- **Clientes, pessoas, títulos e documentos reais:** nenhum dado operacional real identificado.
- **Códigos de barras e linhas digitáveis reais:** nenhum dado identificado.
- **CPF/CNPJ, valores monetários e e-mails nos arquivos:** nenhum valor real identificado pelos padrões e revisão aplicados.
- **Fixture demonstrativa:** há um identificador de formulário e um nome de campo explicitamente fictícios em um exemplo que se declara não representar tela real do ERP.
- **Metadados de commits:** o e-mail do autor aparece nos metadados públicos dos commits. Esse achado é uma exposição de dado de autoria, não um dado transacional do ERP.

**Conclusão:** não foi encontrado dado real operacional do ERP no conteúdo dos arquivos ou nos diffs revisados. A exposição do e-mail de autoria nos metadados públicos permanece como risco aberto. Nenhuma reescrita de histórico foi executada.

Esta revisão é pontual, relativa ao conteúdo e aos 27 commits alcançáveis pela `main` em 2026-11-11. Ela não substitui a revisão de futuras evidências, novos commits, anexos de PR ou conteúdo não versionado.

### Procedimento obrigatório para próximas alterações

Antes de cada commit que adicione ou altere evidências de tela, nomes técnicos, capturas ou dados operacionais:
1. Revisar arquivos atuais, novos diffs e conteúdo dos commits alcançáveis.
2. Pesquisar por telas, nomes de campos, views, formulários e endpoints (incluindo UnifyNXJ.jsp e similares).
3. Pesquisar por nomes de clientes/pessoas, títulos, documentos, códigos de barras, linhas digitáveis, CPF/CNPJ, valores monetários, e-mails pessoais/corporativos e credenciais.
4. Revisar manualmente os resultados e o contexto; buscas por padrões não detectam todos os casos.
5. Listar achados somente por categoria e caminho, sem reproduzir conteúdo sensível.
6. Confirmar mascaramento por marcadores e revisão humana antes de criar o commit.

**Condição de parada:** se for identificado dado real de ERP ou outro dado operacional sensível em arquivo ou commit, interromper a alteração e reportar ao mantenedor antes de prosseguir. Não apagar arquivos, reescrever histórico, remover branches nem alterar visibilidade como resposta automática.

## Userscripts

- Restringir @match ao host e caminho necessários.
- Declarar apenas @grant necessário.
- Usar unsafeWindow somente com justificativa documentada.
- Não introduzir dependências remotas.
- Evitar alteração de protótipos globais.
- Garantir inicialização idempotente e limpeza de listeners.
- Tratar DOM e mensagens da página como dados não confiáveis.
- Não considerar campo visualmente preenchido ou request enviado como confirmação de sucesso.

## Operações persistentes (L3)

Antes de alteração persistente:
- identificar registro-alvo sem ambiguidade;
- validar entradas e pré-condições;
- apresentar ação e consequência à pessoa;
- exigir confirmação explícita imediatamente antes da gravação;
- impedir repetição após timeout incerto;
- observar confirmação posterior independente e confiável;
- registrar resultado mínimo sem valores sensíveis;
- garantir interrupção e recuperação.

Em estado incerto, interromper e exigir conferência humana.

## Arquivos e pacotes

- Ignorar diretórios de evidência privada no Git.
- Não adicionar HAR, traces, screenshots sem sanitização ou exports operacionais.
- Validar JSON contra schemas estritos.
- Não executar conteúdo importado nem interpolar dados importados em comandos de shell.
- Revisar o conteúdo do pacote de IA antes de compartilhá-lo com serviços externos.
