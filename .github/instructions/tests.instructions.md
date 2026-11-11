---
applyTo: "tests/**/*.js"
---

# Regras para testes automatizados

- Use o runner nativo node:test e assert/strict.
- Mantenha testes determinísticos, isolados e sem dependência de rede ou ERP.
- Use fixtures fictícias; nunca inclua credenciais ou dados reais.
- Cubra sucesso, falhas, entradas inválidas, limites e estado inesperado.
- Não transforme ausência de ambiente de homologação em aprovação implícita.
- Ao alterar comportamento, inclua ou atualize os testes correspondentes.
