const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const allImgs = [];
const idMap = new Map();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/src="https:\/\/images\.unsplash\.com\/([^?"']+)/g);
  for (const m of matches) {
    allImgs.push({ file, id: m[1] });
    if (!idMap.has(m[1])) idMap.set(m[1], []);
    idMap.get(m[1]).push(file);
  }
});

console.log('Total img tags:', allImgs.length);
console.log('Distinct image IDs:', idMap.size);

let dupes = 0;
for (const [id, list] of idMap.entries()) {
  if (list.length > 1) {
    console.log('DUPLICATE:', id, list);
    dupes++;
  }
}
console.log('Duplicate IDs count:', dupes);
