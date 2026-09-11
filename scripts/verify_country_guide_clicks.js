const fs = require('fs');
const path = require('path');

const countryGuidePath = path.join(__dirname, '..', 'country-guide.html');
const content = fs.readFileSync(countryGuidePath, 'utf8');

console.log('Auditing country-guide.html country details pop-up modal features...\n');

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

// 1. Check Country Details Modal container
check(
  'Country Details Modal (#countryDetailsModal) is present with Bootstrap modal attributes',
  content.includes('id="countryDetailsModal"') &&
  content.includes('class="modal fade"') &&
  content.includes('class="modal-dialog')
);

// 2. Check modal elements
check(
  'Modal has all required dynamic content slots (flag, title, badge, capital, salary, citizenship, healthcare, pathways, points, jobs, benefits)',
  content.includes('id="modalCountryFlag"') &&
  content.includes('id="countryModalTitle"') &&
  content.includes('id="modalCountryBadge"') &&
  content.includes('id="modalCapital"') &&
  content.includes('id="modalSalary"') &&
  content.includes('id="modalCitizenship"') &&
  content.includes('id="modalHealthcare"') &&
  content.includes('id="modalPathways"') &&
  content.includes('id="modalPoints"') &&
  content.includes('id="modalJobs"') &&
  content.includes('id="modalBenefits"')
);

// 3. Check country data dictionary
const requiredCountries = ['canada', 'australia', 'uk', 'germany', 'usa', 'new-zealand'];
let missingData = [];
requiredCountries.forEach(c => {
  if (!content.includes(`${c}: {`) && !content.includes(`'${c}': {`) && !content.includes(`"${c}": {`)) {
    missingData.push(c);
  }
});
check(
  `Country data dictionary contains detailed profiles for all ${requiredCountries.length} countries`,
  missingData.length === 0,
  `Missing: ${missingData.join(', ')}`
);

// 4. Check Section 2 destination card triggers
const cardTriggers = (content.match(/class="card-auravisa country-card-trigger[^"]*"[^>]*data-country="([^"]+)"/g) || []).length;
check(
  `All 6 featured destination cards have data-country modal triggers`,
  cardTriggers >= 6,
  `Found: ${cardTriggers}`
);

// 5. Check Section 3 table row triggers
const rowTriggers = (content.match(/class="country-row-trigger"[^>]*data-country="([^"]+)"/g) || []).length;
check(
  `All 5 comparison matrix table rows have data-country modal triggers`,
  rowTriggers >= 5,
  `Found: ${rowTriggers}`
);

// 6. Check Section 5 pathway list triggers
const listTriggers = (content.match(/country-list-trigger[^>]*data-country="([^"]+)"/g) || []).length;
check(
  `All 5 pathway threshold list items have data-country modal triggers`,
  listTriggers >= 5,
  `Found: ${listTriggers}`
);

// 7. Check Search Input configuration
check(
  'Hero search bar (#destinationSearchInput) configured for live filtering and modal trigger',
  content.includes('id="destinationSearchInput"') &&
  content.includes('id="destinationSearchBtn"') &&
  content.includes("addEventListener('input', filterCountries)")
);

// 8. Verify absence of global click-redirect hijacking script
const hasGlobalHijack = content.includes("guideMain.addEventListener('click'") &&
                        content.includes("window.location.href = 'service-details.html'");
check(
  'Aggressive global click hijacking script removed (clicks open modal instead of forced redirect)',
  !hasGlobalHijack
);

console.log(`\nVerification Summary: ${passes} passed, ${issues} failed.`);
process.exit(issues > 0 ? 1 : 0);
