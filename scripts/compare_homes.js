const fs = require('fs');

function inspectPage(file) {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== ${file} ===`);
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('<section') || l.includes('CONTENT SECTION')) {
      console.log(`Line ${i + 1}: ${l.trim().substring(0, 100)}`);
    }
  });
}

inspectPage('index.html');
inspectPage('home-2.html');
