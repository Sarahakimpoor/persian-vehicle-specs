import { stripTypeScriptTypes } from 'node:module';
import { mkdir, readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
await mkdir(join(root, 'dist'), { recursive: true });
for (const file of await readdir(join(root, 'src'))) {
  if (!file.endsWith('.ts')) continue;
  const source = await readFile(join(root, 'src', file), 'utf8');
  const output = stripTypeScriptTypes(source, { mode: 'strip' });
  await writeFile(join(root, 'dist', file.replace(/\.ts$/, '.js')), output);
}
await copyFile(join(root, 'types', 'index.d.ts'), join(root, 'dist', 'index.d.ts'));
console.log('Built dist/ without external dependencies.');
