#!/usr/bin/env node
import { mkdir, cp, stat, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = join(__dirname, '..');
const srcDir = join(root, 'src');
const distDir = join(root, 'dist');

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function copyIfExists(from, to) {
  try {
    await stat(from);
  } catch {
    return; // skip missing paths
  }
  await ensureDir(dirname(to));
  await cp(from, to, { recursive: true, filter: (src) => {
    const ext = extname(src);
    // Only copy static assets and HTML/CSS; skip TS/JS source files
    if (ext === '.ts' || ext === '.js' || ext === '.map' || ext === '.test') return false;
    return true;
  }});
}

async function copyPopupStatic() {
  const popupSrc = join(srcDir, 'popup');
  try {
    const items = await readdir(popupSrc, { withFileTypes: true });
    await ensureDir(join(distDir, 'popup'));
    for (const it of items) {
      if (!it.isFile()) continue;
      const ext = extname(it.name);
      if (ext === '.html' || ext === '.css') {
        await copyIfExists(join(popupSrc, it.name), join(distDir, 'popup', it.name));
      }
    }
  } catch {}
}

async function copyIcons() {
  await copyIfExists(join(srcDir, 'icons'), join(distDir, 'icons'));
}

async function copyManifest() {
  const from = join(srcDir, 'manifest.json');
  const to = join(distDir, 'manifest.json');
  await ensureDir(distDir);
  try {
    const json = await readFile(from, 'utf8');
    await writeFile(to, json);
  } catch {}
}

async function main() {
  await ensureDir(distDir);
  await Promise.all([
    copyManifest(),
    copyIcons(),
    copyPopupStatic(),
  ]);
  console.log('Static assets copied to dist/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
