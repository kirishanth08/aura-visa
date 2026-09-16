/**
 * AuraVisa Global Immigration & Visa Consultancy - Main Application Script
 * Theme Toggle, RTL Toggle, Interactive Points Calculator, Filters, and Toasts
 */

// Immediate execution on script parse: tag data-auth-status early to prevent button flicker
(function() {
  try {
    if (localStorage.getItem('auravisa_logged_in_user')) {
      document.documentElement.setAttribute('data-auth-status', 'logged-in');
    }
  } catch(e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initPointsCalculator();
  initFilters();
  initFormValidation();
  initTooltips();
  initMobileOffcanvasNav();
  initNavbarAuth();
  initAdmissionsMatcher();
});

/* ==========================================
   Theme Management (Light / Dark Mode)
   ========================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('auravisa-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('auravisa-theme', newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
  });

  // Listen for system theme changes if no manual preference is saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('auravisa-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'bi bi-sun-fill theme-toggle-icon text-warning';
    } else {
      icon.className = 'bi bi-moon-stars-fill theme-toggle-icon text-secondary';
    }
  });
}

/* ==========================================
   RTL (Right-To-Left) Management
   ========================================== */
function initRTL() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const storedDirection = localStorage.getItem('auravisa-dir') || 'ltr';
  
  applyDirection(storedDirection);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem('auravisa-dir', newDir);
      showToast(`Layout orientation: ${newDir.toUpperCase()}`, 'info');
    });
  });
}

