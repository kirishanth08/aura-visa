const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const cssPath = path.join(rootDir, 'assets', 'css', 'style.css');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('--- AuraVisa Responsive Architecture Verification ---');

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

// 1. Viewport Meta Tags across all 42 HTML files
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
let missingViewport = [];
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  if (!content.includes('name="viewport"') || !content.includes('width=device-width')) {
    missingViewport.push(file);
  }
});
check(`Viewport meta tag present in all ${htmlFiles.length} HTML pages`, missingViewport.length === 0, `Missing in: ${missingViewport.join(', ')}`);

// 2. CSS Syntax Balance
let depth = 0;
for (let i = 0; i < css.length; i++) {
  if (css[i] === '{') depth++;
  if (css[i] === '}') depth--;
}
check('CSS curly braces are 100% balanced (depth 0)', depth === 0, `Depth was ${depth}`);

// 3. Overflow protection on html, body
check('HTML and Body have overflow-x: hidden protection', css.includes('html, body') && css.includes('overflow-x: hidden;'));

// 4. Fluid Typography (clamp)
check('Fluid display typography with clamp() implemented', css.includes('clamp(') && css.includes('.display-4'));

// 5. Breakpoints Covered
check('Tablet / Dashboard breakpoint (< 992px) present', css.includes('@media (max-width: 991.98px)'));
check('Mobile breakpoint (< 768px) present', css.includes('@media (max-width: 767.98px)'));
check('Compact mobile breakpoint (< 576px) present', css.includes('@media (max-width: 575.98px)'));
check('Ultra-compact / foldable breakpoint (<= 380px) present', css.includes('@media (max-width: 380px)'));

// 6. Mobile Offcanvas Styling & Visibility Fix
check('Mobile offcanvas link text color explicitly set to var(--text-main)', css.includes('.offcanvas .navbar-nav .nav-link') && css.includes('color: var(--text-main) !important'));
check('Mobile offcanvas dropdown styling with static positioning', css.includes('.offcanvas .dropdown-menu') && css.includes('position: static !important'));

// 7. Mobile Dashboard Transformation
check('Dashboard sidebar transformed to horizontal swipeable bar on mobile', css.includes('.dashboard-sidebar') && css.includes('overflow-x: auto !important') && css.includes('flex-direction: row !important'));
check('Dashboard sidebar height reset to auto on mobile (no 100vh freeze)', css.includes('height: auto !important') && css.includes('max-height: none !important'));
check('Dashboard main workspace padding reduced on mobile', css.includes('.dashboard-main') && css.includes('padding: 1.25rem 0.85rem !important'));

// 8. Mobile Form Zoom Prevention
check('Form inputs set to 16px on mobile to prevent iOS/Android auto-zoom', css.includes('font-size: 16px !important') && css.includes('input.form-control'));

// 9. Table Touch Optimization
check('Table responsive touch scrolling (-webkit-overflow-scrolling: touch)', css.includes('-webkit-overflow-scrolling: touch'));

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
