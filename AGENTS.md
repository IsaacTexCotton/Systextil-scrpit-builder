# Instruções para agentes de IA

Leia estas regras antes de planejar ou modificar código.

## Missão e limites
O Systextil Script Builder transforma necessidades operacionais em especificações e pacotes de contexto para desenvolver userscripts específicos do Systextil NXJ.
- Não criar executor universal de comandos NXJ.
- Não implementar operação sem evidência, regra confirmada e critérios observáveis.
- Código gerado por IA não é automaticamente validado.
- Não alterar automações de produção fora do escopo.
- Não avançar fase sem dependências e Quality Gates.

## Leitura obrigatória
1. AGENTS.md, README.md e CONTRIBUTING.md.
2. docs/IMPLEMENTATION_PLAN.md e docs/PROJECT_STATUS.md.
3. docs/DELIVERY_BACKLOG.md; identificar item e dependências.
4. docs/ARCHITECTURE.md, docs/SECURITY_MODEL.md e docs/QUALITY_GATES.md.
5. Documentação da área e instruções em .github/instructions/.
6. Código, decisões e testes existentes.

## Antes de codificar
Resumir objetivo, comportamento atual/esperado, item do backlog, risco, evidências, hipóteses, desconhecidos, arquivos afetados, critérios de aceite e testes. Consultar Context7/documentação oficial para APIs e ferramentas sujeitas a mudança. Perguntar quando faltar decisão que altere arquitetura, privacidade, risco ou comportamento.

## Evidências
- Nunca inventar campos, formulários, seletores, eventos, endpoints ou comandos NXJ.
- Classificar fatos como confirmados, inferidos ou desconhecidos.
- Registrar origem, tela/visão e contexto.
- Campo preenchido ou request enviado não comprovam sucesso.
- Escrita exige sinal posterior confiável e independente.
- Diferenciar testes executados, não executados e impossíveis.

## Implementação
- Node.js em ES Modules.
- Userscripts independentes, nativos e específicos.
- Sem @require/CDN/host novo sem aprovação.
- Justificar unsafeWindow.
- Funções pequenas, módulos coesos e dependências mínimas.
- Validar entradas e arquivos com schemas.
- Proibidos eval, new Function e execução de JSON importado.
- Não armazenar segredos em código, logs ou histórico.
- Não coletar valores de campos por padrão.
- Não introduzir UI/framework/backend sem ADR aprovada.

## Segurança
Classificar L0–L3 conforme docs/SECURITY_MODEL.md. L2/L3 exigem revisão específica. L3 exige confirmação humana no momento da operação, sucesso verificável, timeout, parada segura e recuperação.

## GitHub
- Nunca desenvolver em main.
- Branch curta feat/fix/docs/test/chore.
- Commits focados Conventional Commits.
- Sem force push, merge automático ou reescrita sem autorização.
- Sem GitHub Actions/CI/CD.
- Dependência nova precisa de justificativa.
- Nunca incluir dados reais do ERP.

## Testes e entrega
Executar npm test, npm run check e npm run validate:examples quando aplicável. Consultar docs/TESTING.md e docs/QUALITY_GATES.md. Relatar item, arquivos, decisões, testes reais, riscos e homologação pendente. Teste unitário não substitui homologação NXJ.
