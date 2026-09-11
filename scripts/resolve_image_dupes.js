const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Let's find all duplicate IDs currently
const idMap = new Map();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/src="https:\/\/images\.unsplash\.com\/([^?"']+)/g);
  for (const m of matches) {
    if (!idMap.has(m[1])) idMap.set(m[1], []);
    idMap.get(m[1]).push(file);
  }
});

console.log('Duplicates:');
for (const [id, list] of idMap.entries()) {
  if (list.length > 1) {
    console.log(id, list);
  }
}
