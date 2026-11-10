# Userscripts

Cada automação de produção ou ferramenta de inspeção deverá ser um userscript independente.

## Regras

- Usar JavaScript nativo compatível com o ambiente de browser suportado.
- Manter cabeçalho Tampermonkey e @match restrito.
- Declarar somente permissões necessárias.
- Evitar dependências externas, @require e CDNs.
- Incluir controle de inicialização duplicada e limpeza de listeners.
- Documentar views, campos, estados, sinais de sucesso e limitações com evidências.
- Não capturar valores reais por padrão.
- Operações L3 exigem confirmação humana e homologação específica.

## Estrutura futura

Scripts serão nomeados por funcionalidade, por exemplo systextil-inspector.user.js. Bibliotecas compartilhadas só serão extraídas quando houver mais de um consumidor comprovado e estratégia clara de distribuição.
