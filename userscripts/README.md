# Userscripts de apoio

Esta pasta é reservada a userscripts que apoiam o próprio Systextil Script Builder, como ferramentas de inspeção read-only, quando aprovadas.

**Este repositório não guarda userscripts de produção. Eles ficam no repositório de automações (Systextil-envio-mensagem ou outro indicado pelo mantenedor).** Não copiar, espelhar ou manter versões de automações de produção nesta pasta.

## Regras para ferramentas de apoio

- Cada ferramenta de apoio deve ser independente.
- Usar JavaScript nativo compatível com o ambiente de browser suportado.
- Manter cabeçalho Tampermonkey e @match restrito.
- Declarar somente permissões necessárias.
- Evitar dependências externas, @require e CDNs.
- Incluir controle de inicialização duplicada e limpeza de listeners.
- Documentar metadados técnicos e limitações sem incorporar dados reais.
- Não capturar valores reais por padrão.
- O Inspector permanece read-only conforme ADR-008.
- Operações persistentes não fazem parte do papel das ferramentas de apoio.

## Estrutura futura

Ferramentas de apoio serão nomeadas por função, por exemplo `systextil-inspector.user.js`. Bibliotecas compartilhadas só serão extraídas quando houver mais de um consumidor comprovado e estratégia clara de distribuição.
