const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'country-guide.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace the <style> block
const oldStyleRegex = /<style>[\s\S]*?<\/style>/;
const newStyle = `<style>
    .country-card-trigger,
    .country-row-trigger,
    .country-list-trigger {
      cursor: pointer;
      transition: all 0.22s ease;
    }
    .country-card-trigger:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.15);
    }
    .country-row-trigger:hover {
      background-color: rgba(30, 58, 138, 0.09) !important;
    }
    .country-list-trigger:hover {
      background-color: rgba(30, 58, 138, 0.09) !important;
      padding-left: 0.75rem !important;
    }
    #countryDetailsModal .modal-content {
      border: 1px solid var(--border-color) !important;
      overflow: hidden;
    }
    [data-bs-theme="dark"] #countryDetailsModal .modal-content {
      background-color: #0b1528 !important;
      border-color: #1e293b !important;
    }
    [data-bs-theme="dark"] #countryDetailsModal .bg-surface {
      background-color: #111e38 !important;
      border-color: #1e293b !important;
    }
  </style>`;

content = content.replace(oldStyleRegex, newStyle);

// 2. Replace Hero Search Input in Section 1
const oldHeroSearch = /<div class="p-3 bg-surface rounded-4 border shadow-sm mb-3" style="cursor: pointer;" onclick="window\.location\.href='service-details\.html'">[\s\S]*?<\/div>\s*<\/div>/;
const newHeroSearch = `<div class="p-3 bg-surface rounded-4 border shadow-sm mb-3">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-0"><i class="bi bi-search text-muted"></i></span>
              <input type="text" id="destinationSearchInput" class="form-control border-0" placeholder="Search destination (e.g. Canada, Germany, Australia, UK)..." aria-label="Search destination countries">
              <button class="btn btn-sm btn-primary-aura px-3 rounded-3" type="button" id="destinationSearchBtn">Search</button>
            </div>
          </div>
        </div>`;

content = content.replace(oldHeroSearch, newHeroSearch);

// Remove onclick from hero image
content = content.replace(
  /<img src="https:\/\/images\.unsplash\.com\/photo-1569154941061-e231b4725ef1\?w=1200&auto=format&fit=crop&q=80" alt="International passports with official visa stamps and world destination map" class="hero-featured-img"[^>]*>/,
  '<img src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1200&auto=format&fit=crop&q=80" alt="International passports with official visa stamps and world destination map" class="hero-featured-img">'
);

