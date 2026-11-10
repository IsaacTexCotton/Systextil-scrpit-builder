import { readFile } from "node:fs/promises";
import path from "node:path";
import { validateDocument } from "../core/schema-validation.js";

function printUsage() {
  console.error(
    "Uso: node src/cli/validate-json.js <caminho-schema.json> <caminho-documento.json>"
  );
}

async function readJsonFile(filePath, label) {
  let content;

  try {
    content = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`Não foi possível ler ${label} em "${filePath}": ${error.message}`);
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`${label} contém JSON inválido: ${error.message}`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    printUsage();
    process.exitCode = 2;
    return;
  }

  const schemaPath = path.resolve(process.cwd(), args[0]);
  const documentPath = path.resolve(process.cwd(), args[1]);

  const [schema, document] = await Promise.all([
    readJsonFile(schemaPath, "O schema"),
    readJsonFile(documentPath, "O documento")
  ]);

  const result = validateDocument(schema, document);

  if (!result.valid) {
    console.error("Documento inválido:");
    for (const error of result.errors) {
      console.error(`- ${error.path} [${error.keyword}]: ${error.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Documento válido: ${documentPath}`);
}

main().catch((error) => {
  console.error(`Falha na validação: ${error.message}`);
  process.exitCode = 1;
});
