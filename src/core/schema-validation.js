import Ajv from "ajv";

const ajv = new Ajv({
  allErrors: true,
  strict: true
});

const validatorCache = new WeakMap();

/**
 * Validate a JSON document against a JSON Schema object.
 * Returned errors do not include the document contents.
 *
 * @param {object} schema JSON Schema object.
 * @param {unknown} document JSON document.
 * @returns {{ valid: boolean, errors: Array<{ path: string, keyword: string, message: string, params: object }> }}
 */
export function validateDocument(schema, document) {
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    throw new TypeError("O schema precisa ser um objeto JSON.");
  }

  let validate = validatorCache.get(schema);

  if (!validate) {
    validate = ajv.compile(schema);
    validatorCache.set(schema, validate);
  }

  const valid = validate(document);

  return {
    valid,
    errors: valid
      ? []
      : (validate.errors ?? []).map((error) => ({
          path: error.instancePath || "/",
          keyword: error.keyword,
          message: error.message ?? "Documento inválido.",
          params: error.params ?? {}
        }))
  };
}
