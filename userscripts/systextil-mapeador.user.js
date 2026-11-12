// ==UserScript==
// @name         Systêxtil — Mapeador de Telas
// @namespace    https://github.com/IsaacTexCotton/Systextil-scrpit-builder
// @version      0.1.0
// @description  Mapa estrutural de telas (sem valores), gravador passivo de ações (opt-in, só estrutura) e verificação de mudanças na tela.
// @match        http://*/systextil/*
// @match        https://*/systextil/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

/*
 * Princípios (ver ADRs do Systextil-scrpit-builder):
 *  - Nunca clica, preenche, aperta tecla nem navega. Só observa.
 *  - Modo Mapa: lê apenas atributos allowlisted. Nunca lê .value de campos.
 *  - Conferência (ADR-019): na gravação, lê de campos só o comprimento do valor e compara
 *    o valor com um HMAC-SHA-256 de valores informados pelo operador. A chave fica no navegador.
 *  - Modo Gravador: só roda após o clique em "Iniciar gravação". Registra a ESTRUTURA
 *    (nomes de comandos/campos, formato do valor, status, sinais de confirmação). Nunca valores.
 *  - Nada é enviado para fora: o resultado é mostrado em pré-visualização e baixado localmente.
 *  - Não grava domínio nem URL completa: só caminho e nomes de parâmetros.
 *  - Atalho para mostrar/ocultar o painel: Ctrl+Alt+M.
 */
