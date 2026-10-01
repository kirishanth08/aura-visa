const fs = require('fs');

// 1. Add dashboard-header CSS to style.css if not present
let css = fs.readFileSync('assets/css/style.css', 'utf8');

const dashboardHeaderCss = `
/* ==========================================
   Specialized Dashboard Header Architecture
   Clean, purpose-built topbar without marketing links
   ========================================== */
.dashboard-header {
  background-color: #0b1b3d !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
  padding: 0.65rem 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 1030 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
}

[data-bs-theme="dark"] .dashboard-header {
  background-color: #080c14 !important;
  border-bottom: 1px solid #1e293b !important;
}

.dashboard-header-brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.dashboard-case-chip {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #e2e8f0;
  border-radius: var(--radius-md);
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

[data-bs-theme="dark"] .dashboard-case-chip {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

.dashboard-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
`;

if (!css.includes('.dashboard-header {')) {
  css += '\n' + dashboardHeaderCss;
  fs.writeFileSync('assets/css/style.css', css, 'utf8');
  console.log('Added .dashboard-header CSS to assets/css/style.css');
}

// 2. Client pages to update
const clientPages = [
  'client-dashboard.html',
  'client-application-details.html',
  'client-documents.html',
  'client-appointments.html',
  'client-payments.html',
  'client-profile.html'
];

