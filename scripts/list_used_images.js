const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const usedIds = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /src="https:\/\/images\.unsplash\.com\/([^?"']+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    usedIds.add(match[1]);
  }
});

console.log('Total distinct Unsplash IDs in use:', usedIds.size);
fs.writeFileSync('scripts/used_ids.json', JSON.stringify([...usedIds], null, 2));