// 3. Replace Section 2 countryCardsContainer
const oldCardsContainer = /<div class="row g-4" id="countryCardsContainer">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const newCardsContainer = `<div class="row g-4" id="countryCardsContainer">
        <!-- Canada -->
        <div class="col-md-6 col-lg-4 country-search-item" data-country-name="Canada">
          <div class="card-auravisa country-card-trigger h-100 d-flex flex-column" data-country="canada" role="button" tabindex="0" title="Click to view detailed Canada immigration profile">
            <img src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=80" alt="Canada immigration" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h4 class="fs-5 fw-bold mb-0">🇨🇦 Canada</h4>
                <span class="badge-aura badge-aura-success">3 Yrs to Passport</span>
              </div>
              <p class="text-muted small mb-3">
                Renowned for universal healthcare, safe communities, free public education, and straightforward pathways to citizenship.
              </p>
              <div class="border-top pt-2 small text-muted d-flex justify-content-between mb-3 mt-auto">
                <span>Primary: <strong>Express Entry</strong></span>
                <span>Avg Income: <strong>$78k CAD</strong></span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-aura mt-auto w-100" data-country="canada">
                <i class="bi bi-info-circle me-1"></i>View Country Details
              </button>
            </div>
          </div>
        </div>

        <!-- Australia -->
        <div class="col-md-6 col-lg-4 country-search-item" data-country-name="Australia">
          <div class="card-auravisa country-card-trigger h-100 d-flex flex-column" data-country="australia" role="button" tabindex="0" title="Click to view detailed Australia immigration profile">
            <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80" alt="Australia immigration" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h4 class="fs-5 fw-bold mb-0">🇦🇺 Australia</h4>
                <span class="badge-aura badge-aura-primary">High Wages</span>
              </div>
              <p class="text-muted small mb-3">
                Sublime weather, world-leading minimum wages, and vibrant multicultural hubs in Sydney, Melbourne, Brisbane, and Perth.
              </p>
              <div class="border-top pt-2 small text-muted d-flex justify-content-between mb-3 mt-auto">
                <span>Primary: <strong>GSM Subclass 189</strong></span>
                <span>Avg Income: <strong>$92k AUD</strong></span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-aura mt-auto w-100" data-country="australia">
                <i class="bi bi-info-circle me-1"></i>View Country Details
              </button>
            </div>
          </div>
        </div>

        <!-- United Kingdom -->
        <div class="col-md-6 col-lg-4 country-search-item" data-country-name="United Kingdom">
          <div class="card-auravisa country-card-trigger h-100 d-flex flex-column" data-country="uk" role="button" tabindex="0" title="Click to view detailed United Kingdom immigration profile">
            <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80" alt="UK immigration" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h4 class="fs-5 fw-bold mb-0">🇬🇧 United Kingdom</h4>
                <span class="badge-aura badge-aura-warning">Financial Epicenter</span>
              </div>
              <p class="text-muted small mb-3">
                Global banking, fintech, academic, and cultural powerhouse with quick 3-week visa turnaround for sponsored skilled talent.
              </p>
              <div class="border-top pt-2 small text-muted d-flex justify-content-between mb-3 mt-auto">
                <span>Primary: <strong>Skilled Worker</strong></span>
                <span>Avg Income: <strong>£48k GBP</strong></span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-aura mt-auto w-100" data-country="uk">
                <i class="bi bi-info-circle me-1"></i>View Country Details
              </button>
            </div>
          </div>
        </div>

        <!-- Germany -->
        <div class="col-md-6 col-lg-4 country-search-item" data-country-name="Germany">
          <div class="card-auravisa country-card-trigger h-100 d-flex flex-column" data-country="germany" role="button" tabindex="0" title="Click to view detailed Germany immigration profile">
            <img src="https://images.unsplash.com/photo-1587330979470-3595ac045ab0?w=600&auto=format&fit=crop&q=80" alt="Germany immigration" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h4 class="fs-5 fw-bold mb-0">🇩🇪 Germany</h4>
                <span class="badge-aura badge-aura-success">EU Gateway</span>
              </div>
              <p class="text-muted small mb-3">
                Europe's largest economy offering Opportunity Cards (Chancenkarte), EU Blue Cards, and free public university education.
              </p>
              <div class="border-top pt-2 small text-muted d-flex justify-content-between mb-3 mt-auto">
                <span>Primary: <strong>EU Blue Card</strong></span>
                <span>Avg Income: <strong>€62k EUR</strong></span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-aura mt-auto w-100" data-country="germany">
                <i class="bi bi-info-circle me-1"></i>View Country Details
              </button>
            </div>
          </div>
        </div>

        <!-- United States -->
        <div class="col-md-6 col-lg-4 country-search-item" data-country-name="United States">
          <div class="card-auravisa country-card-trigger h-100 d-flex flex-column" data-country="usa" role="button" tabindex="0" title="Click to view detailed United States immigration profile">
            <img src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&auto=format&fit=crop&q=80" alt="USA immigration" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h4 class="fs-5 fw-bold mb-0">🇺🇸 United States</h4>
                <span class="badge-aura badge-aura-danger">EB-1 / EB-2 NIW</span>
              </div>
              <p class="text-muted small mb-3">
                Direct Green Card pathways for individuals with extraordinary ability or advanced degrees via National Interest Waivers (NIW).
              </p>
              <div class="border-top pt-2 small text-muted d-flex justify-content-between mb-3 mt-auto">
                <span>Primary: <strong>EB-2 NIW</strong></span>
                <span>Avg Income: <strong>$105k USD</strong></span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-aura mt-auto w-100" data-country="usa">
                <i class="bi bi-info-circle me-1"></i>View Country Details
              </button>
            </div>
          </div>
        </div>

        <!-- New Zealand -->
        <div class="col-md-6 col-lg-4 country-search-item" data-country-name="New Zealand">
          <div class="card-auravisa country-card-trigger h-100 d-flex flex-column" data-country="new-zealand" role="button" tabindex="0" title="Click to view detailed New Zealand immigration profile">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80" alt="New Zealand immigration" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h4 class="fs-5 fw-bold mb-0">🇳🇿 New Zealand</h4>
                <span class="badge-aura badge-aura-primary">Pristine Nature</span>
              </div>
              <p class="text-muted small mb-3">
                Skilled Migrant Category (SMC) 6-point system offering unmatched work-life balance, security, and world-class clean environment.
              </p>
              <div class="border-top pt-2 small text-muted d-flex justify-content-between mb-3 mt-auto">
                <span>Primary: <strong>SMC 6-Points</strong></span>
                <span>Avg Income: <strong>$76k NZD</strong></span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-aura mt-auto w-100" data-country="new-zealand">
                <i class="bi bi-info-circle me-1"></i>View Country Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

content = content.replace(oldCardsContainer, newCardsContainer);

// 4. Replace Section 3 table body
const oldTableTbody = /<tbody>[\s\S]*?<\/tbody>/;
const newTableTbody = `<tbody>
            <tr class="country-row-trigger" data-country="canada" role="button" tabindex="0" title="Click to view detailed Canada details">
              <td><strong>🇨🇦 Canada</strong></td>
              <td>3 Years (1,095 days)</td>
              <td>Universal Medicare (Free)</td>
              <td>Spouse + Children under 22</td>
              <td>6 - 9 Months</td>
            </tr>
            <tr class="country-row-trigger" data-country="australia" role="button" tabindex="0" title="Click to view detailed Australia details">
              <td><strong>🇦🇺 Australia</strong></td>
              <td>4 Years</td>
              <td>Universal Medicare (Free)</td>
              <td>Spouse + Children under 23</td>
              <td>8 - 12 Months</td>
            </tr>
            <tr class="country-row-trigger" data-country="uk" role="button" tabindex="0" title="Click to view detailed United Kingdom details">
              <td><strong>🇬🇧 United Kingdom</strong></td>
              <td>5 Years (ILR) + 1 Yr</td>
              <td>NHS (Immigration Surcharge)</td>
              <td>Spouse + Children under 18</td>
              <td>3 - 8 Weeks</td>
            </tr>
            <tr class="country-row-trigger" data-country="germany" role="button" tabindex="0" title="Click to view detailed Germany details">
              <td><strong>🇩🇪 Germany</strong></td>
              <td>5 Years (Fast-track 3 yrs)</td>
              <td>Statutory Health Insurance</td>
              <td>Spouse + Children</td>
              <td>2 - 4 Months</td>
            </tr>
            <tr class="country-row-trigger" data-country="new-zealand" role="button" tabindex="0" title="Click to view detailed New Zealand details">
              <td><strong>🇳🇿 New Zealand</strong></td>
              <td>5 Years</td>
              <td>Public Health System (Free)</td>
              <td>Spouse + Children under 24</td>
              <td>6 - 9 Months</td>
            </tr>
          </tbody>`;

content = content.replace(oldTableTbody, newTableTbody);

// 5. Replace Section 4 occupational cards (remove onclick redirect)
content = content.replace(/<div class="card-auravisa p-4" style="cursor: pointer;" onclick="window\.location\.href='service-details\.html'">/g, '<div class="card-auravisa p-4">');

// 6. Replace Section 5 list items
const oldListGroup = /<ul class="list-group list-group-flush small">[\s\S]*?<\/ul>/;
const newListGroup = `<ul class="list-group list-group-flush small">
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2 country-list-trigger" data-country="canada" role="button" tabindex="0" title="Click to view Canada immigration details">
                <span>🇨🇦 Canada Federal Skilled Worker</span>
                <span class="badge bg-primary">67 / 100 Points</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2 country-list-trigger" data-country="australia" role="button" tabindex="0" title="Click to view Australia immigration details">
                <span>🇦🇺 Australia SkillSelect EOI</span>
                <span class="badge bg-primary">65 / 100 Points</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2 country-list-trigger" data-country="uk" role="button" tabindex="0" title="Click to view UK immigration details">
                <span>🇬🇧 UK Skilled Worker System</span>
                <span class="badge bg-primary">70 Points (Job Offer Required)</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2 country-list-trigger" data-country="germany" role="button" tabindex="0" title="Click to view Germany immigration details">
                <span>🇩🇪 Germany Opportunity Card</span>
                <span class="badge bg-primary">6 Points (Chancenkarte)</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2 country-list-trigger" data-country="new-zealand" role="button" tabindex="0" title="Click to view New Zealand immigration details">
                <span>🇳🇿 New Zealand Skilled Migrant</span>
                <span class="badge bg-primary">6 Points Baseline</span>
              </li>
            </ul>`;

content = content.replace(oldListGroup, newListGroup);

// 7. Replace Section 6 CTA card (remove onclick on container, button links to services.html)
content = content.replace(
  /<div class="p-5 bg-surface border rounded-4 shadow-sm mx-auto" style="max-width: 800px; cursor: pointer;" onclick="window\.location\.href='service-details\.html'">/,
  '<div class="p-5 bg-surface border rounded-4 shadow-sm mx-auto" style="max-width: 800px;">'
);
content = content.replace(
  /<a href="service-details\.html" class="btn btn-accent-aura px-4 py-2">Explore All Visa Services<\/a>/,
  '<a href="services.html" class="btn btn-accent-aura px-4 py-2">Explore All Visa Services</a>'
);

// 8. Add Country Details Modal right before </main>
const modalHtml = `
  <!-- MODAL: Comprehensive Country Details Pop-Up -->
  <div class="modal fade" id="countryDetailsModal" tabindex="-1" aria-labelledby="countryModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-2xl rounded-4">
        <div class="modal-header border-bottom py-3 px-4" style="background-color: var(--bg-surface-elevated);">
          <div class="d-flex align-items-center gap-3">
            <span id="modalCountryFlag" class="fs-1">🇨🇦</span>
            <div>
              <div class="d-flex align-items-center gap-2">
                <h4 class="modal-title fw-bold mb-0" id="countryModalTitle">Canada</h4>
                <span id="modalCountryBadge" class="badge-aura badge-aura-success">3 Yrs to Passport</span>
              </div>
              <small id="modalCountrySub" class="text-muted">Global Migration & Settlement Profile</small>
            </div>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body p-4" style="background-color: var(--bg-body);">
          <!-- Overview -->
          <p id="modalCountryOverview" class="lead fs-6 text-muted mb-4"></p>

          <!-- Key Metrics Grid -->
          <div class="row g-3 mb-4">
            <div class="col-6 col-md-3">
              <div class="p-3 bg-surface rounded-3 border text-center h-100">
                <small class="text-muted d-block mb-1"><i class="bi bi-geo-alt text-primary me-1"></i>Capital</small>
                <strong id="modalCapital" class="fs-6">-</strong>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="p-3 bg-surface rounded-3 border text-center h-100">
                <small class="text-muted d-block mb-1"><i class="bi bi-cash-stack text-success me-1"></i>Avg Salary</small>
                <strong id="modalSalary" class="fs-6">-</strong>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="p-3 bg-surface rounded-3 border text-center h-100">
                <small class="text-muted d-block mb-1"><i class="bi bi-hourglass-split text-warning me-1"></i>Citizenship</small>
                <strong id="modalCitizenship" class="fs-6">-</strong>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="p-3 bg-surface rounded-3 border text-center h-100">
                <small class="text-muted d-block mb-1"><i class="bi bi-heart-pulse text-danger me-1"></i>Healthcare</small>
                <strong id="modalHealthcare" class="fs-6">-</strong>
              </div>
            </div>
          </div>

          <!-- Immigration Pathways -->
          <div class="mb-4">
            <h5 class="fw-bold fs-6 mb-2 d-flex align-items-center gap-2">
              <i class="bi bi-signpost-split text-primary"></i> Primary Immigration & Visa Routes
            </h5>
            <div id="modalPathways" class="d-flex flex-wrap gap-2"></div>
          </div>

          <!-- Requirements & Points -->
          <div class="mb-4 p-3 bg-surface rounded-3 border">
            <h5 class="fw-bold fs-6 mb-2 d-flex align-items-center gap-2">
              <i class="bi bi-card-checklist text-success"></i> Eligibility & Points Thresholds
            </h5>
            <p id="modalPoints" class="small text-muted mb-0"></p>
          </div>

          <!-- In Demand Occupations -->
          <div class="mb-4">
            <h5 class="fw-bold fs-6 mb-2 d-flex align-items-center gap-2">
              <i class="bi bi-briefcase text-warning"></i> High-Demand Occupational Sectors
            </h5>
            <div id="modalJobs" class="d-flex flex-wrap gap-2"></div>
          </div>

          <!-- Family & Lifestyle Benefits -->
          <div class="p-3 rounded-3 border bg-surface">
            <h5 class="fw-bold fs-6 mb-2 d-flex align-items-center gap-2">
              <i class="bi bi-people text-info"></i> Family & Settlement Benefits
            </h5>
            <p id="modalBenefits" class="small text-muted mb-0"></p>
          </div>
        </div>

        <div class="modal-footer border-top py-3 px-4 d-flex justify-content-between align-items-center" style="background-color: var(--bg-surface-elevated);">
          <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          <div class="d-flex gap-2">
            <a id="modalEligibilityBtn" href="eligibility-checker.html" class="btn btn-sm btn-outline-aura">
              <i class="bi bi-check2-circle me-1"></i>Check Eligibility
            </a>
            <a id="modalServiceBtn" href="services.html" class="btn btn-sm btn-primary-aura text-white">
              <i class="bi bi-arrow-right-circle me-1"></i>Visa Services
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

