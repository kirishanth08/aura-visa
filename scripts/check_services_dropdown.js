const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const dropdownMap = new Map();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/<li class="nav-item dropdown">\s*<a class="nav-link dropdown-toggle"[^>]*>Services<\/a>[\s\S]*?<\/ul>\s*<\/li>/);
  if (match) {
    const snippet = match[0];
    if (!dropdownMap.has(snippet)) {
      dropdownMap.set(snippet, []);
    }
    dropdownMap.get(snippet).push(f);
  }
});

console.log(`Found ${dropdownMap.size} variations of Services dropdown across files.`);
let i = 1;
for (const [snippet, fileList] of dropdownMap.entries()) {
  console.log(`\n--- Variation ${i++} (${fileList.length} files: e.g. ${fileList.slice(0, 3).join(', ')}) ---`);
  console.log(snippet);
}
