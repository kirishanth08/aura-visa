const fs = require('fs');
const path = require('path');
const http = require('http');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('Auditing Favicon Configuration Across All Pages...\n');

let passes = 0;
let issues = 0;

function check(title, condition, detail = '') {
  if (condition) {
    console.log(`[PASS] ${title}`);
    passes++;
  } else {
    console.error(`[FAIL] ${title} - ${detail}`);
    issues++;
  }
}

// 1. Check physical favicon files exist
const svgFaviconPath = path.join(rootDir, 'assets', 'img', 'favicon.svg');
const rootSvgFaviconPath = path.join(rootDir, 'favicon.svg');

check('assets/img/favicon.svg exists', fs.existsSync(svgFaviconPath));
check('root favicon.svg exists', fs.existsSync(rootSvgFaviconPath));

// 2. Validate SVG content
const svgContent = fs.readFileSync(svgFaviconPath, 'utf8');
check(
  'Favicon SVG contains AuraVisa brand gradient and globe icon',
  svgContent.includes('auraFavGrad') &&
  svgContent.includes('#1e56a0') &&
  svgContent.includes('#d4af37') &&
  svgContent.includes('M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0')
);

// 3. Check <link rel="icon"> tags in all 42 HTML files
let missingFavicon = [];
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  if (!content.includes('assets/img/favicon.svg') || !content.includes('rel="icon"')) {
    missingFavicon.push(file);
  }
});

check(
  `All ${htmlFiles.length} HTML pages contain <link rel="icon"> pointing to assets/img/favicon.svg`,
  missingFavicon.length === 0,
  `Missing in: ${missingFavicon.join(', ')}`
);

// 4. Check Apple Touch Icon tag in all 42 HTML files
let missingAppleIcon = [];
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  if (!content.includes('rel="apple-touch-icon"')) {
    missingAppleIcon.push(file);
  }
});

check(
  `All ${htmlFiles.length} HTML pages contain <link rel="apple-touch-icon">`,
  missingAppleIcon.length === 0,
  `Missing in: ${missingAppleIcon.join(', ')}`
);

console.log(`\nVerification Summary: ${passes} passed, ${issues} failed.`);
process.exit(issues > 0 ? 1 : 0);
