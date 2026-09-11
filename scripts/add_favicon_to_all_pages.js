const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Adding favicon to all ${htmlFiles.length} HTML pages...\n`);

const faviconBlock = `  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">
  <link rel="alternate icon" type="image/png" href="assets/img/favicon.svg">
  <link rel="apple-touch-icon" href="assets/img/favicon.svg">
`;

const targetBootstrapLine = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">';

let updatedCount = 0;
let skippedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('assets/img/favicon.svg')) {
    console.log(`[SKIP] ${file} already contains favicon`);
    skippedCount++;
    return;
  }

  if (content.includes(targetBootstrapLine)) {
    content = content.replace(targetBootstrapLine, `${faviconBlock}  ${targetBootstrapLine}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[UPDATED] ${file}`);
    updatedCount++;
  } else {
    console.error(`[ERROR] Could not find bootstrap line in ${file}`);
  }
});

console.log(`\nFavicon addition complete. Updated: ${updatedCount}, Skipped: ${skippedCount}, Total: ${htmlFiles.length}`);
