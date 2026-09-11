const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let errorCount = 0;

console.log(`Checking ${htmlFiles.length} HTML files for any Express in services dropdown...`);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  
  // Look for services dropdown menu
  const dropdownMatches = content.match(/<a class="nav-link dropdown-toggle"[^>]*>Services<\/a>\s*<ul class="dropdown-menu[^>]*>([\s\S]*?)<\/ul>/i);
  if (dropdownMatches) {
    const dropdownInner = dropdownMatches[1];
    if (/express/i.test(dropdownInner)) {
      console.error(`[FAIL] ${file} still has Express in Services dropdown!`);
      errorCount++;
    }
  }
});

if (errorCount === 0) {
  console.log(`[PASS] Zero files have Express in the Services dropdown.`);
} else {
  console.error(`[FAIL] Found ${errorCount} files with issues.`);
}
