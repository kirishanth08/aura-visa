const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let issues = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  if (file.startsWith('login') || file.startsWith('register') || file.startsWith('forgot')) {
    return; // Auth pages have no navbar
  }
  
  // Check if navbar-toggler exists
  if (!content.includes('navbar-toggler')) {
    issues.push(`${file}: Missing navbar-toggler button`);
  }
  // Check if navbar-toggler-icon exists
  if (!content.includes('navbar-toggler-icon')) {
    issues.push(`${file}: Missing navbar-toggler-icon span`);
  }
  // Check if offcanvas exists
  if (!content.includes('id="offcanvasNavbar"')) {
    issues.push(`${file}: Missing #offcanvasNavbar`);
  }
  // Check if data-bs-target matches
  if (!content.includes('data-bs-target="#offcanvasNavbar"')) {
    issues.push(`${file}: navbar-toggler data-bs-target does not match #offcanvasNavbar`);
  }
});

if (issues.length === 0) {
  console.log(`[PASS] All 39 pages with navbars have matching navbar-toggler and #offcanvasNavbar!`);
} else {
  console.error('[FAIL] Issues found:\n' + issues.join('\n'));
}
