# Especificação do pacote de contexto para IA

## Estrutura lógica
1. README: objetivo, risco, escopo e instruções.
2. automation-spec.json e automation-spec.md.
3. Evidências referenciadas, sanitizadas e aprovadas.
4. Contexto técnico selecionado pelo manifesto.
5. Checklist de segurança e testes.
6. Prompt principal.
7. manifest.json com origem e hashes.

## Manifesto por arquivo
Caminho relativo, finalidade, categoria de confiança, commit/versão, hash SHA-256, tamanho, status de sanitização e razão de inclusão.

## Seleção segura
- Allowlist por padrão e denylist para segredos/dados privados.
- Resolver caminhos dentro de raiz permitida.
- Rejeitar traversal, symlink fora da raiz e binários não aprovados.
- Limitar quantidade de arquivos e bytes totais.
- Deduplicar por hash.
- Não seguir links externos.
- Não executar scripts, macros ou conteúdo importado.
- Nunca incluir o repositório inteiro automaticamente.

## Conteúdo exigido no prompt
1. Ler AGENTS.md e instruções aplicáveis.
2. Confirmar objetivo, escopo e critérios.
3. Classificar fatos, inferências e desconhecidos.
4. Apresentar plano e arquivos antes de editar.
5. Não inventar APIs, campos, seletores ou comportamento NXJ.
6. Implementar menor mudança possível.
7. Executar testes e relatar resultados reais.
8. Revisar segurança, permissões e impacto.
9. Listar limitações e homologações pendentes.
10. Não fazer merge nem escrita no ERP sem autorização.

## Saída
Gravar em diretório local ignorado pelo Git. Revisão final antes de compartilhar. Sem upload, sincronização ou chamada automática de IA no MVP.

## Testes
Caminho inexistente, traversal, symlink, arquivo fora da allowlist, tamanho excedido, duplicata, marcador de segredo, evidência não revisada, hash divergente, pacote determinístico e referência quebrada.