content = content.replace('</main>', modalHtml + '\n  </main>');

// 9. Replace old redirect script at the bottom
const oldScriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {\s*const guideMain = document\.getElementById\('country-guide-main'\);[\s\S]*?<\/script>/;
const newScript = `<script>
    const countryDetailsData = {
      canada: {
        name: 'Canada',
        flag: '🇨🇦',
        badge: '3 Yrs to Passport',
        badgeClass: 'badge-aura-success',
        sub: 'Federal & Provincial Migration Programs',
        overview: 'Canada is consistently ranked among the top global destinations for immigrants, featuring a transparent points-based system, publicly funded universal healthcare, free public schooling, and one of the fastest routes to permanent residency and citizenship in the G7.',
        capital: 'Ottawa (CAD $)',
        salary: '$78,000 - $115,000 CAD',
        citizenship: '3 Years (1,095 days)',
        healthcare: 'Universal Medicare (Free)',
        pathways: [
          'Express Entry - Federal Skilled Worker (FSW)',
          'Provincial Nominee Programs (PNP across 10 provinces)',
          'Canadian Experience Class (CEC)',
          'Start-Up Visa Program (SUV)',
          'Atlantic Immigration Program (AIP)'
        ],
        points: 'Minimum 67/100 eligibility points on the 6 Selection Factors (Language, Education, Work Experience, Age, Arranged Employment, Adaptability). Comprehensive Ranking System (CRS) pool cutoffs typically range between 480 and 535 points.',
        jobs: [
          'Software Engineers & Tech Leads',
          'Registered Nurses & Physicians',
          'Cloud Architects & DevOps Specialists',
          'Civil & Mechanical Engineers',
          'Financial Controllers & Auditors',
          'Construction Project Managers'
        ],
        benefits: 'Unconditional work permits for spouses/partners; children under 22 included as dependents; full public healthcare coverage; citizenship eligibility after only 3 years of physical residency with dual citizenship allowed.',
        serviceUrl: 'services.html',
        eligibilityUrl: 'eligibility-checker.html'
      },
      australia: {
        name: 'Australia',
        flag: '🇦🇺',
        badge: 'High Wages & Lifestyle',
        badgeClass: 'badge-aura-primary',
        sub: 'SkillSelect Expression of Interest System',
        overview: 'Australia offers world-leading minimum wages, an enviable climate, vibrant multicultural metropolises in Sydney, Melbourne, Brisbane, and Perth, and direct permanent residency pathways for in-demand occupations.',
        capital: 'Canberra (AUD $)',
        salary: '$92,000 - $140,000 AUD',
        citizenship: '4 Years (12 mo on PR)',
        healthcare: 'Medicare (Public & Free)',
        pathways: [
          'Skilled Independent Visa (Subclass 189)',
          'Skilled Nominated Visa (Subclass 190)',
          'Skilled Work Regional Visa (Subclass 491)',
          'Employer Nomination Scheme (Subclass 186)',
          'Global Talent Visa (Subclass 858)'
        ],
        points: 'Statutory minimum of 65 points on the SkillSelect grid evaluating Age (max 30 pts), English Proficiency (up to 20 pts for Superior), Overseas/Australian Skilled Employment, and Educational Qualifications.',
        jobs: [
          'Registered Nurses & Allied Health',
          'Civil, Structural & Mining Engineers',
          'ICT Business Analysts & Programmers',
          'Secondary & Early Childhood Teachers',
          'Electricians, Mechanics & Trades',
          'Cybersecurity & Network Engineers'
        ],
        benefits: 'Universal healthcare under Medicare; reciprocal healthcare agreements with 11 countries; free public education for dependent children; spouse/partner receives unrestricted Australian work rights.',
        serviceUrl: 'service-details.html?service=australia-gsm',
        eligibilityUrl: 'eligibility-checker.html'
      },
      uk: {
        name: 'United Kingdom',
        flag: '🇬🇧',
        badge: 'Financial & Legal Epicenter',
        badgeClass: 'badge-aura-warning',
        sub: 'Points-Based Skilled Worker Route',
        overview: 'The United Kingdom provides unrivaled proximity to global capital markets, top-tier research universities, and leading tech ecosystems, backed by expedited 3 to 8-week visa turnaround times for licensed employer-sponsored talent.',
        capital: 'London (GBP £)',
        salary: '£48,000 - £85,000 GBP',
        citizenship: '5 Yrs ILR + 1 Yr Passport',
        healthcare: 'NHS (Health Surcharge)',
        pathways: [
          'Skilled Worker Visa (Employer Sponsored)',
          'Global Talent Visa (Tech Nation & Royal Society)',
          'Health and Care Worker Visa',
          'Innovator Founder Visa',
          'High Potential Individual (HPI) Route'
        ],
        points: 'Must attain 70 points under the points-based immigration system: 20 pts for valid Job Offer from an approved Home Office sponsor, 20 pts for appropriate skill level (RQF 3+), 10 pts for English (B1 CEFR), and 20 pts for meeting salary thresholds.',
        jobs: [
          'Financial Analysts & Quantitative Traders',
          'AI & Machine Learning Researchers',
          'NHS Doctors, Specialists & Senior Nurses',
          'Cloud & Enterprise Software Engineers',
          'Chartered Accountants & Compliance Officers',
          'Biotechnology & Pharmaceutical Scientists'
        ],
        benefits: 'Access to the National Health Service (NHS); spouse/partner entitled to work in any sector without separate sponsorship; children under 18 enrolled in top-tier UK state schools; eligibility for Indefinite Leave to Remain (ILR) after 5 years.',
        serviceUrl: 'service-details.html?service=uk-skilled-worker',
        eligibilityUrl: 'eligibility-checker.html'
      },
      germany: {
        name: 'Germany',
        flag: '🇩🇪',
        badge: 'EU Gateway & Free University',
        badgeClass: 'badge-aura-success',
        sub: 'Opportunity Card & EU Blue Card Framework',
        overview: 'Germany is Europe’s industrial and technological engine. Recent historic immigration reforms have lowered salary barriers for the EU Blue Card and introduced the points-based Opportunity Card (Chancenkarte), while reducing citizenship requirements to 5 years (or 3 years with fast-track).',
        capital: 'Berlin (EUR €)',
        salary: '€62,000 - €95,000 EUR',
        citizenship: '5 Years (Fast-track 3 yrs)',
        healthcare: 'Statutory Health Insurance',
        pathways: [
          'EU Blue Card (Expedited skilled route)',
          'Opportunity Card (Chancenkarte points visa)',
          'Skilled Workers Act (Fachkräfteeinwanderungsgesetz)',
          'ICT Intra-Corporate Transfer',
          'Researcher & Academic Visas'
        ],
        points: 'Chancenkarte requires 6 points from recognized qualifications, German (A1-B2) or English (C1) language skills, 2+ years of professional experience, age under 35/40, and past legal stays in Germany. EU Blue Card requires an accredited degree and minimum qualifying salary (€45,300, or €41,041 for shortage occupations).',
        jobs: [
          'Automotive & Mechanical Engineers',
          'Embedded Systems & Firmware Developers',
          'Specialist Physicians & Clinical Staff',
          'Green Energy & Solar Systems Technicians',
          'Data Architects & Enterprise IT Specialists',
          'Supply Chain & Industrial Operations Leaders'
        ],
        benefits: 'Completely free tuition at world-class public universities for all residents and their children; comprehensive statutory health insurance; Schengen visa-free mobility across 29 European countries; spouse unrestricted work permit without mandatory German language requirement.',
        serviceUrl: 'services.html',
        eligibilityUrl: 'eligibility-checker.html'
      },
      usa: {
        name: 'United States',
        flag: '🇺🇸',
        badge: 'EB-1 / EB-2 NIW Green Card',
        badgeClass: 'badge-aura-danger',
        sub: 'Employment-Based Permanent Residence',
        overview: 'The United States offers the highest compensation packages and venture capital opportunities in the world. Exceptional professionals and advanced degree holders can bypass employer sponsorship entirely via National Interest Waivers (EB-2 NIW) or Extraordinary Ability (EB-1A).',
        capital: 'Washington, D.C. (USD $)',
        salary: '$105,000 - $185,000 USD',
        citizenship: '5 Years of Green Card',
        healthcare: 'Private / Employer Healthcare',
        pathways: [
          'EB-2 National Interest Waiver (NIW - Self-Petition)',
          'EB-1A Alien of Extraordinary Ability',
          'EB-1B Outstanding Professors & Researchers',
          'H-1B Specialty Occupation Visa',
          'O-1 Extraordinary Ability Non-Immigrant Visa'
        ],
        points: 'Qualitative criteria-based evaluation. For EB-2 NIW, applicant must satisfy Advanced Degree or Exceptional Ability, plus the Matter of Dhanasar three-prong test: (1) substantial merit and national importance, (2) well-positioned to advance the endeavor, and (3) on balance beneficial to waive job offer/labor certification.',
        jobs: [
          'AI / Machine Learning Research Scientists',
          'Biomedical & Oncology Researchers',
          'Semiconductor & Hardware Design Engineers',
          'Fintech & Quantitative Algorithm Developers',
          'Aerospace & Robotics Specialists',
          'Cyber Defense & Cryptography Experts'
        ],
        benefits: 'Direct Permanent Resident Card (Green Card) issued to the applicant, spouse, and unmarried children under 21; spouse eligible for unrestricted employment; children attend top US school districts and qualify for in-state university tuition; US passport eligibility after 5 years.',
        serviceUrl: 'services.html',
        eligibilityUrl: 'eligibility-checker.html'
      },
      'new-zealand': {
        name: 'New Zealand',
        flag: '🇳🇿',
        badge: 'Pristine Nature & Safety',
        badgeClass: 'badge-aura-primary',
        sub: 'Skilled Migrant Category 6-Point System',
        overview: 'New Zealand combines spectacular natural landscapes with high community safety and progressive governance. The modern Skilled Migrant Category uses a straightforward 6-point benchmark, and the Green List offers fast-track Straight-to-Residence for in-demand occupations.',
        capital: 'Wellington (NZD $)',
        salary: '$76,000 - $118,000 NZD',
        citizenship: '5 Years of Residence',
        healthcare: 'Public Health System (Free)',
        pathways: [
          'Skilled Migrant Category (SMC) 6-Points',
          'Green List Straight to Residence Visa',
          'Green List Work to Residence Visa',
          'Accredited Employer Work Visa (AEWV)',
          'Partner of a Worker Resident Visa'
        ],
        points: 'Requires 6 points from either: New Zealand occupational registration (3-6 pts), Recognized qualifications (Bachelor 3 pts, Master 5 pts, PhD 6 pts), or High income (1.5x median wage = 3 pts, 3x median wage = 6 pts), plus 1 pt per year of skilled NZ work experience (up to 3 pts), and a permanent job offer from an accredited employer.',
        jobs: [
          'Civil, Structural & Geotechnical Engineers',
          'Registered Nurses, Midwives & Doctors',
          'Early Childhood & Secondary Teachers',
          'Software Architects & Cybersecurity Analysts',
          'Agricultural Technologists & Environmental Scientists',
          'Electricians & Construction Supervisors'
        ],
        benefits: 'Full public healthcare coverage; clean, safe environment consistently ranked top 5 on the Global Peace Index; spouse granted open work rights; indefinite right to live and work in Australia without a separate visa under the Trans-Tasman arrangement.',
        serviceUrl: 'services.html',
        eligibilityUrl: 'eligibility-checker.html'
      }
    };

    function openCountryModal(countryKey) {
      if (!countryKey) return;
      const key = countryKey.toLowerCase().trim();
      const data = countryDetailsData[key];
      if (!data) return;

      document.getElementById('modalCountryFlag').textContent = data.flag;
      document.getElementById('countryModalTitle').textContent = data.name;
      
      const badgeEl = document.getElementById('modalCountryBadge');
      badgeEl.textContent = data.badge;
      badgeEl.className = 'badge-aura ' + data.badgeClass;

      document.getElementById('modalCountrySub').textContent = data.sub;
      document.getElementById('modalCountryOverview').textContent = data.overview;
      document.getElementById('modalCapital').textContent = data.capital;
      document.getElementById('modalSalary').textContent = data.salary;
      document.getElementById('modalCitizenship').textContent = data.citizenship;
      document.getElementById('modalHealthcare').textContent = data.healthcare;

      // Pathways
      const pathwaysContainer = document.getElementById('modalPathways');
      pathwaysContainer.innerHTML = '';
      data.pathways.forEach(p => {
        const span = document.createElement('span');
        span.className = 'badge bg-surface border text-body py-2 px-3 fw-medium text-wrap text-start';
        span.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i> ' + p;
        pathwaysContainer.appendChild(span);
      });

      document.getElementById('modalPoints').textContent = data.points;

      // Jobs
      const jobsContainer = document.getElementById('modalJobs');
      jobsContainer.innerHTML = '';
      data.jobs.forEach(j => {
        const span = document.createElement('span');
        span.className = 'badge bg-surface border text-body py-2 px-3 fw-medium text-wrap text-start';
        span.innerHTML = '<i class="bi bi-briefcase-fill text-warning me-1"></i> ' + j;
        jobsContainer.appendChild(span);
      });

      document.getElementById('modalBenefits').textContent = data.benefits;

      document.getElementById('modalServiceBtn').href = data.serviceUrl;
      document.getElementById('modalEligibilityBtn').href = data.eligibilityUrl;

      const modalEl = document.getElementById('countryDetailsModal');
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }

    document.addEventListener('DOMContentLoaded', () => {
      // Attach click handlers to all country triggers (cards, buttons, table rows, list items)
      document.querySelectorAll('[data-country]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const countryKey = el.getAttribute('data-country');
          if (countryKey) {
            openCountryModal(countryKey);
          }
        });
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const countryKey = el.getAttribute('data-country');
            if (countryKey) {
              openCountryModal(countryKey);
            }
          }
        });
      });

      // Search input live filtering & modal trigger
      const searchInput = document.getElementById('destinationSearchInput');
      const searchBtn = document.getElementById('destinationSearchBtn');
      const countryCards = document.querySelectorAll('.country-search-item');

      function filterCountries() {
        const query = (searchInput.value || '').trim().toLowerCase();
        let visibleCount = 0;
        let firstMatchedCountry = null;

        countryCards.forEach(card => {
          const countryName = (card.getAttribute('data-country-name') || '').toLowerCase();
          const text = card.textContent.toLowerCase();
          if (!query || countryName.includes(query) || text.includes(query)) {
            card.style.display = '';
            visibleCount++;
            if (!firstMatchedCountry) {
              const trigger = card.querySelector('[data-country]');
              if (trigger) firstMatchedCountry = trigger.getAttribute('data-country');
            }
          } else {
            card.style.display = 'none';
          }
        });

        return { visibleCount, firstMatchedCountry };
      }

      if (searchInput) {
        searchInput.addEventListener('input', filterCountries);
        searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const { firstMatchedCountry } = filterCountries();
            if (firstMatchedCountry) {
              openCountryModal(firstMatchedCountry);
            }
          }
        });
      }

      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          const { firstMatchedCountry } = filterCountries();
          if (firstMatchedCountry) {
            openCountryModal(firstMatchedCountry);
          }
        });
      }
    });
  </script>`;

content = content.replace(oldScriptRegex, newScript);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated country-guide.html with interactive country pop-up modal and dynamic search!');
