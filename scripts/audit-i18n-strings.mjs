import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, 'src');

const isProbablyUrl = (value) => /^(https?:\/\/|mailto:|tel:|\/)/i.test(value);
const isProbablyCssOrToken = (value) =>
  /^(-?\d+(\.\d+)?(px|rem|em|%|vh|vw)|#[0-9a-f]{3,8}|rgba?\(|hsla?\(|var\(|calc\(|[a-z]+-[a-z0-9-]+)$/i.test(value);

const shouldIgnoreLiteral = (value) => {
  const v = value.trim();
  if (!v) return true;
  if (v.length === 1) return true;
  if (/^[0-9]+$/.test(v)) return true;
  if (isProbablyUrl(v)) return true;
  if (isProbablyCssOrToken(v)) return true;
  if (/^[-_a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(v)) return true; // e.g. discord.gg
  if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(v)) return true; // email
  if (/^\+?[0-9()\-\s]{7,}$/.test(v)) return true; // phone
  return false;
};

const isVisibleAttributeName = (name) => {
  const n = name.toLowerCase();
  return [
    'placeholder',
    'title',
    'aria-label',
    'aria-describedby',
    'alt',
    'label',
    'helpertext',
    'description',
  ].includes(n);
};

const isInterestingPropertyName = (name) => {
  const n = name.toLowerCase();
  return [
    'title',
    'subtitle',
    'description',
    'label',
    'placeholder',
    'helper',
    'help',
    'tooltip',
    'empty',
    'error',
    'message',
    'question',
    'answer',
    'cta',
  ].includes(n);
};

const severityFor = ({ filePath, kind, propName }) => {
  const p = filePath.replace(/\\/g, '/');
  const isPage = p.includes('/src/pages/');
  const isAdmin = p.includes('/src/pages/admin/') || p.includes('/src/components/admin/');

  // Base guess
  let sev = 'secondary';
  if (kind === 'JSXText') sev = isPage ? 'critical' : 'secondary';
  if (kind === 'JSXAttribute') sev = 'secondary';
  if (kind === 'ObjectLiteral') sev = isPage ? 'critical' : 'secondary';

  // Admin UI strings are still user-facing but usually less critical
  if (isAdmin && sev === 'critical') sev = 'secondary';

  // Common helper props
  if (propName && ['placeholder', 'aria-label', 'alt', 'title'].includes(propName.toLowerCase())) {
    sev = sev === 'critical' ? 'critical' : 'secondary';
  }

  return sev;
};

const walkDir = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'i18n' || entry.name === 'assets') {
        // Still scan components under i18n? We skip locales to avoid noise.
        if (entry.name === 'i18n') {
          // allow index.ts etc
          out.push(...walkDir(full));
        }
        continue;
      }
      out.push(...walkDir(full));
    } else {
      if (!/\.(ts|tsx)$/.test(entry.name)) continue;
      if (full.includes(path.join('src', 'i18n', 'locales'))) continue;
      out.push(full);
    }
  }
  return out;
};

const getLine = (sourceFile, pos) => sourceFile.getLineAndCharacterOfPosition(pos).line + 1;

const isWrappedInTCall = (node) => {
  // If the string literal is inside t('...') call, ignore.
  let current = node;
  while (current) {
    if (ts.isCallExpression(current) && ts.isIdentifier(current.expression) && current.expression.text === 't') {
      return true;
    }
    // Also allow i18n.t('...')
    if (ts.isCallExpression(current) && ts.isPropertyAccessExpression(current.expression)) {
      const { expression, name } = current.expression;
      if (name.text === 't' && ts.isIdentifier(expression) && expression.text === 'i18n') {
        return true;
      }
    }
    current = current.parent;
  }
  return false;
};

const occurrences = [];

for (const file of walkDir(srcRoot)) {
  const content = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);

  const visit = (node) => {
    // JSX text nodes
    if (ts.isJsxText(node)) {
      const text = node.getText(sourceFile).replace(/\s+/g, ' ').trim();
      if (!shouldIgnoreLiteral(text) && !isWrappedInTCall(node)) {
        occurrences.push({
          filePath: file,
          line: getLine(sourceFile, node.getStart(sourceFile)),
          kind: 'JSXText',
          text,
          severity: severityFor({ filePath: file, kind: 'JSXText' }),
        });
      }
    }

    // String literals
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text;
      if (!shouldIgnoreLiteral(text) && !isWrappedInTCall(node)) {
        // JSX attributes like placeholder="..."
        if (ts.isJsxAttribute(node.parent) && ts.isIdentifier(node.parent.name)) {
          const attr = node.parent.name.text;
          if (isVisibleAttributeName(attr)) {
            occurrences.push({
              filePath: file,
              line: getLine(sourceFile, node.getStart(sourceFile)),
              kind: 'JSXAttribute',
              propName: attr,
              text,
              severity: severityFor({ filePath: file, kind: 'JSXAttribute', propName: attr }),
            });
          }
        }

        // Object literal fields like { title: "..." }
        if (ts.isPropertyAssignment(node.parent) && ts.isIdentifier(node.parent.name)) {
          const prop = node.parent.name.text;
          if (isInterestingPropertyName(prop)) {
            occurrences.push({
              filePath: file,
              line: getLine(sourceFile, node.getStart(sourceFile)),
              kind: 'ObjectLiteral',
              propName: prop,
              text,
              severity: severityFor({ filePath: file, kind: 'ObjectLiteral', propName: prop }),
            });
          }
        }

        // Toasts: toast({ title: "..." }) etc
        if (ts.isPropertyAssignment(node.parent) && ts.isIdentifier(node.parent.name)) {
          const prop = node.parent.name.text;
          if (['title', 'description'].includes(prop.toLowerCase())) {
            const maybeObj = node.parent.parent;
            if (ts.isObjectLiteralExpression(maybeObj)) {
              const maybeCall = maybeObj.parent;
              if (ts.isCallExpression(maybeCall) || ts.isCallExpression(maybeCall.parent)) {
                // Already covered by ObjectLiteral; keep once.
              }
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

// De-duplicate exact duplicates
const key = (o) => `${o.filePath}|${o.line}|${o.kind}|${o.propName ?? ''}|${o.text}`;
const uniq = Array.from(new Map(occurrences.map((o) => [key(o), o])).values());

uniq.sort((a, b) => {
  if (a.filePath !== b.filePath) return a.filePath.localeCompare(b.filePath);
  return a.line - b.line;
});

const bySeverity = uniq.reduce(
  (acc, o) => {
    acc[o.severity] ??= 0;
    acc[o.severity] += 1;
    return acc;
  },
  /** @type {Record<string, number>} */ ({})
);

console.log(JSON.stringify({
  summary: {
    filesScanned: walkDir(srcRoot).length,
    occurrences: uniq.length,
    bySeverity,
  },
  occurrences: uniq,
}, null, 2));
