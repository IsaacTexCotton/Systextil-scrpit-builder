# Fluxo de uso planejado do Studio

Este fluxo descreve o produto alvo; não afirma que as telas já estejam implementadas.

## Projetos
Criar projeto com identificador, título, responsável, estado, objetivo e risco preliminar. Estados: draft, discovery, evidence-review, specification, ready-for-ai, implementation, verification, homologation, approved e archived. Transições explícitas; não aprovar sem gates.

## Solicitação
Registrar problema, resultado esperado, processo manual, regras, exceções, entradas/fontes, saídas, frequência/volume, telas conhecidas, impacto de erro, critérios de aceite e unknowns. Não solicitar dados reais de clientes.

## Investigação
Gerar checklist; operador abre Systextil e usa Inspector. Diferenciar metadado automático, observação manual, hipótese e desconhecido.

## Revisão de evidências
Mostrar views, formulários, controles e observações. Permitir remover/editar itens e revisar sanitização antes da exportação. Não mostrar nem persistir valores dos campos.

## Especificação
Apresentar objetivo, risco, inputs, pré-condições, passos, sucesso, timeout, falhas, recuperação, confirmação humana e unknowns. Especialista aprova regras.

## Pacote de IA
Prévia dos arquivos, motivo, confiança, versão e tamanho. Revisão e exportação local; sem envio automático.

## Desenvolvimento e homologação
Acompanhar links de branch/PR, versão, testes, checklist e aceite. Studio não executa código gerado no ERP.

## Princípios de UX
Mostrar bloqueios antes de avançar; não esconder unknowns; nunca mostrar sucesso em estado incerto; histórico sem dados sensíveis; import/export local com validação; cancelamento e exclusão de dados claros.
