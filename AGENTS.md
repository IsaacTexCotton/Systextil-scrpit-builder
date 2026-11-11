# Instruções para agentes de IA

Estas regras se aplicam a qualquer agente ou assistente que trabalhe neste repositório. Leia este arquivo antes de planejar ou modificar código.

## 1. Missão e limites

O Systextil Script Builder transforma necessidades operacionais em especificações técnicas e pacotes de contexto para desenvolver userscripts específicos do Systextil NXJ.

- Não transforme o projeto em um executor universal de comandos do ERP.
- Não implemente uma operação de negócio sem evidência da tela, regra confirmada e critérios observáveis.
- Não considere código gerado por IA como validado ou pronto para produção.
- Não altere automações de produção fora do escopo solicitado.

## 2. Processo obrigatório antes de codificar

1. Leia este arquivo, README.md, CONTRIBUTING.md e os documentos relevantes de docs/.
2. Inspecione os arquivos e padrões existentes antes de propor substituições.
3. Resuma objetivo, comportamento atual, comportamento esperado e critérios de aceite.
4. Classifique o risco da alteração e identifique se ela lê ou grava dados no ERP.
5. Liste hipóteses, evidências disponíveis, lacunas e dependências externas.
6. Proponha a menor solução que preserve compatibilidade e funcionalidades existentes.
7. Consulte documentação oficial atualizada (Context7 ou documentação do fornecedor) quando usar APIs, bibliotecas, ferramentas ou recursos sujeitos a mudança.

Não faça perguntas repetidas quando a resposta já estiver no contexto. Quando faltar informação não essencial, declare uma hipótese conservadora e marque-a para validação.

## 3. Veracidade e evidências

- Nunca invente nomes de formulários, campos, seletores, eventos, endpoints ou comandos NXJ.
- Marque cada informação técnica como confirmada, inferida ou desconhecida.
- A evidência deve apontar como foi obtida, em qual tela/visão e em qual contexto.
- Não conclua que uma operação funcionou somente porque um campo recebeu texto ou porque uma requisição foi enviada.
- Sucesso de operação de escrita exige confirmação posterior por um sinal de estado confiável e independente.
- Diferencie testes executados, testes não executados e testes impossíveis no ambiente disponível.

## 4. Regras de implementação

- Use JavaScript moderno e módulos ES no código executado por Node.js.
- Userscripts Tampermonkey devem ser independentes, nativos e específicos da funcionalidade.
- Não adicione @require, bibliotecas remotas ou novos hosts sem justificativa e aprovação.
- Justifique qualquer uso de unsafeWindow; não o use apenas por conveniência.
- Prefira funções pequenas, nomes explícitos, módulos coesos e dependências mínimas.
- Valide entradas externas e arquivos importados com schemas versionados.
- Não use eval, new Function ou execução de código recebido em JSON.
- Não armazene segredos no código, nos exemplos, nos logs ou no histórico Git.
- Não capture valores de campos do ERP por padrão. Inspecione metadados; leitura de valores deve ser explícita, justificada e minimizada.
- Não use dependências de runtime no userscript sem aprovação arquitetural.

## 5. Segurança e risco operacional

Use a classificação definida em docs/SECURITY_MODEL.md:

- L0: inspeção estática e leitura de metadados.
- L1: leitura de dados operacionais sem alteração.
- L2: preenchimento/preparação de campos sem confirmação de gravação.
- L3: gravação, emissão, baixa, exclusão, prorrogação ou outra alteração persistente.

L2 e L3 precisam de revisão específica. L3 exige confirmação humana no momento da operação, critérios de sucesso verificáveis, timeout, tratamento de falha e procedimento de recuperação. Nunca remova a confirmação humana por conveniência.

## 6. Git e GitHub

- Nunca trabalhe diretamente em main.
- Crie branch curta e descritiva: feat/, fix/, docs/, test/ ou chore/.
- Faça commits pequenos, focados e com mensagem no padrão Conventional Commits.
- Não reescreva histórico compartilhado nem force push sem autorização explícita.
- Não faça merge de Pull Request sem autorização explícita do responsável.
- Não crie workflows do GitHub Actions, CI/CD ou publicação automática.
- Não adicione dependências sem explicar necessidade, impacto e alternativa.
- Nunca inclua dados reais do Systextil em commits, issues, exemplos ou screenshots.

## 7. Testes e validação

Antes de concluir uma alteração, execute os testes locais aplicáveis e informe o comando e resultado real.

Comandos padrão:
- npm test
- npm run check
- npm run validate:examples

Se não puder executar algo, declare o bloqueio. Não simule resultados nem afirme que homologou no ERP sem fazê-lo.

Para userscripts, testes unitários não substituem homologação em Chrome/Tampermonkey e ambiente Systextil adequado.

## 8. Entrega

Toda entrega deve informar arquivos criados ou alterados, decisões técnicas e compatibilidade, testes realmente executados, riscos e passos de homologação manual.

Consulte também .github/copilot-instructions.md e as instruções específicas em .github/instructions/.
