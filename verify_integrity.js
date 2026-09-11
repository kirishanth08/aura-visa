const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let errors = 0;
let details = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const isDashboard = file.startsWith('admin-') || file.startsWith('client-');
  const isAuth = file === 'login.html' || file === 'register.html' || file === 'forgot-password.html';
  let fileErrors = [];
  
  if (!content.includes('assets/css/style.css')) fileErrors.push('missing assets/css/style.css');
  if (!content.includes('bootstrap.bundle.min.js')) fileErrors.push('missing bootstrap bundle js');
  if (!content.includes('assets/js/main.js')) fileErrors.push('missing assets/js/main.js');
  if (!content.includes('bootstrap-icons')) fileErrors.push('missing bootstrap-icons');
  if (isDashboard && !content.includes('assets/js/dashboard.js')) fileErrors.push('missing assets/js/dashboard.js');
  
  const openDivs = (content.match(/<div/g) || []).length;
  const closeDivs = (content.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) fileErrors.push(`div tags mismatch: ${openDivs} vs ${closeDivs}`);

  const openSections = (content.match(/<section/g) || []).length;
  const closeSections = (content.match(/<\/section>/g) || []).length;
  if (openSections !== closeSections) fileErrors.push(`section tags mismatch: ${openSections} vs ${closeSections}`);
  
  if (!isAuth) {
    if (openSections < 5 || openSections > 6) fileErrors.push(`invalid section count: ${openSections}`);
    if (!content.includes('<header') || !content.includes('</header>')) fileErrors.push('missing header');
  } else {
    // Auth pages should not have headers or footers
    if (content.includes('<header')) fileErrors.push('unexpected header in standalone auth page');
    if (content.includes('<footer')) fileErrors.push('unexpected footer in standalone auth page');
    if (!content.includes('brand-logo')) fileErrors.push('missing brand-logo in auth card');
  }
  
  if (!isDashboard && !isAuth && (!content.includes('<footer') || !content.includes('</footer>'))) {
    fileErrors.push('missing footer');
  }
  if (isDashboard && (content.includes('<footer') || content.includes('</footer>'))) {
    fileErrors.push('unexpected footer on dashboard page');
  }
  
  if (fileErrors.length > 0) {
    errors += fileErrors.length;
    details.push(`${file}: ${fileErrors.join(', ')}`);
  }
});

console.log(`Audited ${files.length} HTML files.`);
if (errors === 0) {
  console.log(`SUCCESS: All ${files.length} pages passed full integrity check without errors!`);
} else {
  console.log(`ERRORS (${errors}):\n` + details.join('\n'));
}
