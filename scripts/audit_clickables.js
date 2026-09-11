const fs = require('fs');

const files = ['admin-dashboard.html', 'client-documents.html', 'admin-appointments.html', 'admin-users.html'];

files.forEach(f => {
  console.log('\n=================== ' + f + ' ===================');
  const content = fs.readFileSync(f, 'utf8');

  // Match empty hrefs
  const emptyHrefMatches = content.match(/<a[^>]*href="#"[^>]*>[\s\S]*?<\/a>/g) || [];
  emptyHrefMatches.forEach(m => {
    console.log('EMPTY HREF:', m.replace(/\s+/g, ' ').slice(0, 140));
  });

  // Match buttons without onclick, data-bs-, or type=submit
  const buttonMatches = content.match(/<button[^>]*>[\s\S]*?<\/button>/g) || [];
  buttonMatches.forEach(m => {
    if (!m.includes('onclick') && !m.includes('data-bs-') && !m.includes('type="submit"')) {
      console.log('BUTTON NO HANDLER:', m.replace(/\s+/g, ' ').slice(0, 140));
    }
  });
});
