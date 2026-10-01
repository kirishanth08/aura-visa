const fs = require('fs');

let content = fs.readFileSync('about.html', 'utf8');
content = content.replace(/\r\n/g, '\n');

// 1. Replace Section 3 (Three Foundational Pillars) - remove circle icons, use high-quality contextual images
const oldPillarsRegex = /<!-- SECTION 3: Mission, Vision, and Ethical Governance Pillars -->[\s\S]*?<!-- SECTION 4: Government Accreditations -->/;

const newPillarsHtml = `<!-- SECTION 3: Mission, Vision, and Ethical Governance Pillars -->
  <section class="section-space" id="about-mission">
    <div class="container">
      <div class="text-center section-title-wrap">
        <span class="section-subtitle">Core Philosophy</span>
        <h2 class="section-heading">Our Three Foundational Pillars</h2>
        <p class="text-muted mx-auto" style="max-width: 650px;">
          Immigration is not merely paperwork; it is the trajectory of human lives. We hold ourselves to uncompromising global legal ethics and client fiduciary duty.
        </p>
      </div>

      <div class="row g-4">
        <!-- Pillar 1 -->
        <div class="col-md-4">
          <div class="card-auravisa h-100 d-flex flex-column overflow-hidden">
            <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80" 
                 alt="Licensed attorney reviewing immigration application dossier with client" 
                 class="card-img-top-cover" style="height: 180px;">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-primary mb-2 align-self-start">Integrity First</span>
              <h4 class="fs-5 fw-bold mb-2">Honest Case Assessment</h4>
              <p class="text-muted small mb-3 flex-grow-1">
                We maintain a strict ethical vetting standard: we never accept retainers for applications we cannot win. If an applicant falls short of CRS cutoffs or language benchmarks, we formulate a concrete qualification roadmap before accepting fees.
              </p>
              <div class="border-top pt-2 mt-auto small text-muted">
                <i class="bi bi-shield-check text-success me-1"></i> Pre-assessment score audit included
              </div>
            </div>
          </div>
        </div>

        <!-- Pillar 2 -->
        <div class="col-md-4">
          <div class="card-auravisa h-100 d-flex flex-column overflow-hidden">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80" 
                 alt="Certified legal trust accounting and milestone escrow documentation" 
                 class="card-img-top-cover" style="height: 180px;">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-success mb-2 align-self-start">Consumer Protection</span>
              <h4 class="fs-5 fw-bold mb-2">Fiduciary Trust & Escrow</h4>
              <p class="text-muted small mb-3 flex-grow-1">
                Every dollar paid is maintained in segregated, regulated statutory trust accounts tied to concrete filing milestones. Funds are only released upon verifiable evidence of governmental submission with official filing receipts.
              </p>
              <div class="border-top pt-2 mt-auto small text-muted">
                <i class="bi bi-lock-fill text-primary me-1"></i> $1M Professional Indemnity Coverage
              </div>
            </div>
          </div>
        </div>

        <!-- Pillar 3 -->
        <div class="col-md-4">
          <div class="card-auravisa h-100 d-flex flex-column overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80" 
                 alt="Senior immigration legal counsel consulting directly with immigrant family" 
                 class="card-img-top-cover" style="height: 180px;">
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <span class="badge-aura badge-aura-warning mb-2 align-self-start">Direct Counsel</span>
              <h4 class="fs-5 fw-bold mb-2">Empathetic Legal Advocacy</h4>
              <p class="text-muted small mb-3 flex-grow-1">
                Clients receive direct access to designated licensed attorneys, not unaccredited third-party brokers. We provide real-time policy alerts, procedural fairness representation, and tailored consular interview preparation.
              </p>
              <div class="border-top pt-2 mt-auto small text-muted">
                <i class="bi bi-person-check-fill text-warning me-1"></i> 1-on-1 Senior Counsel Assigned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: Government Accreditations -->`;

if (oldPillarsRegex.test(content)) {
  content = content.replace(oldPillarsRegex, newPillarsHtml);
  console.log('Successfully updated Section 3 (Foundational Pillars) with high-quality images and context!');
} else {
  console.log('Could not find Section 3!');
}

// 2. Replace Section 4 (Government Accreditations) - replace excessive icons with relevant high-quality images and rich supporting content
const oldAccreditationsRegex = /<!-- SECTION 4: Government Accreditations -->[\s\S]*?<!-- SECTION 5: Senior Immigration Consultants & Legal Team -->/;

