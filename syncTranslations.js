const fs = require("fs");
const path = require("path");

const localesDir = path.join(__dirname, "locales");
const enFilePath = path.join(localesDir, "en.json");
const logFilePath = path.join(__dirname, "translation-sync.log");

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function logAction(action) {
  fs.appendFileSync(logFilePath, action + "\n", "utf8");
}

function syncTranslations() {
  const enTranslations = readJSON(enFilePath);
  const localeFiles = fs
    .readdirSync(localesDir)
    .filter((file) => file !== "en.json");

  localeFiles.forEach((file) => {
    const filePath = path.join(localesDir, file);
    const translations = readJSON(filePath);
    let updated = false;

    Object.keys(enTranslations).forEach((key) => {
      if (!(key in translations)) {
        translations[key] = `[NOT TRANSLATED] ${enTranslations[key]}`;
        logAction(`Added missing key '${key}' to ${file}`);
        updated = true;
      }
    });

    if (updated) {
      writeJSON(filePath, translations);
      logAction(`Updated file: ${file}`);
    }
  });

  logAction("Translation sync completed");
}

syncTranslations();
console.log(
  "Translation sync completed. Check translation-sync.log for details."
);
