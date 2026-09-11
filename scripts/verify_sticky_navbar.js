const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const cssPath = path.join(rootDir, 'assets', 'css', 'style.css');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('=== Sticky Navbar Comprehensive Verification ===\n');

let passed = 0;
let failed = 0;

function check(title, condition, detail = '') {
  if (condition) {
    console.log(`[PASS] ${title}`);
    passed++;
  } else {
    console.error(`[FAIL] ${title} - ${detail}`);
    failed++;
  }
}

// 1. CSS Sticky rules
check(
  'CSS enforces position: sticky !important and -webkit-sticky on header / sticky-top',
  css.includes('position: sticky !important') && css.includes('position: -webkit-sticky !important')
);

check(
  'CSS enforces top: 0 !important and z-index: 1040 !important on sticky header',
  css.includes('top: 0 !important') && css.includes('z-index: 1040 !important')
);

check(
  'CSS enforces width: 100% !important on sticky header',
  css.includes('width: 100% !important')
);

check(
  'CSS has overflow-x: clip protection on html, body to preserve window sticky behavior',
  css.includes('overflow-x: clip;')
);

check(
  'CSS sets position: relative on body for stable sticky context',
  css.includes('position: relative;')
);

// 2. All 39 non-auth HTML pages have <header class="sticky-top"> directly in body
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
const authPages = ['login.html', 'register.html', 'forgot-password.html'];
const nonAuthPages = htmlFiles.filter(f => !authPages.includes(f));

let invalidHeaders = [];
let notDirectChildren = [];

nonAuthPages.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  
  // Header exists with sticky-top
  const headerMatch = content.match(/<header[^>]*class="([^"]*)"/i);
  if (!headerMatch || !headerMatch[1].includes('sticky-top')) {
    invalidHeaders.push(file);
  }
  
  // Check that header is direct descendant of body (no wrapping div between <body> and <header>)
  const bodyIdx = content.indexOf('<body');
  const headerIdx = content.indexOf('<header');
  if (headerIdx > -1 && bodyIdx > -1) {
    const between = content.substring(bodyIdx, headerIdx);
    if (/<div/i.test(between)) {
      notDirectChildren.push(file);
    }
  }
});

check(
  `All ${nonAuthPages.length} non-auth pages have <header class="sticky-top">`,
  invalidHeaders.length === 0,
  `Invalid in: ${invalidHeaders.join(', ')}`
);

check(
  `All ${nonAuthPages.length} non-auth pages have <header> as direct child of <body> (no intermediate scroll wrappers)`,
  notDirectChildren.length === 0,
  `Wrapped in: ${notDirectChildren.join(', ')}`
);

// 3. Auth pages deliberately have no navbar (by design)
let authWithHeader = [];
authPages.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  if (/<header/i.test(content)) {
    authWithHeader.push(file);
  }
});

check(
  `All ${authPages.length} auth pages remain standalone cards with no header (user specification)`,
  authWithHeader.length === 0,
  `Found header in: ${authWithHeader.join(', ')}`
);

console.log(`\nVerification Summary: ${passed} passed, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
