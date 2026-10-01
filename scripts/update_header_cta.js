const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Non-dashboard pages that use the main site header
const dashboardPages = [
  'client-dashboard.html',
  'client-application-details.html',
  'client-documents.html',
  'client-appointments.html',
  'client-payments.html',
  'client-profile.html',
  'admin-dashboard.html',
  'admin-analytics.html',
  'admin-applications.html',
  'admin-appointments.html',
  'admin-blog.html',
  'admin-countries.html',
  'admin-documents.html',
  'admin-messages.html',
  'admin-payments.html',
  'admin-services.html',
  'admin-settings.html',
  'admin-users.html'
];

let updatedCount = 0;

files.forEach(file => {
  if (dashboardPages.includes(file)) return;

  let content = fs.readFileSync(file, 'utf8');

  // Check if header contains register.html
  const registerRegex = /<a\s+href="register\.html"[^>]*class="btn btn-sm btn-primary-aura text-white"[^>]*>[\s\S]*?Sign Up[\s\S]*?<\/a>/g;

  if (registerRegex.test(content)) {
    content = content.replace(registerRegex, `<a href="contact.html" class="btn btn-sm btn-primary-aura text-white">
                <i class="bi bi-calendar-check me-1"></i>Book Consultation
              </a>`);
    
    // Also update any comment
    content = content.replace(
      '<!-- Navbar Action Buttons: RTL (Text Only), Dark Mode (Symbol Only), Login, Sign Up -->',
      '<!-- Navbar Action Buttons: RTL (Text Only), Dark Mode (Symbol Only), Login, Primary CTA -->工'.replace('工', '')
    );

    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Updated header Primary CTA in: ${file}`);
  }
});

console.log(`\nTotal pages updated with Primary CTA button: ${updatedCount}`);
