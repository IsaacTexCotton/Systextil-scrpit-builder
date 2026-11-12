import test from "node:test";
import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { runInThisContext } from "node:vm";

const caminhoScript = new URL(
  "../userscripts/systextil-mapeador.user.js",
  import.meta.url
);
const codigoScript = readFileSync(caminhoScript, "utf8");

function carregarMapeador() {
  const modulo = { exports: {} };
  const executar = runInThisContext(
    `(function (module) {\n${codigoScript}\n})`,
    { filename: caminhoScript.pathname }
  );
  executar(modulo);
  return modulo.exports;
}

const mapeador = carregarMapeador();
const configuracao = {
  chavesEstruturais: mapeador.CHAVES_ESTRUTURAIS_PADRAO
};

function bytesDeterministicos(comprimento, semente) {
  const resultado = new Uint8Array(comprimento);
  for (let i = 0; i < comprimento; i += 1) {
    resultado[i] = (i * 31 + semente * 17 + (i >>> 1)) & 0xff;
  }
  return resultado;
}

function mapasDeTeste() {
  const controleCompartilhadoSalvo = {
    tag: "input",
    type: "text",
    id: "campo-a",
    idPadrao: "campo-a",
    readonly: false
  };
  const controleRemovido = {
    tag: "input",
    type: "text",
    id: "campo-b",
    idPadrao: "campo-b",
    readonly: false
  };
  const controleCompartilhadoVivo = {
    tag: "input",
    type: "text",
    id: "campo-a",
    idPadrao: "campo-a",
    readonly: true
  };
  const controleAdicionado = {
    tag: "input",
    type: "number",
    id: "campo-c",
    idPadrao: "campo-c",
    readonly: false
  };

  return {
    salvo: {
      tela: { slug: "tela-de-teste" },
      impressaoDigital: "mapa-a",
      quadros: [{
        caminho: "topo",
        impressaoDigital: "quadro-a",
        controles: [controleCompartilhadoSalvo, controleRemovido],
        grids: []
      }]
    },
    vivo: {
      impressaoDigital: "mapa-b",
      quadros: [{
        caminho: "topo",
        impressaoDigital: "quadro-b",
        controles: [controleCompartilhadoVivo, controleAdicionado],
        grids: []
      }]
    }
  };
}

// Este primeiro caso percorre as funções que usam URL/URLSearchParams e os
// demais utilitários antes do teste que substitui métodos de Array.prototype.
test("aquecimento: percorre a suíte normal de utilitários", () => {
  const mapas = mapasDeTeste();
  mapeador.hash53("aquecimento", 1);
  mapeador.mascarar("[CLIENTE] [CPF_CNPJ] [DADO_CONTATO]");
  mapeador.limpar("texto de teste", 20);
  mapeador.mascararNome("campo-123456");
  mapeador.padrao("campo-123456");
  mapeador.formaDoValor("12/11/2026");
  mapeador.descreverCorpo('{"documento":"VALOR_FICTICIO"}', configuracao);
  mapeador.descreverUrl(
    "/systextil/consulta?documento=VALOR_FICTICIO",
    "http://erp.invalid/",
    configuracao
  );
  mapeador.descreverResposta('{"resultado":"OK"}', "application/json", configuracao);
  mapeador.auditarSaida('{"geradoPor":"systextil-mapeador@0.1.0"}');
  mapeador.slugify("Consulta de títulos");
  mapeador.compararMapas(mapas.salvo, mapas.vivo);
  mapeador.extrairTeclas(["Ctrl+M", "F7"]);
  mapeador.bucketBytes(1024);
  mapeador.bucketLinhas(2);
  mapeador.sha256Hex(bytesDeterministicos(8, 1));
  mapeador.hmacHex(bytesDeterministicos(16, 2), bytesDeterministicos(9, 3));
  assert.ok(Array.isArray(mapeador.CHAVES_ESTRUTURAIS_PADRAO));
});

test("formaDoValor classifica data BR, inteiro com zeros à esquerda, decimal com vírgula, CNPJ e e-mail", () => {
  assert.equal(mapeador.formaDoValor("12/11/2026"), "data-br");
  assert.equal(mapeador.formaDoValor("0000123"), "inteiro-zeros-esq(7)");
  assert.equal(mapeador.formaDoValor("1.234,56"), "decimal-virgula");
  assert.equal(mapeador.formaDoValor("11.111.111/1111-11"), "cnpj-formatado");
  assert.equal(mapeador.formaDoValor("qa@example.invalid"), "email");
});

