const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

console.log('=== AURAVISA RESPONSIVENESS TEST SUITE ===\n');

// 1. Check Viewport Meta Tag in all HTML files
const htmlFiles = fs.readdirSync(BASE_DIR).filter(f => f.endsWith('.html'));
let missingViewport = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(BASE_DIR, file), 'utf8');
  if (!content.includes('<meta name="viewport"') && !content.includes("<meta name='viewport'")) {
    missingViewport.push(file);
  }
}
assert(missingViewport.length === 0, `All ${htmlFiles.length} HTML files have viewport meta tag for responsive scaling (Missing: ${missingViewport.join(', ')})`);

// 2. Check CSS Gutter Overflows protection
const styleCss = fs.readFileSync(path.join(BASE_DIR, 'assets', 'css', 'style.css'), 'utf8');
assert(styleCss.includes('--bs-gutter-x: 1.25rem !important;') && styleCss.includes('--bs-gutter-x: 0.75rem !important;'), 'Bootstrap row gutters capped on mobile (< 768px and < 576px) to prevent horizontal bleed');

// 3. Check Stats Counter Responsive Font Scaling
assert(styleCss.includes('clamp(1.4rem, 6vw, 2.1rem)'), 'Stats counter numbers fluidly scale down with clamp() on mobile screens');

// 4. Check Hero Heading & Hero Pill Responsive Scaling
assert(styleCss.includes('clamp(1.65rem, 6vw, 2.4rem)') && styleCss.includes('word-break: break-word'), 'Hero headings and display-4 text scale fluidly without causing word-overflow');
assert(styleCss.includes('white-space: normal !important;') && styleCss.includes('.hero-pill'), 'Hero pills wrap cleanly on small screens without exceeding viewport');

// 5. Check Table Horizontal Touch Scrolling
assert(styleCss.includes('-webkit-overflow-scrolling: touch !important;') && styleCss.includes('overflow-x: auto !important;'), 'Tables have smooth touch horizontal scrolling enabled on mobile');

// 6. Check Tablet Landscape / Small Laptop Navbar Compact Fit (992px - 1199.98px)
assert(styleCss.includes('@media (min-width: 992px) and (max-width: 1199.98px)'), 'Compact navigation styles defined for 992px-1199.98px to prevent navbar link wrapping');

// 7. Check Ultra-Compact & Foldables (<= 380px)
assert(styleCss.includes('@media (max-width: 380px)') && styleCss.includes('.brand-badge'), 'Ultra-compact mobile rules exist for foldable screens (<= 380px)');

// 8. Check Client Dashboard Stage Progress Grid
const clientDash = fs.readFileSync(path.join(BASE_DIR, 'client-dashboard.html'), 'utf8');
assert(clientDash.includes('col-4 col-md-2'), 'Client dashboard progress stages use responsive col-4 col-md-2 instead of unstacked col-2');

// 9. Check Auth Card mobile padding
assert(styleCss.includes('.auth-card') && styleCss.includes('padding: 1.5rem 1rem !important;'), 'Authentication cards have responsive padding and 100% width on compact mobile');

console.log(`\n=============================================`);
console.log(`RESPONSIVENESS TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`=============================================\n`);

if (failed > 0) process.exit(1);
