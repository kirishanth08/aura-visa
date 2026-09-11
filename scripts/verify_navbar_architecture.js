const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'style.css');
const jsPath = path.join(__dirname, '..', 'assets', 'js', 'main.js');

const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('=== AuraVisa Desktop & Mobile Navbar Architecture Verification ===\n');

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`[PASS] ${description}`);
    passed++;
  } else {
    console.error(`[FAIL] ${description}`);
    failed++;
  }
}

// 1. Bracket balance
let depth = 0;
for (let char of css) {
  if (char === '{') depth++;
  if (char === '}') depth--;
}
assert('CSS syntax brackets are perfectly balanced (depth 0)', depth === 0);

// 2. Desktop media query exists (>= 1200px)
assert('Desktop media query (@media (min-width: 1200px)) exists', css.includes('@media (min-width: 1200px)'));

// 3. Desktop toggler is hidden
const desktopBlock = css.split('@media (min-width: 1200px)')[1] || '';
assert(
  'Desktop rule strictly hides navbar toggler (display: none !important)',
  desktopBlock.includes('.navbar-toggler') && desktopBlock.includes('display: none !important')
);

// 4. Desktop mobile controls wrapper (d-xl-none) is strictly hidden
assert(
  'Desktop rule strictly hides mobile controls (.d-xl-none -> display: none !important)',
  desktopBlock.includes('.d-xl-none') && desktopBlock.includes('display: none !important')
);

// 5. Desktop offcanvas is static, full width, visible inline
assert(
  'Desktop offcanvas is inline static (position: static !important, width: auto !important)',
  desktopBlock.includes('.navbar-auravisa .offcanvas') &&
  desktopBlock.includes('position: static !important') &&
  desktopBlock.includes('width: auto !important')
);

// 6. Desktop offcanvas header is hidden
assert(
  'Desktop offcanvas header is hidden (display: none !important)',
  desktopBlock.includes('.offcanvas-header') && desktopBlock.includes('display: none !important')
);

// 7. Desktop navbar-nav is horizontal flex row centered
assert(
  'Desktop navbar-nav is horizontal row centered (flex-direction: row !important)',
  desktopBlock.includes('.navbar-nav') && desktopBlock.includes('flex-direction: row !important')
);

// 8. Desktop action buttons are horizontal flex row
assert(
  'Desktop action buttons are horizontal flex row (flex-direction: row !important)',
  desktopBlock.includes('.offcanvas-body .d-flex.align-items-center.gap-2') &&
  desktopBlock.includes('flex-direction: row !important')
);

// 9. Mobile media query exists (< 1200px)
assert('Mobile media query (@media (max-width: 1199.98px)) exists', css.includes('@media (max-width: 1199.98px)'));

// 10. Mobile toggler is displayed as inline-flex with frosted glass border
const mobileBlock = css.split('@media (max-width: 1199.98px)')[1] || '';
assert(
  'Mobile toggler is displayed with frosted glass border',
  mobileBlock.includes('.navbar-toggler') &&
  mobileBlock.includes('display: inline-flex !important') &&
  mobileBlock.includes('border: 1.5px solid rgba(255, 255, 255')
);

// 11. Mobile offcanvas drawer has 320px width, 85vw max-width and z-index 1060
assert(
  'Mobile offcanvas drawer has width: 320px, max-width: 85vw, z-index: 1060',
  mobileBlock.includes('width: 320px !important') &&
  mobileBlock.includes('max-width: 85vw !important') &&
  mobileBlock.includes('z-index: 1060 !important')
);

// 12. Mobile dropdown accordions have position: static !important
assert(
  'Mobile dropdown accordions use clean vertical flow (position: static !important)',
  mobileBlock.includes('.offcanvas .dropdown-menu') &&
  mobileBlock.includes('position: static !important')
);

// 13. JS accordion behavior is restricted to mobile (< 1200px)
assert(
  'main.js restricts accordion interception to mobile only (window.innerWidth < 1200)',
  js.includes('if (window.innerWidth >= 1200) return;')
);

// 14. JS handles window resize auto-cleanup
assert(
  'main.js cleans up offcanvas drawer and backdrops on resize to desktop',
  js.includes("window.addEventListener('resize'") && js.includes('bsOffcanvas.hide()')
);

console.log(`\nVerification Summary: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
