// scripts/copy-standalone-assets.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (fs.existsSync(standaloneDir)) {
  console.log('Copying required runtime assets to .next/standalone...');

  const prismaDest = path.join(standaloneDir, 'prisma');
  fs.mkdirSync(prismaDest, { recursive: true });
  fs.copyFileSync(path.join(rootDir, 'prisma', 'schema.prisma'), path.join(prismaDest, 'schema.prisma'));

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
