# Estratégia de testes

## Objetivo

Manter testes locais simples, reproduzíveis e sem dependência de CI/CD.

## Camadas

1. **Schema:** validação de contratos JSON e exemplos.
2. **Unitário:** regras puras do núcleo local.
3. **Integração local:** leitura de fixtures e geração de arquivos em diretório temporário.
4. **Browser:** comportamento do Inspector em DOM controlado.
5. **Homologação Systextil:** teste manual em ambiente autorizado.

## Comandos

    npm test
    npm run check
    npm run validate:examples

## Regras

- Fixtures devem ser fictícias e determinísticas.
- Não usar conexão de produção em testes automatizados.
- Não inserir dados reais em snapshots.
- Testar caminhos inválidos, schema incompatível, campos ausentes e propriedades extras.
- Testar timeout, cancelamento, repetição e estado incerto nas automações de browser.
- Documentar explicitamente o que não foi testado.

## Homologação manual

Para cada userscript, registrar browser e versão, versão do userscript, ambiente Systextil, visão/formulário, pré-condições, passos executados, resultado observado, evidência sanitizada e responsável pelo aceite.

A homologação manual não deve ser substituída por um teste de DOM ou por uma resposta de IA.
