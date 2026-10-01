const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const matching = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('href="register.html"') && content.includes('<header')) {
    matching.push(f);
  }
});

console.log('Files with register.html in header:', matching.length, matching);
