import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const srcRoot = path.join(workspaceRoot, 'src');

const isPlainObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeDeep = (base, overrides) => {
  const result = { ...base };
  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = mergeDeep(baseValue, overrideValue);
      continue;
    }
    result[key] = overrideValue;
  }
  return result;
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const listFilesRecursive = (dir, predicate) => {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFilesRecursive(fullPath, predicate));
      continue;
    }
    if (predicate(fullPath)) out.push(fullPath);
  }
  return out;
};

const getAtPath = (obj, dottedKey) => {
  const parts = dottedKey.split('.');
  let cur = obj;
  for (const part of parts) {
    if (!isPlainObject(cur) && !Array.isArray(cur)) return undefined;
    cur = cur?.[part];
    if (cur === undefined) return undefined;
  }
  return cur;
};

const extractTKeys = (code) => {
  // Captures: t('a.b'), t("a.b"), t(`a.b`)
  // Excludes template strings with ${...}
  const keys = new Set();
  const dynamic = new Set();

  const reSingle = /\bt\(\s*'([^']+)'/g;
  const reDouble = /\bt\(\s*\"([^\"]+)\"/g;
  const reBacktick = /\bt\(\s*`([^`]+)`/g;

  for (const re of [reSingle, reDouble, reBacktick]) {
    let match;
    while ((match = re.exec(code)) !== null) {
      const raw = match[1];
      if (raw.includes('${')) {
        dynamic.add(raw);
        continue;
      }
      keys.add(raw);
    }
  }

  return { keys, dynamic };
};

const main = () => {
  const tsFiles = listFilesRecursive(srcRoot, (p) => p.endsWith('.ts') || p.endsWith('.tsx'));

  const referencedKeys = new Set();
  const dynamicKeys = new Set();

  for (const filePath of tsFiles) {
    const code = fs.readFileSync(filePath, 'utf8');
    const { keys, dynamic } = extractTKeys(code);
    for (const k of keys) referencedKeys.add(k);
    for (const k of dynamic) dynamicKeys.add(k);
  }

  const localesRoot = path.join(srcRoot, 'i18n', 'locales');

  const legacy = {
    en: readJson(path.join(localesRoot, 'en.json')),
    fr: readJson(path.join(localesRoot, 'fr.json')),
    ar: readJson(path.join(localesRoot, 'ar.json')),
  };

  const common = {
    en: readJson(path.join(localesRoot, 'en', 'common.json')),
    fr: readJson(path.join(localesRoot, 'fr', 'common.json')),
    ar: readJson(path.join(localesRoot, 'ar', 'common.json')),
  };

  const merged = {
    en: mergeDeep(legacy.en, common.en),
    fr: mergeDeep(legacy.fr, common.fr),
    ar: mergeDeep(legacy.ar, common.ar),
  };

  const missing = { en: [], fr: [], ar: [] };
  for (const key of referencedKeys) {
    for (const lng of /** @type {const} */ (['en', 'fr', 'ar'])) {
      const value = getAtPath(merged[lng], key);
      if (value === undefined) missing[lng].push(key);
    }
  }

  const summary = {
    filesScanned: tsFiles.length,
    referencedKeys: referencedKeys.size,
    dynamicKeyExpressions: dynamicKeys.size,
    missing: {
      en: missing.en.length,
      fr: missing.fr.length,
      ar: missing.ar.length,
    },
  };

  console.log('i18n key check summary:\n' + JSON.stringify(summary, null, 2));

  if (dynamicKeys.size) {
    console.log('\nDynamic keys (not statically verified):');
    for (const k of Array.from(dynamicKeys).sort()) console.log(' - ' + k);
  }

  for (const lng of ['en', 'fr', 'ar']) {
    if (!missing[lng].length) continue;
    console.log(`\nMissing keys in ${lng}:`);
    for (const k of missing[lng].sort()) console.log(' - ' + k);
  }

  const totalMissing = missing.en.length + missing.fr.length + missing.ar.length;
  process.exitCode = totalMissing ? 1 : 0;
};

main();
