const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../../lex-Vanguard/about.html');
let content = fs.readFileSync(htmlPath, 'utf8');

content = content.replace(/Chief Patent Agent [^<]*AI & Tech/g, 'Chief Patent Agent &mdash; AI & Tech');
fs.writeFileSync(htmlPath, content, 'utf8');
console.log('Cleaned dash in lex-Vanguard about.html');
