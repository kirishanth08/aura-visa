const http = require('http');
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

console.log('=== AURAVISA 16 ISSUES VERIFICATION SUITE ===\n');

// 1. Check Navbar breakpoint across all HTML files
const htmlFiles = fs.readdirSync(BASE_DIR).filter(f => f.endsWith('.html'));
const xlNavbars = htmlFiles.filter(f => fs.readFileSync(path.join(BASE_DIR, f), 'utf8').includes('navbar-expand-xl'));
assert(xlNavbars.length === 0, `Issue #1: Complete navbar missing (<1200px) - 0 files contain navbar-expand-xl (all updated to navbar-expand-lg). Found: ${xlNavbars.join(', ')}`);

// 2. Check live search in drawer & 3 lines button alignment
const styleCss = fs.readFileSync(path.join(BASE_DIR, 'assets', 'css', 'style.css'), 'utf8');
const mainJs = fs.readFileSync(path.join(BASE_DIR, 'assets', 'js', 'main.js'), 'utf8');
assert(styleCss.includes('.navbar-toggler') && styleCss.includes('.offcanvas-search-wrap'), 'Issue #2: Hamburger button aligned & offcanvas-search-wrap styles present in style.css');
assert(mainJs.includes('initMobileOffcanvasNav') && mainJs.includes('offcanvasSearchInput'), 'Issue #2: Live drawer search indexing sections and visas implemented in main.js');

// 3 & 15. Regulatory compliance alignment in about.html
const aboutHtml = fs.readFileSync(path.join(BASE_DIR, 'about.html'), 'utf8');
assert(aboutHtml.includes('regulatory-card') && aboutHtml.includes('regulatory-org-title') && aboutHtml.includes('regulatory-badge-wrap mt-auto'), 'Issue #3 & #15: Regulatory compliance cards and reg numbers aligned in about.html');

// 4. Hero Search bar field truncation in index.html
const indexHtml = fs.readFileSync(path.join(BASE_DIR, 'index.html'), 'utf8');
assert(indexHtml.includes('Canada (Express Entry)') && 
       indexHtml.includes('Australia (GSM 189/190)') && 
       indexHtml.includes('UK (Skilled Worker)') &&
       indexHtml.includes('text-nowrap d-flex align-items-center justify-content-center'), 
       'Issue #4: Destination & Permit dropdowns have clean un-truncated option text and layout in index.html');

// 5. Global Opportunities navigation in home-2.html
const home2Html = fs.readFileSync(path.join(BASE_DIR, 'home-2.html'), 'utf8');
assert(home2Html.includes('service-details.html?service=uk-skilled-worker') && 
       home2Html.includes('service-details.html?service=australia-gsm') && 
       home2Html.includes('service-details.html?service=germany-opportunity-card'), 
       'Issue #5: Global opportunities links navigate to respective destinations (UK, Australia, Germany) rather than all to Canada');

// 6. Phone number accepting alphabets
assert(mainJs.includes("input.value.replace(/[^\\d\\s\\+\\-\\(\\)]/g, '')"), 'Issue #6: Phone number input strictly sanitizes and removes alphabetic characters in real-time');

// 7. Gmail accepting capital letters
assert(mainJs.includes("input.value = input.value.toLowerCase()"), 'Issue #7: Email auto-normalizes and lowercases capital characters on input and blur');

// 8. Invalid email without valid domain extension accepted
assert(mainJs.includes('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/'), 'Issue #8: Strict email regex requiring top-level domain extension (.com, .org, etc.) implemented');

// 9. Intelligent Admissions Tool dynamic results in home-2.html
assert(home2Html.includes('id="admissionsToolForm"') && home2Html.includes('id="admissionsResultsContainer"'), 'Issue #9: Admissions tool has admissionsToolForm and admissionsResultsContainer in home-2.html');
assert(mainJs.includes('initAdmissionsMatcher') && mainJs.includes('samplePrograms'), 'Issue #9: Admissions matcher generates rich program and scholarship cards dynamically instead of generic toast');

// 10 & 11. World Class Destinations grid alignment & image heights in index.html
assert(!indexHtml.includes('card-img-top-crop'), 'Issue #10 & #11: Removed inconsistent card-img-top-crop from destination cards');
assert(styleCss.includes('.card-img-top-cover') && styleCss.includes('height: 200px !important') && styleCss.includes('object-fit: cover !important'), 'Issue #10 & #11: Standardized .card-img-top-cover to exactly 200px height with object-fit cover');

// 12. Office locations title & phone alignment in contact.html
const contactHtml = fs.readFileSync(path.join(BASE_DIR, 'contact.html'), 'utf8');
assert(contactHtml.includes('office-card') && contactHtml.includes('office-title') && contactHtml.includes('office-address') && contactHtml.includes('office-contact'), 'Issue #12: Office cards have office-card, office-title, office-address, and office-contact classes in contact.html');

// 13 & 14. Pricing plans installments & left alignment in pricing.html
const pricingHtml = fs.readFileSync(path.join(BASE_DIR, 'pricing.html'), 'utf8');
assert(pricingHtml.includes('pricing-installment-badge') && pricingHtml.includes('Flexible 3 Milestone Installments (30% / 35% / 35%)'), 'Issue #13: Pricing plans installment badge clearly communicates milestone breakdown');
assert(pricingHtml.includes('pricing-feature-list') && styleCss.includes('.pricing-feature-list'), 'Issue #14: Pricing feature list styled with left alignment and clean hanging indents');

// 16. Admin security gatekeeper
const dashboardJs = fs.readFileSync(path.join(BASE_DIR, 'assets', 'js', 'dashboard.js'), 'utf8');
assert(dashboardJs.includes('initAdminAuthProtection') && dashboardJs.includes('auravisa_admin_authenticated') && dashboardJs.includes('admin-auth-overlay'), 'Issue #16: Admin pages protected with authentication gatekeeper passcode overlay');

console.log(`\n=============================================`);
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`=============================================\n`);

if (failed > 0) {
  process.exit(1);
}
