# Arquitetura

## Objetivo

Manter neste repositório o método, os modelos, schemas, checklists e ferramentas locais de apoio à criação de automações no Systêxtil. O problema central é entender a tela antes de escrever código: campos e tipos, ações de inserção, dependências entre campos e navegação entre telas.

MVP local-first, CLI-first e sem serviço remoto.

## Limite entre repositórios

Este repositório não é o repositório de código de produção. Ele guarda os instrumentos usados para planejar, investigar, especificar, validar e apoiar o desenvolvimento.

- `userscripts/` pode conter ferramentas de apoio deste projeto, como o Inspector read-only.
- Userscripts de produção continuam no [Systextil-envio-mensagem](https://github.com/IsaacTexCotton/Systextil-envio-mensagem) ou em outro repositório indicado pelo mantenedor.
- Não copiar, espelhar ou manter versões de userscripts de produção neste repositório.
- A especificação e o pacote de contexto podem referenciar o código externo aprovado sem duplicá-lo.

## Componentes

### Inspector (ferramenta de apoio futura)

O Inspector aprovado pela ADR-008 identifica metadados allowlisted de views, formulários e controles, registra observações confirmadas/inferidas/desconhecidas e exporta JSON sanitizado após ação explícita.

Seu escopo permanece estritamente read-only: não lê valores de campos, intercepta XHR/fetch, coleta requisições de rede, aciona F7/Find, preenche filtros, executa inserções, dispara teclas/botões, navega registros, grava dados ou executa código recebido do Studio.

O mapeamento de ações de inserção, dependências e navegação é realizado por observação manual documentada em [SCREEN_INVESTIGATION.md](SCREEN_INVESTIGATION.md), com um arquivo Markdown por tela em `docs/telas/` derivado do modelo padrão. A IA pode organizar o relato já sanitizado do mantenedor, sem completar lacunas por suposição. A ADR-013 é apenas proposta para avaliar eventual ampliação da allowlist de metadados de controles editáveis. Até ser aprovada, não altera o Inspector.

### Núcleo local (Node.js)

- `core/`: modelos, regras puras, validação e transições.
- `cli/`: comandos locais.
- `context/`: allowlist e resolução segura.
- `generators/`: geração determinística.

Criar módulos somente quando houver consumidores reais. Sem servidor ou rede no MVP.

### Solicitação e especificador

Representam o problema, processo, regras, exceções, inputs/outputs e critérios de aceite. A especificação só é iniciada após a revisão de um mapa por tela relevante em `docs/telas/`. Ela recebe campos e tipos, ações e sequência de inserção, dependências, navegação por colunas/telas, atalhos, mensagens e sinais independentes de sucesso. Cada linha de tabela do mapa preserva Status e Origem; cada afirmação técnica aponta evidência ou declara unknown.

### Gerador de pacote

Monta especificação, evidências sanitizadas, documentação selecionada, prompt e manifesto com fonte, versão, confiança, hash e finalidade. Não envia automaticamente.

### Userscripts de produção

São desenvolvidos e mantidos fora deste repositório, em arquivos independentes e específicos, no repositório de produção indicado pelo mantenedor. Este projeto não distribui nem executa código de produção.

## Fluxo

Solicitação → delimitação da tela e do fluxo → investigação manual e Inspector read-only → um arquivo de mapa por tela em docs/telas/ → revisão de Status/Origem e evidências sanitizadas → especificação → manifesto/pacote local → IA/revisão e aceite do mantenedor → desenvolvimento no repositório de produção → testes/homologação/PR.

## Fronteiras de confiança

DOM e Systêxtil são fontes externas não confiáveis; arquivos importados são validados; núcleo não executa conteúdo; IA propõe código mas não homologa; GitHub versiona documentação e ferramentas de apoio sem upload automático de evidências privadas. Capturas de tela, valores de campos e capturas manuais de rede devem ser mascarados antes de qualquer registro; os artefatos brutos nunca entram no repositório.

## Dependências

Node.js 24+, Ajv 8.20.0, node:test, Tampermonkey, Chrome, Git/GitHub e Context7. Sem backend, banco remoto, framework ou API paga no MVP. Ver [TOOLING.md](TOOLING.md) e [DECISIONS.md](DECISIONS.md).
