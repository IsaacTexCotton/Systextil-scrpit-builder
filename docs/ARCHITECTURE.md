# Arquitetura

## Objetivo

Manter neste repositório o método, os modelos, schemas, checklists e ferramentas locais de apoio à criação de automações no Systêxtil. O problema central é entender a tela antes de escrever código: campos e tipos, ações de inserção, dependências entre campos e navegação entre telas.

MVP local-first, com mapeamento manual de telas como primeira etapa. CLI, schemas e validadores ficam adiados conforme ADR-014. Sem serviço remoto.

## Limite entre repositórios

Este repositório não é o repositório de código de produção. Ele guarda os instrumentos usados para planejar, investigar, especificar, validar e apoiar o desenvolvimento.

- `userscripts/` pode conter ferramentas de apoio deste projeto, como o Inspector read-only.
- O userscript do piloto e o núcleo compartilhado ficam no [Systextil-envio-mensagem](https://github.com/IsaacTexCotton/Systextil-envio-mensagem).
- Os mapas em `docs/telas/` são o contrato de conhecimento entre este repositório (método/telas) e o repositório de código.
- Não copiar, espelhar ou manter versões de userscripts ou do núcleo de produção neste repositório.
- A especificação e o pacote de contexto podem referenciar o código externo aprovado sem duplicá-lo. O primeiro mapa da consulta de títulos será o teste do método; E0/E1 só voltam à pauta se esse mapa revelar fricção concreta que CLI/schemas/validadores resolvam.

## Componentes

### Inspector (ferramenta de apoio futura)

O Inspector aprovado pela ADR-008 identifica metadados allowlisted de views, formulários e controles, registra observações confirmadas/inferidas/desconhecidas e exporta JSON sanitizado após ação explícita.

Seu escopo permanece estritamente read-only: não lê valores de campos, intercepta XHR/fetch, coleta requisições de rede, aciona F7/Find, preenche filtros, executa inserções, dispara teclas/botões, navega registros, grava dados ou executa código recebido do Studio.

O mapeamento de ações de inserção, dependências e navegação é realizado por observação manual documentada em [SCREEN_INVESTIGATION.md](SCREEN_INVESTIGATION.md), com um arquivo Markdown por tela em `docs/telas/` derivado do modelo padrão. A IA pode organizar o relato já sanitizado do mantenedor, sem completar lacunas por suposição. A ADR-013 é apenas proposta para avaliar eventual ampliação da allowlist de metadados de controles editáveis. Até ser aprovada, não altera o Inspector.

### Núcleo local (Node.js)

- `core/` (adiado): modelos, regras puras, validação e transições.
- `cli/` (adiado): comandos locais.
- `schemas/` (adiado): contratos JSON versionados.
- `context/`: allowlist e resolução segura.
- `generators/`: geração determinística.

Os componentes `core/`, `cli/`, `schemas/` e a dependência Ajv estão adiados. Criar somente quando houver consumidor real e decisão do mantenedor. Sem servidor ou rede no MVP.

### Solicitação e especificador

Representam o problema, processo, regras, exceções, inputs/outputs e critérios de aceite. A especificação só é iniciada após a revisão do mapa de cada tela relevante em `docs/telas/`. Ela recebe campos e tipos, ações e sequência de inserção, dependências, navegação por colunas/telas, atalhos, mensagens, sequência de comandos/eventos NXJ e sinais independentes de confirmação por ação. Cada linha de tabela do mapa preserva Status e Origem; cada afirmação técnica aponta evidência ou declara unknown.

### Gerador de pacote

Monta especificação, evidências sanitizadas, documentação selecionada, prompt e manifesto com fonte, versão, confiança, hash e finalidade. Não envia automaticamente.

### Userscripts de produção

O userscript de consulta em lote do piloto e o núcleo compartilhado são desenvolvidos e mantidos no repositório Systextil-envio-mensagem. Este projeto não distribui nem executa código de produção; fornece o método e o mapa de tela como contrato.

## Fluxo

Necessidade operacional delimitada → investigação e mapeamento manual da tela → apoio do Inspector read-only, quando aplicável → um arquivo de mapa por tela em docs/telas/ → revisão de Status/Origem e evidências sanitizadas → especificação → manifesto/pacote local → IA/revisão e aceite do mantenedor → desenvolvimento no repositório de produção → testes/homologação/PR.

## Fronteiras de confiança

DOM e Systêxtil são fontes externas não confiáveis; arquivos importados são validados; núcleo não executa conteúdo; IA propõe código mas não homologa; GitHub versiona documentação e ferramentas de apoio sem upload automático de evidências privadas. Capturas de tela, valores de campos e capturas manuais de rede devem ser mascarados antes de qualquer registro; os artefatos brutos nunca entram no repositório.

## Dependências

Node.js 24+, Ajv 8.20.0 (adiado), node:test, Tampermonkey, Chrome, Git/GitHub e Context7. Sem backend, banco remoto, framework ou API paga no MVP. Ver [TOOLING.md](TOOLING.md) e [DECISIONS.md](DECISIONS.md).
