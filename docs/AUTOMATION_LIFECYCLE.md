# Ciclo de vida de uma automação

## 1. Solicitação

Registrar o problema, a dificuldade percebida, o processo atual, as regras confirmadas, as exceções e o resultado esperado. Não presumir a causa da dificuldade antes da investigação.

## 2. Investigação

Identificar visão, formulário, controles, permissões, sequência e sinais de confirmação. O Inspector coleta somente metadados allowlisted, permanece read-only e não lê valores de campos nem intercepta requisições de rede.

### Captura manual de rede, quando necessária

A captura de requisições é separada do Inspector e nunca é automática. O mantenedor/investigador deve realizá-la manualmente nas ferramentas de desenvolvimento do navegador, somente com autorização e seguindo integralmente o procedimento de "Captura manual de rede" em [SECURITY_MODEL.md](SECURITY_MODEL.md), conforme ADR-012.

Valores de CPF/CNPJ, títulos reais, nomes, códigos de barras, linhas digitáveis, credenciais, tokens, cookies, identificadores de sessão e demais dados pessoais/financeiros devem ser mascarados antes de qualquer registro. Capturas brutas, HARs, payloads reais e screenshots não sanitizados nunca entram no repositório, PR, fixture ou pacote de contexto. Se a máscara não puder ser garantida, a evidência não será compartilhada.

## 3. Especificação

Definir objetivo e escopo; risco L0–L3; pré-condições e entradas; passos e resultados esperados; evidências associadas; critérios de sucesso; falhas, timeout e recuperação; pontos desconhecidos; confirmação humana necessária.

## 4. Pacote para IA

Incluir somente documentos e evidências necessários. Todo arquivo citado deve ter caminho e propósito. Exemplos devem ser identificados como fictícios. Não incluir capturas brutas de rede nem dados reais, mesmo que tenham sido coletados manualmente para análise.

## 5. Desenvolvimento

Implementar em branch própria, preservando padrões do repositório de produção indicado pelo mantenedor e isolando a funcionalidade. Este repositório mantém apenas método e ferramentas de apoio; não recebe cópias de userscripts de produção. Não converter a especificação em executor genérico.

## 6. Verificação

Executar testes locais e estáticos. Testar comportamento de browser em ambiente controlado. Não usar produção para experimentação destrutiva. Diferenciar claramente testes executados, não executados e impossíveis.

## 7. Homologação

O próprio mantenedor executa o teste no Systêxtil autorizado, confirma comportamento, segurança, critérios de sucesso e recuperação, e registra na PR o ambiente autorizado, versão, casos executados, resultados, limitações e decisão. Para L3, confirmar explicitamente a autorização para a operação e o sinal independente de conclusão.

## 8. Pull Request e manutenção

Abrir PR focada e manter os testes locais registrados. O mantenedor é o único responsável e faz a auto-revisão e o aceite final; não há revisor separado. Registrar o aceite e o resultado da homologação na conversa da PR. Integrar somente por ação explícita do mantenedor. Monitorar regressões e atualizar a documentação quando o Systêxtil mudar.
