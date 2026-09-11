const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf8');
const footerMatch = indexContent.match(/<footer class="footer-auravisa[\s\S]*?<\/footer>/);

if (!footerMatch) {
  console.error('Could not extract footer from index.html');
  process.exit(1);
}

const indexFooter = footerMatch[0];
console.log('Extracted index footer, length:', indexFooter.length);

const targetFiles = [
  'home-2.html',
  'about.html',
  'services.html',
  'service-details.html',
  'pricing.html',
  'country-guide.html',
  'eligibility-checker.html',
  'success-stories.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  '404.html',
  'coming-soon.html',
  'maintenance.html'
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`File ${file} does not exist!`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  
  if (content.match(/<footer[\s\S]*?<\/footer>/)) {
    content = content.replace(/<footer[\s\S]*?<\/footer>/, indexFooter);
  } else {
    // If no footer, insert before bootstrap script
    content = content.replace(
      '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">',
      indexFooter + '\n\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">'
    );
  }

  // Check section tags and div balances
  const openDivs = (content.match(/<div/g) || []).length;
  const closeDivs = (content.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) {
    console.error(`Div mismatch in ${file}: ${openDivs} open vs ${closeDivs} close`);
    return;
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated footer in ${file} (divs balanced: ${openDivs})`);
});

console.log('All public & utility pages updated with index.html footer!');
