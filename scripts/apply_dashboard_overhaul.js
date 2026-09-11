const fs = require('fs');

const files = fs.readdirSync('.').filter(f => (f.startsWith('admin-') || f.startsWith('client-')) && f.endsWith('.html'));

console.log(`Starting dashboard overhaul for ${files.length} files...`);

function transformDashboardContent(content, filename) {
  let modified = content;

  // 1. Locate Section 1
  const s1Match = modified.match(/<section[^>]*>[\s\S]*?<\/section>/);
  if (!s1Match) {
    throw new Error(`No section 1 found in ${filename}`);
  }

  const s1Original = s1Match[0];
  let s1New = s1Original;

  // Replace col-lg-8 with col-12
  s1New = s1New.replace(/class="col-lg-8"/, 'class="col-12"');
  s1New = s1New.replace(/class="col-lg-8\s+([^"]*)"/, 'class="col-12 $1"');

  // Remove the col-lg-4 image block
  s1New = s1New.replace(/\s*<div class="col-lg-4 text-center">[\s\S]*?<\/div>/, '');

  modified = modified.replace(s1Original, s1New);

  // 2. Remove Footer and comment
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

files.forEach(f => {
  const original = fs.readFileSync(f, 'utf8');
  const transformed = transformDashboardContent(original, f);

  // Validation
  const sections = transformed.match(/<section[\s\S]*?<\/section>/g) || [];
  const hasFooter = transformed.includes('<footer');
  const hasDashJs = transformed.includes('assets/js/dashboard.js');
  const s1HasImg = transformed.match(/<section[^>]*>[\s\S]*?<\/section>/)[0].includes('<img');

  const openDivs = (transformed.match(/<div/g) || []).length;
  const closeDivs = (transformed.match(/<\/div>/g) || []).length;

  if (sections.length !== 5 || hasFooter || !hasDashJs || s1HasImg || openDivs !== closeDivs) {
    throw new Error(`Validation failed for ${f}: sections=${sections.length}, footer=${hasFooter}, dashJs=${hasDashJs}, s1Img=${s1HasImg}, divs=${openDivs}/${closeDivs}`);
  }

  fs.writeFileSync(f, transformed, 'utf8');
  console.log(`Updated: ${f} (5 sections, no footer, no hero img, balanced)`);
});

console.log('Successfully updated all 18 dashboard files!');
