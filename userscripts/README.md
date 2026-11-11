# Userscripts de apoio

Esta pasta é reservada exclusivamente a userscripts que apoiam o próprio Systextil Script Builder, por exemplo o Inspector read-only.

**Não armazenar aqui automações de produção.** O código de produção continua no repositório [Systextil-envio-mensagem](https://github.com/IsaacTexCotton/Systextil-envio-mensagem) ou em outro repositório indicado explicitamente pelo mantenedor. Não copiar, espelhar ou versionar aqui cópias desses scripts.

## Regras para ferramentas de apoio

- Usar JavaScript nativo compatível com o ambiente de browser suportado.
- Manter cabeçalho Tampermonkey e `@match` restrito.
- Declarar somente permissões necessárias.
- Evitar dependências externas, `@require` e CDNs.
- Incluir controle de inicialização duplicada e limpeza de listeners.
- Manter o Inspector read-only, sem leitura de valores de campos e sem interceptação de rede.
- Não capturar valores reais por padrão.
- Exportar somente metadados allowlisted e evidências sanitizadas após ação explícita.
- Não executar código recebido do Studio ou de arquivos importados.

## Estrutura

Ferramentas de apoio devem ser nomeadas por função, por exemplo `systextil-inspector.user.js`. Bibliotecas compartilhadas só serão extraídas quando houver mais de um consumidor comprovado e estratégia clara de distribuição.
