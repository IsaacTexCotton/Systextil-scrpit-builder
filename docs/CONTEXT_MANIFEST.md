# Manifesto de contexto para IA

O manifesto de contexto deverá determinar quais documentos são incluídos em cada pacote gerado.

## Regras

- Incluir AGENTS.md e instruções de caminho aplicáveis.
- Incluir a especificação da automação e somente as evidências referenciadas.
- Selecionar documentação NXJ por tela, formulário e funcionalidade.
- Priorizar documentação normativa e código existente homologado.
- Marcar exemplos como exemplos; nunca tratá-los como evidência da instalação atual.
- Excluir segredos, dados reais, arquivos privados, logs brutos e capturas não sanitizadas.
- Preservar caminho, versão/commit e finalidade de cada documento.
- Quando a fonte estiver ausente, declarar a lacuna no prompt em vez de inventar uma solução.

## Categorias de confiança

- normative: regra do repositório ou documentação técnica oficial.
- verified-evidence: observação confirmada no ambiente identificado.
- example: fixture ou exemplo fictício.
- informational: referência contextual que não prova o comportamento atual.

## Estado

A geração automática do pacote ainda não foi implementada. Este documento define as regras que a implementação deverá seguir.
