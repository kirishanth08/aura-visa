const fs = require('fs');

let content = fs.readFileSync('services.html', 'utf8');

// Replace the 4 hero buttons with 2 CTAs
const oldHeroButtons = `          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-primary-aura active" data-filter-target="services" data-filter-value="all">All Services</button>
            <button class="btn btn-outline-aura" data-filter-target="services" data-filter-value="pr">Permanent Residency</button>
            <button class="btn btn-outline-aura" data-filter-target="services" data-filter-value="work">Work Permits</button>
            <button class="btn btn-outline-aura" data-filter-target="services" data-filter-value="business">Investor & Golden Visa</button>
          </div>`;

const newHeroButtons = `          <div class="d-flex flex-wrap gap-3">
            <a href="#services-grid" class="btn btn-primary-aura">
              <i class="bi bi-grid-fill me-1"></i> Explore All Services
            </a>
            <a href="eligibility-checker.html" class="btn btn-outline-aura">
              <i class="bi bi-calculator me-1"></i> Check Eligibility
            </a>
          </div>`;

// Add filter tabs in the services grid section
const oldGridHeader = `<h2 class="section-heading">Our Specialized Visa Categories</h2>
        <p class="text-muted mx-auto" style="max-width: 600px;">
          Explore legal immigration pathways tailored to your qualifications, investment capacity, or family situation.
        </p>
      </div>`;

const newGridHeader = `<h2 class="section-heading">Our Specialized Visa Categories</h2>
        <p class="text-muted mx-auto mb-4" style="max-width: 600px;">
          Explore legal immigration pathways tailored to your qualifications, investment capacity, or family situation.
        </p>
        
        <!-- Category Filter Tabs -->
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-2">
          <button class="btn btn-sm btn-primary-aura active" data-filter-target="services" data-filter-value="all">All Services</button>
          <button class="btn btn-sm btn-outline-aura" data-filter-target="services" data-filter-value="pr">Permanent Residency</button>
          <button class="btn btn-sm btn-outline-aura" data-filter-target="services" data-filter-value="work">Work Permits</button>
          <button class="btn btn-sm btn-outline-aura" data-filter-target="services" data-filter-value="business">Investor & Golden Visa</button>
        </div>
      </div>`;

// Replace normalizing CRLF
content = content.replace(/\r\n/g, '\n');
const oldHeroNorm = oldHeroButtons.replace(/\r\n/g, '\n');
const newHeroNorm = newHeroButtons.replace(/\r\n/g, '\n');
const oldGridNorm = oldGridHeader.replace(/\r\n/g, '\n');
const newGridNorm = newGridHeader.replace(/\r\n/g, '\n');

if (content.includes(oldHeroNorm)) {
  content = content.replace(oldHeroNorm, newHeroNorm);
  console.log('Successfully replaced 4 hero buttons with 2 CTAs!');
} else {
  console.log('Could not find old hero buttons!');
}

if (content.includes(oldGridNorm)) {
  content = content.replace(oldGridNorm, newGridNorm);
  console.log('Successfully added category filter tabs to services grid!');
} else {
  console.log('Could not find old grid header!');
}

fs.writeFileSync('services.html', content, 'utf8');
console.log('Updated services.html successfully!');
