const fs = require('fs');

const home2Html = `<!DOCTYPE html>
<html lang="en" data-bs-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Study Abroad & University Admissions - AuraVisa</title>
  <meta name="description" content="Discover global study opportunities, institutional scholarships, and post-study permanent residency pathways for top-tier universities worldwide with AuraVisa.">
  
  <meta name="color-scheme" content="light dark">
  <script>
    (function() {
      const savedTheme = localStorage.getItem('auravisa-theme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      }
      const savedDir = localStorage.getItem('auravisa-dir');
      if (savedDir) {
        document.documentElement.setAttribute('dir', savedDir);
      }
    })();
  </script>

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">
  <link rel="alternate icon" type="image/png" href="assets/img/favicon.svg">
  <link rel="apple-touch-icon" href="assets/img/favicon.svg">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- Main Header & Navbar (Sticky, Contained Layout, Centered Nav Links) -->
  <header class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-auravisa">
      <div class="container">
        <a class="brand-logo" href="index.html">
          <span class="brand-badge"><i class="bi bi-globe-americas"></i></span>
          <span>Aura<span class="text-warning">Visa</span></span>
        </a>

        <!-- Mobile Controls (RTL, Theme & Menu Toggler) -->
        <div class="d-flex align-items-center gap-2 d-lg-none">
          <button class="btn btn-sm btn-outline-aura rtl-toggle-btn p-1 px-2" type="button" title="Toggle RTL / LTR orientation" aria-label="Toggle RTL">
            <span class="rtl-status-badge">RTL</span>
          </button>
          <button class="btn btn-sm btn-outline-aura theme-toggle-btn p-1 px-2" type="button" title="Toggle Theme" aria-label="Toggle theme">
            <i class="bi bi-moon-stars-fill theme-toggle-icon"></i>
          </button>
          <button class="navbar-toggler border-0 shadow-none p-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <!-- Navigation Links & Action Buttons Offcanvas -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title fw-bold" id="offcanvasNavbarLabel">
              <span class="brand-badge me-2"><i class="bi bi-globe-americas"></i></span>AuraVisa
            </h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <!-- Mobile In-Drawer Live Search for Sections and Visas -->
            <div class="offcanvas-search-wrap">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-end-0"><i class="bi bi-search text-muted"></i></span>
                <input type="text" id="offcanvasSearchInput" class="form-control border-start-0" placeholder="Search sections, visas & pages...">
              </div>
              <div id="offcanvasSearchResults" class="mt-2 d-none"></div>
            </div>

            <!-- Centered Main Nav Items: Text Only -->
            <ul class="navbar-nav mx-auto align-items-lg-center justify-content-center gap-lg-1">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown">Home</a>
                <ul class="dropdown-menu shadow border-0">
                  <li><a class="dropdown-item" href="index.html">Home 1 - Global Migration</a></li>
                  <li><a class="dropdown-item active" href="home-2.html">Home 2 - Study Abroad</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Services</a>
                <ul class="dropdown-menu border-0 shadow-lg">
                  <li><a class="dropdown-item" href="services.html">All Visa Services</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=express-entry">Canada Express Entry</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=australia-gsm">Australia GSM</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=uk-skilled-worker">UK Skilled Worker</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=germany-opportunity-card">Germany Opportunity Card</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=golden-visa">Golden Visa & Investor</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=student-permits">Student Permits</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=family-sponsorship">Family Sponsorship</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="pricing.html">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="blog.html">News</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contact.html"><i class="bi bi-envelope me-1"></i>Contact</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="client-dashboard.html" title="User Dashboard"><i class="bi bi-speedometer2 me-1"></i>Dashboard</a>
              </li>
            </ul>

            <!-- Navbar Action Buttons: RTL, Dark Mode, Login, Primary CTA -->
            <div class="d-flex align-items-center gap-2 mt-3 mt-lg-0 flex-wrap">
              <button class="btn btn-sm btn-outline-aura rtl-toggle-btn d-none d-lg-inline-flex" type="button" title="Toggle RTL / LTR orientation">
                <span class="rtl-status-badge">RTL</span>
              </button>
              <button class="btn btn-sm btn-outline-aura theme-toggle-btn d-none d-lg-inline-flex" type="button" title="Toggle Light / Dark theme" aria-label="Toggle theme">
                <i class="bi bi-moon-stars-fill theme-toggle-icon"></i>
              </button>
              <a href="login.html" class="btn btn-sm btn-outline-aura">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
              </a>
              <a href="contact.html" class="btn btn-sm btn-primary-aura text-white">
                <i class="bi bi-calendar-check me-1"></i>Book Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- SECTION 1: International Study Abroad & University Admissions Hero (Distinct Layout) -->
  <section class="hero-wrapper" id="student-hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-7">
          <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
            <span class="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill">
              <i class="bi bi-mortarboard-fill me-1"></i> Global Study Pathways
            </span>
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill">
              <i class="bi bi-calendar3 me-1"></i> Fall 2026 Admissions Open
            </span>
          </div>
          
          <h1 class="display-4 fw-extrabold mb-3">
            World-Class University Admissions & <span class="text-warning">Post-Study PR Pathways</span>
          </h1>
          <p class="lead text-muted mb-4">
            Direct institutional representation across 850+ top global universities. We secure competitive tuition scholarships, expedite visa approvals, and formulate direct post-graduation work rights leading to permanent residency.
          </p>

          <!-- Quick Interactive Subject Chips -->
          <div class="d-flex flex-wrap align-items-center gap-2 mb-4 pb-2">
            <span class="small text-muted fw-bold">Trending Fields:</span>
            <a href="#quick-matcher" class="badge-aura badge-aura-primary text-decoration-none">Computer Science & AI</a>
            <a href="#quick-matcher" class="badge-aura badge-aura-success text-decoration-none">Data Analytics & MBA</a>
            <a href="#quick-matcher" class="badge-aura badge-aura-warning text-decoration-none">Renewable Engineering</a>
            <a href="#quick-matcher" class="badge-aura badge-aura-danger text-decoration-none">Zero-Tuition Programs</a>
          </div>

          <!-- Hero Action Buttons -->
          <div class="d-flex flex-wrap gap-3 mb-4">
            <a href="#quick-matcher" class="btn btn-primary-aura">
              <i class="bi bi-search me-1"></i> Find University Programs
            </a>
            <a href="#scholarships-section" class="btn btn-outline-aura">
              <i class="bi bi-award me-1"></i> Explore $4.2M+ Scholarships
            </a>
          </div>

          <!-- Verified Academic Trust Stats -->
          <div class="d-flex align-items-center gap-4 text-muted small flex-wrap pt-2 border-top">
            <div><i class="bi bi-check2-circle text-success me-1"></i> <strong>$4.2M+</strong> Scholarships Won</div>
            <div><i class="bi bi-check2-circle text-success me-1"></i> <strong>850+</strong> Partner Campuses</div>
            <div><i class="bi bi-check2-circle text-success me-1"></i> <strong>99.1%</strong> Study Visa Rate</div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="position-relative">
            <!-- Hero Distinct Image -->
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80" 
                 alt="International students studying together in modern university library campus" 
                 class="hero-featured-img rounded-4 shadow-lg border">
            
            <!-- Floating Offer Badge Top -->
            <div class="position-absolute top-0 end-0 bg-surface p-3 rounded-4 shadow-lg border m-3">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-trophy-fill text-warning fs-3"></i>
                <div>
                  <div class="fw-bold text-primary fs-5 mb-0">Up to 100%</div>
                  <small class="text-muted">Tuition Fee Waivers</small>
                </div>
              </div>
            </div>

            <!-- Floating Intake Notification Bottom -->
            <div class="position-absolute bottom-0 start-0 bg-surface p-3 rounded-4 shadow-lg border m-3">
              <div class="d-flex align-items-center gap-2">
                <span class="status-pulse-dot bg-success"></span>
                <div>
                  <div class="fw-bold small">Next Intake Deadline</div>
                  <small class="text-muted">Priority Visa Window Closing</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2: Fast Eligibility & Course Matching Interactive Widget -->
  <section class="section-space-alt" id="quick-matcher">
    <div class="container">
      <div class="p-4 p-lg-5 bg-surface rounded-4 shadow border">
        <div class="row align-items-center mb-4">
          <div class="col-lg-8">
            <span class="section-subtitle">Intelligent Admissions Tool</span>
            <h2 class="fs-2 fw-bold mb-1">Instant Course & Country Matcher</h2>
            <p class="text-muted mb-0">Select your current degree level and target intake to preview eligible programs, living costs, and scholarships.</p>
          </div>
          <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <span class="badge-aura badge-aura-success fs-6"><i class="bi bi-lightning-charge-fill me-1"></i> AI-Powered Matching</span>
          </div>
        </div>

        <form id="admissionsToolForm" class="row g-3 needs-validation-aura" novalidate>
          <div class="col-md-3">
            <label class="form-label fw-semibold small">Degree Level</label>
            <select class="form-select" name="degreeLevel" required>
              <option value="" selected disabled>Select degree...</option>
              <option value="bachelor">Bachelor's Degree (Undergraduate)</option>
              <option value="master">Master's / Postgraduate</option>
              <option value="phd">Doctorate (Ph.D.) / Research</option>
              <option value="diploma">Graduate Diploma / Co-op</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label fw-semibold small">Field of Interest</label>
            <select class="form-select" name="fieldOfInterest" required>
              <option value="" selected disabled>Choose field...</option>
              <option value="tech">Computer Science & AI</option>
              <option value="business">Business & MBA</option>
              <option value="engineering">Mechanical & Civil Engineering</option>
              <option value="health">Healthcare & Nursing</option>
              <option value="law">International Law & Policy</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label fw-semibold small">Target Destination</label>
            <select class="form-select" name="targetCountry" required>
              <option value="" selected disabled>Select country...</option>
              <option value="ca">Canada (PGWP 3 Years)</option>
              <option value="uk">United Kingdom (Graduate Route)</option>
              <option value="au">Australia (Subclass 500)</option>
              <option value="de">Germany (Zero Tuition Fee)</option>
              <option value="us">United States (F-1 STEM OPT)</option>
            </select>
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button type="submit" class="btn btn-primary-aura w-100 py-2">
              <i class="bi bi-search me-1"></i> Search Programs
            </button>
          </div>
        </form>

        <!-- Dynamic Matched Programs Container -->
        <div id="admissionsResultsContainer" class="d-none"></div>
      </div>
    </div>
  </section>

  <!-- NEW SECTION 3: Global Scholarships & Grants Directory (Brand New Content for Home 2) -->
  <section class="section-space" id="scholarships-section">
    <div class="container">
      <div class="text-center section-title-wrap">
        <span class="section-subtitle">Financial Aid & Merit Grants</span>
        <h2 class="section-heading">Featured Global Scholarships & Full-Rides</h2>
        <p class="text-muted mx-auto" style="max-width: 650px;">
          Our academic advisory team has secured over $4.2M in competitive government and institutional scholarships for international candidates.
        </p>
      </div>

      <div class="row g-4">
        <!-- Scholarship 1: Chevening UK -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80" alt="Chevening UK British Council" class="card-img-top-cover" style="height: 140px;">
              <span class="badge bg-danger position-absolute top-0 end-0 m-2 text-white">Full Ride</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-primary mb-2 align-self-start">UK Foreign Office</span>
              <h5 class="fw-bold mb-1">Chevening Scholarship</h5>
              <div class="text-warning fw-bold mb-2">100% Tuition + £1,450/mo Stipend</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Full financial coverage for 1-year master's degrees at any UK university. Includes return flights, visa fees, and arrival allowance.
              </p>
              <div class="border-top pt-2 mt-auto small text-muted">
                <i class="bi bi-calendar-event me-1"></i> <strong>Deadline:</strong> Nov 2026 for Fall 2027
              </div>
            </div>
          </div>
        </div>

        <!-- Scholarship 2: DAAD Germany -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&auto=format&fit=crop&q=80" alt="DAAD Germany Scholarships" class="card-img-top-cover" style="height: 140px;">
              <span class="badge bg-success position-absolute top-0 end-0 m-2 text-white">Zero Tuition</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-success mb-2 align-self-start">German Academic Exchange</span>
              <h5 class="fw-bold mb-1">DAAD Master's Grant</h5>
              <div class="text-success fw-bold mb-2">€934/mo + Travel & Health</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Funded by the German Federal Government for international master's students in STEM, public policy, and environmental sustainability.
              </p>
              <div class="border-top pt-2 mt-auto small text-muted">
                <i class="bi bi-calendar-event me-1"></i> <strong>Deadline:</strong> Oct 2026 Intake
              </div>
            </div>
          </div>
        </div>

        <!-- Scholarship 3: Australia Awards -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&auto=format&fit=crop&q=80" alt="Australia Awards Scholarship" class="card-img-top-cover" style="height: 140px;">
              <span class="badge bg-primary position-absolute top-0 end-0 m-2 text-white">Govt Grant</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-warning mb-2 align-self-start">DFAT Australia</span>
              <h5 class="fw-bold mb-1">Australia Awards & RTP</h5>
              <div class="text-primary fw-bold mb-2">Full Tuition + $35,000 AUD/yr</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Premier scholarships for postgraduate study and research across Group of Eight Australian institutions with overseas health cover.
              </p>
              <div class="border-top pt-2 mt-auto small text-muted">
                <i class="bi bi-calendar-event me-1"></i> <strong>Deadline:</strong> April 2026 Annually
              </div>
            </div>
          </div>
        </div>

        <!-- Scholarship 4: Vanier Canada -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=80" alt="Canada Vanier Scholarship" class="card-img-top-cover" style="height: 140px;">
              <span class="badge bg-danger position-absolute top-0 end-0 m-2 text-white">Top Prestigious</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-primary mb-2 align-self-start">Government of Canada</span>
              <h5 class="fw-bold mb-1">Vanier & Provost Grants</h5>
              <div class="text-danger fw-bold mb-2">$50,000 CAD/year (3 Yrs)</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Canada's most prestigious scholarship for doctoral and graduate researchers demonstrating academic excellence and leadership.
              </p>
              <div class="border-top pt-2 mt-auto small text-muted">
                <i class="bi bi-calendar-event me-1"></i> <strong>Deadline:</strong> Nov 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- NEW SECTION 4: Post-Study Work Permit & PR Conversion Matrix (Distinct Layout & Content) -->
  <section class="section-space-alt" id="pswp-pr-matrix">
    <div class="container">
      <div class="text-center section-title-wrap">
        <span class="section-subtitle">Career & Permanent Settlement</span>
        <h2 class="section-heading">Post-Study Work Permit (PSWP) to PR Comparison Matrix</h2>
        <p class="text-muted mx-auto" style="max-width: 680px;">
          Compare how international degrees directly convert into open work permits and fast-track permanent residency across top global economies.
        </p>
      </div>

      <div class="table-responsive">
        <table class="table table-auravisa shadow-sm">
          <thead>
            <tr>
              <th style="min-width: 140px;">Destination</th>
              <th style="min-width: 150px;">Work Visa Duration</th>
              <th style="min-width: 180px;">Direct PR Transition Route</th>
              <th style="min-width: 140px;">Spouse Work Rights</th>
              <th style="min-width: 140px;">Avg Tech / Eng Salary</th>
              <th style="min-width: 130px;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-danger text-white">Canada</span>
                  <strong>Canada</strong>
                </div>
              </td>
              <td><span class="fw-bold text-primary">Up to 3-Year PGWP</span></td>
              <td>
                <div><strong>Express Entry (CEC)</strong></div>
                <small class="text-muted">1 year of skilled Canadian work awards 50-200 bonus CRS points</small>
              </td>
              <td><span class="badge-aura badge-aura-success">Full Open Work Permit</span></td>
              <td><strong>$82,000 CAD</strong></td>
              <td><a href="service-details.html?service=express-entry" class="btn btn-sm btn-outline-aura">View Guide</a></td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-info text-dark">UK</span>
                  <strong>United Kingdom</strong>
                </div>
              </td>
              <td><span class="fw-bold text-primary">2-Year Graduate Route</span></td>
              <td>
                <div><strong>Skilled Worker Visa -> ILR</strong></div>
                <small class="text-muted">Direct transfer to employer sponsorship with permanent settlement in 5 yrs</small>
              </td>
              <td><span class="badge-aura badge-aura-warning">Postgrad Dependent Rights</span></td>
              <td><strong>£46,000 GBP</strong></td>
              <td><a href="service-details.html?service=uk-skilled-worker" class="btn btn-sm btn-outline-aura">View Guide</a></td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary text-white">Australia</span>
                  <strong>Australia</strong>
                </div>
              </td>
              <td><span class="fw-bold text-primary">2 to 4-Year Subclass 485</span></td>
              <td>
                <div><strong>GSM 189 / 190 PR</strong></div>
                <small class="text-muted">Australian study grants 5 bonus points; regional campus grants 10 points</small>
              </td>
              <td><span class="badge-aura badge-aura-success">Unrestricted Work Rights</span></td>
              <td><strong>$95,000 AUD</strong></td>
              <td><a href="service-details.html?service=australia-gsm" class="btn btn-sm btn-outline-aura">View Guide</a></td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-warning text-dark">Germany</span>
                  <strong>Germany</strong>
                </div>
              </td>
              <td><span class="fw-bold text-primary">18-Month Job Search Visa</span></td>
              <td>
                <div><strong>EU Blue Card -> Niederlassung</strong></div>
                <small class="text-muted">Fast-track permanent settlement in 21 months with B1 German language</small>
              </td>
              <td><span class="badge-aura badge-aura-success">Immediate Full Work Permit</span></td>
              <td><strong>€64,000 EUR</strong></td>
              <td><a href="service-details.html?service=germany-opportunity-card" class="btn btn-sm btn-outline-aura">View Guide</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- SECTION 5: Top Study Destinations & Scholarship Pathways -->
  <section class="section-space" id="study-destinations">
    <div class="container">
      <div class="text-center section-title-wrap">
        <span class="section-subtitle">Global Opportunities</span>
        <h2 class="section-heading">Premier Academic Destinations</h2>
        <p class="text-muted mx-auto" style="max-width: 650px;">
          Choose destinations offering world-renowned academic degrees and guaranteed post-study work authorization leading to permanent residency.
        </p>
      </div>

      <div class="row g-4">
        <!-- Canada -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80" alt="University of Toronto historic campus building" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-primary mb-2 align-self-start">Top for PR</span>
              <h4 class="fs-5 fw-bold mb-2">Canada</h4>
              <p class="text-muted small mb-3 flex-grow-1">
                Enjoy up to 3 years of Post-Graduation Work Permit (PGWP) with direct pathways to Permanent Residency under Canadian Experience Class.
              </p>
              <ul class="list-unstyled small text-muted mb-4">
                <li><i class="bi bi-check-circle text-success me-1"></i> Part-time work: 24 hrs/wk</li>
                <li><i class="bi bi-check-circle text-success me-1"></i> Spouse open work permit</li>
              </ul>
              <a href="service-details.html?service=express-entry" class="btn btn-sm btn-outline-aura mt-auto">View Admissions</a>
            </div>
          </div>
        </div>

        <!-- UK -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <img src="https://images.unsplash.com/photo-1543832923-44667a44c804?w=600&auto=format&fit=crop&q=80" alt="Oxford University campus UK" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-success mb-2 align-self-start">1-Year Masters</span>
              <h4 class="fs-5 fw-bold mb-2">United Kingdom</h4>
              <p class="text-muted small mb-3 flex-grow-1">
                Accelerate your career with prestigious 1-year master's degrees followed by a 2-year Graduate Route visa for full-time corporate work.
              </p>
              <ul class="list-unstyled small text-muted mb-4">
                <li><i class="bi bi-check-circle text-success me-1"></i> No job offer needed for Graduate Route</li>
                <li><i class="bi bi-check-circle text-success me-1"></i> Renowned Russell Group unis</li>
              </ul>
              <a href="service-details.html?service=uk-skilled-worker" class="btn btn-sm btn-outline-aura mt-auto">View Admissions</a>
            </div>
          </div>
        </div>

        <!-- Australia -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80" alt="Sydney University Australia lecture campus" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-warning mb-2 align-self-start">High Lifestyle</span>
              <h4 class="fs-5 fw-bold mb-2">Australia</h4>
              <p class="text-muted small mb-3 flex-grow-1">
                Subclass 500 student visas offering regional bonus PR points, high minimum hourly wages, and post-study work rights up to 4 years.
              </p>
              <ul class="list-unstyled small text-muted mb-4">
                <li><i class="bi bi-check-circle text-success me-1"></i> Group of Eight universities</li>
                <li><i class="bi bi-check-circle text-success me-1"></i> Regional PR point advantages</li>
              </ul>
              <a href="service-details.html?service=australia-gsm" class="btn btn-sm btn-outline-aura mt-auto">View Admissions</a>
            </div>
          </div>
        </div>

        <!-- Germany -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column">
            <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&auto=format&fit=crop&q=80" alt="Munich campus Germany" class="card-img-top-cover">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-danger mb-2 align-self-start">Zero Tuition</span>
              <h4 class="fs-5 fw-bold mb-2">Germany</h4>
              <p class="text-muted small mb-3 flex-grow-1">
                Study tuition-free at renowned state universities with English-taught engineering, IT, and business master's programs.
              </p>
              <ul class="list-unstyled small text-muted mb-4">
                <li><i class="bi bi-check-circle text-success me-1"></i> 18-month job search visa</li>
                <li><i class="bi bi-check-circle text-success me-1"></i> Fast-track EU Blue Card</li>
              </ul>
              <a href="service-details.html?service=germany-opportunity-card" class="btn btn-sm btn-outline-aura mt-auto">View Admissions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: End-to-End Student Visa & Settlement Timeline -->
  <section class="section-space-alt" id="student-timeline">
    <div class="container">
      <div class="text-center section-title-wrap">
        <span class="section-subtitle">Roadmap to Campus</span>
        <h2 class="section-heading">Your 5-Stage Admissions Pathway</h2>
        <p class="text-muted mx-auto" style="max-width: 600px;">
          Our academic counselors assist you through every milestone from course selection to campus landing.
        </p>
      </div>

      <div class="row g-4">
        <div class="col-md-4 col-lg">
          <div class="card-auravisa p-4 text-center h-100">
            <div class="step-number-badge mx-auto">1</div>
            <h5 class="fw-bold mb-2">Profile & Test Prep</h5>
            <p class="text-muted small mb-0">IELTS/TOEFL/PTE mock coaching, GPA equivalency, and university course shortlisting.</p>
          </div>
        </div>
        <div class="col-md-4 col-lg">
          <div class="card-auravisa p-4 text-center h-100">
            <div class="step-number-badge mx-auto">2</div>
            <h5 class="fw-bold mb-2">SOP & Applications</h5>
            <p class="text-muted small mb-0">Custom Statement of Purpose writing, recommendation letters, and scholarship petitions.</p>
          </div>
        </div>
        <div class="col-md-4 col-lg">
          <div class="card-auravisa p-4 text-center h-100">
            <div class="step-number-badge mx-auto">3</div>
            <h5 class="fw-bold mb-2">Offer Letter / I-20</h5>
            <p class="text-muted small mb-0">Acceptance confirmation, scholarship verification, and deposit guidance.</p>
          </div>
        </div>
        <div class="col-md-4 col-lg">
          <div class="card-auravisa p-4 text-center h-100">
            <div class="step-number-badge mx-auto">4</div>
            <h5 class="fw-bold mb-2">Visa Dossier Filing</h5>
            <p class="text-muted small mb-0">Proof of funds, GIC accounts, consular mock interviews, and biometric appointments.</p>
          </div>
        </div>
        <div class="col-md-4 col-lg">
          <div class="card-auravisa p-4 text-center h-100">
            <div class="step-number-badge mx-auto">5</div>
            <h5 class="fw-bold mb-2">Pre-Departure & Landing</h5>
            <p class="text-muted small mb-0">Student housing arrangement, SIM card setup, health insurance, and alumni network intro.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 7: Student Testimonials & Free Counseling CTA -->
  <section class="section-space" id="student-cta-testimonials">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="section-subtitle">Free Student Advisory</span>
          <h2 class="section-heading mb-3">Book Your 1-on-1 University Counseling Session</h2>
          <p class="text-muted mb-4">
            Meet with certified overseas education advisors to review your academic transcripts, discover exclusive institutional fee waivers, and map your post-study career trajectory.
          </p>
          <div class="p-4 bg-surface rounded-4 border shadow-sm mb-4">
            <div class="d-flex align-items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Elena Rostova" class="rounded-circle" style="width: 54px; height: 54px; object-fit: cover;">
              <div>
                <h6 class="fw-bold mb-0">Elena Rostova</h6>
                <small class="text-muted">Master of Data Science, University of British Columbia</small>
              </div>
            </div>
            <p class="text-muted small fst-italic mb-0">
              "AuraVisa helped me secure a $15,000 international excellence entrance award at UBC. My study permit was approved in just 3 weeks with SDS stream!"
            </p>
          </div>
          <div class="d-flex gap-3">
            <a href="contact.html" class="btn btn-primary-aura">Book Counseling Call</a>
            <a href="success-stories.html" class="btn btn-outline-aura">View 500+ Alumni</a>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="p-4 p-lg-5 bg-surface rounded-4 shadow border">
            <h4 class="fw-bold mb-3">Quick Academic Inquiry</h4>
            <form class="needs-validation-aura" novalidate>
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" placeholder="Jane Doe" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" placeholder="jane@example.com" required>
              </div>
              <div class="row g-2 mb-3">
                <div class="col-12 col-sm-6">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-control" placeholder="+1..." required>
                </div>
                <div class="col-12 col-sm-6">
                  <label class="form-label">Target Intake</label>
                  <select class="form-select" required>
                    <option value="fall2026">Fall 2026</option>
                    <option value="spring2027">Spring 2027</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-accent-aura w-100 py-2">
                <i class="bi bi-send-fill me-1"></i> Request Free Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Standard Global Footer -->
  <footer class="footer-auravisa">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <a class="brand-logo mb-3" href="index.html">
            <span class="brand-badge"><i class="bi bi-globe-americas"></i></span>
            <span>Aura<span class="text-warning">Visa</span></span>
          </a>
          <p class="text-muted small mb-4">
            Authorized legal consultancy delivering fiduciary immigration advice for Canada, Australia, UK, and European residency programs.
          </p>
          <div class="d-flex gap-2">
            <a href="https://facebook.com" class="btn btn-sm btn-outline-aura" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="https://twitter.com" class="btn btn-sm btn-outline-aura" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
            <a href="https://linkedin.com" class="btn btn-sm btn-outline-aura" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="https://instagram.com" class="btn btn-sm btn-outline-aura" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          </div>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="fw-bold mb-3 text-uppercase small text-white">Programs</h6>
          <ul class="list-unstyled small d-flex flex-column gap-2 mb-0">
            <li><a href="service-details.html?service=express-entry">Express Entry PR</a></li>
            <li><a href="service-details.html?service=australia-gsm">Australia GSM</a></li>
            <li><a href="service-details.html?service=uk-skilled-worker">UK Skilled Worker</a></li>
            <li><a href="service-details.html?service=germany-opportunity-card">Germany Chancenkarte</a></li>
            <li><a href="service-details.html?service=golden-visa">Golden Visa & Investor</a></li>
          </ul>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="fw-bold mb-3 text-uppercase small text-white">Admissions</h6>
          <ul class="list-unstyled small d-flex flex-column gap-2 mb-0">
            <li><a href="home-2.html#quick-matcher">Course Matcher</a></li>
            <li><a href="home-2.html#scholarships-section">Scholarships</a></li>
            <li><a href="home-2.html#pswp-pr-matrix">Work Rights Matrix</a></li>
            <li><a href="eligibility-checker.html">CRS Calculator</a></li>
            <li><a href="country-guide.html">Country Guide</a></li>
          </ul>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="fw-bold mb-3 text-uppercase small text-white">Company</h6>
          <ul class="list-unstyled small d-flex flex-column gap-2 mb-0">
            <li><a href="about.html">About Counsel</a></li>
            <li><a href="about.html#about-accreditations">Accreditations</a></li>
            <li><a href="pricing.html">Retainers & Fees</a></li>
            <li><a href="success-stories.html">Success Stories</a></li>
            <li><a href="contact.html">Global Chambers</a></li>
          </ul>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="fw-bold mb-3 text-uppercase small text-white">Client Portal</h6>
          <ul class="list-unstyled small d-flex flex-column gap-2 mb-0">
            <li><a href="login.html">Client Sign In</a></li>
            <li><a href="register.html">Account Registration</a></li>
            <li><a href="client-dashboard.html">Case Tracker</a></li>
            <li><a href="client-documents.html">Document Vault</a></li>
            <li><a href="admin-dashboard.html">Admin Operations</a></li>
          </ul>
        </div>
      </div>

      <div class="border-top border-secondary border-opacity-25 mt-5 pt-4 d-flex flex-wrap justify-content-between align-items-center gap-3 small text-muted">
        <div>&copy; 2026 AuraVisa Global Migration Advisory. All rights reserved.</div>
        <div class="d-flex gap-4">
          <a href="privacy.html" class="text-muted text-decoration-none">Privacy Policy</a>
          <a href="terms.html" class="text-muted text-decoration-none">Terms of Representation</a>
          <a href="compliance.html" class="text-muted text-decoration-none">Statutory Compliance</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>`;

fs.writeFileSync('home-2.html', home2Html, 'utf8');
console.log('Successfully wrote redesigned home-2.html!');
