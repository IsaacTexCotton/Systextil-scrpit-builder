# Fluxo de uso planejado do Studio

Este fluxo descreve o produto alvo; não afirma que as telas já estejam implementadas. O ponto principal é apoiar o mantenedor a mapear a tela antes de escrever código.

## Projetos

Criar projeto com identificador, título, responsável, estado, objetivo e risco preliminar. Estados: draft, discovery, screen-mapping, evidence-review, specification, ready-for-ai, implementation, verification, homologation, approved e archived. Transições explícitas; não aprovar sem gates.

## Solicitação

Registrar problema, resultado esperado, processo manual, regras, exceções, entradas/fontes, saídas, frequência/volume, telas e fluxos conhecidos, impacto de erro, critérios de aceite e unknowns. Não solicitar dados reais de clientes.

## Investigação e mapeamento da tela

Gerar checklist de investigação. O mantenedor abre o Systêxtil autorizado e observa a tela, usando o Inspector somente para metadados dentro da ADR-008.

Deve existir um arquivo Markdown por tela em `docs/telas/`, copiado de `_modelo.md`. O mantenedor descreve ou cola informações já sanitizadas e a IA ajuda a organizá-las nesse formato. Cada linha de tabela recebe Status e Origem; a IA não presume funções de teclas nem marca fatos como confirmados sem evidência.

O mapa da tela deve apresentar quatro áreas:

1. **Campos e tipos:** campo/identificador técnico quando permitido, rótulo sanitizado, tipo, editabilidade, obrigatoriedade e restrições observáveis.
2. **Inserções:** ação usada para inserir ou selecionar dado, sequência, tecla/botão/evento observado e resultado esperado. Registrar o procedimento, nunca o valor real.
3. **Dependências:** campo/ação de origem, campo afetado e efeito observado (habilitar, desabilitar, tornar obrigatório, carregar opções, preencher, limpar ou validar).
4. **Navegação:** tela de origem, pré-condição, ação de navegação, tecla ou botão que dispara, tela de destino e forma de retorno quando conhecida.

O fluxo distingue metadado do Inspector, observação manual, inferência e desconhecido. A captura manual de rede continua separada do Inspector conforme ADR-012. Capturas de tela com valores seguem as mesmas regras de mascaramento descritas em SECURITY_MODEL.md.

## Revisão de evidências

Revisar um arquivo por tela em `docs/telas/` antes da especificação. Mostrar views, formulários, controles, mapa de inserção, dependências, transições, atalhos, mensagens, sinais de sucesso e observações. Permitir remover/editar itens e revisar sanitização antes da exportação. Não mostrar nem persistir valores dos campos via Inspector. Antes de compartilhar evidências, o mantenedor revisa telas e dados sensíveis.

## Especificação

Apresentar objetivo, risco, campos e tipos, inputs, pré-condições, sequência de inserção, dependências, navegação, passos, sucesso, timeout, falhas, recuperação, confirmação humana e unknowns. Não gerar código enquanto lacunas críticas de tela ou fluxo não estiverem registradas.

## Pacote de IA

Prévia dos arquivos, motivo, confiança, versão e tamanho. Revisão e exportação local; sem envio automático. Incluir somente mapa e imagens sanitizadas, nunca dados reais ou capturas brutas.

## Desenvolvimento e homologação

Acompanhar links de branch/PR, versão, testes, checklist e aceite. Código de produção segue no repositório de produção indicado. Studio não executa código gerado no ERP.

## Princípios de UX

Mostrar bloqueios antes de avançar; não esconder unknowns; nunca mostrar sucesso em estado incerto; histórico sem dados sensíveis; import/export local com validação; cancelamento e exclusão de dados claros.
