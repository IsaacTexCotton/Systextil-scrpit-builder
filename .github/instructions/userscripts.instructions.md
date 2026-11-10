---
applyTo: "userscripts/**/*.user.js"
---

# Regras para userscripts Tampermonkey

- Cada arquivo representa uma automação independente e instalável.
- Mantenha o bloco de metadados Tampermonkey correto, restrito ao domínio e caminho necessários.
- Solicite apenas permissões @grant estritamente necessárias.
- Justifique qualquer uso de unsafeWindow.
- Não use @require, CDN, biblioteca remota ou host novo sem aprovação.
- Não altere protótipos globais nem injete código arbitrário.
- Não leia valores de campos por padrão; colete metadados técnicos minimizados.
- Trate DOM e mensagens da página como dados não confiáveis.
- Previna instalação duplicada, execução repetida e listeners duplicados.
- Respeite foco, blur, sequência de eventos e tempos de confirmação do NXJ; atribuir value não equivale a confirmação pelo ERP.
- Em operação persistente, implemente confirmação humana, estado observável, timeout, parada segura e recuperação.
- Não inclua dados reais em console, screenshots, fixtures ou mensagens de erro.
- Não marque o script como pronto para produção antes da homologação manual.
