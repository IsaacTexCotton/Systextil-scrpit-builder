# Modelo de segurança e risco operacional

## Princípios

1. Menor privilégio no browser e no Node.js.
2. Dados do ERP são não confiáveis e potencialmente sensíveis.
3. Evidência deve ser sanitizada antes de sair do navegador.
4. Especificações são dados declarativos, nunca código executável.
5. Operações persistentes exigem controle humano e verificação independente.

## Classificação

| Nível | Descrição | Exemplos | Controles mínimos |
|---|---|---|---|
| L0 | Inspeção de estrutura e metadados | visão, formulário, nome/tipo de campo | escopo de leitura, sem valores |
| L1 | Leitura de dados operacionais | consulta e exportação autorizada | minimização, autorização e proteção do arquivo |
| L2 | Preparação de ação sem persistir | preencher filtros ou campos antes da confirmação | prévia, validação de entrada e cancelamento |
| L3 | Alteração persistente | gravar, emitir, baixar, prorrogar, excluir | confirmação humana, critérios de sucesso, timeout, trava contra repetição, recuperação |

A classificação deve refletir o pior efeito possível da automação, não apenas o primeiro passo.

## Evidências

Permitido por padrão:
- nomes técnicos de views e formulários;
- nomes e tipos de controles;
- atributos de visibilidade, bloqueio e obrigatoriedade;
- sequência de eventos observada sem payload sensível;
- mensagens técnicas sanitizadas.

Proibido por padrão:
- senha, token, cookie e identificador de sessão;
- valores pessoais ou financeiros;
- documentos e títulos reais;
- payload completo de requisição/resposta;
- conteúdo que permita identificar cliente ou operador sem necessidade.

Se a evidência ficar ambígua após sanitização, não exporte até revisão manual.

## Userscripts

- Restringir @match ao host e caminho necessários.
- Declarar apenas @grant necessário.
- Usar unsafeWindow somente com justificativa documentada.
- Não introduzir dependências remotas.
- Evitar alteração de protótipos globais.
- Garantir inicialização idempotente e limpeza de listeners.
- Tratar dados do DOM e da página como não confiáveis.

## Operações L3

Antes de qualquer operação L3:
- identificar registro-alvo sem ambiguidade;
- validar entradas e pré-condições;
- apresentar ação e consequência à pessoa;
- exigir confirmação explícita imediatamente antes da gravação;
- impedir duplo envio/repetição após timeout incerto;
- observar confirmação posterior confiável;
- registrar resultado mínimo sem valores sensíveis;
- oferecer procedimento de interrupção e recuperação.

Não considerar uma requisição enviada como sucesso. Em caso de estado incerto, interromper e exigir conferência humana.

## Arquivos e pacotes

- Ignorar diretórios de evidência privada no Git.
- Não adicionar HAR, traces, screenshots sem sanitização ou exports operacionais.
- Validar JSON contra schemas estritos.
- Não executar conteúdo importado nem interpolar dados importados em comandos de shell.
- Revisar o conteúdo do pacote de IA antes de compartilhá-lo com serviços externos.
