---
applyTo: "src/**/*.js"
---

# Regras para JavaScript executado em Node.js

- Use ES Modules e imports explícitos.
- Prefira APIs nativas do Node.js; justifique dependências adicionais.
- Valide caminhos e conteúdo de arquivos antes de processar.
- Leia arquivos com tratamento de erros; nunca execute conteúdo importado.
- Não use eval, new Function, subprocessos ou comandos de shell construídos a partir de dados externos.
- Não escreva fora do diretório de saída definido pelo usuário.
- Mensagens de erro não devem imprimir documentos completos ou dados sensíveis.
- Mantenha funções determinísticas sempre que possível e cubra casos extremos com node:test.
