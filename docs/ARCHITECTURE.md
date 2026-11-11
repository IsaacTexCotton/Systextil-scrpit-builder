# Arquitetura

## Objetivo

Separar o método de investigação e a preparação local de especificações/pacotes para IA do código operacional. O escopo vigente e o piloto estão centralizados em [DECISIONS.md](DECISIONS.md); não redefinir esses limites neste documento.

MVP local-first, CLI-first e sem serviço remoto.

## Componentes

### Inspector (ferramenta de apoio futura)

O Inspector é read-only conforme ADR-008. Identifica metadados permitidos de views/forms e controles, registra observações e exporta dados sanitizados após ação explícita.

Não lê valores de campos, não intercepta XHR/fetch, não coleta requisições de rede, não preenche filtros, não dispara ações, não navega registros e não grava dados. Os significados de evidência, status e origem são os definidos em [SECURITY_MODEL.md](SECURITY_MODEL.md).

### Núcleo local (Node.js)

- `core/`: modelos, regras puras, validação e transições.
- `cli/`: comandos locais.
- `context/`: allowlist e resolução segura.
- `generators/`: geração determinística de Markdown/JSON.

Criar módulos somente quando houver consumidores reais. Sem servidor ou rede no MVP.

### Solicitação e especificador

Representam necessidade, processo, regras, inputs/outputs e critérios de aceite. Cada afirmação técnica deve apontar evidência ou declarar que ainda não foi verificada. Os critérios de evidência e os níveis de risco são centralizados em [SECURITY_MODEL.md](SECURITY_MODEL.md).

### Gerador de pacote

Monta especificação, evidências sanitizadas, documentação selecionada, prompt e manifesto com origem, versão, confiança, hash e finalidade. Não envia automaticamente para serviços externos.

### Repositório de userscripts

Este repositório não guarda userscripts de produção. Eles ficam no repositório de automações (Systextil-envio-mensagem ou outro indicado pelo mantenedor). A decisão está registrada na ADR-012 de [DECISIONS.md](DECISIONS.md).

## Fluxo

Solicitação → investigação → evidências revisadas → especificação → pacote local → assistência de IA → desenvolvimento no repositório de automações → testes, homologação e PR.

A ordem detalhada das entregas está definida exclusivamente em [DELIVERY_BACKLOG.md](DELIVERY_BACKLOG.md).

## Fronteiras de confiança

DOM, Systêxtil e arquivos importados são fontes externas não confiáveis. O núcleo valida dados declarativos e não executa conteúdo importado. A IA pode propor conteúdo, mas não aprova regras nem homologa. Os controles de privacidade, status e risco estão definidos em [SECURITY_MODEL.md](SECURITY_MODEL.md).

## Dependências

Node.js 24+, Ajv 8.20.0, node:test, Tampermonkey, Chrome, Git/GitHub e Context7. Sem backend, banco remoto, framework ou API paga no MVP. Ver [TOOLING.md](TOOLING.md) e [DECISIONS.md](DECISIONS.md).