test("mascarar e auditarSaida detectam CPF, CNPJ e e-mail", () => {
  const cpf = "111.111.111-11";
  const cnpj = "11.111.111/1111-11";
  const email = "qa@example.invalid";
  const texto = `CPF ${cpf}; CNPJ ${cnpj}; contato ${email}`;
  const mascarado = mapeador.mascarar(texto);

  assert.ok(mascarado.includes("[CPF_CNPJ]"));
  assert.ok(mascarado.includes("[EMAIL]"));
  assert.equal(mascarado.includes(cpf), false);
  assert.equal(mascarado.includes(cnpj), false);
  assert.equal(mascarado.includes(email), false);
  assert.deepEqual(mapeador.auditarSaida(texto), ["CNPJ", "CPF", "e-mail"]);
  assert.deepEqual(
    mapeador.auditarSaida('{"geradoPor":"systextil-mapeador@0.1.0"}'),
    []
  );
});

test("auditarSaida não acusa geradoPor@0.1.0 nem valores dos campos de hash", () => {
  const metadados = JSON.stringify({
    geradoPor: "systextil-mapeador@0.1.0",
    hashTexto: "0123456789abcdef0123456789abcdef",
    impressaoDigitalTela: "abcdef0123456789abcdef0123456789",
    assinatura: "fedcba9876543210fedcba9876543210"
  });

  assert.deepEqual(mapeador.auditarSaida(metadados), []);
});

test("descreverCorpo e descreverUrl não expõem valores de campos", () => {
  const valorDocumento = "VALOR_FICTICIO_DOCUMENTO_987654";
  const valorContato = "qa@example.invalid";
  const corpo = mapeador.descreverCorpo(
    JSON.stringify({ documento: valorDocumento, contato: valorContato }),
    configuracao
  );
  const url = mapeador.descreverUrl(
    `/systextil/consulta?documento=${encodeURIComponent(valorDocumento)}&contato=${encodeURIComponent(valorContato)}`,
    "http://erp.invalid/",
    configuracao
  );
  const saidas = JSON.stringify({ corpo, url });

  assert.equal(saidas.includes(valorDocumento), false);
  assert.equal(saidas.includes(valorContato), false);
  assert.equal(corpo.tipo, "json");
  assert.equal(url.caminho, "/systextil/consulta");
});

test("compararMapas identifica campo adicionado, removido e mudança de readonly", () => {
  const mapas = mapasDeTeste();
  const resultado = mapeador.compararMapas(mapas.salvo, mapas.vivo);
  const quadro = resultado.quadros[0];

  assert.equal(resultado.impressaoDigitalIdentica, false);
  assert.equal(quadro.adicionados.length, 1);
  assert.equal(quadro.adicionados[0].id, "campo-c");
  assert.equal(quadro.removidos.length, 1);
  assert.equal(quadro.removidos[0].id, "campo-b");
  assert.equal(quadro.mudancasDeEstado.length, 1);
  assert.deepEqual(quadro.mudancasDeEstado[0].diferencas, [
    { campo: "readonly", antes: false, depois: true }
  ]);
});

test("sha256Hex e hmacHex correspondem ao crypto do Node em 60 casos", () => {
  for (let i = 0; i < 60; i += 1) {
    const tamanhoMensagem = Math.floor((i * 199) / 59);
    const tamanhoChave = 1 + Math.floor((i * 149) / 59);
    const mensagem = bytesDeterministicos(tamanhoMensagem, i + 1);
    const chave = bytesDeterministicos(tamanhoChave, i + 71);

    const shaEsperado = createHash("sha256").update(mensagem).digest("hex");
    const hmacEsperado = createHmac("sha256", chave).update(mensagem).digest("hex");

    assert.equal(mapeador.sha256Hex(mensagem), shaEsperado, `SHA-256 no caso ${i + 1}`);
    assert.equal(mapeador.hmacHex(chave, mensagem), hmacEsperado, `HMAC no caso ${i + 1}`);
  }
});

