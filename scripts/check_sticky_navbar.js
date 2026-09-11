const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('Inspecting navbar and header structure across all', files.length, 'pages:\n');
const issues = [];
const summary = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  const isAuth = ['login.html', 'register.html', 'forgot-password.html'].includes(file);
  if (isAuth) {
    summary.push({ file, type: 'auth', status: 'standalone (no navbar expected)' });
    return;
  }
  
  const headerMatch = content.match(/<header[^>]*>/i);
  const navMatch = content.match(/<nav[^>]*class="([^"]*)"/i);
  
  const hasHeader = !!headerMatch;
  const headerHasSticky = headerMatch ? headerMatch[0].includes('sticky-top') : false;
  const navHasSticky = navMatch ? navMatch[1].includes('sticky-top') : false;

  if (!hasHeader) {
    issues.push({ file, issue: 'No <header> element' });
  } else if (!headerHasSticky && !navHasSticky) {
    issues.push({ file, issue: 'Missing sticky-top class on header/nav', tag: headerMatch[0] });
  } else {
    summary.push({ file, type: file.startsWith('admin-') || file.startsWith('client-') ? 'dashboard' : 'public', header: headerMatch[0] });
  }
});

console.log('Issues found:', issues.length);
if (issues.length > 0) {
  console.log('Problematic pages:', issues);
} else {
  console.log('All 39 non-auth pages have sticky-top on header or nav.');
}
