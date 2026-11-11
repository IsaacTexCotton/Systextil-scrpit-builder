# Manifesto de contexto para IA

A especificação de geração está em [CONTEXT_PACKAGE_SPEC.md](CONTEXT_PACKAGE_SPEC.md).

## Regras
- Incluir AGENTS.md e instruções aplicáveis.
- Incluir a especificação e somente evidências referenciadas.
- Selecionar documentação NXJ por view/form/funcionalidade.
- Priorizar fontes normativas e código homologado.
- Marcar exemplos como fictícios.
- Excluir segredos, dados reais, arquivos privados, logs brutos e capturas não sanitizadas.
- Preservar caminho, versão/commit, hash e finalidade.
- Usar allowlist; nunca incluir o repositório inteiro automaticamente.
- Rejeitar traversal, symlinks fora da raiz, binários e referências inexistentes.
- Limitar tamanho/quantidade e deduplicar por hash.
- Declarar lacunas quando fonte estiver ausente.

## Confiança
- normative: regra do repositório ou documentação oficial.
- verified-evidence: observação confirmada no ambiente identificado.
- example: fixture fictícia.
- informational: contexto que não prova o comportamento atual.

## Estado
Geração ainda não implementada. Este documento define os requisitos.