function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  const labels = document.querySelectorAll('.rtl-status-badge');
  labels.forEach(el => {
    el.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* ==========================================
   Interactive Points / Eligibility Calculator
   ========================================== */
function initPointsCalculator() {
  const calcForm = document.getElementById('pointsCalculatorForm');
  if (!calcForm) return;

  const scoreDisplay = document.getElementById('calculatedScore');
  const statusBadge = document.getElementById('qualificationStatus');
  const progressBar = document.getElementById('scoreProgressBar');

  function calculatePoints() {
    let score = 0;

    // Age
    const ageSelect = document.getElementById('calcAge');
    if (ageSelect) score += parseInt(ageSelect.value || 0, 10);

    // Education
    const eduSelect = document.getElementById('calcEdu');
    if (eduSelect) score += parseInt(eduSelect.value || 0, 10);

    // Work Experience
    const expSelect = document.getElementById('calcExp');
    if (expSelect) score += parseInt(expSelect.value || 0, 10);

    // Language Proficiency (IELTS / CLB)
    const langSelect = document.getElementById('calcLang');
    if (langSelect) score += parseInt(langSelect.value || 0, 10);

    // Adaptability (Job Offer / Spouse / Family)
    const adaptCheck = document.getElementById('calcAdapt');
    if (adaptCheck && adaptCheck.checked) score += 10;

    // Update UI
    if (scoreDisplay) scoreDisplay.textContent = score;

    if (progressBar) {
      const percentage = Math.min(100, Math.round((score / 100) * 100));
      progressBar.style.width = `${percentage}%`;
      progressBar.setAttribute('aria-valuenow', score);
    }

    if (statusBadge) {
      if (score >= 67) {
        statusBadge.className = 'badge-aura badge-aura-success';
        statusBadge.textContent = 'High Eligibility (Qualified)';
      } else if (score >= 50) {
        statusBadge.className = 'badge-aura badge-aura-warning';
        statusBadge.textContent = 'Moderate (Consultant Review Suggested)';
      } else {
        statusBadge.className = 'badge-aura badge-aura-danger';
        statusBadge.textContent = 'Needs Improvement';
      }
    }
  }

  calcForm.addEventListener('change', calculatePoints);
  calculatePoints(); // Initial run
}

/* ==========================================
   Filter System (Countries, Visas, Articles)
   ========================================== */
function initFilters() {
  // Generic Filter Buttons
  const filterBtns = document.querySelectorAll('[data-filter-target]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetGroup = btn.getAttribute('data-filter-target');
      const filterValue = btn.getAttribute('data-filter-value');
      
      // Active state
      btn.parentElement.querySelectorAll('[data-filter-target]').forEach(b => b.classList.remove('active', 'btn-primary-aura'));
      btn.classList.add('active', 'btn-primary-aura');

      const items = document.querySelectorAll(`[data-filter-group="${targetGroup}"]`);
      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Country / Search Filter Input
  const searchInput = document.getElementById('destinationSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const countryCards = document.querySelectorAll('.country-search-item');
      countryCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================
   Form Handling & Feedback Toasts
   ========================================== */
function initFormValidation() {
  // 1. Strict Phone Sanitization and Live Filtering (No Alphabets Allowed)
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name*="phone" i], input[id*="phone" i]');
  phoneInputs.forEach(input => {
    input.setAttribute('pattern', '^\\+?[0-9\\s\\-\\(\\)]{7,20}$');
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('title', 'Please enter a valid phone number (digits only, e.g. +1 416 555 0199)');

    input.addEventListener('input', () => {
      const sanitized = input.value.replace(/[^\d\s\+\-\(\)]/g, '');
      if (input.value !== sanitized) {
        input.value = sanitized;
      }
    });
  });

  // 2. Strict Email Normalization and Domain Extension Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email" i], input[id*="email" i]');
  emailInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.toLowerCase();
      const val = input.value.trim();
      if (val && !emailRegex.test(val)) {
        if (val.includes('@') && !val.split('@')[1].includes('.')) {
          input.setCustomValidity('Please include a valid domain extension like .com, .org, etc.');
        } else {
          input.setCustomValidity('Please enter a valid email address (e.g. name@domain.com)');
        }
      } else {
        input.setCustomValidity('');
      }
    });

    input.addEventListener('blur', () => {
      input.value = input.value.toLowerCase().trim();
    });
  });

  // 3. Form submission handling
  const forms = document.querySelectorAll('.needs-validation-aura');
  forms.forEach(form => {
    // Exclude dedicated authentication and specialized forms
    if (form.id === 'registerForm' || form.id === 'loginForm' || form.id === 'admissionsToolForm' || form.closest('.auth-card')) {
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let emailValid = true;
      const formEmails = form.querySelectorAll('input[type="email"]');
      formEmails.forEach(emailEl => {
        const val = (emailEl.value || '').trim().toLowerCase();
        emailEl.value = val;
        if (val && !emailRegex.test(val)) {
          emailValid = false;
          emailEl.classList.add('is-invalid');
        } else {
          emailEl.classList.remove('is-invalid');
        }
      });

      let phoneValid = true;
      const formPhones = form.querySelectorAll('input[type="tel"]');
      formPhones.forEach(phoneEl => {
        const val = (phoneEl.value || '').trim();
        const digitsCount = (val.match(/\d/g) || []).length;
        if (/[a-zA-Z]/.test(val) || (val && digitsCount < 7)) {
          phoneValid = false;
          phoneEl.classList.add('is-invalid');
        } else {
          phoneEl.classList.remove('is-invalid');
        }
      });

      if (!form.checkValidity() || !emailValid || !phoneValid) {
        e.stopPropagation();
        form.classList.add('was-validated');
        if (!emailValid) {
          showToast('Please enter a valid email address with a valid domain extension (e.g. name@gmail.com).', 'danger');
        } else if (!phoneValid) {
          showToast('Phone number cannot contain alphabets and must have at least 7 digits.', 'danger');
        } else {
          showToast('Please check all required fields.', 'danger');
        }
      } else {
        form.classList.add('was-validated');
        showToast('Your request has been submitted successfully! An immigration advisor will contact you within 24 hours.', 'success');
        form.reset();
        form.classList.remove('was-validated');
      }
    });
  });
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toastId = 'toast-' + Date.now();
  const bgClass = type === 'success' ? 'text-bg-success' : type === 'danger' ? 'text-bg-danger' : 'text-bg-primary';
  const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';

  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${icon}"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);
  const toastElement = document.getElementById(toastId);
  if (window.bootstrap && bootstrap.Toast) {
    const bsToast = new bootstrap.Toast(toastElement, { delay: 4000 });
    bsToast.show();
    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
  } else {
    setTimeout(() => toastElement.remove(), 4000);
  }
}

function initTooltips() {
  if (window.bootstrap && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }
}

/* ==========================================
   Mobile Offcanvas Navigation & Dropdown Accordions
   ========================================== */
