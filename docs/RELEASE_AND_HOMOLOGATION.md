# Estratégia de release e homologação

## Ambientes
- Desenvolvimento local: núcleo, schemas e fixtures.
- Browser controlado: DOM de teste, Chrome e Tampermonkey.
- Homologação Systextil: ambiente autorizado e massa aprovada.
- Produção: somente após aprovação e procedimento interno.

Não presumir que exista ambiente de homologação. Se não houver, documentar método seguro autorizado pelo responsável.

## Matriz de risco

| Risco | Testes mínimos | Homologação |
|---|---|---|
| L0 | unitário, schema, DOM controlado | metadados e privacidade |
| L1 | unitário, integração, limites | autorização, amostra e exportação |
| L2 | browser, foco/blur/eventos, cancelamento | prévia e ausência de gravação |
| L3 | anteriores + timeout, duplicidade, estado incerto e recuperação | confirmação explícita, cenário controlado e verificação independente |

## Registro
Para cada versão registrar ID/versão, commit/PR, Chrome/Tampermonkey, ambiente Systextil, views/forms, pré-condições, casos e resultados, evidências sanitizadas, incidentes, limitações, responsável e decisão.

## Release
Incrementar versão conforme impacto; atualizar changelog; instalação manual rastreável; sem distribuição automática; manter rollback quando política interna permitir.

## Incidente
Interromper, evitar repetição automática, preservar somente diagnóstico sanitizado e solicitar conferência humana. Request enviado, campo preenchido ou ausência de erro visual não comprovam sucesso.
