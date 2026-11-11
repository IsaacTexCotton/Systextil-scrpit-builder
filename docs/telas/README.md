# Mapas de tela do Systêxtil

## Finalidade da pasta

Esta pasta guarda **um arquivo Markdown por tela** investigada do Systêxtil. Cada arquivo documenta o que o mantenedor observou sobre campos, controles, inserções, dependências, atalhos, mensagens e navegação.

Para iniciar o mapa de uma tela:
1. Copie [_modelo.md](_modelo.md) para um novo arquivo, usando um nome funcional e sanitizado, por exemplo `consulta-lote-titulos.md`.
2. Descreva a tela, seu caminho de acesso e o que foi observado.
3. A IA pode ajudar a organizar as informações que o mantenedor descrever ou colar neste modelo. A IA não deve completar lacunas por suposição nem converter inferências em fatos.
4. Preencha o status e a origem de cada linha de tabela. Mantenha os itens não observados como desconhecidos.
5. Revise o arquivo inteiro e confirme a sanitização antes de qualquer commit.

O arquivo de uma tela é um **registro de investigação em andamento**. Ele não é uma especificação de automação aprovada, não comprova autorização operacional e não autoriza escrever código ou executar ações no ERP. A especificação formal só pode ser construída depois da revisão do mapeamento, com critérios de aceite, risco, pré-condições e sinais independentes de sucesso.

## Regra obrigatória de mascaramento

**Todo valor real deve ser substituído por um marcador antes de entrar no repositório.** Não cole valores reais na conversa com a IA, no arquivo temporário de trabalho, em uma issue, PR, fixture ou pacote de contexto destinado a ser compartilhado.

Substitua integralmente, sem prefixos ou sufixos recuperáveis:
- nomes de clientes/pessoas por `[CLIENTE]` ou `[PESSOA]`;
- CPF/CNPJ por `[CPF_CNPJ]`;
- números de títulos/documentos por `[TITULO]`;
- código de barras por `[CODIGO_BARRAS]`;
- linha digitável por `[LINHA_DIGITAVEL]`;
- valores monetários por `[VALOR_MONETARIO]`;
- dados não previstos acima por um marcador de categoria, como `[DADO_SENSIVEL]`.

Os exemplos mascarados devem demonstrar somente formato ou categoria, nunca se parecer com um valor real. Marcadores não devem conter partes reais do valor substituído.

A regra vale para texto digitado, listas, grades, mensagens, cabeçalhos, rodapés, URLs, capturas de tela, anexos e qualquer informação colada para a IA. Capturas de tela e capturas de rede também seguem o procedimento em [../SECURITY_MODEL.md](../SECURITY_MODEL.md).

A verificação de dados sensíveis permanece pendente e deve ser executada antes de qualquer novo commit com evidência de tela ou dado operacional.

## Status de cada linha

Use exatamente um dos seguintes valores na coluna **Status** de todas as tabelas:

- **confirmado** — observado diretamente em captura sanitizada ou teste manual autorizado. A origem e o contexto precisam estar indicados.
- **inferido** — interpretação plausível baseada em outras evidências, mas ainda não verificada diretamente. Não usar como fato de implementação.
- **desconhecido** — não foi observado, não há evidência suficiente ou existem observações conflitantes. Deve permanecer explícito até confirmação.

Um status confirmado exige evidência rastreável. A IA não pode marcar algo como confirmado apenas porque a explicação parece consistente.

## Origem de cada linha

Use exatamente um dos valores abaixo na coluna **Origem**:

- **captura** — informação extraída de captura de tela, imagem ou registro visual autorizado e sanitizado.
- **teste manual** — comportamento observado pelo mantenedor ao executar manualmente a ação em ambiente Systêxtil autorizado.
- **dedução** — interpretação ou lacuna identificada a partir de outras informações, sem observação direta daquele comportamento.

A origem informa de onde veio a afirmação; não determina por si só se ela é verdadeira. Exemplo: uma dedução pode ter status inferido ou desconhecido, mas não deve ser marcada como confirmado sem observação direta.

Quando ainda não houver evidência para uma linha de cobertura, use **desconhecido** + **dedução** para indicar que a lacuna foi identificada durante a análise. Não invente uma captura ou um teste manual para preencher a coluna.

## Rastreabilidade e revisão

- Cada linha de cada tabela deve ter Status e Origem preenchidos.
- Não misture vários campos, atalhos, mensagens ou transições em uma única linha quando tiverem comportamentos diferentes.
- Registre a origem com detalhe suficiente na descrição ou nas observações (data, tela, captura sanitizada ou teste manual), sem incluir dados reais.
- Um mesmo atalho pode ter funções diferentes dependendo da tela, do foco ou do controle; registre a pré-condição.
- F2, F7, F9, Enter, Tab, Esc e outras teclas devem ser investigadas, não presumidas.
- Mensagens de erro e confirmação devem ter seus padrões sanitizados e indicar se bloqueiam a operação.
- Pressionar uma tecla, clicar em um botão ou preencher um campo não é, isoladamente, sinal de sucesso.
- Se o comportamento não puder ser confirmado com segurança, mantenha-o como desconhecido e liste-o na seção Desconhecidos.