function initMobileOffcanvasNav() {
  const dropdownToggles = document.querySelectorAll('.offcanvas .dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth >= 992) return;

      e.preventDefault();
      e.stopPropagation();

      const dropdownParent = this.closest('.dropdown');
      if (!dropdownParent) return;

      const menu = dropdownParent.querySelector('.dropdown-menu');
      if (!menu) return;

      const isCurrentlyOpen = menu.classList.contains('show');

      document.querySelectorAll('.offcanvas .dropdown-menu.show').forEach(openMenu => {
        if (openMenu !== menu) {
          openMenu.classList.remove('show');
          const siblingToggle = openMenu.closest('.dropdown')?.querySelector('.dropdown-toggle');
          if (siblingToggle) {
            siblingToggle.classList.remove('show');
            siblingToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });

      if (isCurrentlyOpen) {
        menu.classList.remove('show');
        this.classList.remove('show');
        this.setAttribute('aria-expanded', 'false');
      } else {
        menu.classList.add('show');
        this.classList.add('show');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const dropdownItems = document.querySelectorAll('.offcanvas .dropdown-item, .offcanvas .nav-link:not(.dropdown-toggle)');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth >= 992) return;
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const offcanvasEl = document.getElementById('offcanvasNavbar');
        if (offcanvasEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (bsOffcanvas) bsOffcanvas.hide();
        }
      }
    });
  });

  // Live Section Search in Mobile Drawer
  const offcanvasSearchInput = document.getElementById('offcanvasSearchInput');
  const quickLinks = [
    { name: 'Home - Global Migration', href: 'index.html', desc: 'PR pathways, points & destinations' },
    { name: 'Home - Study Abroad', href: 'home-2.html', desc: 'University programs & course matcher' },
    { name: 'Intelligent Admissions Tool', href: 'home-2.html#quick-matcher', desc: 'Instant course and country matcher' },
    { name: 'All Visa Services', href: 'services.html', desc: 'Skilled worker, study, investor & family' },
    { name: 'Canada Express Entry', href: 'service-details.html?service=express-entry', desc: 'CRS calculation & PR filing' },
    { name: 'Australia GSM (Subclass 189/190)', href: 'service-details.html?service=australia-gsm', desc: 'Skills assessment & SkillSelect' },
    { name: 'UK Skilled Worker', href: 'service-details.html?service=uk-skilled-worker', desc: 'Sponsorship license & ILR' },
    { name: 'Germany Opportunity Card', href: 'service-details.html?service=germany-opportunity-card', desc: 'Chancenkarte & zero-tuition universities' },
    { name: 'Pricing & Retainer Plans', href: 'pricing.html', desc: 'Standard & VIP milestone plans' },
    { name: 'Points Calculator', href: 'eligibility-checker.html', desc: 'Check eligibility score instantly' },
    { name: 'About & Regulatory Compliance', href: 'about.html#about-accreditations', desc: 'CICC, MARA & OISC certified counsel' },
    { name: 'Registered Office Locations', href: 'contact.html#branch-directory', desc: 'Toronto, London, Sydney & Dubai' },
    { name: 'Client Case Portal', href: 'client-dashboard.html', desc: 'Track application milestones & documents' },
    { name: 'Admin Operations Dashboard', href: 'admin-dashboard.html', desc: 'Case officer console & security' }
  ];

  if (offcanvasSearchInput) {
    const resultsContainer = document.getElementById('offcanvasSearchResults');
    offcanvasSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!resultsContainer) return;

      if (!q) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.add('d-none');
        return;
      }

      const matches = quickLinks.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = '<div class="p-2 text-muted small"><i class="bi bi-search me-1"></i>No matching sections found</div>';
      } else {
        resultsContainer.innerHTML = matches.slice(0, 5).map(m => `
          <a href="${m.href}" class="d-block p-2 rounded text-decoration-none border-bottom bg-surface mb-1">
            <div class="fw-bold small text-primary">${m.name}</div>
            <div class="text-muted" style="font-size: 0.78rem;">${m.desc}</div>
          </a>
        `).join('');
      }
      resultsContainer.classList.remove('d-none');
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      const offcanvasEl = document.getElementById('offcanvasNavbar');
      if (offcanvasEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      }
      document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    }
  });
}

/* ==========================================
   Intelligent Admissions & Course Matching Engine
   ========================================== */
