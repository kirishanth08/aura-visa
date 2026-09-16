/**
 * AuraVisa - Comprehensive Dashboard Interactivity Engine
 * Provides live search, filtering, modal inspections, row actions, status updates, and interactive feedback
 */

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    initAdminAuthProtection();
    initDashboardSearchAndFilters();
    initDashboardRowActions();
    initDashboardModals();
    initDashboardButtons();
    initConsultationAndReplyHandlers();
  });

  /**
   * 0. Admin Passcode Security Gatekeeper
   * Enforces master password verification on all admin-*.html operations consoles
   */
  function initAdminAuthProtection() {
    const isLocalAdminPage = window.location.pathname.toLowerCase().includes('admin-');
    if (!isLocalAdminPage) return;

    const isAdminAuthenticated = sessionStorage.getItem('auravisa_admin_authenticated') === 'true';

    // If not authenticated, hide content and show passcode challenge
    if (!isAdminAuthenticated) {
      document.body.style.overflow = 'hidden';
      
      const overlay = document.createElement('div');
      overlay.id = 'adminAuthOverlay';
      overlay.className = 'admin-auth-overlay';
      overlay.innerHTML = `
        <div class="admin-auth-card">
          <div class="admin-auth-shield">
            <i class="bi bi-shield-lock-fill"></i>
          </div>
          <h3 class="fs-4 fw-bold mb-1">Admin Security Console</h3>
          <p class="text-muted small mb-4">Restricted legal operations console. Please enter the master administrative passcode to proceed.</p>
          
          <form id="adminPasscodeForm" class="mb-3">
            <div class="mb-3 text-start">
              <label class="form-label small fw-semibold text-muted" for="adminPasscodeInput">Administrative Passcode</label>
              <div class="input-group">
                <span class="input-group-text bg-alt border-end-0"><i class="bi bi-key text-muted"></i></span>
                <input type="password" id="adminPasscodeInput" class="form-control border-start-0 border-end-0" placeholder="Enter admin passcode" required autofocus autocomplete="current-password">
                <button class="btn btn-outline-secondary border-start-0 bg-transparent" type="button" id="toggleAdminPassBtn">
                  <i class="bi bi-eye text-muted" id="toggleAdminPassIcon"></i>
                </button>
              </div>
              <div id="adminPassError" class="text-danger small mt-2 d-none">
                <i class="bi bi-exclamation-circle-fill me-1"></i> Incorrect passcode. (Default: <code>admin123</code>)
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary-aura w-100 py-2 fw-semibold mb-2">
              <i class="bi bi-unlock-fill me-1"></i> Authenticate & Unlock
            </button>
            <a href="index.html" class="btn btn-sm btn-outline-aura w-100">
              <i class="bi bi-arrow-left me-1"></i> Return to Public Site
            </a>
          </form>

          <div class="p-2 bg-alt rounded small text-muted border mt-3" style="font-size: 0.8rem;">
            <i class="bi bi-info-circle text-primary me-1"></i> Authorized Passcode: <strong>admin123</strong>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      const passInput = document.getElementById('adminPasscodeInput');
      const passForm = document.getElementById('adminPasscodeForm');
      const errorMsg = document.getElementById('adminPassError');
      const toggleBtn = document.getElementById('toggleAdminPassBtn');
      const toggleIcon = document.getElementById('toggleAdminPassIcon');

      if (toggleBtn && passInput) {
        toggleBtn.addEventListener('click', () => {
          if (passInput.type === 'password') {
            passInput.type = 'text';
            toggleIcon.className = 'bi bi-eye-slash text-warning';
          } else {
            passInput.type = 'password';
            toggleIcon.className = 'bi bi-eye text-muted';
          }
        });
      }

      if (passForm) {
        passForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const entered = (passInput.value || '').trim();

          // Accepted authorized passcodes
          if (entered === 'admin123' || entered === 'auravisa2026' || entered === 'admin') {
            sessionStorage.setItem('auravisa_admin_authenticated', 'true');
            overlay.remove();
            document.body.style.removeProperty('overflow');
            if (typeof showToast === 'function') {
              showToast('Admin access granted. Welcome to Case Management Console.', 'success');
            }
          } else {
            errorMsg.classList.remove('d-none');
            passInput.classList.add('is-invalid');
            passInput.value = '';
            passInput.focus();
          }
        });
      }
    }

    addAdminLockControl();
  }

  function addAdminLockControl() {
    const adminActionArea = document.querySelector('.navbar-auravisa .d-flex.align-items-center.gap-2:not(.d-xl-none):not(.d-lg-none)');
    if (adminActionArea && !document.getElementById('adminLockBtn')) {
      const lockBtn = document.createElement('button');
      lockBtn.id = 'adminLockBtn';
      lockBtn.className = 'btn btn-sm btn-outline-danger ms-1';
      lockBtn.innerHTML = '<i class="bi bi-lock-fill me-1"></i>Lock Admin';
      lockBtn.title = 'Lock Admin Console & Terminate Session';
      lockBtn.addEventListener('click', () => {
        sessionStorage.removeItem('auravisa_admin_authenticated');
        window.location.href = 'index.html';
      });
      adminActionArea.prepend(lockBtn);
    }
  }

  /**
   * 1. Live Real-time Table Search and Filter System
   */
  function initDashboardSearchAndFilters() {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search" i], input[type="search"], #userSearchInput, #applicationSearchInput, input[placeholder*="#AV" i]');
    
    searchInputs.forEach(input => {
      input.addEventListener('input', () => {
        filterCurrentTable(input);
      });
    });

    const filterSelects = document.querySelectorAll('select.form-select');
    filterSelects.forEach(select => {
      select.addEventListener('change', () => {
        filterCurrentTable(select);
      });
    });

    const filterBtns = document.querySelectorAll('button:has(.bi-funnel), button[type="button"].btn-primary-aura, button.btn-primary-aura');
    filterBtns.forEach(btn => {
      const text = btn.textContent.toLowerCase().trim();
      if (text.includes('filter') || text.includes('search')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          filterCurrentTable(btn);
          if (typeof showToast === 'function') {
            showToast('Table filter parameters applied successfully', 'info');
          }
        });
      }
    });
  }

  function filterCurrentTable(triggerEl) {
    const cardOrSection = triggerEl.closest('section') || triggerEl.closest('.p-4') || document;
    const searchInput = cardOrSection.querySelector('input[placeholder*="Search" i], input[placeholder*="#AV" i], input[type="text"]');
    const select = cardOrSection.querySelector('select.form-select');
    
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const filterVal = select && select.value && !select.value.toLowerCase().includes('all') ? select.value.toLowerCase().trim() : '';

    const tables = document.querySelectorAll('.table-auravisa, .table');
    tables.forEach(table => {
      const rows = table.querySelectorAll('tbody tr:not(.no-results-row)');
      let matchCount = 0;

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matchesQuery = !query || text.includes(query);
        const matchesFilter = !filterVal || text.includes(filterVal);

        if (matchesQuery && matchesFilter) {
          row.style.display = '';
          matchCount++;
        } else {
          row.style.display = 'none';
        }
      });

      // Handle "No matching records" placeholder
      let emptyRow = table.querySelector('.no-results-row');
      if (matchCount === 0 && rows.length > 0) {
        if (!emptyRow) {
          const colCount = table.querySelectorAll('thead th').length || 5;
          emptyRow = document.createElement('tr');
          emptyRow.className = 'no-results-row text-center py-4';
          emptyRow.innerHTML = `<td colspan="${colCount}" class="text-muted py-4"><i class="bi bi-search me-2"></i>No matching records found matching criteria</td>`;
          table.querySelector('tbody').appendChild(emptyRow);
        }
        emptyRow.style.display = '';
      } else if (emptyRow) {
        emptyRow.style.display = 'none';
      }
    });
  }

  /**
   * 2. Interactive Row Actions: Modals, Status Updates, Deletes, Downloads
   */
  function initDashboardRowActions() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a.btn, .action-btn, a[href="#"]');
      if (!target) return;

      const text = target.textContent.trim().toLowerCase();
      const row = target.closest('tr');

      const href = target.getAttribute('href');
      const isAnchorPlaceholder = href === '#' || href === '' || href.startsWith('javascript:');

      // A. Audit / Manage / Review / View Details Action
      if (text.includes('audit') || text.includes('manage') || (text.includes('review') && !text.includes('pool')) || text.includes('details') || target.querySelector('.bi-eye, .bi-folder2-open')) {
        if (isAnchorPlaceholder || target.tagName === 'BUTTON') {
          e.preventDefault();
          openCaseDetailsModal(row || target);
          return;
        }
      }

      // B. Approve Action
      if (text.includes('approve') || target.querySelector('.bi-check, .bi-check2, .bi-check-lg')) {
        e.preventDefault();
        if (row) {
          const badge = row.querySelector('.badge-aura, .badge');
          if (badge) {
            badge.className = 'badge-aura badge-aura-success';
            badge.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Approved';
          }
        }
        if (typeof showToast === 'function') {
          showToast('Application approved successfully! Next statutory stage unlocked.', 'success');
        }
        return;
      }

      // C. Reject / Decline Action
      if (text.includes('reject') || text.includes('decline') || target.querySelector('.bi-x-lg, .bi-x-circle')) {
        e.preventDefault();
        if (row) {
          const badge = row.querySelector('.badge-aura, .badge');
          if (badge) {
            badge.className = 'badge-aura badge-aura-danger';
            badge.innerHTML = '<i class="bi bi-x-circle-fill me-1"></i> Refused / Escalated';
          }
        }
        if (typeof showToast === 'function') {
          showToast('Application marked as refused. Escalation notice sent to assigned counsel.', 'danger');
        }
        return;
      }

      // D. Download Action & PDF Links
      if (text.includes('download') || text.includes('pdf') || target.querySelector('.bi-download, .bi-file-earmark-pdf')) {
        e.preventDefault();
        const itemName = row ? (row.querySelector('td:nth-child(2), td:nth-child(1), strong')?.textContent.trim() || 'Document') : 'Dossier';
        const cleanName = itemName.split('\n')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
        if (typeof showToast === 'function') {
          showToast(`Generating secure 256-bit TLS download for ${cleanName}.pdf...`, 'info');
          setTimeout(() => {
            showToast(`${cleanName}.pdf download complete!`, 'success');
          }, 1200);
        }
        return;
      }

      // E. Delete / Archive Action
      if (text.includes('delete') || text.includes('remove') || target.querySelector('.bi-trash, .bi-trash3')) {
        e.preventDefault();
        if (row) {
          row.style.transition = 'all 0.3s ease';
          row.style.opacity = '0.2';
          row.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
          setTimeout(() => {
            row.remove();
            if (typeof showToast === 'function') {
              showToast('Record deleted successfully from legal database', 'info');
            }
          }, 350);
        }
        return;
      }

      // F. Edit Action
      if (text.includes('edit') || target.querySelector('.bi-pencil, .bi-pencil-square')) {
        e.preventDefault();
        openEditModal(row || target);
        return;
      }

      // G. Join Meeting / Join Zoom Room
      if (text.includes('join meeting') || text.includes('join zoom') || target.querySelector('.bi-camera-video')) {
        e.preventDefault();
        openConsultationModal(row || target);
        return;
      }

      // H. Reply to Message
      if (text.includes('reply') || target.querySelector('.bi-reply')) {
        e.preventDefault();
        openReplyModal(row || target);
        return;
      }

      // I. Send Reminder
      if (text.includes('send reminder') || text.includes('reminder')) {
        e.preventDefault();
        if (typeof showToast === 'function') {
          showToast('Statutory reminder notification dispatched via SMS & Encrypted Email.', 'success');
        }
        return;
      }

      // J. Add Tag (+ Add Tag)
      if (text.includes('+ add tag') || text.includes('add tag')) {
        e.preventDefault();
        handleAddTag(target);
        return;
      }

      // Fallback for placeholder anchors to ensure no broken clickables
      if (isAnchorPlaceholder) {
        e.preventDefault();
        if (typeof showToast === 'function') {
          showToast(`Action executed: ${text || 'Item selected'}`, 'info');
        }
      }
    });
  }

  /**
   * 3. Global Modal Dialogs for Inspecting & Editing Docket Records
   */
  function openCaseDetailsModal(sourceEl) {
    let caseRef = '#AV-2026-8942';
    let clientName = 'Sarah Chen';
    let stream = 'Canada Federal Skilled Worker (FSW)';
    let status = 'Under Active Legal Review';

    if (sourceEl && sourceEl.tagName === 'TR') {
      const cells = sourceEl.querySelectorAll('td');
      if (cells.length >= 2) {
        caseRef = cells[0].textContent.trim();
        clientName = cells[1].textContent.trim().split('\n')[0];
      }
      if (cells.length >= 3) stream = cells[2].textContent.trim();
      const statusBadge = sourceEl.querySelector('.badge, .badge-aura');
      if (statusBadge) status = statusBadge.textContent.trim();
    }

    let modal = document.getElementById('dashboardDynamicModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dashboardDynamicModal';
      modal.className = 'modal fade';
      modal.tabIndex = -1;
      modal.setAttribute('aria-hidden', 'true');
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white" style="background: linear-gradient(135deg, #0b1b3d, #1e56a0) !important;">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-folder-check fs-4 text-warning"></i>
              <div>
                <h5 class="modal-title fw-bold text-white mb-0">Immigration Case Docket Inspection</h5>
                <small class="text-white-50">Reference: ${caseRef}</small>
              </div>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="row g-3 mb-4">
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase">Principal Applicant</label>
                <div class="fw-bold fs-5">${clientName}</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase">Visa Stream / Pathway</label>
                <div class="fw-semibold text-primary">${stream}</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase">Current Consular Status</label>
                <div><span class="badge-aura badge-aura-primary">${status}</span></div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase">Assigned Lead Counsel</label>
                <div class="fw-semibold">Jonathan Vance, KC (Canadian Bar Association)</div>
              </div>
            </div>

            <div class="border rounded-3 p-3 bg-light mb-4">
              <h6 class="fw-bold mb-2"><i class="bi bi-file-earmark-check text-success me-1"></i> Document Checklist Verified (4/4)</h6>
              <ul class="list-unstyled small mb-0 d-flex flex-column gap-1">
                <li><i class="bi bi-check2 text-success me-1"></i> WES Educational Credential Assessment (ECA Verified)</li>
                <li><i class="bi bi-check2 text-success me-1"></i> IELTS General Language Test (CLB 9 Scorecard)</li>
                <li><i class="bi bi-check2 text-success me-1"></i> National Police Clearances (Clean Background)</li>
                <li><i class="bi bi-check2 text-success me-1"></i> Statutory Proof of Settlement Funds ($18,288 CAD Certified)</li>
              </ul>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Update File Status</label>
              <select class="form-select" id="modalStatusSelect">
                <option value="Under Review" selected>Under Review</option>
                <option value="Approved">Approved (Ready for Lodgement)</option>
                <option value="Additional Docs Required">Additional Documents Required</option>
                <option value="Submitted to IRCC / DHA">Submitted to IRCC / DHA</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Case Officer Notes</label>
              <textarea class="form-control" rows="2" placeholder="Enter confidential case audit notes...">All statutory criteria validated. Ready for consular fee payment confirmation.</textarea>
            </div>
          </div>
          <div class="modal-footer bg-surface border-top">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary-aura text-white" id="modalSaveBtn">
              <i class="bi bi-check2-circle me-1"></i> Save Case Update
            </button>
          </div>
        </div>
      </div>
    `;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    const saveBtn = modal.querySelector('#modalSaveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const newStatus = modal.querySelector('#modalStatusSelect').value;
        if (sourceEl && sourceEl.tagName === 'TR') {
          const badge = sourceEl.querySelector('.badge, .badge-aura');
          if (badge) {
            badge.className = newStatus === 'Approved' ? 'badge-aura badge-aura-success' : 'badge-aura badge-aura-primary';
            badge.textContent = newStatus;
          }
        }
        bsModal.hide();
        if (typeof showToast === 'function') {
          showToast(`Case ${caseRef} updated to: ${newStatus}`, 'success');
        }
      });
    }
  }

  function openEditModal(sourceEl) {
    let title = 'Record Information';
    if (sourceEl && sourceEl.tagName === 'TR') {
      const firstCell = sourceEl.querySelector('td');
      if (firstCell) title = firstCell.textContent.trim().split('\n')[0];
    }

    let modal = document.getElementById('dashboardEditModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dashboardEditModal';
      modal.className = 'modal fade';
      modal.tabIndex = -1;
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white" style="background: linear-gradient(135deg, #0b1b3d, #1e56a0) !important;">
            <h5 class="modal-title fw-bold text-white mb-0"><i class="bi bi-pencil-square me-2 text-warning"></i>Edit Workspace Entry</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-3">
              <label class="form-label fw-bold small text-uppercase text-muted">Item Title / Headline</label>
              <input type="text" class="form-control" id="editItemTitle" value="${title}">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold small text-uppercase text-muted">Publish Status</label>
              <select class="form-select" id="editItemStatus">
                <option value="Active / Published" selected>Active / Published</option>
                <option value="Draft">Draft Review</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold small text-uppercase text-muted">Internal Revision Memo</label>
              <textarea class="form-control" rows="3">Updated statutory guidelines and compliance citations.</textarea>
            </div>
          </div>
          <div class="modal-footer bg-surface border-top">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary-aura text-white" id="saveEditBtn"><i class="bi bi-check-lg me-1"></i>Save Changes</button>
          </div>
        </div>
      </div>
    `;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    const saveBtn = modal.querySelector('#saveEditBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const val = modal.querySelector('#editItemTitle').value;
        if (sourceEl && sourceEl.tagName === 'TR') {
          const firstCell = sourceEl.querySelector('td strong, td');
          if (firstCell) firstCell.textContent = val;
        }
        bsModal.hide();
        if (typeof showToast === 'function') {
          showToast(`Saved changes for "${val}"`, 'success');
        }
      });
    }
  }

  function openConsultationModal(sourceEl) {
    let clientName = 'Lead Immigration Counsel';
    if (sourceEl && sourceEl.tagName === 'TR') {
      const nameEl = sourceEl.querySelector('td:nth-child(2), td:nth-child(1)');
      if (nameEl) clientName = nameEl.textContent.trim().split('\n')[0];
    }

    let modal = document.getElementById('consultationModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'consultationModal';
      modal.className = 'modal fade';
      modal.tabIndex = -1;
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-dark text-white" style="background: linear-gradient(135deg, #0b1b3d, #1e56a0) !important;">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-camera-video-fill text-warning fs-4"></i>
              <h5 class="modal-title fw-bold text-white mb-0">Secure Legal Video Conference</h5>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4 text-center">
            <div class="p-4 bg-dark text-white rounded-3 mb-3 d-flex flex-column align-items-center justify-content-center" style="height: 180px; background: #0f172a !important;">
              <div class="spinner-grow text-warning mb-3" role="status"></div>
              <h6 class="fw-bold mb-1">Encrypted Room: #AV-ZOOM-8942</h6>
              <small class="text-muted">Participant: ${clientName}</small>
              <div class="mt-2 badge bg-success"><i class="bi bi-shield-lock-fill me-1"></i> 256-Bit E2EE Active</div>
            </div>
            <div class="d-flex justify-content-center gap-3">
              <button class="btn btn-outline-secondary rounded-circle p-3" title="Mute Microphone" onclick="this.classList.toggle('btn-danger')"><i class="bi bi-mic-fill fs-5"></i></button>
              <button class="btn btn-outline-secondary rounded-circle p-3" title="Camera Toggle" onclick="this.classList.toggle('btn-danger')"><i class="bi bi-camera-video-fill fs-5"></i></button>
              <button class="btn btn-outline-secondary rounded-circle p-3" title="Screen Share" onclick="showToast('Screen sharing activated', 'info')"><i class="bi bi-display fs-5"></i></button>
            </div>
          </div>
          <div class="modal-footer bg-surface border-top justify-content-between">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Disconnect</button>
            <button type="button" class="btn btn-success" onclick="bootstrap.Modal.getInstance(document.getElementById('consultationModal')).hide(); showToast('Connected to video consultation with counsel!', 'success');">
              <i class="bi bi-telephone-fill me-1"></i> Enter Meeting Now
            </button>
          </div>
        </div>
      </div>
    `;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }

  function openReplyModal(sourceEl) {
    let sender = 'Client Inquiry';
    if (sourceEl && sourceEl.tagName === 'TR') {
      const senderEl = sourceEl.querySelector('td:nth-child(2), td:nth-child(1)');
      if (senderEl) sender = senderEl.textContent.trim().split('\n')[0];
    }

    let modal = document.getElementById('replyModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'replyModal';
      modal.className = 'modal fade';
      modal.tabIndex = -1;
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white" style="background: linear-gradient(135deg, #0b1b3d, #1e56a0) !important;">
            <h5 class="modal-title fw-bold text-white mb-0"><i class="bi bi-reply-fill text-warning me-2"></i>Send Direct Consular Response</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-3">
              <label class="form-label small text-uppercase text-muted fw-bold">Recipient</label>
              <input type="text" class="form-control" value="${sender}" readonly>
            </div>
            <div class="mb-3">
              <label class="form-label small text-uppercase text-muted fw-bold">Quick Reply Template</label>
              <div class="d-flex flex-wrap gap-2">
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('replyBodyText').value = 'Your document verification has been completed. We are now preparing the pool lodgement.'">Docs Verified</button>
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('replyBodyText').value = 'Please upload your updated certified bank settlement funds statement within 5 business days.'">Request Funds</button>
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('replyBodyText').value = 'Your consultation appointment with lead counsel has been confirmed. Meeting link generated.'">Confirm Appt</button>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label small text-uppercase text-muted fw-bold">Message Content</label>
              <textarea class="form-control" id="replyBodyText" rows="4" placeholder="Type confidential client reply...">Your document verification has been completed. We are now preparing the pool lodgement.</textarea>
            </div>
          </div>
          <div class="modal-footer bg-surface border-top">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary-aura text-white" onclick="bootstrap.Modal.getInstance(document.getElementById('replyModal')).hide(); showToast('Encrypted client message delivered via portal & SMS!', 'success');">
              <i class="bi bi-send-fill me-1"></i> Send Reply
            </button>
          </div>
        </div>
      </div>
    `;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }

  function handleAddTag(btn) {
    const tagName = prompt('Enter new topic tag (e.g. Express Entry, PNP, Visa Rules):', 'IRCC Update');
    if (tagName && tagName.trim()) {
      const container = btn.parentElement;
      const newBadge = document.createElement('span');
      newBadge.className = 'badge bg-primary me-1 mb-1';
      newBadge.textContent = tagName.trim();
      container.insertBefore(newBadge, btn);
      if (typeof showToast === 'function') {
        showToast(`Tag "${tagName.trim()}" added to topic catalog!`, 'success');
      }
    }
  }

  /**
   * 4. Interactive Action Buttons: New Case, Export, Broadcast, Upload
   */
  function initDashboardButtons() {
    // Export Data to CSV
    const exportBtns = document.querySelectorAll('button:has(.bi-cloud-download), button:has(.bi-filetype-csv), button:has(.bi-download), .btn-export');
    exportBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof showToast === 'function') {
          showToast('Compiling secure CSV export... File ready for download.', 'success');
        }
      });
    });

    // New Record Buttons (e.g. New Application, Add User, Add Service)
    const newRecordBtns = document.querySelectorAll('button:has(.bi-plus-lg), button:has(.bi-person-plus), .btn-new-record');
    newRecordBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!btn.getAttribute('data-bs-toggle')) {
          e.preventDefault();
          if (typeof showToast === 'function') {
            showToast('New Entry Modal initialized. All fields ready for input.', 'info');
          }
        }
      });
    });

    // Interactive Stat Cards: Clicking filters table
    const statCards = document.querySelectorAll('.card-auravisa, .stat-card, [id*="kpi"] .p-3, [id*="pipeline"] .p-2');
    statCards.forEach(card => {
      const heading = card.querySelector('small, span, h6, .fw-bold');
      if (heading) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          const label = heading.textContent.trim();
          if (typeof showToast === 'function') {
            showToast(`Filtering dashboard data by metric: ${label}`, 'info');
          }
        });
      }
    });
  }

  function initDashboardModals() {
    // Ensure all tooltips work inside dashboard
    if (window.bootstrap && bootstrap.Tooltip) {
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
    }
  }

  function initConsultationAndReplyHandlers() {
    // Safety pass on all form submissions in dashboard
    const forms = document.querySelectorAll('.dashboard-main form');
    forms.forEach(form => {
      if (!form.getAttribute('action')) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (typeof showToast === 'function') {
            showToast('Search & query criteria applied.', 'info');
          }
        });
      }
    });
  }
})();
