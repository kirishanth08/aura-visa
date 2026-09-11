const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log(`Auditing all ${files.length} HTML files...`);

let issues = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const isDashboard = f.startsWith('admin-') || f.startsWith('client-');
  const isAuth = f === 'login.html' || f === 'register.html' || f === 'forgot-password.html';

  // Check divs
  const openDivs = (content.match(/<div/g) || []).length;
  const closeDivs = (content.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) {
    console.error(`DIV MISMATCH in ${f}: ${openDivs} open vs ${closeDivs} close`);
    issues++;
  }

  // Check sections
  const sections = content.match(/<section[\s\S]*?<\/section>/g) || [];
  if (!isAuth) {
    if (sections.length < 5 || sections.length > 6) {
      console.error(`INVALID SECTION COUNT in ${f}: found ${sections.length}`);
      issues++;
    }
  }

  // Check header
  const hasHeader = content.includes('<header');
  if (isAuth && hasHeader) {
    console.error(`AUTH PAGE ${f} SHOULD NOT HAVE HEADER`);
    issues++;
  }
  if (!isAuth && !hasHeader) {
    console.error(`PAGE ${f} MISSING HEADER`);
    issues++;
  }

  // Check footer
  const hasFooter = content.includes('<footer');
  if (isAuth && hasFooter) {
    console.error(`AUTH PAGE ${f} SHOULD NOT HAVE FOOTER`);
    issues++;
  }
  if (isDashboard && hasFooter) {
    console.error(`DASHBOARD PAGE ${f} SHOULD NOT HAVE FOOTER`);
    issues++;
  }
  if (!isAuth && !isDashboard && !hasFooter) {
    console.error(`PUBLIC PAGE ${f} MISSING FOOTER`);
    issues++;
  }
});

console.log('Audit complete. Total issues found:', issues);
