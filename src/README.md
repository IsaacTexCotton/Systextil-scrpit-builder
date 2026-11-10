# Código-fonte

O código local será separado por responsabilidade:

- core/: validação, regras puras e modelos;
- cli/: interface de linha de comando;
- context/: seleção e leitura de documentos permitidos;
- generators/: geração determinística de Markdown/JSON.

Não criar camadas vazias ou abstrações sem consumidor real.