test("demais funções exportadas mantêm seus contratos", () => {
  assert.match(mapeador.hash53("estrutura"), /^[0-9a-f]{14}$/);
  assert.equal(mapeador.limpar("  valor  "), "valor");
  assert.equal(mapeador.mascararNome("campo-123456"), "campo-#");
  assert.equal(mapeador.padrao("campo-123456"), "campo-{n}");
  assert.equal(mapeador.slugify("Consulta de títulos"), "consulta-de-titulos");
  assert.deepEqual(mapeador.extrairTeclas(["Ctrl+M", "F7", "Alt+X", "F7"]), ["Ctrl+M", "F7", "Alt+X"]);
  assert.equal(mapeador.bucketBytes(500), "<1KB");
  assert.equal(mapeador.bucketLinhas(0), "0");
  assert.equal(mapeador.bucketLinhas(1), "1");
  assert.equal(mapeador.bucketLinhas(2), "2-10");
  assert.deepEqual(mapeador.CHAVES_ESTRUTURAIS_PADRAO, [
    "cmd", "command", "comando", "event", "evento", "action", "acao", "tecla", "metodo", "method"
  ]);
  const resposta = mapeador.descreverResposta('{"resultado":"VALOR_FICTICIO"}', "application/json", configuracao);
  assert.equal(resposta.tipoConteudo, "application/json");
  assert.equal(JSON.stringify(resposta).includes("VALOR_FICTICIO"), false);
});

test("funções puras não dependem dos métodos de Array proibidos", () => {
  const nomes = ["map", "filter", "forEach", "indexOf", "every", "some"];
  const originais = Object.create(null);
  let erro = null;

  // A suíte anterior já percorreu descreverUrl, aquecendo a inicialização
  // preguiçosa dos módulos internos utilizados por URL/URLSearchParams.
  for (let i = 0; i < nomes.length; i += 1) {
    const nome = nomes[i];
    originais[nome] = Array.prototype[nome];
    Array.prototype[nome] = function metodoArrayProibido() {
      throw new Error(`Array.prototype.${nome} não deve ser usado`);
    };
  }

  try {
    const mapas = mapasDeTeste();
    mapeador.formaDoValor("0000123");
    mapeador.mascarar("[CPF_CNPJ] qa@example.invalid");
    mapeador.auditarSaida('{"geradoPor":"systextil-mapeador@0.1.0"}');
    mapeador.descreverCorpo('{"documento":"VALOR_FICTICIO"}', configuracao);
    mapeador.descreverUrl(
      "/systextil/consulta?documento=VALOR_FICTICIO",
      "http://erp.invalid/",
      configuracao
    );
    mapeador.compararMapas(mapas.salvo, mapas.vivo);
    mapeador.sha256Hex(bytesDeterministicos(32, 9));
    mapeador.hmacHex(bytesDeterministicos(64, 10), bytesDeterministicos(24, 11));
  } catch (causa) {
    erro = causa;
  } finally {
    for (let i = 0; i < nomes.length; i += 1) {
      const nome = nomes[i];
      Array.prototype[nome] = originais[nome];
    }
  }

  assert.ifError(erro);
});


test("instalarGanchos só é chamado dentro de ativarQuadro", () => {
  const chamadas = [...codigoScript.matchAll(/\binstalarGanchos\s*\(\s*\)\s*;/g)];
  assert.equal(chamadas.length, 1, "instalarGanchos deve ser chamado somente por ativarQuadro");

  const quadro = /function ativarQuadro\(on\)\s*\{([\s\S]*?)\n  \}/.exec(codigoScript);
  assert.ok(quadro, "a função ativarQuadro deve continuar existindo");
  const inicioQuadro = quadro.index;
  const fimQuadro = inicioQuadro + quadro[0].length;
  assert.ok(
    chamadas[0].index >= inicioQuadro && chamadas[0].index < fimQuadro,
    "a única chamada a instalarGanchos deve estar dentro de ativarQuadro"
  );
  assert.match(quadro[1], /if\s*\(on\)\s*\{\s*instalarGanchos\(\);\s*iniciarObservador\(\);/);
  assert.match(quadro[1], /else\s*\{\s*pararObservador\(\);\s*removerGanchos\(\);/);

  const inicioGravacao = /ui\.gravar\.onclick\s*=\s*function\s*\(\)\s*\{([\s\S]*?)\n    \};/.exec(codigoScript);
  assert.ok(inicioGravacao, "o handler de gravação deve continuar existindo");
  assert.match(inicioGravacao[1], /bus\.gravando\s*=\s*true;[\s\S]*?ativarQuadro\(true\);/);

  const retomada = /aoPronto\(function\s*\(\)\s*\{([\s\S]*?)\n  \}\);/.exec(codigoScript);
  assert.ok(retomada, "o callback aoPronto deve continuar existindo");
  assert.match(retomada[1], /if\s*\(obterBus\(\)\.gravando\)\s*ativarQuadro\(true\);/);
});
