# Arquitetura

## Objetivo
Separar investigação dentro do Systextil da preparação local de especificações e pacotes para IA. MVP local-first, CLI-first e sem serviço remoto.

## Componentes

### Inspector (userscript futuro)
Identifica view/forms e metadados de controles, registra observações confirmadas/inferidas/desconhecidas e exporta JSON sanitizado após ação explícita.
Não lê valores de campos, intercepta XHR/fetch, aciona F7/Find, preenche filtros, navega registros, grava dados ou executa código recebido do Studio.

### Núcleo local (Node.js)
- core/: modelos, regras puras, validação e transições.
- cli/: comandos locais.
- context/: allowlist e resolução segura.
- generators/: geração determinística Markdown/JSON.
Criar módulos somente quando houver consumidores reais. Sem servidor/rede no MVP.

### Solicitação e especificador
Representam problema, processo, regras, exceções, inputs/outputs e critérios de aceite. Cada passo técnico aponta evidência ou declara unknown.

### Gerador de pacote
Monta especificação, evidências sanitizadas, documentação selecionada, prompt e manifesto com fonte, versão, confiança, hash e finalidade. Não envia automaticamente.

### Userscripts finais
Cada automação será arquivo independente em userscripts/. Não compartilhar runtime universal com o ERP.

## Fluxo
Solicitação → modelo/regras → checklist → Inspector read-only → evidências sanitizadas → especificação → manifesto/pacote local → IA/revisão humana → userscript específico → testes/homologação/PR.

## Fronteiras de confiança
DOM e Systextil são fontes externas não confiáveis; arquivos importados são validados; núcleo não executa conteúdo; IA propõe código mas não homologa; GitHub versiona sem upload automático de evidências privadas.

## Dependências
Node.js 24+, Ajv 8.20.0, node:test, Tampermonkey, Chrome, Git/GitHub e Context7. Sem backend, banco remoto, framework ou API paga no MVP. Ver docs/TOOLING.md e docs/DECISIONS.md.
