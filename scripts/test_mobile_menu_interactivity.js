const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'main.js'), 'utf8');

console.log('Testing Mobile Navbar, Hamburger Icon & Dropdown Accordion Configuration...');

let testsPassed = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

// 1. Check if hamburger icon is explicit white SVG
assert(css.includes("stroke='%23ffffff'") && css.includes('.navbar-toggler-icon'), 'Hamburger icon uses solid crisp white stroke (#ffffff)');

// 2. Check if toggler button has visible styling
assert(css.includes('.navbar-auravisa .navbar-toggler') && css.includes('border: 1.5px solid rgba(255, 255, 255'), 'Navbar toggler button has explicit frosted glass border and background');

// 3. Check if navbar container prevents wrapping
assert(css.includes('.navbar-auravisa > .container') && css.includes('flex-wrap: nowrap !important'), 'Navbar container enforces flex-wrap: nowrap to prevent mobile layout break');

// 4. Check if offcanvas drawer width and z-index are specified
assert(css.includes('.offcanvas') && css.includes('max-width: 85vw') && css.includes('z-index: 1060'), 'Offcanvas drawer has responsive width and high z-index');

// 5. Check if dropdown menu in offcanvas has show animation and static flow
assert(css.includes('.offcanvas .dropdown-menu.show') && css.includes('display: block !important'), 'Offcanvas dropdown-menu.show explicitly displays block');

// 6. Check if main.js contains initMobileOffcanvasNav
assert(js.includes('function initMobileOffcanvasNav()') && js.includes('initMobileOffcanvasNav();'), 'main.js initializes mobile offcanvas navigation and accordions');

// 7. Check if dropdown toggle has click prevention & accordion toggle
assert(js.includes("menu.classList.add('show')") && js.includes("menu.classList.remove('show')"), 'Dropdown accordions toggle open and closed cleanly');

console.log(`\nTest results: ${testsPassed}/${totalTests} tests passed.`);
if (testsPassed !== totalTests) process.exit(1);
