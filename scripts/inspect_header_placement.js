const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- Checking <header> placement across all HTML files ---');
files.forEach(file => {
  if (['login.html', 'register.html', 'forgot-password.html'].includes(file)) return;
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  
  // Find where <header> appears after <body>
  const bodyIdx = content.indexOf('<body');
  const headerIdx = content.indexOf('<header');
  
  if (headerIdx === -1) {
    console.log(`[NO HEADER] ${file}`);
  } else if (headerIdx < bodyIdx) {
    console.log(`[HEADER BEFORE BODY] ${file}`);
  } else {
    // Check if there is any div between <body> and <header>
    const between = content.substring(bodyIdx, headerIdx);
    const hasDiv = /<div/i.test(between);
    if (hasDiv) {
      console.log(`[WRAPPED IN DIV] ${file}:`, between.trim());
    }
  }
});
console.log('Check complete.');
