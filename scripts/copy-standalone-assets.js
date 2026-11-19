// scripts/copy-standalone-assets.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (fs.existsSync(standaloneDir)) {
  console.log('Copying required runtime assets to .next/standalone...');

  // 1. Copy dev.db (SQLite database)
  const dbSrc = path.join(rootDir, 'dev.db');
  const dbDest = path.join(standaloneDir, 'dev.db');
  if (fs.existsSync(dbSrc)) {
    fs.copyFileSync(dbSrc, dbDest);
    console.log('✓ Copied dev.db to .next/standalone/dev.db');
  }

  // 2. Copy prisma directory
  const prismaSrc = path.join(rootDir, 'prisma');
  const prismaDest = path.join(standaloneDir, 'prisma');
  if (fs.existsSync(prismaSrc)) {
    fs.cpSync(prismaSrc, prismaDest, { recursive: true });
    console.log('✓ Copied prisma/ to .next/standalone/prisma/');
  }

  // 3. Copy public directory
  const publicSrc = path.join(rootDir, 'public');
  const publicDest = path.join(standaloneDir, 'public');
  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true });
    console.log('✓ Copied public/ to .next/standalone/public/');
  }

  // 4. Copy .next/static directory
  const staticSrc = path.join(rootDir, '.next', 'static');
  const staticDest = path.join(standaloneDir, '.next', 'static');
  if (fs.existsSync(staticSrc)) {
    fs.cpSync(staticSrc, staticDest, { recursive: true });
    console.log('✓ Copied .next/static/ to .next/standalone/.next/static/');
  }

  console.log('Standalone runtime asset copying completed successfully.');
} else {
  console.log('.next/standalone not found (not a standalone build).');
}
