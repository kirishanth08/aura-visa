const fs = require('fs');

const files = fs.readdirSync('.').filter(f => (f.startsWith('admin-') || f.startsWith('client-')) && f.endsWith('.html'));

function transformDashboardContent(content, filename) {
  let modified = content;

  // 1. Locate Section 1
  const s1Match = modified.match(/<section[^>]*>[\s\S]*?<\/section>/);
  if (!s1Match) {
    console.error(`No section 1 in ${filename}`);
    return null;
  }

  const s1Original = s1Match[0];
  let s1New = s1Original;

  // Replace col-lg-8 with col-12
  s1New = s1New.replace(/class="col-lg-8"/, 'class="col-12"');
  s1New = s1New.replace(/class="col-lg-8\s+([^"]*)"/, 'class="col-12 $1"');

  // Remove the col-lg-4 image block
  s1New = s1New.replace(/\s*<div class="col-lg-4 text-center">[\s\S]*?<\/div>/, '');

  modified = modified.replace(s1Original, s1New);

  // 2. Remove Footer
  modified = modified.replace(/\s*<!-- Footer -->\s*<footer class="footer-auravisa[\s\S]*?<\/footer>/, '');
  modified = modified.replace(/\s*<footer class="footer-auravisa[\s\S]*?<\/footer>/, '');

  // 3. Add assets/js/dashboard.js before </body> if not present
  if (!modified.includes('assets/js/dashboard.js')) {
    modified = modified.replace(
      '<script src="assets/js/main.js"></script>',
      '<script src="assets/js/main.js"></script>\n  <script src="assets/js/dashboard.js"></script>'
    );
  }

  return modified;
}

let allOk = true;

files.forEach(f => {
  const original = fs.readFileSync(f, 'utf8');
  const transformed = transformDashboardContent(original, f);
  if (!transformed) {
    allOk = false;
    return;
  }

  const sections = transformed.match(/<section[\s\S]*?<\/section>/g) || [];
  const hasFooter = transformed.includes('<footer');
  const hasDashJs = transformed.includes('assets/js/dashboard.js');
  const s1HasImg = transformed.match(/<section[^>]*>[\s\S]*?<\/section>/)[0].includes('<img');

  const openDivs = (transformed.match(/<div/g) || []).length;
  const closeDivs = (transformed.match(/<\/div>/g) || []).length;
  const divBalanced = openDivs === closeDivs;

  const valid = sections.length === 5 && !hasFooter && hasDashJs && !s1HasImg && divBalanced;
  if (!valid) {
    allOk = false;
    console.error(`FAILED: ${f}`, { sections: sections.length, hasFooter, hasDashJs, s1HasImg, divBalanced });
  } else {
    console.log(`OK: ${f} (5 sections, no footer, no hero img, balanced divs)`);
  }
});

console.log('Dry run result:', allOk ? 'ALL 18 PASSED' : 'SOME FAILED');
