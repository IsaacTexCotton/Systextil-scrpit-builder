# Estratégia de release e homologação

## Responsabilidade

Isaac é o único mantenedor e executa os papéis de desenvolvedor, revisor e homologador, além dos demais papéis do projeto. Não há revisor separado. A auto-revisão do diff, o aceite final e o resultado da homologação são registrados na PR.

## Ambientes

- Desenvolvimento local: núcleo, schemas e fixtures.
- Browser controlado: DOM de teste, Chrome e Tampermonkey.
- Homologação Systêxtil: ambiente autorizado e massa aprovada.
- Produção: somente após aceite do mantenedor e procedimento interno autorizado.

Não presumir que exista ambiente de homologação. Se não houver, documentar a limitação e manter a homologação pendente. Não usar produção para experimentação não autorizada.

## Matriz de risco

| Risco | Testes mínimos | Homologação |
|---|---|---|
| L0 | unitário, schema, DOM controlado | metadados e privacidade |
| L1 | unitário, integração, limites | autorização, amostra e exportação |
| L2 | browser, foco/blur/eventos, cancelamento | prévia e ausência de gravação |
| L3 | anteriores + timeout, duplicidade, estado incerto e recuperação | confirmação explícita, cenário controlado e verificação independente |

## Homologação pelo mantenedor

Homologação significa teste executado pelo próprio mantenedor no Systêxtil autorizado, não apenas inspeção de código, teste unitário, simulação de DOM ou resposta de IA.

Para cada homologação registrar na PR:
- data e responsável (mantenedor);
- ambiente Systêxtil autorizado e condição de acesso;
- versão do userscript e commit testado;
- versões de Chrome e Tampermonkey, quando aplicável;
- views/forms e pré-condições, sem expor identificadores ou valores sensíveis;
- casos positivos, negativos e limites executados;
- resultado observado e critério de sucesso correspondente;
- evidências sanitizadas, sem dados reais;
- falhas, limitações, recuperação e decisão final.

Se a homologação não foi executada, registrar **pendente** e motivo. Nunca declarar homologado com base somente em testes locais.

## Pull Request e aceite

Cada mudança passa por PR. O mantenedor revisa o próprio diff, confere os testes locais, verifica riscos e registra seu aceite final em comentário explícito na conversa da PR, junto com o resultado da homologação quando aplicável.

O GitHub não permite ao autor enviar um review formal `Approve` na própria PR. Portanto, o registro de aceite por comentário é o procedimento adotado; não se exige um revisor separado ou uma aprovação formal de outra pessoa.

Não habilitar merge automático nem CI/CD. A integração é ação manual e explícita do mantenedor, após a revisão, os testes e a homologação aplicável.

## Release

Incrementar versão conforme impacto; atualizar changelog; instalação manual rastreável; sem distribuição automática; manter rollback quando política interna permitir.

## Incidente

Interromper, evitar repetição automática, preservar somente diagnóstico sanitizado e solicitar conferência humana. Request enviado, campo preenchido ou ausência de erro visual não comprovam sucesso.
