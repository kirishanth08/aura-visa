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
  const forms = document.querySelectorAll('.needs-validation-aura');
  forms.forEach(form => {
    // Exclude dedicated authentication forms that manage their own credential and redirect workflows
    if (form.id === 'registerForm' || form.id === 'loginForm' || form.closest('.auth-card')) {
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        showToast('Please check the required fields.', 'danger');
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
      // Only handle mobile accordion on viewports < 1200px
      if (window.innerWidth >= 1200) return;

      e.preventDefault();
      e.stopPropagation();

      const dropdownParent = this.closest('.dropdown');
      if (!dropdownParent) return;

      const menu = dropdownParent.querySelector('.dropdown-menu');
      if (!menu) return;

      const isCurrentlyOpen = menu.classList.contains('show');

      // Close other dropdown menus in the offcanvas
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

      // Toggle this dropdown menu
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

  // Ensure dropdown items navigate and close the offcanvas cleanly on mobile
  const dropdownItems = document.querySelectorAll('.offcanvas .dropdown-item, .offcanvas .nav-link:not(.dropdown-toggle)');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth >= 1200) return;
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

  // Auto-close offcanvas drawer if window is resized to desktop (>= 1200px)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200) {
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

