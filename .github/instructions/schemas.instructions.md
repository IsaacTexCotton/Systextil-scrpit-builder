---
applyTo: "schemas/**/*.json"
---

# Regras para contratos JSON

- Preserve compatibilidade por versão explícita do schema.
- Use additionalProperties: false por padrão nos objetos.
- Defina propriedades obrigatórias, limites de tamanho e enums sempre que aplicável.
- Não inclua valores reais do ERP nos exemplos.
- Mudança incompatível exige nova versão do contrato e estratégia de migração documentada.
- Não remova campos existentes sem avaliar consumidores e fixtures.
