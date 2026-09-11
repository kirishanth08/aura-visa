const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const standardServicesDropdown = `<li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Services</a>
                <ul class="dropdown-menu border-0 shadow-lg">
                  <li><a class="dropdown-item" href="services.html">All Visa Services</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=australia-gsm">Australia GSM</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=uk-skilled-worker">UK Skilled Worker</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=golden-visa">Golden Visa & Investor</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=student-permits">Student Permits</a></li>
                  <li><a class="dropdown-item" href="service-details.html?service=family-sponsorship">Family Sponsorship</a></li>
                </ul>
              </li>`;

let updatedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Skip auth pages since they have no header/navbar
  if (f === 'login.html' || f === 'register.html' || f === 'forgot-password.html') {
    return;
  }

  // Regex to match the services dropdown <li>
  const dropdownRegex = /<li class="nav-item dropdown">\s*<a class="nav-link dropdown-toggle"[^>]*>Services<\/a>[\s\S]*?<\/ul>\s*<\/li>/;

  if (dropdownRegex.test(content)) {
    content = content.replace(dropdownRegex, standardServicesDropdown);
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
    console.log(`Updated Services dropdown in ${f}`);
  } else {
    console.log(`NO services dropdown found in ${f}`);
  }
});

console.log(`\nUpdated Services dropdown in ${updatedCount} files.`);
