# Ciclo de vida de uma automação

## 1. Solicitação

Registrar o problema, o processo atual, as regras confirmadas, as exceções, as pessoas responsáveis e o resultado esperado.

## 2. Investigação

Identificar visão, formulário, controles, permissões, sequência e sinais de confirmação. Guardar apenas metadados necessários. Não coletar valores reais por padrão.

## 3. Especificação

Definir objetivo e escopo; risco L0–L3; pré-condições e entradas; passos e resultados esperados; evidências associadas; critérios de sucesso; falhas, timeout e recuperação; pontos desconhecidos; confirmação humana necessária.

## 4. Pacote para IA

Incluir somente documentos e evidências necessários. Todo arquivo citado deve ter caminho e propósito. Exemplos devem ser identificados como fictícios.

## 5. Desenvolvimento

Implementar em branch própria, preservando padrões do repositório e isolando a funcionalidade. Não converter a especificação em executor genérico.

## 6. Verificação

Executar testes unitários e estáticos. Testar comportamento de browser em ambiente controlado. Não usar produção para experimentação destrutiva.

## 7. Homologação

Uma pessoa responsável confirma comportamento, segurança, critérios de sucesso e recuperação. Para L3, confirmar explicitamente a autorização para a operação e o sinal de conclusão.

## 8. Pull Request e manutenção

Documentar evidências, limitações, versão e responsável. Integrar somente após revisão autorizada. Monitorar regressões e atualizar a documentação quando o Systextil mudar.