function initAdmissionsMatcher() {
  const form = document.getElementById('admissionsToolForm');
  const resultsContainer = document.getElementById('admissionsResultsContainer');
  if (!form || !resultsContainer) return;

  const samplePrograms = {
    'ca': [
      { uni: 'University of Toronto', degree: "Master of Science in Computer Science & AI", tuition: '$29,400 CAD/yr', duration: '2 Years', scholarship: 'Up to $10,000 Entrance Award', workRights: '3-Year Post-Graduation Work Permit (PGWP) • Direct PR pathway', badge: 'Top Canadian University' },
      { uni: 'University of British Columbia (UBC)', degree: "Master of Business Administration (MBA) / Tech Management", tuition: '$34,200 CAD/yr', duration: '16 Months', scholarship: '$8,500 Global Merit Fellowship', workRights: '3-Year PGWP • Fast-Track BC PNP Tech Stream', badge: 'Top Tier Research' },
      { uni: 'McGill University', degree: "B.Eng / M.Eng Software & Systems Engineering", tuition: '$27,800 CAD/yr', duration: '2 Years', scholarship: '$5,000 Dean\'s Honor Scholarship', workRights: '3-Year PGWP • Quebec PEQ Eligible', badge: 'World Ranked #30' }
    ],
    'uk': [
      { uni: 'Imperial College London', degree: "M.Sc. in Advanced Computing & Machine Learning", tuition: '£38,500 GBP', duration: '1 Year (Accelerated)', scholarship: '£12,000 Vice-Chancellor Scholarship', workRights: '2-Year UK Graduate Route post-study work visa', badge: 'Russell Group Elite' },
      { uni: 'University of Manchester', degree: "M.Sc. in International Business Management", tuition: '£31,000 GBP', duration: '1 Year', scholarship: '£6,000 Merit Award', workRights: '2-Year Graduate Route • Pathway to Skilled Worker ILR', badge: 'Top Employer Target' },
      { uni: 'University of Edinburgh', degree: "M.Sc. in Data Science & Artificial Intelligence", tuition: '£35,000 GBP', duration: '1 Year', scholarship: '£7,500 Edinburgh Global Scholarship', workRights: '2-Year Graduate Route Visa', badge: 'World Top 25' }
    ],
    'au': [
      { uni: 'University of Melbourne', degree: "Master of Information Technology / Data Science", tuition: '$48,000 AUD/yr', duration: '2 Years', scholarship: '$10,000 International Merit Scholarship', workRights: 'Up to 4-Year Temporary Graduate Subclass 485 Visa', badge: 'Group of Eight #1' },
      { uni: 'University of Sydney', degree: "Master of Professional Engineering & Robotics", tuition: '$49,500 AUD/yr', duration: '2 Years', scholarship: '20% Tuition Fee Reduction', workRights: '4-Year Post-Study Visa • NSW 190 PR Points Advantage', badge: 'Group of Eight' },
      { uni: 'UNSW Sydney', degree: "Master of Commerce / Business Analytics", tuition: '$46,000 AUD/yr', duration: '1.5-2 Years', scholarship: '$10,000 Academic Excellence Award', workRights: '4-Year Subclass 485 Work Authorization', badge: 'Top Tech Campus' }
    ],
    'de': [
      { uni: 'Technical University of Munich (TUM)', degree: "M.Sc. in Informatics / Artificial Intelligence", tuition: '€0 Tuition (Nominal €150/sem fee)', duration: '2 Years', scholarship: 'DAAD Monthly Living Stipend Available', workRights: '18-Month Job Search Residence Visa • Fast-Track EU Blue Card', badge: 'German Excellence Uni' },
      { uni: 'RWTH Aachen University', degree: "M.Sc. in Computer Aided Mechanical Engineering", tuition: '€0 Tuition (Zero State Tuition Fee)', duration: '2 Years', scholarship: 'Erasmus+ Research Grant Eligible', workRights: '18-Month Job Search Visa • High German Engineering Wages', badge: 'Europe\'s Leading Tech' },
      { uni: 'Heidelberg University', degree: "Master in International Healthcare & Biomedical Sciences", tuition: '€1,500 EUR/sem', duration: '2 Years', scholarship: 'Baden-Württemberg Merit Grant', workRights: '18-Month Post-Study Visa • EU Settlement', badge: 'Historic Top Tier' }
    ],
    'us': [
      { uni: 'Northeastern University', degree: "M.S. in Computer Science & AI (Co-op Program)", tuition: '$32,000 USD/yr', duration: '2 Years', scholarship: '$10,000 Dean\'s Scholarship', workRights: '3-Year STEM OPT Work Authorization in USA', badge: 'Top Industry Co-op' },
      { uni: 'University of Southern California (USC)', degree: "M.S. in Engineering & Data Analytics", tuition: '$38,000 USD/yr', duration: '2 Years', scholarship: '$12,000 Global Scholar Grant', workRights: '36-Month STEM OPT • H-1B Cap Exempt/Corporate Routes', badge: 'Tier 1 Research' }
    ]
  };

  function executeSearch(e) {
    if (e) e.preventDefault();

    const degreeSelect = form.querySelector('[name="degreeLevel"], select:nth-of-type(1)');
    const fieldSelect = form.querySelector('[name="fieldOfInterest"], select:nth-of-type(2)');
    const countrySelect = form.querySelector('[name="targetCountry"], select:nth-of-type(3)');

    const countryVal = countrySelect && countrySelect.value ? countrySelect.value : 'ca';
    const degreeText = degreeSelect && degreeSelect.selectedIndex > 0 ? degreeSelect.options[degreeSelect.selectedIndex].text : 'Degree Program';
    const fieldText = fieldSelect && fieldSelect.selectedIndex > 0 ? fieldSelect.options[fieldSelect.selectedIndex].text : 'Selected Field';

    const programs = samplePrograms[countryVal] || samplePrograms['ca'];

    resultsContainer.innerHTML = `
      <div class="mt-4 pt-4 border-top">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <span class="badge-aura badge-aura-success mb-1"><i class="bi bi-check-circle-fill me-1"></i> ${programs.length} Programs Matched</span>
            <h3 class="fs-4 fw-bold mb-0">Eligible University Programs & Scholarships</h3>
            <p class="text-muted small mb-0">Showing verified direct admission options for <strong>${fieldText}</strong> (${degreeText})</p>
          </div>
          <a href="#quick-matcher" class="btn btn-sm btn-outline-aura mt-2 mt-sm-0"><i class="bi bi-arrow-repeat me-1"></i> Modify Filter</a>
        </div>
        <div class="row g-3">
          ${programs.map(p => `
            <div class="col-md-4">
              <div class="card-auravisa p-3 h-100 d-flex flex-column border shadow-sm">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge bg-primary-subtle text-primary border border-primary-subtle small">${p.badge}</span>
                  <span class="badge bg-success-subtle text-success small"><i class="bi bi-award-fill me-1"></i>Verified</span>
                </div>
                <h5 class="fw-bold text-primary mb-1">${p.uni}</h5>
                <div class="fw-semibold text-main small mb-2">${p.degree}</div>
                <div class="small text-muted mb-2">
                  <div><i class="bi bi-clock me-1 text-secondary"></i> Duration: <strong>${p.duration}</strong></div>
                  <div><i class="bi bi-cash-stack me-1 text-success"></i> Tuition: <strong>${p.tuition}</strong></div>
                  <div><i class="bi bi-gift me-1 text-warning"></i> ${p.scholarship}</div>
                </div>
                <div class="p-2 bg-alt rounded small text-muted mb-3 flex-grow-1" style="font-size: 0.82rem;">
                  <i class="bi bi-briefcase-fill text-primary me-1"></i> <strong>Work Rights:</strong> ${p.workRights}
                </div>
                <a href="service-details.html?service=student-permits" class="btn btn-sm btn-primary-aura w-100 mt-auto">
                  <i class="bi bi-send-check me-1"></i> Apply with AuraVisa
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    resultsContainer.classList.remove('d-none');
    showToast(`Found ${programs.length} eligible academic programs!`, 'success');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('submit', executeSearch);
}

/* ==========================================
   Navbar Authentication State & Avatar Menu
   ========================================== */
function initNavbarAuth() {
  const stored = localStorage.getItem('auravisa_logged_in_user');
  let user = null;
  if (stored) {
    try {
      user = JSON.parse(stored);
    } catch(e) {
      user = null;
    }
  }

  const isUserLoggedIn = Boolean(user && user.email);

  // Set global CSS flags for instant attribute-based hiding
  if (isUserLoggedIn) {
    document.documentElement.setAttribute('data-auth-status', 'logged-in');
    if (document.body) document.body.classList.add('user-logged-in');
  } else {
    document.documentElement.removeAttribute('data-auth-status');
    if (document.body) document.body.classList.remove('user-logged-in');
  }

  // Find all auth links inside headers and navbars across the entire page
  const allNavLoginLinks = document.querySelectorAll('header a[href*="login.html"], .navbar a[href*="login.html"]');
  const allNavRegisterLinks = document.querySelectorAll('header a[href*="register.html"], .navbar a[href*="register.html"]');

  if (isUserLoggedIn) {
    // 1. Force Login and Sign Up buttons to disappear completely
    allNavLoginLinks.forEach(link => {
      link.classList.add('d-none');
      link.style.setProperty('display', 'none', 'important');
    });

    allNavRegisterLinks.forEach(link => {
      link.classList.add('d-none');
      link.style.setProperty('display', 'none', 'important');
    });

    // 2. Mount profile avatar dropdown in the action container
    const displayName = user.name || user.email.split('@')[0];
    const initial = displayName.charAt(0).toUpperCase();

    const actionContainers = new Set();
    allNavLoginLinks.forEach(link => {
      const container = link.closest('.d-flex') || link.parentElement;
      if (container) actionContainers.add(container);
    });

    actionContainers.forEach(parentContainer => {
      let profileDropdown = parentContainer.querySelector('.navbar-user-dropdown');

      if (!profileDropdown) {
        profileDropdown = document.createElement('div');
        profileDropdown.className = 'dropdown navbar-user-dropdown';
        profileDropdown.innerHTML = `
          <button class="btn btn-sm btn-outline-aura d-flex align-items-center gap-2 dropdown-toggle px-2 py-1 shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="navbarUserDropdownBtn-${Math.random().toString(36).substring(2, 7)}">
            <span class="avatar-circle-sm">${initial}</span>
            <span class="small fw-semibold text-truncate d-inline-block" style="max-width: 120px;">${displayName}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 py-2 mt-2" aria-labelledby="navbarUserDropdownBtn" style="min-width: 220px; z-index: 1080;">
            <li class="px-3 py-2 border-bottom">
              <div class="fw-bold small text-truncate"><i class="bi bi-shield-check text-success me-1"></i>${displayName}</div>
              <div class="text-muted text-truncate" style="font-size: 0.75rem;">${user.email}</div>
            </li>
            <li><a class="dropdown-item py-2 small" href="client-dashboard.html"><i class="bi bi-speedometer2 me-2 text-primary"></i>User Dashboard</a></li>
            <li><a class="dropdown-item py-2 small" href="client-profile.html"><i class="bi bi-person-gear me-2 text-secondary"></i>My Profile</a></li>
            <li><a class="dropdown-item py-2 small" href="client-documents.html"><i class="bi bi-folder-check me-2 text-info"></i>Dossier & Documents</a></li>
            <li><hr class="dropdown-divider my-1"></li>
            <li><button class="dropdown-item py-2 small text-danger fw-semibold navbar-logout-btn" type="button"><i class="bi bi-box-arrow-right me-2"></i>Logout</button></li>
          </ul>
        `;
        parentContainer.appendChild(profileDropdown);

        // Bind logout click
        const logoutBtn = profileDropdown.querySelector('.navbar-logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('auravisa_logged_in_user');
            if (typeof showToast === 'function') {
              showToast('You have been logged out successfully.', 'info');
            }
            initNavbarAuth();

            const greeting = document.getElementById('clientGreeting');
            if (greeting) {
              greeting.textContent = 'Welcome back, Applicant';
            }
          });
        }
      } else {
        const nameSpan = profileDropdown.querySelector('.small.fw-semibold');
        const initialSpan = profileDropdown.querySelector('.avatar-circle-sm');
        if (nameSpan) nameSpan.textContent = displayName;
        if (initialSpan) initialSpan.textContent = initial;
        profileDropdown.classList.remove('d-none');
        profileDropdown.style.removeProperty('display');
      }
    });
  } else {
    // User is logged out: restore Login & Sign Up buttons and hide avatar dropdown
    allNavLoginLinks.forEach(link => {
      link.classList.remove('d-none');
      link.style.removeProperty('display');
    });

    allNavRegisterLinks.forEach(link => {
      link.classList.remove('d-none');
      link.style.removeProperty('display');
    });

    document.querySelectorAll('.navbar-user-dropdown').forEach(dropdown => {
      dropdown.classList.add('d-none');
      dropdown.style.setProperty('display', 'none', 'important');
    });
  }
}

