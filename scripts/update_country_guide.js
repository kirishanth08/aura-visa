const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'country-guide.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add interactive styling to <head>
const headStyle = `  <link rel="stylesheet" href="assets/css/style.css">
  <style>
    #country-guide-main {
      cursor: pointer;
    }
    #countryCardsContainer .card-auravisa,
    #country-comparison table tbody tr,
    #in-demand-occupations .card-auravisa,
    #pathways-summary .list-group-item,
    #country-cta .p-5,
    #country-hero .p-3,
    #country-hero .hero-featured-img {
      cursor: pointer;
    }
    #country-comparison table tbody tr {
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    #country-comparison table tbody tr:hover {
      background-color: rgba(30, 58, 138, 0.08);
    }
    #pathways-summary .list-group-item {
      transition: all 0.2s ease;
    }
    #pathways-summary .list-group-item:hover {
      background-color: rgba(30, 58, 138, 0.08) !important;
      padding-left: 0.75rem !important;
    }
  </style>`;

content = content.replace('  <link rel="stylesheet" href="assets/css/style.css">', headStyle);

// 2. Open <main id="country-guide-main"> before SECTION 1
content = content.replace(
  '  <!-- SECTION 1: Destination Explorer Hero with Dynamic Country Search -->',
  '  <!-- Main Content Area: Any Click Redirects Directly to Service Details -->\n  <main id="country-guide-main">\n\n  <!-- SECTION 1: Destination Explorer Hero with Dynamic Country Search -->'
);

// 3. Update Hero search box & Hero image
content = content.replace(
  '<div class="p-3 bg-surface rounded-4 border shadow-sm mb-3">',
  '<div class="p-3 bg-surface rounded-4 border shadow-sm mb-3" style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);
content = content.replace(
  '<input type="text" id="destinationSearchInput" class="form-control border-0" placeholder="Type country name (e.g. Canada, Germany, Australia)...">',
  '<input type="text" id="destinationSearchInput" class="form-control border-0" placeholder="Click any destination or search to view visa service details..." readonly style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);
content = content.replace(
  'class="hero-featured-img">',
  'class="hero-featured-img" style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);

// 4. Update Destination cards in Section 2
content = content.replace(
  /<div class="col-md-6 col-lg-4 country-search-item">\s*<div class="card-auravisa">/g,
  '<div class="col-md-6 col-lg-4 country-search-item">\n          <div class="card-auravisa" style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);

// 5. Update Table rows in Section 3
content = content.replace(
  /<tbody>\s*<tr>/g,
  '<tbody>\n            <tr style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);
content = content.replace(
  /<\/tr>\s*<tr>/g,
  '</tr>\n            <tr style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);

// 6. Update Occupation cards in Section 4
content = content.replace(
  /<div class="card-auravisa p-4">/g,
  '<div class="card-auravisa p-4" style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);

// 7. Update Threshold list items in Section 5
content = content.replace(
  /<li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2">/g,
  '<li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2" style="cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);

// 8. Update Section 6 CTA card & Close </main>
content = content.replace(
  '<div class="p-5 bg-surface border rounded-4 shadow-sm mx-auto" style="max-width: 800px;">',
  '<div class="p-5 bg-surface border rounded-4 shadow-sm mx-auto" style="max-width: 800px; cursor: pointer;" onclick="window.location.href=\'service-details.html\'">'
);

content = content.replace(
  '  </section>\n\n  <!-- Footer -->',
  '  </section>\n  </main>\n\n  <!-- Footer -->'
);

// 9. Add click redirection script before </body>
const scriptContent = `  <script src="assets/js/main.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const guideMain = document.getElementById('country-guide-main');
      if (guideMain) {
        guideMain.addEventListener('click', (e) => {
          // Redirect any click inside the country guide main content to service-details.html
          window.location.href = 'service-details.html';
        });
      }
    });
  </script>`;

content = content.replace('  <script src="assets/js/main.js"></script>', scriptContent);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated country-guide.html with universal click redirection to service-details.html!');
