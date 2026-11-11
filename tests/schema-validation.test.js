import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateDocument } from "../src/core/schema-validation.js";

async function readJson(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

const evidenceSchema = await readJson(new URL("../schemas/screen-evidence.schema.json", import.meta.url));
const evidenceSample = await readJson(new URL("../examples/evidence.sample.json", import.meta.url));
const specSchema = await readJson(new URL("../schemas/automation-spec.schema.json", import.meta.url));
const specSample = await readJson(new URL("../examples/automation-spec.sample.json", import.meta.url));

test("aceita evidência fictícia válida", () => {
  const result = validateDocument(evidenceSchema, evidenceSample);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("aceita especificação fictícia válida", () => {
  const result = validateDocument(specSchema, specSample);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("rejeita propriedades não declaradas na evidência", () => {
  const document = { ...evidenceSample, unexpected: "não permitido" };
  const result = validateDocument(evidenceSchema, document);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.keyword === "additionalProperties"));
});

test("rejeita especificação sem objetivo", () => {
  const document = { ...specSample };
  delete document.objective;
  const result = validateDocument(specSchema, document);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.keyword === "required"));
});

test("erros não incluem o documento completo", () => {
  const secretMarker = "DADO_SENSIVEL_NAO_DEVE_APARECER";
  const document = { ...evidenceSample, unexpected: secretMarker };
  const result = validateDocument(evidenceSchema, document);
  assert.equal(result.valid, false);
  assert.equal(JSON.stringify(result.errors).includes(secretMarker), false);
});

test("rejeita schema que não seja objeto", () => {
  assert.throws(() => validateDocument(null, {}), TypeError);
});
