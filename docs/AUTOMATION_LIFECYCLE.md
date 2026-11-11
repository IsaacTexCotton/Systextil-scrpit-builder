# Ciclo de vida de uma automação

## 1. Solicitação

Registrar o problema, o processo atual, as regras confirmadas, as exceções e o resultado esperado. Identificar a tela e o fluxo de navegação envolvidos. A dificuldade principal a resolver é entender a tela antes de escrever código.

## 2. Investigação e mapeamento da tela

Antes de codificar, o mantenedor precisa de apoio para mapear a tela e como o fluxo funciona. Seguir o procedimento de [SCREEN_INVESTIGATION.md](SCREEN_INVESTIGATION.md).

O mapa deve cobrir:
- campos relevantes e seus tipos/metadados;
- ações e sequência de inserção de dados;
- dependências entre campos e seus efeitos observáveis;
- navegação entre telas, identificando tela de origem, ação, tecla/botão disparador e tela de destino.

Registrar cada observação como confirmada, inferida ou desconhecida. Não presumir comportamento que não foi observado.

**Registro obrigatório:** criar um arquivo Markdown por tela em `docs/telas/`, copiando `docs/telas/_modelo.md`. O mantenedor pode descrever o que observou ou colar texto já sanitizado para que a IA organize o arquivo. A IA não pode inventar comportamentos, preencher lacunas como fatos ou marcar uma linha como confirmada sem evidência direta. Todas as linhas de tabela devem ter Status (confirmado, inferido ou desconhecido) e Origem (captura, teste manual ou dedução). Consulte [docs/telas/README.md](telas/README.md).

O Inspector coleta somente metadados allowlisted, permanece read-only e não lê valores de campos nem intercepta requisições de rede (ADR-008). Inserções, dependências e transições são observadas manualmente. A proposta ADR-013 não foi aceita e não autoriza mudanças no Inspector.

### Captura manual de rede, quando necessária

A captura de requisições é separada do Inspector e nunca é automática. O mantenedor/investigador deve realizá-la manualmente nas ferramentas de desenvolvimento do navegador, somente com autorização e seguindo integralmente o procedimento de "Captura manual de rede" em [SECURITY_MODEL.md](SECURITY_MODEL.md), conforme ADR-012.

Valores de CPF/CNPJ, títulos reais, nomes, códigos de barras, linhas digitáveis, credenciais, tokens, cookies, identificadores de sessão e demais dados pessoais/financeiros devem ser mascarados antes de qualquer registro. Capturas brutas, HARs e payloads reais nunca entram no repositório, PR, fixture ou pacote de contexto.

### Capturas de tela e campos com valores

A captura de tela também é manual e separada do Inspector. Qualquer imagem que contenha campos preenchidos ou valores operacionais deve passar pelo mesmo procedimento de mascaramento: CPF/CNPJ, títulos/documentos reais, nomes, códigos de barras, linhas digitáveis, dados pessoais/financeiros, credenciais e identificadores de sessão devem ser integralmente ocultados antes de registrar ou compartilhar. Não anexar imagens brutas ao repositório, PR, fixture ou pacote de contexto. Se a máscara não puder ser garantida, não compartilhar a captura.

## 3. Especificação

**Pré-condição obrigatória:** não iniciar a especificação até que exista um arquivo de mapeamento revisado para cada tela relevante do fluxo em `docs/telas/`. Lacunas podem permanecer como desconhecidas, mas devem estar registradas e avaliadas quanto ao impacto.

Definir objetivo e escopo; risco L0–L3; pré-condições e entradas; campos/tipos; sequência e ações de inserção; dependências; transições; atalhos e navegação por colunas; mensagens; sinais independentes de sucesso; evidências associadas; critérios de sucesso; falhas, timeout e recuperação; pontos desconhecidos; confirmação humana necessária.

## 4. Pacote para IA

Incluir somente documentos e evidências necessários. Todo arquivo citado deve ter caminho e propósito. Exemplos devem ser identificados como fictícios. Não incluir capturas brutas de rede, imagens não sanitizadas ou dados reais, mesmo que tenham sido coletados manualmente para análise.

## 5. Desenvolvimento

Implementar em branch própria, preservando padrões do repositório de produção indicado pelo mantenedor e isolando a funcionalidade. Este repositório mantém apenas método e ferramentas de apoio; não recebe cópias de userscripts de produção. Não converter a especificação em executor genérico.

## 6. Verificação

Executar testes locais e estáticos. Testar comportamento de browser em ambiente controlado. Não usar produção para experimentação destrutiva. Diferenciar claramente testes executados, não executados e impossíveis.

## 7. Homologação

O próprio mantenedor executa o teste no Systêxtil autorizado, confirma comportamento, segurança, critérios de sucesso e recuperação, e registra na PR o ambiente autorizado, versão, casos executados, resultados, limitações e decisão. Para L3, confirmar explicitamente a autorização para a operação e o sinal independente de conclusão.

## 8. Pull Request e manutenção

Abrir PR focada e manter os testes locais registrados. O mantenedor é o único responsável e faz a auto-revisão e o aceite final; não há revisor separado. Registrar o aceite e o resultado da homologação na conversa da PR. Integrar somente por ação explícita do mantenedor. Monitorar regressões e atualizar a documentação quando o Systêxtil mudar.