const newDashboardHeaderHtml = `  <!-- Specialized Dashboard Header (Replaces Public Marketing Navbar) -->
  <header class="dashboard-header sticky-top">
    <div class="dashboard-header-brand">
      <a class="brand-logo" href="index.html">
        <span class="brand-badge"><i class="bi bi-globe-americas"></i></span>
        <span>Aura<span class="text-warning">Visa</span></span>
      </a>
      <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 rounded-pill small d-none d-md-inline-flex align-items-center gap-1">
        <i class="bi bi-shield-check text-success"></i> Client Portal
      </span>
      <div class="dashboard-case-chip d-none d-lg-inline-flex">
        <i class="bi bi-folder2 text-warning"></i>
        <span>File: <strong>#AV-2026-8942</strong> (Canada FSW)</span>
      </div>
    </div>

    <!-- Center Quick Status Pill on Desktop -->
    <div class="d-none d-xl-flex align-items-center gap-2 px-3 py-1 bg-surface rounded-pill border small">
      <span class="badge bg-success-subtle text-success p-1 px-2 rounded-pill"><i class="bi bi-check-circle-fill me-1"></i>Active Representation</span>
      <span class="text-muted">Lead Attorney: <strong>Jonathan Vance, KC</strong></span>
    </div>

    <!-- Header Action Tools: Main Site Link, Notifications, Theme, User Profile -->
    <div class="dashboard-header-actions">
      <!-- Return to Main Site Button -->
      <a href="index.html" class="btn btn-sm btn-outline-aura d-inline-flex align-items-center gap-1 px-2 py-1" title="Return to AuraVisa Main Website">
        <i class="bi bi-globe me-1"></i><span class="d-none d-sm-inline">Main Website</span>
      </a>

      <!-- RTL Toggle -->
      <button class="btn btn-sm btn-outline-aura rtl-toggle-btn px-2 py-1 d-none d-md-inline-flex" type="button" title="Toggle RTL orientation">
        <span class="rtl-status-badge">RTL</span>
      </button>

      <!-- Theme Toggle -->
      <button class="btn btn-sm btn-outline-aura theme-toggle-btn px-2 py-1" type="button" title="Toggle Light / Dark mode" aria-label="Toggle theme">
        <i class="bi bi-moon-stars-fill theme-toggle-icon"></i>
      </button>

      <!-- Notifications Bell Dropdown -->
      <div class="dropdown">
        <button class="btn btn-sm btn-outline-aura px-2 py-1 position-relative" type="button" id="dashboardNotifDropdown" data-bs-toggle="dropdown" aria-expanded="false" title="Notifications">
          <i class="bi bi-bell-fill"></i>
          <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span class="visually-hidden">New alerts</span>
          </span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 py-2 mt-2" aria-labelledby="dashboardNotifDropdown" style="min-width: 290px;">
          <li class="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
            <span class="fw-bold small">Case Notifications</span>
            <span class="badge bg-primary-subtle text-primary" style="font-size: 0.7rem;">2 New</span>
          </li>
          <li>
            <a class="dropdown-item py-2 small d-flex gap-2 align-items-start" href="client-application-details.html">
              <i class="bi bi-file-earmark-check text-success fs-6 mt-1"></i>
              <div>
                <div class="fw-semibold">ECA Assessment Verified</div>
                <div class="text-muted" style="font-size: 0.75rem;">WES equivalency confirmed: Master's Degree</div>
              </div>
            </a>
          </li>
          <li>
            <a class="dropdown-item py-2 small d-flex gap-2 align-items-start" href="client-appointments.html">
              <i class="bi bi-calendar-event text-primary fs-6 mt-1"></i>
              <div>
                <div class="fw-semibold">Counsel Video Call Booked</div>
                <div class="text-muted" style="font-size: 0.75rem;">Oct 4 at 14:00 EST with Lead Counsel</div>
              </div>
            </a>
          </li>
          <li><hr class="dropdown-divider my-1"></li>
          <li><a class="dropdown-item py-1 small text-center text-primary" href="client-application-details.html">View All File History</a></li>
        </ul>
      </div>

      <!-- User Account Dropdown -->
      <div class="dropdown">
        <button class="btn btn-sm btn-outline-aura d-flex align-items-center gap-2 dropdown-toggle px-2 py-1 shadow-none" type="button" id="dashboardUserDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="avatar-circle-sm bg-primary text-white" style="width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem; font-weight: 700;">SC</span>
          <span class="small fw-semibold text-truncate d-none d-sm-inline-block text-white" style="max-width: 100px;">Sarah Chen</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 py-2 mt-2" aria-labelledby="dashboardUserDropdown" style="min-width: 230px;">
          <li class="px-3 py-2 border-bottom">
            <div class="fw-bold small text-truncate"><i class="bi bi-shield-check text-success me-1"></i>Sarah Chen</div>
            <div class="text-muted text-truncate" style="font-size: 0.75rem;">sarah.chen@example.com</div>
            <div class="badge bg-success-subtle text-success mt-1" style="font-size: 0.7rem;">Active Client • FSW Dossier</div>
          </li>
          <li><a class="dropdown-item py-2 small" href="client-dashboard.html"><i class="bi bi-speedometer2 me-2 text-primary"></i>Overview</a></li>
          <li><a class="dropdown-item py-2 small" href="client-application-details.html"><i class="bi bi-folder2-open me-2 text-primary"></i>Application File</a></li>
          <li><a class="dropdown-item py-2 small" href="client-documents.html"><i class="bi bi-file-earmark-arrow-up me-2 text-info"></i>Document Vault</a></li>
          <li><a class="dropdown-item py-2 small" href="client-appointments.html"><i class="bi bi-calendar-event me-2 text-warning"></i>Consultations</a></li>
          <li><a class="dropdown-item py-2 small" href="client-payments.html"><i class="bi bi-credit-card me-2 text-success"></i>Invoices & Retainers</a></li>
          <li><a class="dropdown-item py-2 small" href="client-profile.html"><i class="bi bi-person-gear me-2 text-secondary"></i>Profile Settings</a></li>
          <li><hr class="dropdown-divider my-1"></li>
          <li><a class="dropdown-item py-2 small" href="index.html"><i class="bi bi-box-arrow-left me-2 text-secondary"></i>Back to Main Website</a></li>
          <li><button class="dropdown-item py-2 small text-danger fw-semibold navbar-logout-btn" type="button"><i class="bi bi-box-arrow-right me-2"></i>Sign Out</button></li>
        </ul>
      </div>
    </div>
  </header>`;

clientPages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  // Match the entire <header class="sticky-top">...</header>
  const headerRegex = /<!--\s*Main Header & Navbar[\s\S]*?<\/header>/;

  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, newDashboardHeaderHtml);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated dashboard header in: ${file}`);
  } else {
    // Try matching plain <header class="sticky-top">...<\/header>
    const fallbackHeaderRegex = /<header class="sticky-top">[\s\S]*?<\/header>/;
    if (fallbackHeaderRegex.test(content)) {
      content = content.replace(fallbackHeaderRegex, newDashboardHeaderHtml);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated dashboard header (fallback) in: ${file}`);
    } else {
      console.log(`Could not find header in: ${file}`);
    }
  }
});
