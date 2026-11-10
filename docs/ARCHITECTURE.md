# Arquitetura

## Objetivo arquitetural

Separar a investigação dentro do Systextil da preparação local de especificações e pacotes para IA. O Studio não deve depender de um servidor para a primeira versão.

## Componentes

### 1. Inspector (futuro)

Userscript Tampermonkey independente, restrito ao Systextil.

Responsabilidades planejadas:
- identificar visão, formulário e metadados de controles;
- inspecionar DOM e contexto da página com escopo mínimo;
- registrar observações como confirmadas, inferidas ou desconhecidas;
- exportar evidências JSON sanitizadas após ação explícita do operador.

Fora do escopo:
- executar consultas ou comandos de negócio;
- preencher filtros automaticamente;
- navegar registros em lote;
- gravar, emitir, baixar, prorrogar ou excluir dados;
- coletar valores de campos ou payloads de requisições por padrão.

### 2. Núcleo local (em construção)

Executado em Node.js. Valida evidências e especificações, aplica regras de consistência e prepara artefatos locais.

Não deve iniciar servidor, chamar APIs de IA ou enviar arquivos para a rede sem decisão arquitetural explícita.

### 3. Especificador (futuro)

Transforma uma necessidade operacional em uma especificação declarativa: objetivo, entradas, pré-condições, passos, evidências, riscos, falhas, sucesso e pontos desconhecidos.

### 4. Gerador de pacote (futuro)

Produz Markdown/JSON com instruções para a IA; especificação aprovada; evidências relevantes e sanitizadas; arquivos técnicos selecionados pelo manifesto de contexto; critérios de teste e homologação.

O pacote deve manter a origem dos fatos e não converter hipóteses em certezas.

### 5. Userscripts de produção

Cada automação final será um arquivo independente em userscripts/. O Inspector/Studio não substituirá scripts específicos já homologados.

## Fluxo de dados

    Necessidade operacional
             |
             v
    Especificação do processo
             |
             v
    Inspector no Systextil ----> Evidências JSON sanitizadas
             |                               |
             +---------------+---------------+
                             v
                      Validação local
                             |
                             v
                   Especificação técnica
                             |
                             v
                  Pacote contextualizado
                             |
                             v
                       IA + revisão
                             |
                             v
                  Userscript específico
                             |
                             v
             Testes locais + homologação
                             |
                             v
                      Pull Request

## Dependências e fronteiras

- Node.js: execução local e testes.
- Ajv: validação dos contratos JSON.
- Tampermonkey: execução futura do Inspector.
- GitHub: versionamento e revisão.
- Chrome DevTools: investigação e diagnóstico.
- Ferramenta de IA: desenvolvimento assistido com pacote explícito.

Não há banco remoto, backend, framework de frontend ou integração paga de IA no escopo inicial.
