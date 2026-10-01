const fs = require('fs');
const path = require('path');

const files = [
  'client-dashboard.html',
  'client-application-details.html',
  'client-documents.html',
  'client-appointments.html',
  'client-payments.html',
  'client-profile.html',
  'scripts/update_dashboard_header.js'
];

files.forEach(f => {
  const fullPath = path.resolve(__dirname, '..', f);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const target = 'class="brand-logo" href="client-dashboard.html"';
    const replacement = 'class="brand-logo" href="index.html"';
    if (content.includes(target)) {
      content = content.split(target).join(replacement);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Updated: ' + f);
    } else {
      console.log('No target in: ' + f);
    }
  }
});
