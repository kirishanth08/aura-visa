const fs = require('fs');

['admin-analytics.html', 'admin-dashboard.html', 'client-profile.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const s1 = content.match(/<section[^>]*>[\s\S]*?<\/section>/)[0];
  const col4Match = s1.match(/<div class="col-lg-4[^>]*>[\s\S]*?<\/div>\s*<\/div>/);
  console.log('--- ' + f + ' ---');
  console.log(col4Match ? col4Match[0] : 'not matched');
});
