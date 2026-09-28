import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildStaticSite } from '../scripts/build-static';

const products = ['acadia-roadster', 'yosemite-touring', 'zion-track', 'shenandoah-hybrid', 'redwood-cargo', 'olympic-cruiser', 'joshua-tree-gravel', 'glacier-folding', 'yellowstone-kids'];

test('builds standalone static routes with root-relative URLs', async () => {
  const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-automation-playground-static-'));
  try {
    await buildStaticSite({ outputDir });

    for (const file of [
      'index.html',
      'astronaut-application/index.html',
      'products/index.html',
      ...products.map(product => `products/${product}/index.html`),
      'styles.css',
      'signup.js',
      'astronaut-application.js',
      'bicycle.svg',
      'park-scenes.svg',
    ]) {
      await fs.access(path.join(outputDir, file));
    }

    const catalog = await fs.readFile(path.join(outputDir, 'products', 'index.html'), 'utf8');
    assert.match(catalog, /href="\/products\/acadia-roadster"/);
    assert.match(catalog, /src="\/bicycle\.svg"/);

    const product = await fs.readFile(path.join(outputDir, 'products', 'acadia-roadster', 'index.html'), 'utf8');
    assert.match(product, /href="\/styles\.css"/);
    assert.match(product, /href="\/park-scenes\.svg#coast"/);

    const htmlFiles = (await Promise.all([
      'index.html',
      'astronaut-application/index.html',
      'products/index.html',
      ...products.map(product => `products/${product}/index.html`),
    ].map(file => fs.readFile(path.join(outputDir, file), 'utf8')))).join('\n');
    assert.doesNotMatch(htmlFiles, /(?:href|src)="\/test-automation-playground(?:\/|")/);
  } finally {
    await fs.rm(outputDir, { recursive: true, force: true });
  }
});
