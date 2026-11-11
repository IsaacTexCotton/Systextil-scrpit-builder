# Estratégia de testes

Manter testes locais, reproduzíveis e sem dependência de CI/CD. Os critérios completos estão em [QUALITY_GATES.md](QUALITY_GATES.md).

## Camadas
1. Schema e fixtures.
2. Unitários de regras puras.
3. CLI: argumentos, caminhos, permissões, erros e exit codes.
4. Integração local em diretório temporário.
5. Segurança: traversal, symlink, allowlist, tamanho, segredo e conteúdo não confiável.
6. Browser: Inspector em DOM controlado.
7. Homologação Systextil em ambiente autorizado.

## Comandos

    npm test
    npm run check
    npm run validate:examples

Após existir lockfile, usar npm ci em instalação limpa.

## Regras
- Fixtures fictícias e determinísticas.
- Sem conexão com produção em testes automatizados.
- Sem dados reais em snapshots.
- Cobrir schema incompatível, ausências, propriedades extras e limites.
- Cobrir timeout, cancelamento, repetição e estado incerto.
- Verificar que erros não vazam conteúdo sensível.
- Documentar o que não foi testado.

## Homologação
Registrar browser, Tampermonkey, versão do script, ambiente Systextil, views/forms, pré-condições, passos, resultados, evidências sanitizadas e responsável. Teste DOM/unitário não substitui homologação.
