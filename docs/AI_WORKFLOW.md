# Fluxo de desenvolvimento com IA

## Responsabilidade

Isaac é o único mantenedor e acumula todos os papéis do projeto, inclusive investigação, desenvolvimento, revisão e homologação. A IA pode apoiar a organização de informações e a implementação, mas não aprova regras de negócio, não realiza autoaprovação de PR e não homologa o Systêxtil.

Não existe revisor separado enquanto houver apenas uma pessoa no projeto. O mantenedor faz a auto-revisão e registra o próprio aceite na PR, conforme [GITHUB_GOVERNANCE.md](GITHUB_GOVERNANCE.md).

## Entender

Ler AGENTS.md, README.md, plano mestre, estado do projeto e backlog. Localizar item, dependências, código e testes. Descrever comportamento atual/esperado, riscos e aceite.

Consultar as fontes canônicas: escopo em [DECISIONS.md](DECISIONS.md); evidências, status, origem e níveis de risco em [SECURITY_MODEL.md](SECURITY_MODEL.md); ordem de entrega em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## Construir contexto

Incluir somente instruções, item do backlog, especificação, evidências sanitizadas, documentação técnica pertinente, código homologado e contratos necessários. Não incluir diretórios inteiros, dados reais, cookies, tokens, HARs ou dumps.

A IA só pode receber conteúdo já sanitizado. Não pedir que ela masque valores reais depois de recebê-los.

## Classificar certeza

Aplicar as definições canônicas de evidência, status e origem de [SECURITY_MODEL.md](SECURITY_MODEL.md). Nunca completar lacunas com nomes plausíveis, inventar atalhos ou transformar inferências em fatos.

## Planejar

Declarar objetivo, arquivos, dependências, alternativas, riscos, critérios de aceite, testes e homologação. Dividir mudanças extensas em PRs pequenas. Conferir se a etapa está liberada no backlog e se depende de decisão do mantenedor.

## Implementar

Trabalhar em branch própria; seguir padrões existentes; manter funções pequenas; validar entradas; não executar comandos de escrita no ERP sem especificação e autorização; não alterar automações de produção fora do escopo.

## Validar e revisar

Separar análise estática, unitários, integração local, browser e homologação Systêxtil. O mantenedor revisa o diff, verifica permissões, vazamento, timers/listeners, timeout, repetição e estado incerto. Registrar testes realmente executados, não executados e limitações.

## Homologar e entregar

O mantenedor executa a homologação em ambiente autorizado quando aplicável e registra o resultado na PR. Registrar item do backlog, arquivos, decisões, testes reais e pendências. Abrir PR; não integrar automaticamente.

## Requisitos do prompt de implementação

A IA deve ler instruções, confirmar item e dependências, listar fatos/inferências/desconhecidos, apresentar plano, consultar Context7/documentação oficial, implementar o menor escopo, executar testes, revisar segurança e declarar pendências. Nunca fazer merge nem escrever no ERP sem autorização.