const newAccreditationsHtml = `<!-- SECTION 4: Government Accreditations -->
  <section class="section-space-alt" id="about-accreditations">
    <div class="container">
      <div class="text-center section-title-wrap">
        <span class="section-subtitle">Official Regulatory Standing</span>
        <h2 class="section-heading">Globally Certified & Regulated Practitioners</h2>
        <p class="text-muted mx-auto" style="max-width: 680px;">
          Our legal practice is officially licensed and strictly overseen by federal government regulatory authorities across Canada, Australia, the United Kingdom, and the European Union.
        </p>
      </div>

      <div class="row g-4 justify-content-center">
        <!-- Canada CICC Card with High-Quality Image & Detailed Context -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column overflow-hidden">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1517935703635-2717090c2210?w=600&auto=format&fit=crop&q=80" 
                   alt="Canadian Parliament and Supreme Court Ottawa - CICC regulatory jurisdiction" 
                   class="card-img-top-cover" style="height: 150px;">
              <span class="badge bg-danger position-absolute top-0 end-0 m-2 text-white shadow-sm">Canada</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <h5 class="fw-bold mb-0">CICC (Canada)</h5>
                <span class="badge-aura badge-aura-success">License #R519284</span>
              </div>
              <div class="text-primary small fw-semibold mb-2">College of Immigration and Citizenship Consultants</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Chartered under the federal <em>CICC Act</em>. Authorized to represent applicants directly before IRCC, CBSA border officers, and the Immigration and Refugee Board (IRB) with full statutory standing.
              </p>
              <div class="p-2 bg-alt rounded-2 small text-muted mb-3" style="font-size: 0.78rem;">
                <i class="bi bi-shield-lock-fill text-success me-1"></i> Backed by CICC Compensation Fund & $1M E&O liability insurance.
              </div>
              <a href="https://college-ic.ca" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-aura mt-auto w-100">
                <i class="bi bi-box-arrow-up-right me-1"></i> Verify CICC Standing
              </a>
            </div>
          </div>
        </div>

        <!-- Australia MARA Card with High-Quality Image & Detailed Context -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column overflow-hidden">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80" 
                   alt="Sydney Australian Commonwealth Court and legal precinct - MARA authority" 
                   class="card-img-top-cover" style="height: 150px;">
              <span class="badge bg-primary position-absolute top-0 end-0 m-2 text-white shadow-sm">Australia</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <h5 class="fw-bold mb-0">MARA (Australia)</h5>
                <span class="badge-aura badge-aura-primary">MARN #1804921</span>
              </div>
              <div class="text-primary small fw-semibold mb-2">Migration Agents Registration Authority</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Regulated under the Australian <em>Migration Act 1958</em>. Officially certified to manage Subclass 189/190/491 visas, employer sponsorships, and Administrative Review Tribunal (ART) petitions.
              </p>
              <div class="p-2 bg-alt rounded-2 small text-muted mb-3" style="font-size: 0.78rem;">
                <i class="bi bi-shield-lock-fill text-primary me-1"></i> Strict statutory compliance with the Commonwealth OMARA Code of Conduct.
              </div>
              <a href="https://www.mara.gov.au" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-aura mt-auto w-100">
                <i class="bi bi-box-arrow-up-right me-1"></i> Verify MARA Standing
              </a>
            </div>
          </div>
        </div>

        <!-- UK OISC Card with High-Quality Image & Detailed Context -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column overflow-hidden">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80" 
                   alt="London Royal Courts of Justice and Westminster - OISC regulator" 
                   class="card-img-top-cover" style="height: 150px;">
              <span class="badge bg-info text-dark position-absolute top-0 end-0 m-2 shadow-sm">UK Home Office</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <h5 class="fw-bold mb-0">OISC (UK)</h5>
                <span class="badge-aura badge-aura-warning">Level 3 #F20180011</span>
              </div>
              <div class="text-primary small fw-semibold mb-2">Office of the Immigration Services Commissioner</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Designated at Level 3 (highest tier: Advocacy & Complex Appeals). Authorized to represent cases before the First-tier & Upper Tribunal, ILR settlement, and corporate Sponsor Licensing.
              </p>
              <div class="p-2 bg-alt rounded-2 small text-muted mb-3" style="font-size: 0.78rem;">
                <i class="bi bi-shield-lock-fill text-warning me-1"></i> Audited annually under the UK Immigration and Asylum Act 1999 statutory framework.
              </div>
              <a href="https://www.gov.uk/oisc" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-aura mt-auto w-100">
                <i class="bi bi-box-arrow-up-right me-1"></i> Verify OISC Standing
              </a>
            </div>
          </div>
        </div>

        <!-- Europe EIA Card with High-Quality Image & Detailed Context -->
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa h-100 d-flex flex-column overflow-hidden">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&auto=format&fit=crop&q=80" 
                   alt="European Commission and EU Court of Justice headquarters - EIA accredited" 
                   class="card-img-top-cover" style="height: 150px;">
              <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2 shadow-sm">European Union</span>
            </div>
            <div class="card-body-padded d-flex flex-column flex-grow-1">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <h5 class="fw-bold mb-0">EIA (Europe)</h5>
                <span class="badge-aura badge-aura-success">Reg #EU-2021-9481</span>
              </div>
              <div class="text-primary small fw-semibold mb-2">European Immigration Alliance Accredited</div>
              <p class="text-muted small mb-3 flex-grow-1">
                Certified practitioner network for the <em>EU Blue Card Directive (2021/1883)</em>, German Chancenkarte, and Golden Visa investor immigration pathways across Portugal, Spain, and Greece.
              </p>
              <div class="p-2 bg-alt rounded-2 small text-muted mb-3" style="font-size: 0.78rem;">
                <i class="bi bi-shield-lock-fill text-success me-1"></i> Full adherence to EU General Data Protection Regulation (GDPR) client privacy.
              </div>
              <a href="service-details.html?service=golden-visa" class="btn btn-sm btn-outline-aura mt-auto w-100">
                <i class="bi bi-check-circle me-1"></i> View Accreditations
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Meaningful Supporting Content: Why Regulation Matters & Consumer Safeguards -->
      <div class="mt-5 p-4 p-lg-5 bg-surface rounded-4 border shadow-sm">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <span class="section-subtitle">Client Consumer Protection</span>
            <h3 class="fs-4 fw-bold mb-3">Why Government Regulation Protects Your Future</h3>
            <p class="text-muted mb-3">
              Unregulated "ghost consultants" represent the single largest risk in international migration. Submitting an application through an unverified agency can result in automatic 5-year bans for statutory misrepresentation under Canadian IRPA and Australian Migration regulations.
            </p>
            <div class="row g-3">
              <div class="col-sm-6">
                <div class="d-flex align-items-start gap-2">
                  <i class="bi bi-shield-check text-success fs-5 mt-1"></i>
                  <div>
                    <strong class="d-block small text-main">Statutory Escrow Accounts</strong>
                    <span class="text-muted" style="font-size: 0.8rem;">Retainers are held in bank trust accounts inspected by government regulators.</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="d-flex align-items-start gap-2">
                  <i class="bi bi-award-fill text-warning fs-5 mt-1"></i>
                  <div>
                    <strong class="d-block small text-main">Direct Consular Authority</strong>
                    <span class="text-muted" style="font-size: 0.8rem;">Official representation forms (IMM 5476, Form 956) recognized by immigration officers.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="p-4 bg-alt rounded-3 border">
              <h5 class="fw-bold mb-3"><i class="bi bi-search me-2 text-primary"></i>Independent Registry Check</h5>
              <p class="text-muted small mb-3">
                Every AuraVisa lawyer holds an active, unblemished license. You can confirm our credentials directly on government portals:
              </p>
              <ul class="list-unstyled small mb-0 d-flex flex-column gap-2">
                <li><i class="bi bi-check2-circle text-success me-1"></i> <strong>Canada:</strong> college-ic.ca (Search #R519284)</li>
                <li><i class="bi bi-check2-circle text-success me-1"></i> <strong>Australia:</strong> mara.gov.au (Search #1804921)</li>
                <li><i class="bi bi-check2-circle text-success me-1"></i> <strong>UK:</strong> gov.uk/find-an-immigration-adviser</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Regional Chambers Quick Strip -->
      <div class="mt-4 p-3 bg-surface rounded-3 border d-flex flex-wrap justify-content-around align-items-center gap-3 text-center small">
        <div><i class="bi bi-geo-alt-fill text-danger me-1"></i><strong>Toronto HQ:</strong> 100 King St W, Suite 5600</div>
        <div><i class="bi bi-geo-alt-fill text-primary me-1"></i><strong>London Chambers:</strong> 30 St Mary Axe (Gherkin)</div>
        <div><i class="bi bi-geo-alt-fill text-success me-1"></i><strong>Sydney Chambers:</strong> 1 Farrer Place</div>
        <div><i class="bi bi-geo-alt-fill text-warning me-1"></i><strong>Dubai DIFC:</strong> Gate Precinct 4, Level 3</div>
      </div>
    </div>
  </section>

  <!-- SECTION 5: Senior Immigration Consultants & Legal Team -->`;

if (oldAccreditationsRegex.test(content)) {
  content = content.replace(oldAccreditationsRegex, newAccreditationsHtml);
  console.log('Successfully updated Section 4 (Government Accreditations) with high-quality images, badges & consumer protection guide!');
} else {
  console.log('Could not find Section 4!');
}

fs.writeFileSync('about.html', content, 'utf8');
console.log('Updated about.html successfully!');
