# Arquitetura

## Objetivo

Manter neste repositório o método, os modelos, schemas, checklists e ferramentas locais de apoio à criação de automações no Systêxtil. O problema central é a dificuldade de criar essas automações; a etapa e a causa específicas ainda estão pendentes de identificação.

MVP local-first, CLI-first e sem serviço remoto.

## Limite entre repositórios

Este repositório não é o repositório de código de produção. Ele guarda os instrumentos usados para planejar, investigar, especificar, validar e apoiar o desenvolvimento.

- `userscripts/` pode conter ferramentas de apoio deste projeto, como o Inspector read-only.
- Userscripts de produção continuam no [Systextil-envio-mensagem](https://github.com/IsaacTexCotton/Systextil-envio-mensagem) ou em outro repositório indicado pelo mantenedor.
- Não copiar, espelhar ou manter versões de userscripts de produção neste repositório.
- A especificação e o pacote de contexto podem referenciar o código externo aprovado sem duplicá-lo.

## Componentes

### Inspector (ferramenta de apoio futura)

Identifica metadados allowlisted de views, formulários e controles, registra observações confirmadas/inferidas/desconhecidas e exporta JSON sanitizado após ação explícita.

É estritamente read-only: não lê valores de campos, intercepta XHR/fetch, coleta requisições de rede, aciona F7/Find, preenche filtros, navega registros, grava dados ou executa código recebido do Studio.

A investigação pode incluir captura manual de rede pelo mantenedor, separada do Inspector e sujeita ao procedimento de [SECURITY_MODEL.md](SECURITY_MODEL.md) e à ADR-012.

### Núcleo local (Node.js)

- `core/`: modelos, regras puras, validação e transições.
- `cli/`: comandos locais.
- `context/`: allowlist e resolução segura.
- `generators/`: geração determinística.

Criar módulos somente quando houver consumidores reais. Sem servidor ou rede no MVP.

### Solicitação e especificador

Representam problema, processo, regras, exceções, inputs/outputs e critérios de aceite. Cada passo técnico aponta evidência ou declara unknown. A ferramenta não deve assumir antecipadamente qual etapa do trabalho causa a dificuldade central.

### Gerador de pacote

Monta especificação, evidências sanitizadas, documentação selecionada, prompt e manifesto com fonte, versão, confiança, hash e finalidade. Não envia automaticamente.

### Userscripts de produção

São desenvolvidos e mantidos fora deste repositório, em arquivos independentes e específicos, no repositório de produção indicado pelo mantenedor. Este projeto não distribui nem executa código de produção.

## Fluxo

Solicitação → compreensão da dificuldade real → modelo/regras → checklist → investigação manual e Inspector read-only → evidências sanitizadas → especificação → manifesto/pacote local → IA/revisão e aceite do mantenedor → desenvolvimento no repositório de produção → testes/homologação/PR.

## Fronteiras de confiança

DOM e Systêxtil são fontes externas não confiáveis; arquivos importados são validados; núcleo não executa conteúdo; IA propõe código mas não homologa; GitHub versiona documentação e ferramentas de apoio sem upload automático de evidências privadas. Capturas manuais de rede não são coletadas pelo Inspector e nunca entram no repositório em formato real.

## Dependências

Node.js 24+, Ajv 8.20.0, node:test, Tampermonkey, Chrome, Git/GitHub e Context7. Sem backend, banco remoto, framework ou API paga no MVP. Ver [TOOLING.md](TOOLING.md) e [DECISIONS.md](DECISIONS.md).
