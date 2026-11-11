# Guia de investigação e mapeamento de telas

## Objetivo

Apoiar o mantenedor a entender a tela do Systêxtil antes de escrever código. A investigação deve produzir um mapa verificável do que existe na tela, como os dados são inseridos, quais campos dependem uns dos outros e como a navegação acontece.

Este guia descreve um procedimento manual. O resultado é **um arquivo Markdown por tela** em `docs/telas/`, preenchido pelo mantenedor com apoio da IA a partir do que ele descrever ou colar, sempre depois do mascaramento. Não implementa automação, não autoriza escrita no ERP e não amplia o escopo atual do Inspector.

Use [docs/telas/README.md](telas/README.md) para regras de preenchimento e [_modelo.md](telas/_modelo.md) como base obrigatória. Cada linha de cada tabela do mapa precisa de Status (confirmado, inferido ou desconhecido) e Origem (captura, teste manual ou dedução).

## Pré-condições

Antes de investigar:
- definir o objetivo operacional e o caminho de telas envolvido;
- confirmar autorização e ambiente em que a investigação pode ocorrer;
- identificar o resultado esperado e as regras conhecidas;
- planejar dados de teste fictícios ou massa autorizada;
- separar observações confirmadas, inferências e desconhecidos;
- revisar [SECURITY_MODEL.md](SECURITY_MODEL.md) antes de capturar ou registrar evidências.

Não usar registros reais em exemplos, fixtures, documentos ou capturas que serão compartilhadas.

## 1. Inventariar telas

Para cada tela relevante, registrar:
- identificador ou nome da tela/view/form, somente se sua divulgação estiver autorizada;
- finalidade da tela no processo;
- tela anterior e possíveis destinos;
- pré-condições para chegar até ela;
- controles relevantes e ações visíveis;
- origem da informação e resultado esperado.

Use identificadores genéricos em documentação pública quando o nome interno do ERP não puder ser divulgado. Não registrar URL, endpoint ou metadado interno automaticamente sem avaliação de exposição.

Crie um arquivo separado por tela investigada, copiando `docs/telas/_modelo.md`. Não agrupe telas diferentes em um mesmo arquivo; isso mantém a origem, os atalhos e as transições de cada tela rastreáveis.

## 2. Mapear campos e tipos

Para cada campo relevante, documentar metadados, sem valor digitado:
- nome técnico ou referência sanitizada, quando autorizado;
- rótulo apresentado ao operador;
- tipo observado (por exemplo: texto, número, data, seleção, checkbox, radio ou botão);
- se parece editável, somente leitura, desabilitado ou obrigatório;
- restrições ou formato observável;
- origem do dado (digitação, seleção, resultado de consulta, valor derivado ou outra fonte);
- evidência e grau de certeza.

Não inferir tipo só pelo rótulo. Confirmar pelo controle/metadata observável e indicar unknown quando não for possível.

## 3. Mapear ações de inserção

Descrever como o operador insere ou seleciona a informação, não o valor em si:
- qual campo recebe a informação;
- qual ação inicia a inserção (digitação, seleção, tecla, botão, consulta ou outra ação observada);
- sequência necessária (foco, preenchimento manual em ambiente autorizado, seleção, confirmação, blur/Enter ou outra etapa observada);
- o que acontece imediatamente depois;
- como o operador sabe que o sistema aceitou a ação;
- se a ação apenas prepara a tela ou grava alguma informação.

Não presumir que um valor visível foi aceito pelo ERP. Não registrar dados reais de clientes, títulos, documentos, códigos de barras ou linhas digitáveis. Use placeholders descritivos, nunca exemplos que se pareçam com um valor real.

## 4. Mapear dependências entre campos

Registrar relações de causa e efeito observadas:
- campo ou ação que inicia a mudança;
- campo ou componente afetado;
- efeito (habilitar/desabilitar, tornar obrigatório, carregar opções, preencher, limpar, validar ou alterar disponibilidade);
- condição necessária para reproduzir a mudança;
- resultado observado e evidência;
- status confirmado, inferido ou unknown.

Use dados fictícios ou massa expressamente autorizada. Não registrar o conteúdo dos valores usados para disparar dependências. Se a relação não puder ser reproduzida com segurança, registrar como desconhecida.

## 5. Mapear navegação entre telas

Para cada transição, registrar:
- tela de origem;
- pré-condições;
- ação que causa a transição;
- tecla ou botão específico que dispara a ação, se confirmado;
- rótulo genérico do botão ou comando, quando a identificação literal não puder ser divulgada;
- tela de destino;
- retorno, cancelamento ou navegação inversa, se observados;
- evidência e grau de certeza.

Exemplo abstrato: "Tela A — botão de consulta — Tela B". Não substituir uma tecla ou botão desconhecido por uma suposição.

## 6. Registrar evidências

Preferir notas estruturadas e diagramas simples sem valores reais. Capturas de tela são manuais e opcionais; podem conter campos preenchidos e, por isso, devem ser tratadas como dados sensíveis até serem sanitizadas.

Antes de qualquer registro ou compartilhamento, substituir integralmente os valores por marcadores, por exemplo:
- CPF/CNPJ por `[CPF_CNPJ]`;
- nomes de clientes por `[CLIENTE]` e nomes de pessoas/operadores por `[PESSOA]`;
- números de títulos, duplicatas e documentos por `[TITULO]`;
- códigos de barras por `[CODIGO_BARRAS]`;
- linhas digitáveis por `[LINHA_DIGITAVEL]`;
- valores monetários por `[VALOR_MONETARIO]`;
- dados de contato por `[DADO_CONTATO]`;
- senhas, tokens, cookies e identificadores de sessão por marcadores de categoria que não revelem nenhum trecho do valor.

Não manter prefixos, sufixos ou qualquer parte que permita reconstruir o conteúdo. Não colocar capturas brutas, HARs ou imagens não sanitizadas no repositório, PR, issue, fixture ou pacote de IA. A verificação de dados sensíveis deve estar concluída antes de qualquer commit que adicione evidência de tela ou dado operacional, conforme [SECURITY_MODEL.md](SECURITY_MODEL.md#verificação-de-dados-sensíveis).

Se não for possível garantir a máscara, não compartilhar o artefato. Descartar a captura ou mantê-la fora do repositório, em local autorizado, somente pelo tempo estritamente necessário.

## 7. Limites do Inspector

A ADR-008 permanece vigente: o Inspector é read-only, limitado a metadados allowlisted, sem ler valores de campos, interceptar rede, preencher controles, acionar botões/teclas ou navegar registros.

O mapeamento de inserções, dependências e navegação neste guia é feito por observação manual e anotação pelo investigador. A ADR-013 contém somente uma proposta para avaliar se metadados de controles editáveis podem ser incluídos em uma allowlist. Ela não foi aceita e não autoriza alterar ou implementar o Inspector.

## 8. Critério de conclusão do mapa

O mapa está pronto para revisão quando:
- todas as telas relevantes do escopo estão listadas;
- os campos relevantes têm tipo e metadados ou unknown explícito;
- as ações e a sequência de inserção estão descritas;
- dependências observadas têm origem, efeito e evidência;
- transições identificam origem, ação, tecla/botão e destino, ou marcam a lacuna;
- evidências foram revisadas e sanitizadas;
- nenhum valor real foi incluído;
- existe um arquivo em `docs/telas/` para cada tela relevante;
- todas as tabelas possuem Status e Origem preenchidos em cada linha;
- o mantenedor revisou os mapas antes da especificação e da codificação.

Mapeamento incompleto não deve ser disfarçado como confirmado. Registrar a lacuna e decidir se ela bloqueia a automação.