(function () {
  'use strict';

  const VERSAO = '0.1.0';
  const FORMATO_MAPA = 'systextil-mapa-tela';
  const FORMATO_ACAO = 'systextil-acao';
  const FORMATO_VERIFICACAO = 'systextil-verificacao';
  const ID_PAINEL = '__sysmapper_painel__';
  const CHAVE_SESSAO = '__sysmapper_gravacao__';
  const CHAVE_LOCAL = '__sysmapper_chave__';
  const MAX_EVENTOS = 6000;
  const MAX_CONTROLES = 2500;
  const CHAVES_ESTRUTURAIS_PADRAO = ['cmd', 'command', 'comando', 'event', 'evento', 'action', 'acao', 'tecla', 'metodo', 'method'];

  // Laços próprios: o ERP redefine métodos de Array e de coleções DOM (ex.: HTMLCollection.collect),
  // então o script não usa map/filter/forEach/indexOf/slice nativos sobre dados da página.
  function listaDe(c) { const out = []; for (let i = 0; i < c.length; i++) out.push(c[i]); return out; }
  function mapear(arr, fn) { const out = []; for (let i = 0; i < arr.length; i++) out.push(fn(arr[i], i)); return out; }
  function filtrar(arr, fn) { const out = []; for (let i = 0; i < arr.length; i++) if (fn(arr[i], i)) out.push(arr[i]); return out; }
  function paraCada(arr, fn) { for (let i = 0; i < arr.length; i++) fn(arr[i], i); }
  function indiceDe(arr, v) { for (let i = 0; i < arr.length; i++) if (arr[i] === v) return i; return -1; }

  /* ======================================================================
   * Utilitários puros (testáveis fora do navegador)
   * ==================================================================== */

  function hash53(str, seed) {
    seed = seed || 0;
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0');
  }

  function mascarar(s) {
    return String(s == null ? '' : s)
      .replace(/\d[\d.\s]{40,}\d/g, '[LINHA_DIGITAVEL]')
      .replace(/[\w.+-]+@[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}/g, '[EMAIL]')
      .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, '[CPF_CNPJ]')
      .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, '[CPF_CNPJ]')
      .replace(/R\$\s*-?[\d.,]+/gi, '[VALOR_MONETARIO]')
      .replace(/\d{6,}/g, '#');
  }

  function limpar(s, max) {
    max = max || 60;
    const t = mascarar(String(s == null ? '' : s).replace(/\s+/g, ' ').trim());
    return t.length > max ? t.slice(0, max) + '…' : t;
  }

  function mascararNome(s, max) {
    return String(s == null ? '' : s).replace(/\d{6,}/g, '#').slice(0, max || 80);
  }

  function padrao(s) {
    return String(s == null ? '' : s).replace(/\d+/g, '{n}').slice(0, 80);
  }

  function bucketTamanho(n) {
    if (n === 0) return 'vazio';
    if (n <= 10) return '1-10';
    if (n <= 20) return '11-20';
    if (n <= 50) return '21-50';
    if (n <= 100) return '51-100';
    return '>100';
  }

  function bucketBytes(n) {
    if (n < 1024) return '<1KB';
    if (n < 4096) return '1-4KB';
    if (n < 16384) return '4-16KB';
    if (n < 65536) return '16-64KB';
    return '>64KB';
  }

  function bucketLinhas(n) {
    if (n <= 0) return '0';
    if (n === 1) return '1';
    if (n <= 10) return '2-10';
    if (n <= 50) return '11-50';
    return '>50';
  }

  // Classe do formato do valor. O valor em si nunca é guardado.
  function formaDoValor(v) {
    const s = String(v == null ? '' : v);
    if (s === '') return 'vazio';
    if (/^\d+$/.test(s)) return (s.length > 1 && s[0] === '0' ? 'inteiro-zeros-esq(' : 'inteiro(') + s.length + ')';
    if (/^-?\d{1,3}(\.\d{3})+,\d+$/.test(s) || /^-?\d+,\d+$/.test(s)) return 'decimal-virgula';
    if (/^-?\d+\.\d+$/.test(s)) return 'decimal-ponto';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return 'data-br';
    if (/^\d{2}\/\d{2}\/\d{2}$/.test(s)) return 'data-br-curta';
    if (/^\d{4}-\d{2}-\d{2}([T ].*)?$/.test(s)) return 'data-iso';
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(s)) return 'hora';
    if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(s)) return 'cpf-formatado';
    if (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(s)) return 'cnpj-formatado';
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)) return 'email';
    if (/^(true|false|S|N|sim|nao|não)$/i.test(s)) return 'booleano';
    if (/^[A-Za-zÀ-ÿ]+$/.test(s)) return 'letras(' + bucketTamanho(s.length) + ')';
    if (/^[\w\-./]+$/.test(s)) return 'alfanumerico(' + bucketTamanho(s.length) + ')';
    return 'texto(' + bucketTamanho(s.length) + ')';
  }

  function ehEstrutural(chave, valor, cfg) {
    return indiceDe(cfg.chavesEstruturais, String(chave).toLowerCase()) !== -1 && /^[\w.:\-[\]]{1,60}$/.test(valor);
  }

  function descreverPar(nome, valor, cfg) {
    const p = { nome: mascararNome(nome) };
    if (ehEstrutural(nome, valor, cfg)) p.valorEstrutural = mascararNome(valor, 60);
    else p.forma = formaDoValor(valor);
    return p;
  }

  function descreverPares(entradas, cfg) {
    const out = [];
    let n = 0;
    for (const par of entradas) {
      if (n++ >= 60) { out.push({ nome: '[+ pares omitidos]' }); break; }
      const k = par[0], v = par[1];
      out.push(typeof v === 'string' ? descreverPar(k, v, cfg) : { nome: mascararNome(k), forma: 'arquivo' });
    }
    return out;
  }

  function nomesDeTags(t) {
    const set = [];
    const re = /<([A-Za-z_][\w:.-]*)/g;
    let m;
    while ((m = re.exec(t)) && set.length < 30) {
      const n = mascararNome(m[1], 40);
      if (indiceDe(set, n) === -1) set.push(n);
    }
    return set;
  }

  function descreverJson(v, cfg, d) {
    if (v === null) return 'nulo';
    if (Array.isArray(v)) return { lista: v.length, item: v.length ? descreverJson(v[0], cfg, d + 1) : null };
    if (typeof v === 'object') {
      if (d >= 3) return '[objeto-profundo]';
      const o = {};
      let n = 0;
      for (const k of Object.keys(v)) {
        if (n++ >= 30) { o['[+ chaves omitidas]'] = true; break; }
        const x = v[k];
        if (x !== null && typeof x === 'object') o[mascararNome(k)] = descreverJson(x, cfg, d + 1);
        else if (typeof x === 'string' && ehEstrutural(k, x, cfg)) o[mascararNome(k)] = { valorEstrutural: mascararNome(x, 60) };
        else o[mascararNome(k)] = formaDoValor(String(x));
      }
      return o;
    }
    return formaDoValor(String(v));
  }

  function descreverCorpo(corpo, cfg) {
    if (corpo == null) return { tipo: 'vazio' };
    if (typeof FormData !== 'undefined' && corpo instanceof FormData) return { tipo: 'form-data', pares: descreverPares(corpo.entries(), cfg) };
    if (typeof URLSearchParams !== 'undefined' && corpo instanceof URLSearchParams) return { tipo: 'urlencoded', pares: descreverPares(corpo.entries(), cfg) };
    if (typeof corpo === 'string') {
      const t = corpo.trim();
      if (!t) return { tipo: 'vazio' };
      if (t[0] === '{' || t[0] === '[') {
        try { return { tipo: 'json', estrutura: descreverJson(JSON.parse(t), cfg, 0) }; } catch (_) { /* segue */ }
      }
      if (t[0] === '<') return { tipo: 'xml', tags: nomesDeTags(t) };
      if (/^[^=&\s<{]+=/.test(t)) {
        try { return { tipo: 'urlencoded', pares: descreverPares(new URLSearchParams(t).entries(), cfg) }; } catch (_) { /* segue */ }
      }
      return { tipo: 'texto', tamanho: bucketTamanho(t.length) };
    }
    return { tipo: 'binario' };
  }

  function descreverUrl(url, base, cfg) {
    try {
      const x = new URL(url, base);
      return {
        caminho: mascararNome(x.pathname, 120),
        parametros: descreverPares(x.searchParams.entries(), cfg),
        mesmaOrigem: x.origin === new URL(base).origin
      };
    } catch (_) {
      return { caminho: '[url-invalida]', parametros: [] };
    }
  }

  function descreverResposta(texto, contentType, cfg) {
    const r = { tipoConteudo: String(contentType || '').split(';')[0].trim().toLowerCase() || 'desconhecido' };
    if (typeof texto !== 'string') { r.estrutura = 'nao-textual'; return r; }
    r.tamanho = bucketBytes(texto.length);
    const t = texto.trim();
    if (t[0] === '{' || t[0] === '[') {
      try { r.estrutura = descreverJson(JSON.parse(t), cfg, 0); } catch (_) { /* segue */ }
    } else if (t[0] === '<') {
      r.tags = nomesDeTags(t);
    }
    const marc = [];
    paraCada(t.match(/nxj[\w.]*/gi) || [], function (m) {
      const n = mascararNome(m, 60);
      if (indiceDe(marc, n) === -1 && marc.length < 30) marc.push(n);
    });
    r.marcadoresNXJ = marc;
    r.contemPalavraErro = /exception|\berro\b|\berror\b/i.test(t);
    r.assinatura = hash53(JSON.stringify([r.tipoConteudo, r.estrutura || null, r.tags || null, marc]));
    return r;
  }

  function extrairTeclas(textos) {
    const out = [];
    paraCada(textos, function (t) {
      paraCada(String(t || '').match(/\b(?:Ctrl|Alt|Shift)\s*\+\s*\w+\b|\bF(?:[1-9]|1[0-2])\b/g) || [], function (m) {
        if (indiceDe(out, m) === -1) out.push(m);
      });
    });
    return out;
  }

  function slugify(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  }

  function auditarSaida(texto) {
    const t = String(texto)
      .replace(/"geradoPor":\s*"[^"]*"/g, '""')
      .replace(/"(hashTexto|impressaoDigital[A-Za-z]*|assinatura)":\s*"[0-9a-f]+"/g, '""')
      .replace(/"[0-9a-f]{14}"/g, '""');
    const testes = [
      ['CNPJ', /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/],
      ['CPF', /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/],
      ['e-mail', /[\w.+-]+@[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}/],
      ['sequência numérica longa', /\d{8,}/],
      ['valor monetário', /R\$\s*\d/i],
      ['possível credencial', /(senha|password|passwd|token|cookie|jsessionid|authorization|bearer)\s*["':= ]/i],
      ['linha digitável', /\d[\d.\s]{40,}\d/]
    ];
    return mapear(filtrar(testes, function (x) { return x[1].test(t); }), function (x) { return x[0]; });
  }

  /* ---- comparação de mapas (modo Verificar) ---- */

  function chaveControle(c) {
    return [c.tag, c.type || '', c.idPadrao || c.namePadrao || '', c.grid != null ? 'g' + c.coluna : ''].join('|');
  }

  function indexarControles(lista) {
    const m = new Map(), cont = {};
    paraCada(lista, function (c) {
      const base = chaveControle(c);
      cont[base] = (cont[base] || 0) + 1;
      m.set(base + '#' + cont[base], c);
    });
    return m;
  }

  function resumoControle(c) {
    return { tag: c.tag, type: c.type, id: c.id, name: c.name, grid: c.grid, coluna: c.coluna };
  }

  const CAMPOS_ESTRUTURAIS = ['rotulo', 'maxlength', 'role', 'accesskey', 'titulo', 'placeholder', 'texto', 'hrefTipo'];
  const CAMPOS_ESTADO = ['oculto', 'readonly', 'disabled', 'required'];

  function compararQuadro(s, v) {
    const is = indexarControles(s.controles || []), iv = indexarControles(v.controles || []);
    const r = { caminho: s.caminho, situacao: 'comparado', estruturaIdentica: s.impressaoDigital === v.impressaoDigital, adicionados: [], removidos: [], alterados: [], mudancasDeEstado: [], gridsAlterados: [] };
    iv.forEach(function (c, k) { if (!is.has(k)) r.adicionados.push(resumoControle(c)); });
    is.forEach(function (c, k) {
      const x = iv.get(k);
      if (!x) { r.removidos.push(resumoControle(c)); return; }
      const dif = mapear(filtrar(CAMPOS_ESTRUTURAIS, function (f) { return (c[f] || null) !== (x[f] || null); }), function (f) { return { campo: f, antes: c[f] || null, depois: x[f] || null }; });
      if (dif.length) r.alterados.push({ controle: resumoControle(c), diferencas: dif });
      const est = mapear(filtrar(CAMPOS_ESTADO, function (f) { return !!c[f] !== !!x[f]; }), function (f) { return { campo: f, antes: !!c[f], depois: !!x[f] }; });
      if (est.length) r.mudancasDeEstado.push({ controle: resumoControle(c), diferencas: est });
    });
    const gv = new Map(mapear(v.grids || [], function (g) { return [g.id, g]; }));
    paraCada(s.grids || [], function (g) {
      const x = gv.get(g.id);
      if (!x) { r.gridsAlterados.push({ id: g.id, situacao: 'ausente' }); return; }
      if (JSON.stringify(g.colunas || []) !== JSON.stringify(x.colunas || [])) r.gridsAlterados.push({ id: g.id, situacao: 'colunas-diferentes' });
    });
    return r;
  }

  function compararMapas(salvo, vivo) {
    const rel = {
      formato: FORMATO_VERIFICACAO, versaoFormato: 1, geradoPor: 'systextil-mapeador@' + VERSAO, geradoEm: new Date().toISOString(),
      tela: salvo && salvo.tela ? salvo.tela.slug : null,
      impressaoDigitalIdentica: salvo.impressaoDigital === vivo.impressaoDigital,
      quadros: []
    };
    const porCaminho = new Map(mapear(vivo.quadros || [], function (q) { return [q.caminho, q]; }));
    paraCada(salvo.quadros || [], function (qs) {
      const qv = porCaminho.get(qs.caminho);
      if (!qv) { rel.quadros.push({ caminho: qs.caminho, situacao: 'ausente-na-tela-atual' }); return; }
      rel.quadros.push(compararQuadro(qs, qv));
      porCaminho.delete(qs.caminho);
    });
    porCaminho.forEach(function (q, c) { rel.quadros.push({ caminho: c, situacao: 'novo-quadro' }); });
    return rel;
  }

  /* ======================================================================
   * SHA-256 e HMAC-SHA-256 em JavaScript puro (o ERP roda em http, sem crypto.subtle)
   * ==================================================================== */

  const K256 = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }

  function sha256(msg) {
    const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const l = msg.length;
    const total = ((l + 9 + 63) >> 6) << 6;
    const buf = new Uint8Array(total);
    buf.set(msg);
    buf[l] = 0x80;
    const dv = new DataView(buf.buffer);
    dv.setUint32(total - 4, (l * 8) >>> 0);
    dv.setUint32(total - 8, Math.floor((l * 8) / 4294967296));
    const W = new Array(64);
    for (let off = 0; off < total; off += 64) {
      for (let i = 0; i < 16; i++) W[i] = dv.getUint32(off + i * 4);
      for (let i = 16; i < 64; i++) {
        const x = W[i - 15], y = W[i - 2];
        const s0 = rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
        const s1 = rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10);
        W[i] = (W[i - 16] + s0 + W[i - 7] + s1) | 0;
      }
      let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K256[i] + W[i]) | 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0;
        d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    const out = new Uint8Array(32);
    const odv = new DataView(out.buffer);
    for (let i = 0; i < 8; i++) odv.setUint32(i * 4, H[i] >>> 0);
    return out;
  }

  function concatBytes(a, b) {
    const o = new Uint8Array(a.length + b.length);
    o.set(a, 0);
    o.set(b, a.length);
    return o;
  }

  function hmacSha256(key, msg) {
    let k = key;
    if (k.length > 64) k = sha256(k);
    const kp = new Uint8Array(64);
    kp.set(k, 0);
    const ipad = new Uint8Array(64), opad = new Uint8Array(64);
    for (let i = 0; i < 64; i++) { ipad[i] = kp[i] ^ 0x36; opad[i] = kp[i] ^ 0x5c; }
    return sha256(concatBytes(opad, sha256(concatBytes(ipad, msg))));
  }

  function hexDeBytes(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += (bytes[i] < 16 ? '0' : '') + bytes[i].toString(16);
    return s;
  }

  function bytesDeHex(hex) {
    const out = new Uint8Array(hex.length >> 1);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  }

  function utf8(str) { return new TextEncoder().encode(str); }

  function hmacHex(chave, msg) { return hexDeBytes(hmacSha256(chave, msg)); }

  // Chave local: gerada no primeiro uso, guardada só neste navegador, nunca no repositório.
  function obterChaveLocal() {
    if (window.__sysmapperChave) return window.__sysmapperChave;
    let hex = null;
    try { hex = window.localStorage.getItem(CHAVE_LOCAL); } catch (_) { /* indisponível */ }
    if (!hex || hex.length !== 64) {
      const b = new Uint8Array(32);
      crypto.getRandomValues(b);
      hex = hexDeBytes(b);
      try { window.localStorage.setItem(CHAVE_LOCAL, hex); } catch (_) { /* segue só em memória */ }
    }
    window.__sysmapperChave = bytesDeHex(hex);
    return window.__sysmapperChave;
  }

  // Exportação para testes em Node (não afeta o uso como userscript).
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      hash53, mascarar, limpar, mascararNome, padrao, formaDoValor, descreverCorpo, descreverUrl, descreverResposta,
      auditarSaida, slugify, compararMapas, extrairTeclas, bucketBytes, bucketLinhas, CHAVES_ESTRUTURAIS_PADRAO,
      sha256Hex: function (m) { return hexDeBytes(sha256(m)); }, hmacHex: function (k, m) { return hexDeBytes(hmacSha256(k, m)); }
    };
    return;
  }

  /* ======================================================================
   * Contexto do navegador
   * ==================================================================== */

  const estaNoTopo = (function () { try { return window.top === window; } catch (_) { return false; } })();

  function criarBus(alvo) {
    const bus = {
      gravando: false, t0: 0, eventos: [], seq: 0, seqReq: 0, descartados: 0,
      cfg: { chavesEstruturais: CHAVES_ESTRUTURAIS_PADRAO.slice(), incluirTextoMensagens: false, incluirOpcoesSelect: false },
      meta: {}, onMudanca: null
    };
    let timer = null;
    // O salvamento é agendado pelo próprio bus, qualquer que seja o quadro que o criou.
    bus.agendarSalvar = function () {
      if (timer) return;
      timer = setTimeout(function () { timer = null; salvarSessao(bus); }, 500);
    };
    alvo.__sysmapperBus = bus;
    return bus;
  }

  function obterBus() {
    try {
      const T = window.top;
      if (!T.__sysmapperBus) criarBus(T);
      return T.__sysmapperBus;
    } catch (_) {
      if (!window.__sysmapperBus) criarBus(window);
      return window.__sysmapperBus;
    }
  }

  function armazenamento() {
    try { return window.top.sessionStorage; } catch (_) { return window.sessionStorage; }
  }

  function salvarSessao(bus) {
    try {
      armazenamento().setItem(CHAVE_SESSAO, JSON.stringify({
        gravando: bus.gravando, t0: bus.t0, eventos: bus.eventos, seq: bus.seq, seqReq: bus.seqReq,
        descartados: bus.descartados, cfg: bus.cfg, meta: bus.meta
      }));
    } catch (_) { /* cota ou indisponível: segue sem persistir */ }
  }

  function restaurarSessao() {
    try {
      const raw = window.sessionStorage.getItem(CHAVE_SESSAO);
      if (!raw) return;
      Object.assign(obterBus(), JSON.parse(raw));
    } catch (_) { /* ignora */ }
  }

  function limparSessao() {
    try { window.sessionStorage.removeItem(CHAVE_SESSAO); } catch (_) { /* ignora */ }
  }

  let quadroCache = null;
  function nomeDoQuadro() {
    if (quadroCache) return quadroCache;
    try {
      if (window.top === window) return (quadroCache = 'topo');
      const partes = [];
      let w = window;
      while (w !== w.top) {
        const lista = listaDe(w.parent.document.querySelectorAll('iframe,frame'));
        partes.unshift(indiceDe(lista, w.frameElement));
        w = w.parent;
      }
      return (quadroCache = 'topo' + mapear(partes, function (i) { return '>' + i; }).join(''));
    } catch (_) {
      return (quadroCache = 'quadro-externo');
    }
  }

  function registrar(ev) {
    const bus = obterBus();
    if (!bus.gravando) return;
    if (bus.eventos.length >= MAX_EVENTOS) { bus.descartados++; return; }
    ev.t = Date.now() - bus.t0;
    ev.quadro = nomeDoQuadro();
    ev.seq = ++bus.seq;
    bus.eventos.push(ev);
    if (bus.agendarSalvar) bus.agendarSalvar();
    if (bus.onMudanca) bus.onMudanca();
  }

  function descreverElemento(el) {
    if (!el || el.nodeType !== 1) return null;
    const d = { tag: el.tagName.toLowerCase() };
    if (el.id) d.id = mascararNome(el.id);
    const nome = el.getAttribute('name');
    if (nome) d.name = mascararNome(nome);
    const tipo = el.getAttribute('type');
    if (tipo) d.type = tipo.toLowerCase();
    const papel = el.getAttribute('role');
    if (papel) d.role = papel;
    return d;
  }

  function ehDoPainel(n) {
    return !!n && (n.id === ID_PAINEL || (n.closest && !!n.closest('#' + ID_PAINEL)));
  }

  function eventoDoPainel(e) {
    try {
      const c = e.composedPath ? e.composedPath() : [];
      for (let i = 0; i < c.length; i++) if (c[i] && c[i].id === ID_PAINEL) return true;
    } catch (_) { /* ignora */ }
    return !!(e.target && e.target.id === ID_PAINEL);
  }

  /* ======================================================================
   * Gravador (passivo; só registra quando bus.gravando === true)
   * ==================================================================== */

  function instalarGanchos() {
    const w = window;
    if (w.__sysmapperGanchos) return;
    w.__sysmapperGanchos = true;
    const orig = { xhrOpen: null, xhrSend: null, fetch: null, fetchWrapper: null, xhrOpenWrapper: null, xhrSendWrapper: null, dialogos: {}, dialogosWrapper: {} };
    w.__sysmapperOriginais = orig;

    const XP = w.XMLHttpRequest && w.XMLHttpRequest.prototype;
    if (XP) {
      const open = XP.open, send = XP.send;
      orig.xhrOpen = open; orig.xhrSend = send;
      XP.open = function (metodo, url) {
        try { this.__sm = { metodo: String(metodo || 'GET').toUpperCase(), url: String(url) }; } catch (_) { /* ignora */ }
        return open.apply(this, arguments);
      };
      XP.send = function (corpo) {
        const xhr = this;
        try {
          const bus = obterBus();
          if (bus.gravando && xhr.__sm) {
            const id = ++bus.seqReq, ini = Date.now(), info = xhr.__sm;
            registrar(Object.assign({ tipo: 'requisicao', req: id, via: 'xhr', metodo: info.metodo }, descreverUrl(info.url, w.location.href, bus.cfg), { corpo: descreverCorpo(corpo, bus.cfg) }));
            xhr.addEventListener('loadend', function () {
              try {
                let texto = null;
                try { if (xhr.responseType === '' || xhr.responseType === 'text') texto = xhr.responseText; } catch (_) { /* ignora */ }
                registrar(Object.assign({ tipo: 'resposta', req: id, status: xhr.status, duracaoMs: Date.now() - ini },
                  descreverResposta(texto, xhr.getResponseHeader('content-type'), obterBus().cfg)));
              } catch (_) { /* ignora */ }
            });
          }
        } catch (_) { /* nunca quebrar a página */ }
        return send.apply(this, arguments);
      };
      orig.xhrOpenWrapper = XP.open; orig.xhrSendWrapper = XP.send;
    }

    if (typeof w.fetch === 'function') {
      const f = w.fetch;
      orig.fetch = f;
      w.fetch = function (entrada, init) {
        let id = 0, ini = 0;
        try {
          const bus = obterBus();
          if (bus.gravando) {
            id = ++bus.seqReq; ini = Date.now();
            const url = typeof entrada === 'string' ? entrada : ((entrada && entrada.url) || String(entrada));
            const metodo = String((init && init.method) || (entrada && entrada.method) || 'GET').toUpperCase();
            registrar(Object.assign({ tipo: 'requisicao', req: id, via: 'fetch', metodo: metodo }, descreverUrl(url, w.location.href, bus.cfg), { corpo: descreverCorpo(init && init.body, bus.cfg) }));
          }
        } catch (_) { /* ignora */ }
        const p = f.apply(this, arguments);
        if (id) {
          p.then(function (resp) {
            try {
              resp.clone().text().then(function (txt) {
                try { registrar(Object.assign({ tipo: 'resposta', req: id, status: resp.status, duracaoMs: Date.now() - ini }, descreverResposta(txt, resp.headers.get('content-type'), obterBus().cfg))); } catch (_) { /* ignora */ }
              }).catch(function () { /* ignora */ });
            } catch (_) { /* ignora */ }
          }, function () {
            try { registrar({ tipo: 'resposta', req: id, erroDeRede: true, duracaoMs: Date.now() - ini }); } catch (_) { /* ignora */ }
          });
        }
        return p;
      };
      orig.fetchWrapper = w.fetch;
    }

    const nomes = ['alert', 'confirm', 'prompt'];
    for (let i = 0; i < nomes.length; i++) {
      const nome = nomes[i];
      const o = w[nome];
      if (typeof o !== 'function') continue;
      orig.dialogos[nome] = o;
      w[nome] = function (msg) {
        try {
          const bus = obterBus();
          if (bus.gravando) {
            const t = mascarar(String(msg == null ? '' : msg));
            const ev = { tipo: 'dialogo-nativo', dialogo: nome, tamanho: bucketTamanho(t.length), hashTexto: hash53(t) };
            if (bus.cfg.incluirTextoMensagens) ev.textoMascarado = limpar(msg, 120);
            registrar(ev);
          }
        } catch (_) { /* ignora */ }
        return o.apply(this, arguments);
      };
      orig.dialogosWrapper[nome] = w[nome];
    }
  }

  // Restaura só o que ainda é nosso: se outro script substituiu uma função depois, não a desfaz.
  function removerGanchos() {
    const w = window;
    const orig = w.__sysmapperOriginais;
    if (!w.__sysmapperGanchos || !orig) return;
    const XP = w.XMLHttpRequest && w.XMLHttpRequest.prototype;
    if (XP && orig.xhrOpen) {
      if (XP.open === orig.xhrOpenWrapper) XP.open = orig.xhrOpen;
      if (XP.send === orig.xhrSendWrapper) XP.send = orig.xhrSend;
    }
    if (orig.fetch && w.fetch === orig.fetchWrapper) w.fetch = orig.fetch;
    const nomes = Object.keys(orig.dialogos);
    for (let i = 0; i < nomes.length; i++) {
      const n = nomes[i];
      if (w[n] === orig.dialogosWrapper[n]) w[n] = orig.dialogos[n];
    }
    w.__sysmapperGanchos = false;
    w.__sysmapperOriginais = null;
  }

  // ADR-019: lê só o comprimento do valor e, se houver valor esperado para o campo, compara por HMAC.
  function conferirCampo(el, motivo) {
    const bus = obterBus();
    if (!bus.gravando || !el || el.nodeType !== 1) return;
    const tag = el.tagName.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') return;
    const tipo = (el.getAttribute('type') || 'text').toLowerCase();
    if (tipo !== 'text' && tipo !== 'search' && tipo !== 'tel' && tipo !== 'number' && tipo !== 'date' && tipo !== 'email') {
      if (tag === 'input') return;
    }
    // Só campos listados pelo operador no painel são lidos (ADR-019).
    const esperados = bus.meta && bus.meta.conferencia;
    const nome = el.id || el.name || '';
    if (!esperados || !nome) return;
    let item = null;
    for (let i = 0; i < esperados.length; i++) if (esperados[i].campo === nome) item = esperados[i];
    if (!item) return;
    const valor = String(el.value == null ? '' : el.value);
    const ev = { tipo: 'campo', motivo: motivo, alvo: descreverElemento(el), comprimento: valor.length };
    if (item.digest) {
      ev.conferido = true;
      ev.igual = hmacHex(obterChaveLocal(), utf8(valor)) === item.digest;
    }
    registrar(ev);
  }

  const TECLAS_NOMEADAS = /^(F\d{1,2}|Enter|Tab|Escape|Backspace|Delete|Insert|Home|End|PageUp|PageDown|Arrow(Up|Down|Left|Right)|ContextMenu)$/;

  function instalarOuvintes() {
    window.addEventListener('keydown', function (e) {
      try {
        const bus = obterBus();
        if (!bus.gravando || eventoDoPainel(e)) return;
        const mod = [];
        if (e.ctrlKey) mod.push('Ctrl');
        if (e.altKey) mod.push('Alt');
        if (e.shiftKey) mod.push('Shift');
        if (e.metaKey) mod.push('Meta');
        const alvo = descreverElemento(e.target);
        if (TECLAS_NOMEADAS.test(e.key)) {
          registrar({ tipo: 'tecla', tecla: e.key, modificadores: mod, alvo: alvo });
          if (e.key === 'F7' || e.key === 'Enter') conferirCampo(e.target, 'tecla-' + e.key);
        } else if ((e.ctrlKey || e.altKey) && !(e.ctrlKey && e.altKey) && e.key && e.key.length === 1) {
          registrar({ tipo: 'tecla', tecla: e.key.toLowerCase(), modificadores: mod, alvo: alvo });
        } else if (e.key && e.key.length === 1) {
          // Só se conta quantas teclas de caractere foram digitadas; o caractere nunca é guardado.
          const ult = bus.eventos[bus.eventos.length - 1];
          const chave = alvo ? (alvo.id || '') + '|' + (alvo.name || '') + '|' + alvo.tag : '';
          if (ult && ult.tipo === 'digitacao' && ult.quadro === nomeDoQuadro() && ult.chave === chave && (Date.now() - bus.t0 - ult.t) < 2000) {
            ult.teclas++; ult.t = Date.now() - bus.t0;
          } else {
            registrar({ tipo: 'digitacao', teclas: 1, chave: chave, alvo: alvo });
          }
        }
      } catch (_) { /* ignora */ }
    }, true);

    window.addEventListener('click', function (e) {
      try {
        const bus = obterBus();
        if (!bus.gravando || eventoDoPainel(e)) return;
        const alvoEl = e.target && e.target.nodeType === 1 ? e.target : null;
        const b = alvoEl && alvoEl.closest ? alvoEl.closest('button,[role="button"],[role="tab"],[role="menuitem"],input[type="button"],input[type="submit"],input[type="image"]') : null;
        const ev = { tipo: 'clique', alvo: descreverElemento(b || alvoEl) };
        if (b) {
          ev.texto = limpar(b.getAttribute('aria-label') || b.getAttribute('title') || (b.tagName === 'INPUT' ? b.getAttribute('value') : b.textContent), 30);
        }
        registrar(ev);
      } catch (_) { /* ignora */ }
    }, true);

    window.addEventListener('focusin', function (e) {
      try {
        if (!obterBus().gravando || eventoDoPainel(e)) return;
        registrar({ tipo: 'foco', alvo: descreverElemento(e.target) });
      } catch (_) { /* ignora */ }
    }, true);

    window.addEventListener('change', function (e) {
      try {
        if (!obterBus().gravando || eventoDoPainel(e)) return;
        const el = e.target;
        if (!el || el.nodeType !== 1) return;
        const tipo = (el.getAttribute('type') || '').toLowerCase();
        if (tipo === 'checkbox' || tipo === 'radio') {
          registrar({ tipo: 'alteracao', alvo: descreverElemento(el), forma: el.checked ? 'marcado' : 'desmarcado' });
        } else {
          conferirCampo(el, 'alteracao');
        }
      } catch (_) { /* ignora */ }
    }, true);
  }

  const SEL_MSG = '[role="alert"],[role="alertdialog"],[role="dialog"],dialog,[aria-live],[class*="alert" i],[class*="msg" i],[class*="mensag" i],[class*="erro" i],[class*="error" i],[class*="sucess" i],[class*="success" i],[class*="aviso" i],[class*="warn" i],[class*="toast" i],[class*="modal" i],[class*="popup" i]';
  const ATRIB_OBSERVADOS = ['disabled', 'readonly', 'hidden', 'required', 'aria-invalid', 'aria-disabled'];

  function detectarMensagem(n) {
    let el = null;
    try { el = n.matches(SEL_MSG) ? n : n.querySelector(SEL_MSG); } catch (_) { return null; }
    if (!el) return null;
    const texto = mascarar((el.textContent || '').replace(/\s+/g, ' ').trim());
    if (!texto) return null;
    const bus = obterBus();
    const m = {
      tipo: 'mensagem', origem: descreverElemento(el),
      classes: mapear(filtrar(listaDe(el.classList || []), function (c, i) { return i < 4; }), function (c) { return mascararNome(c, 40); }),
      tamanho: bucketTamanho(texto.length), hashTexto: hash53(texto)
    };
    if (bus.cfg.incluirTextoMensagens) m.textoMascarado = limpar(texto, 120);
    return m;
  }

  function aoMutar(lista) {
    try {
      const bus = obterBus();
      if (!bus.gravando) return;
      let adicionados = 0, removidos = 0;
      const controles = [], mensagens = [], atributos = [], tabelasVistas = [];
      for (let i = 0; i < lista.length; i++) {
        const m = lista[i];
        if (m.type === 'childList') {
          if (ehDoPainel(m.target)) continue;
          removidos += m.removedNodes.length;
          for (let j = 0; j < m.addedNodes.length; j++) {
            const n = m.addedNodes[j];
            if (n.nodeType !== 1 || ehDoPainel(n)) continue;
            adicionados++;
            if (tabelasVistas.length < 5) {
              if (n.tagName === 'TABLE') tabelasVistas.push(n);
              else {
                const ts = n.querySelectorAll('table');
                for (let k = 0; k < ts.length && tabelasVistas.length < 5; k++) tabelasVistas.push(ts[k]);
              }
            }
            if (controles.length < 15) {
              if (n.matches('input,select,textarea,button')) {
                controles.push(descreverElemento(n));
              } else {
                const cs = n.querySelectorAll('input,select,textarea,button');
                for (let k = 0; k < cs.length && controles.length < 15; k++) controles.push(descreverElemento(cs[k]));
              }
            }
            if (mensagens.length < 5) {
              const msg = detectarMensagem(n);
              if (msg) mensagens.push(msg);
            }
          }
        } else if (m.type === 'attributes') {
          const el = m.target;
          if (ehDoPainel(el) || atributos.length >= 20) continue;
          const a = m.attributeName;
          atributos.push({ alvo: descreverElemento(el), atributo: a, estado: el.hasAttribute(a) ? (a.indexOf('aria-') === 0 ? el.getAttribute(a) : true) : false });
        }
      }
      if (adicionados || removidos || atributos.length) {
        registrar({ tipo: 'mutacao', adicionados: adicionados, removidos: removidos, controlesAdicionados: controles, atributos: atributos });
      }
      for (let i = 0; i < tabelasVistas.length; i++) {
        const tb = tabelasVistas[i];
        if (tb.__smLinhas === tb.rows.length) continue;
        tb.__smLinhas = tb.rows.length;
        registrar({ tipo: 'grade', tabelaId: mascararNome(tb.id || '', 40), linhasFaixa: bucketLinhas(tb.rows.length > 0 ? tb.rows.length - 1 : 0) });
      }
      for (let i = 0; i < mensagens.length; i++) registrar(mensagens[i]);
    } catch (_) { /* ignora */ }
  }

  let observador = null;
  function iniciarObservador() {
    if (observador || !document.documentElement) return;
    observador = new MutationObserver(aoMutar);
    observador.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ATRIB_OBSERVADOS });
  }

  function pararObservador() {
    if (observador) { observador.disconnect(); observador = null; }
  }

  // Liga ou desliga a captura nesta janela e propaga aos quadros filhos.
  function ativarQuadro(on) {
    try {
      if (on) { instalarGanchos(); iniciarObservador(); }
      else { pararObservador(); removerGanchos(); }
      const frames = document.querySelectorAll('iframe,frame');
      for (let i = 0; i < frames.length; i++) {
        try { frames[i].contentWindow.postMessage({ __sysmapper: 'gravacao', on: !!on }, '*'); } catch (_) { /* ignora */ }
      }
    } catch (_) { /* ignora */ }
  }

  window.addEventListener('message', function (e) {
    const d = e.data;
    if (!d || d.__sysmapper !== 'gravacao') return;
    if (e.source !== window.parent) return;
    ativarQuadro(!!d.on);
  });

  /* ======================================================================
   * Mapa (somente leitura de atributos allowlisted; nunca lê .value)
   * ==================================================================== */

  const SEL_CONTROLES = 'input,select,textarea,button,a[href],[role="button"],[role="tab"],[role="menuitem"],[role="combobox"],[role="checkbox"],[role="radio"],[contenteditable=""],[contenteditable="true"],[accesskey],[tabindex]';

  function coletarQuadros(doc, caminho, acc, avisos) {
    acc.push({ caminho: caminho, doc: doc });
    const frames = doc.querySelectorAll('iframe,frame');
    for (let i = 0; i < frames.length; i++) {
      const f = frames[i];
      const c = caminho + '>' + i;
      try {
        const d = f.contentDocument;
        if (d && d.documentElement) coletarQuadros(d, c, acc, avisos);
        else avisos.push('quadro ' + c + ' sem acesso');
      } catch (_) {
        avisos.push('quadro ' + c + ' de outra origem (ignorado)');
      }
    }
  }

  function detectarGrids(doc) {
    const out = [];
    const tabelas = doc.querySelectorAll('table');
    for (let ti = 0; ti < tabelas.length; ti++) {
      const t = tabelas[ti];
      if (t.querySelector('table')) continue; // tabela de layout
      const rows = t.rows;
      if (rows.length < 3) continue;
      let headerRow = null, criterio = null;
      if (t.tHead && t.tHead.rows.length) { headerRow = t.tHead.rows[t.tHead.rows.length - 1]; criterio = 'thead'; }
      else if (rows[0].cells.length && cellsSaoTh(rows[0])) { headerRow = rows[0]; criterio = 'th'; }
      if (!headerRow && rows.length >= 4) {
        const cont = {};
        for (let r = 0; r < rows.length; r++) {
          const k = rows[r].cells.length;
          cont[k] = (cont[k] || 0) + 1;
        }
        let moda = null, melhor = -1;
        for (const k in cont) {
          if (cont[k] > melhor) { melhor = cont[k]; moda = k; }
        }
        if (moda !== null && Number(moda) >= 3 && melhor / rows.length >= 0.8) criterio = 'uniforme';
      }
      if (!criterio) continue;
      let indiceCorpo = 0;
      if (headerRow) {
        for (let r = 0; r < rows.length; r++) { if (rows[r] === headerRow) { indiceCorpo = r + 1; break; } }
      }
      out.push({ id: 'grid' + (out.length + 1), tabela: t, linhaCabecalho: headerRow, indiceCorpo: indiceCorpo, criterio: criterio });
    }
    return out;
  }

  function cellsSaoTh(tr) {
    for (let i = 0; i < tr.cells.length; i++) if (tr.cells[i].tagName !== 'TH') return false;
    return true;
  }

  function descreverGrid(g) {
    const t = g.tabela;
    const d = { id: g.id, criterio: g.criterio, cabecalhoConfiavel: !!g.linhaCabecalho };
    if (t.id) d.tabelaId = mascararNome(t.id);
    if (g.linhaCabecalho) {
      d.colunas = mapear(filtrar(listaDe(g.linhaCabecalho.cells), function (c, i) { return i < 40; }), function (c, i) { return { indice: i, cabecalho: limpar(c.textContent, 40) }; });
    }
    const primeira = t.rows[g.indiceCorpo];
    d.qtdColunas = primeira ? primeira.cells.length : 0;
    d.qtdLinhas = bucketLinhas(t.rows.length - g.indiceCorpo);
    return d;
  }

  function posicaoEmGrid(el, porTabela) {
    const tr = el.closest ? el.closest('tr') : null;
    if (!tr) return null;
    const tab = tr.closest('table');
    const g = tab && porTabela.get(tab);
    if (!g) return null;
    const idx = indiceDe(listaDe(tab.rows), tr);
    const cel = el.closest('td,th');
    const coluna = cel ? cel.cellIndex : -1;
    if (idx < g.indiceCorpo) return { grid: g.id, coluna: coluna, cabecalho: true, omitir: false };
    if (idx === g.indiceCorpo) return { grid: g.id, coluna: coluna, cabecalho: false, omitir: false };
    return { omitir: true };
  }

  // Só rótulos explícitos: label associado e aria-labelledby. Texto solto ao lado (célula vizinha) não é usado.
  function descobrirRotulo(el, doc, ref) {
    if (ref && !ref.cabecalho) return null;
    try {
      if (el.labels && el.labels.length) {
        const t = limpar(el.labels[0].textContent, 60);
        if (t) return { texto: t, origem: 'label' };
      }
    } catch (_) { /* ignora */ }
    const lb = el.getAttribute('aria-labelledby');
    if (lb) {
      const t = limpar(mapear(lb.split(/\s+/), function (i) { const x = doc.getElementById(i); return x ? x.textContent : ''; }).join(' '), 60);
      if (t) return { texto: t, origem: 'aria-labelledby' };
    }
    return null;
  }

  function descreverControle(el, doc, cfg, ref) {
    const tag = el.tagName.toLowerCase();
    const c = { tag: tag };
    const id = el.getAttribute('id');
    if (id) { c.id = mascararNome(id); c.idPadrao = padrao(id); }
    const nm = el.getAttribute('name');
    if (nm) { c.name = mascararNome(nm); c.namePadrao = padrao(nm); }
    const tp = el.getAttribute('type');
    if (tp) c.type = tp.toLowerCase(); else if (tag === 'input') c.type = 'text';
    const role = el.getAttribute('role');
    if (role) c.role = role;
    const titulo = el.getAttribute('title');
    if (titulo) c.titulo = limpar(titulo, 60);
    const ph = el.getAttribute('placeholder');
    if (ph) c.placeholder = limpar(ph, 60);
    const al = el.getAttribute('aria-label');
    if (al) c.ariaLabel = limpar(al, 60);
    const ml = el.getAttribute('maxlength');
    if (ml && /^\d+$/.test(ml)) c.maxlength = ml;
    const ti = el.getAttribute('tabindex');
    if (ti != null && /^-?\d+$/.test(ti)) c.tabindex = ti;
    const ak = el.getAttribute('accesskey');
    if (ak) c.accesskey = ak.slice(0, 5);
    if (el.hasAttribute('readonly')) c.readonly = true;
    if (el.hasAttribute('disabled')) c.disabled = true;
    if (el.hasAttribute('required')) c.required = true;
    if (el.getClientRects().length === 0) c.oculto = true;
    if (tag === 'a') {
      const href = el.getAttribute('href') || '';
      c.hrefTipo = /^javascript:/i.test(href) ? 'javascript' : (href.charAt(0) === '#' ? 'ancora' : 'url');
    }
    if (tag === 'button' || (tag === 'input' && /^(button|submit|reset|image)$/.test(c.type || ''))) {
      const tx = tag === 'button' ? el.textContent : el.getAttribute('value');
      if (tx) c.texto = limpar(tx, 40);
    }
    if (tag === 'select') {
      c.opcoes = el.options.length;
      c.primeiraOpcaoVazia = el.options.length > 0 && (el.options[0].getAttribute('value') || '') === '';
      if (cfg.incluirOpcoesSelect && el.options.length <= 12) {
        c.listaOpcoes = mapear(listaDe(el.options), function (o) {
          return { rotulo: limpar(o.textContent, 40), valor: mascararNome(o.getAttribute('value') || '', 40) };
        });
      }
    }
    if ((c.type === 'radio' || c.type === 'checkbox') && nm) c.grupo = mascararNome(nm);
    const rot = descobrirRotulo(el, doc, ref);
    if (rot) { c.rotulo = rot.texto; c.rotuloOrigem = rot.origem; }
    const dicas = extrairTeclas([c.titulo, c.ariaLabel, c.rotulo, c.texto]);
    if (dicas.length) c.dicasDeTecla = dicas;
    if (ref) { c.grid = ref.grid; c.coluna = ref.coluna; if (ref.cabecalho) c.emCabecalho = true; }
    return c;
  }

  function mapearQuadro(doc, caminho, cfg, avisos) {
    const grids = detectarGrids(doc);
    const porTabela = new Map(mapear(grids, function (g) { return [g.tabela, g]; }));
    const controles = [];
    let omitidos = 0, n = 0;
    const els = doc.querySelectorAll(SEL_CONTROLES);
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el.id === ID_PAINEL) continue;
      if (++n > MAX_CONTROLES) { avisos.push(caminho + ': limite de ' + MAX_CONTROLES + ' controles atingido'); break; }
      const ref = posicaoEmGrid(el, porTabela);
      if (ref && ref.omitir) { omitidos++; continue; }
      controles.push(descreverControle(el, doc, cfg, ref));
    }
    const atalhos = [];
    for (let i = 0; i < controles.length; i++) {
      const c = controles[i];
      const dicas = c.dicasDeTecla || [];
      for (let j = 0; j < dicas.length; j++) atalhos.push({ tecla: dicas[j], controle: c.id || c.name || c.tag });
      if (c.accesskey) atalhos.push({ tecla: 'accesskey ' + c.accesskey, controle: c.id || c.name || c.tag });
    }
    const gridsDesc = [];
    for (let i = 0; i < grids.length; i++) gridsDesc.push(descreverGrid(grids[i]));
    const itens = [];
    for (let i = 0; i < controles.length; i++) itens.push(chaveControle(controles[i]));
    itens.sort();
    for (let i = 0; i < gridsDesc.length; i++) itens.push('grid:' + JSON.stringify(gridsDesc[i].colunas || []));
    if (doc.querySelector('[role="grid"],[role="table"]')) avisos.push(caminho + ': há grids por ARIA (não tratados nesta versão)');
    return {
      caminho: caminho,
      titulo: limpar(doc.title, 80),
      qtdControles: controles.length,
      controlesOmitidosEmLinhasDeGrid: omitidos,
      controles: controles,
      grids: gridsDesc,
      atalhosDeclarados: atalhos,
      impressaoDigital: hash53(itens.join('\n'))
    };
  }

  function mapearTela(cfg, slug) {
    const avisos = [], docs = [];
    coletarQuadros(document, 'topo', docs, avisos);
    const quadros = mapear(docs, function (q) { return mapearQuadro(q.doc, q.caminho, cfg, avisos); });
    avisos.push('Rótulos vêm só de label e aria-labelledby. Revise a pré-visualização antes de versionar.');
    return {
      formato: FORMATO_MAPA, versaoFormato: 1, geradoPor: 'systextil-mapeador@' + VERSAO, geradoEm: new Date().toISOString(),
      tela: { slug: slug || null, titulo: limpar(document.title, 80) },
      impressaoDigital: hash53(mapear(quadros, function (q) { return q.caminho + ':' + q.impressaoDigital; }).join(';')),
      quadros: quadros,
      avisos: avisos,
      nota: 'Mapa estrutural: nenhum valor de campo foi lido. Particularidades e comportamento por ação são documentados à parte.'
    };
  }

  /* ======================================================================
   * Resultado do Gravador
   * ==================================================================== */

  function montarAcao(bus) {
    const ev = mapear(bus.eventos, function (e) { const c = Object.assign({}, e); delete c.chave; return c; });
    const sinais = new Map();
    paraCada(ev, function (e) {
      if (e.tipo === 'mensagem' || e.tipo === 'dialogo-nativo') {
        const k = e.tipo + '|' + e.hashTexto;
        if (!sinais.has(k)) sinais.set(k, { tipo: e.tipo, hashTexto: e.hashTexto, tamanho: e.tamanho, ocorrencias: 0, primeiraEmMs: e.t });
        sinais.get(k).ocorrencias++;
      }
    });
    const avisos = ['Nenhum valor foi registrado. Apenas comprimentos e comparações por HMAC, conforme ADR-019.'];
    if (bus.descartados) avisos.push(bus.descartados + ' eventos descartados por exceder o limite de ' + MAX_EVENTOS + '.');
    if (bus.cfg.incluirTextoMensagens) avisos.push('Opção "incluir texto das mensagens" estava ativa (texto mascarado): revisar.');
    return {
      formato: FORMATO_ACAO, versaoFormato: 1, geradoPor: 'systextil-mapeador@' + VERSAO, geradoEm: new Date().toISOString(),
      tela: bus.meta.tela, acao: bus.meta.acao, impressaoDigitalTela: bus.meta.impressaoDigitalInicial,
      resumo: {
        eventos: ev.length, descartados: bus.descartados,
        requisicoes: filtrar(ev, function (e) { return e.tipo === 'requisicao'; }).length,
        mensagens: filtrar(ev, function (e) { return e.tipo === 'mensagem' || e.tipo === 'dialogo-nativo'; }).length,
        duracaoMs: ev.length ? ev[ev.length - 1].t : 0
      },
      sinaisDeConfirmacao: Array.from(sinais.values()),
      avisos: avisos,
      nota: 'Comando enviado ou resposta genérica não equivalem a sucesso: confirmar por sinal independente (ADR-015).',
      linhaDoTempo: ev
    };
  }

  /* ======================================================================
   * Painel
   * ==================================================================== */

  function criarPainel() {
    if (document.getElementById(ID_PAINEL)) return;
    const host = document.createElement('div');
    host.id = ID_PAINEL;
    host.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:2147483647;';
    // Sem Shadow DOM: com ele, o alvo das teclas vira o contêiner do painel e os scripts da página
    // (que cancelam o Backspace fora de campos) bloqueiam a digitação. Os estilos ficam
    // restritos ao id do painel e os ids dos elementos têm prefixo próprio.
    const P = '#' + ID_PAINEL + ' ';
    const CSS = '<style>' +
      P + '.p{font:12px/1.4 system-ui,Segoe UI,Arial,sans-serif;color:#1f2937;background:#fff;border:1px solid #9ca3af;border-radius:8px;width:320px;box-shadow:0 4px 18px rgba(0,0,0,.25)}' +
      P + '.cab{display:flex;align-items:center;gap:6px;padding:6px 8px;background:#111827;color:#fff;border-radius:8px 8px 0 0}' +
      P + '.cab b{flex:1}' +
      P + '.cab button{background:none;border:0;color:#fff;cursor:pointer;font-size:14px}' +
      P + '#sm-corpo{padding:8px;display:flex;flex-direction:column;gap:6px;max-height:70vh;overflow:auto}' +
      P + 'label{display:flex;flex-direction:column;gap:2px;font-weight:600}' +
      P + 'input[type=text],' + P + 'textarea{font:inherit;padding:3px 5px;border:1px solid #9ca3af;border-radius:4px}' +
      P + '.lin{display:flex;gap:6px}' +
      P + '.lin button{flex:1}' +
      P + 'button{font:inherit;padding:4px 6px;border:1px solid #6b7280;border-radius:4px;background:#f3f4f6;cursor:pointer}' +
      P + 'button:disabled{opacity:.5;cursor:default}' +
      P + 'button.grav{background:#fee2e2;border-color:#b91c1c}' +
      P + 'hr{border:0;border-top:1px solid #e5e7eb;width:100%}' +
      P + 'pre{margin:0;max-height:200px;overflow:auto;background:#f9fafb;border:1px solid #e5e7eb;padding:4px;font:11px/1.3 ui-monospace,Consolas,monospace;white-space:pre-wrap;word-break:break-all}' +
      P + '#sm-aviso{color:#92400e}' +
      P + '#sm-aviso.erro{color:#b91c1c;font-weight:600}' +
      P + '#sm-est{font-size:11px}' +
      P + '.rec{color:#fca5a5}' +
      P + 'details label{font-weight:400;flex-direction:row;align-items:center;gap:4px}' +
      P + '[hidden]{display:none!important}' +
      '</style>';
    host.innerHTML = CSS +
      '<div class="p">' +
      '<div class="cab"><b>Mapeador de telas</b><span id="sm-est"></span><button id="sm-min" title="Minimizar">–</button></div>' +
      '<div id="sm-corpo">' +
      '<label>Tela (slug)<input type="text" id="sm-slug" placeholder="consulta-titulos"></label>' +
      '<div class="lin"><button id="sm-mapear">Mapear tela</button><button id="sm-verificar">Verificar…</button></div>' +
      '<hr>' +
      '<label>Ação<input type="text" id="sm-acao" placeholder="pesquisar-titulo"></label>' +
      '<div class="lin"><button id="sm-gravar">● Iniciar gravação</button></div>' +
      '<div class="lin"><button id="sm-conf-ok" disabled>Conferido: OK</button><button id="sm-conf-div" disabled>Conferido: divergente</button></div>' +
      '<div class="lin"><input type="text" id="sm-passo" placeholder="marcador do passo" style="flex:1"><button id="sm-marcar" disabled style="flex:0 0 auto">Marcar</button></div>' +
      '<details><summary>Opções</summary>' +
      '<label>Chaves estruturais (valor mantido)<textarea id="sm-chaves" rows="3"></textarea></label>' +
      '<label><input type="checkbox" id="sm-txtmsg"> incluir texto (mascarado) das mensagens</label>' +
      '<label><input type="checkbox" id="sm-optsel"> incluir opções de selects (até 12)</label>' +
      '<label>Conferência 1: id ou name do campo<input type="text" id="sm-conf-campo1"></label>' +
      '<label>Conferência 1: valor esperado (não é salvo)<input type="password" id="sm-conf-valor1" autocomplete="off"></label>' +
      '<label>Conferência 2: id ou name do campo<input type="text" id="sm-conf-campo2"></label>' +
      '<label>Conferência 2: valor esperado (não é salvo)<input type="password" id="sm-conf-valor2" autocomplete="off"></label>' +
      '</details>' +
      '<div id="sm-aviso"></div>' +
      '<pre id="sm-prev" hidden></pre>' +
      '<div class="lin" id="sm-acoes" hidden><button id="sm-baixar">Baixar JSON</button><button id="sm-descartar">Descartar</button></div>' +
      '</div></div>' +
      '<input type="file" id="sm-arq" accept=".json,application/json" hidden>';
    // Teclas digitadas no painel não sobem para a página, nem para os scripts dela.
    const pararTecla = function (e) { e.stopPropagation(); };
    host.addEventListener('keydown', pararTecla);
    host.addEventListener('keyup', pararTecla);
    host.addEventListener('keypress', pararTecla);
    document.documentElement.appendChild(host);

    const $ = function (id) { return document.getElementById('sm-' + id); };
    const ui = {
      est: $('est'), corpo: $('corpo'), min: $('min'), slug: $('slug'), acao: $('acao'), mapear: $('mapear'), verificar: $('verificar'),
      gravar: $('gravar'), passo: $('passo'), marcar: $('marcar'), chaves: $('chaves'), txtmsg: $('txtmsg'), optsel: $('optsel'),
      aviso: $('aviso'), prev: $('prev'), acoes: $('acoes'), baixar: $('baixar'), descartar: $('descartar'), arq: $('arq'),
      confOk: $('conf-ok'), confDiv: $('conf-div'), confCampo1: $('conf-campo1'), confValor1: $('conf-valor1'), confCampo2: $('conf-campo2'), confValor2: $('conf-valor2')
    };

    // Lê os valores esperados, guarda só o HMAC e apaga o valor digitado.
    function prepararConferencia() {
      const chave = obterChaveLocal();
      const out = [];
      const pares = [[ui.confCampo1, ui.confValor1], [ui.confCampo2, ui.confValor2]];
      for (let i = 0; i < pares.length; i++) {
        const campo = pares[i][0].value.trim(), valor = pares[i][1].value;
        if (campo) out.push({ campo: campo, digest: valor ? hmacHex(chave, utf8(valor)) : null });
        pares[i][1].value = '';
      }
      return out;
    }
    ui.chaves.value = obterBus().cfg.chavesEstruturais.join('\n');
    ui.txtmsg.checked = !!obterBus().cfg.incluirTextoMensagens;
    ui.optsel.checked = !!obterBus().cfg.incluirOpcoesSelect;

    let ultimo = null; // { nome, texto, achados, confirmado }

    function avisar(msg, erro) { ui.aviso.textContent = msg || ''; ui.aviso.className = erro ? 'erro' : ''; }

    function lerCfg() {
      const bus = obterBus();
      bus.cfg.chavesEstruturais = filtrar(mapear(ui.chaves.value.split(/[\s,;]+/), function (s) { return s.toLowerCase(); }), function (s) { return !!s; });
      bus.cfg.incluirTextoMensagens = ui.txtmsg.checked;
      bus.cfg.incluirOpcoesSelect = ui.optsel.checked;
      return bus.cfg;
    }

    function mostrar(nome, obj) {
      const texto = JSON.stringify(obj, null, 2);
      const achados = auditarSaida(texto);
      ultimo = { nome: nome, texto: texto, achados: achados, confirmado: false };
      ui.prev.textContent = texto.length > 60000 ? texto.slice(0, 60000) + '\n… (truncado na pré-visualização; o arquivo baixado é completo)' : texto;
      ui.prev.hidden = false;
      ui.acoes.hidden = false;
      ui.baixar.textContent = 'Baixar JSON';
      if (achados.length) avisar('Atenção: a saída contém padrões sensíveis (' + achados.join(', ') + '). Revise antes de baixar.', true);
      else avisar('Revise a pré-visualização antes de baixar.');
    }

    function atualizar() {
      const bus = obterBus();
      const txtG = bus.gravando ? '■ Parar gravação' : '● Iniciar gravação';
      if (ui.gravar.textContent !== txtG) ui.gravar.textContent = txtG;
      const clsG = bus.gravando ? 'grav' : '';
      if (ui.gravar.className !== clsG) ui.gravar.className = clsG;
      ui.marcar.disabled = !bus.gravando;
      ui.confOk.disabled = !bus.gravando;
      ui.confDiv.disabled = !bus.gravando;
      ui.mapear.disabled = ui.verificar.disabled = bus.gravando;
      ui.baixar.disabled = bus.gravando;
      const html = bus.gravando ? '<span class="rec">● GRAVANDO — ' + bus.eventos.length + ' eventos</span>' : 'parado';
      if (ui.est.innerHTML !== html) ui.est.innerHTML = html;
    }

    ui.min.onclick = function () { ui.corpo.hidden = !ui.corpo.hidden; };

    ui.mapear.onclick = function () {
      const slug = slugify(ui.slug.value);
      if (!slug) { avisar('Informe o slug da tela (ex.: consulta-titulos).', true); return; }
      try { mostrar(slug + '.mapa.json', mapearTela(lerCfg(), slug)); }
      catch (e) {
        const pilha = String((e && e.stack) || '').split('\n').slice(0, 3).join(' | ');
        avisar('Falha ao mapear: ' + (e && e.message) + ' — ' + pilha.slice(0, 300), true);
      }
    };

    ui.verificar.onclick = function () { ui.arq.value = ''; ui.arq.click(); };
    ui.arq.onchange = function () {
      const f = ui.arq.files && ui.arq.files[0];
      if (!f) return;
      const rd = new FileReader();
      rd.onload = function () {
        try {
          const salvo = JSON.parse(String(rd.result));
          if (!salvo || salvo.formato !== FORMATO_MAPA) { avisar('Arquivo não é um mapa de tela do Mapeador.', true); return; }
          const vivo = mapearTela(lerCfg(), salvo.tela && salvo.tela.slug);
          mostrar(slugify((salvo.tela && salvo.tela.slug) || 'tela') + '.verificacao.json', compararMapas(salvo, vivo));
        } catch (e) { avisar('Falha ao verificar: ' + e.message, true); }
      };
      rd.readAsText(f);
    };

    ui.gravar.onclick = function () {
      const bus = obterBus();
      if (!bus.gravando) {
        const tela = slugify(ui.slug.value), acao = slugify(ui.acao.value);
        if (!tela || !acao) { avisar('Informe a tela (slug) e o nome da ação.', true); return; }
        lerCfg();
        let digital = null;
        try { digital = mapearTela(bus.cfg, tela).impressaoDigital; } catch (_) { /* ignora */ }
        bus.eventos = []; bus.seq = 0; bus.seqReq = 0; bus.descartados = 0; bus.t0 = Date.now();
        bus.meta = { tela: tela, acao: acao, impressaoDigitalInicial: digital };
        bus.meta.conferencia = prepararConferencia();
        bus.gravando = true;
        ativarQuadro(true);
        ui.prev.hidden = true; ui.acoes.hidden = true; ultimo = null;
        avisar('Gravando. Execute a ação manualmente; o script só observa.');
        salvarSessao(bus);
      } else {
        bus.gravando = false;
        ativarQuadro(false);
        salvarSessao(bus);
        mostrar(bus.meta.tela + '.' + bus.meta.acao + '.acao.json', montarAcao(bus));
      }
      atualizar();
    };

    function marcar() {
      const r = limpar(ui.passo.value, 80);
      if (!r) return;
      registrar({ tipo: 'marcador', rotulo: r });
      ui.passo.value = '';
    }
    ui.marcar.onclick = marcar;
    ui.confOk.onclick = function () { registrar({ tipo: 'conferencia-manual', resultado: 'ok' }); };
    ui.confDiv.onclick = function () { registrar({ tipo: 'conferencia-manual', resultado: 'divergente' }); };
    ui.passo.onkeydown = function (e) { if (e.key === 'Enter') marcar(); };

    ui.baixar.onclick = function () {
      if (!ultimo) return;
      if (ultimo.achados.length && !ultimo.confirmado) {
        ultimo.confirmado = true;
        ui.baixar.textContent = 'Baixar mesmo assim';
        avisar('Padrões sensíveis detectados (' + ultimo.achados.join(', ') + '). Clique de novo para baixar após revisar.', true);
        return;
      }
      const blob = new Blob([ultimo.texto], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = ultimo.nome;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      avisar('Arquivo gerado: ' + ultimo.nome);
    };

    ui.descartar.onclick = function () {
      const bus = obterBus();
      if (bus.gravando) return;
      bus.eventos = []; bus.meta = {}; bus.seq = 0; bus.seqReq = 0; bus.descartados = 0;
      limparSessao();
      ultimo = null; ui.prev.hidden = true; ui.acoes.hidden = true; avisar('Descartado.');
      atualizar();
    };

    window.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.altKey && (e.key === 'm' || e.key === 'M')) host.hidden = !host.hidden;
    }, true);

    // Retomada após recarregar a página
    const bus = obterBus();
    if (bus.gravando) {
      ui.slug.value = bus.meta.tela || ''; ui.acao.value = bus.meta.acao || '';
      avisar('Gravação retomada após recarregamento da página.');
    } else if (bus.eventos.length) {
      ui.slug.value = bus.meta.tela || ''; ui.acao.value = bus.meta.acao || '';
      mostrar(bus.meta.tela + '.' + bus.meta.acao + '.acao.json', montarAcao(bus));
    }
    atualizar();
    let agendado = false;
    obterBus().onMudanca = function () {
      if (agendado) return;
      agendado = true;
      setTimeout(function () { agendado = false; atualizar(); }, 300);
    };
    window.addEventListener('pagehide', function () { salvarSessao(obterBus()); });
  }

  /* ======================================================================
   * Inicialização
   * ==================================================================== */

  function aoPronto(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
  }

  if (estaNoTopo) restaurarSessao();
  instalarGanchos();
  instalarOuvintes();
  aoPronto(function () {
    if (obterBus().gravando) ativarQuadro(true);
    if (estaNoTopo) criarPainel();
  });
})();
