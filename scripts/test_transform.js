const fs = require('fs');

function transformDashboardContent(content, filename) {
  let modified = content;

  // 1. Remove Section 1 col-lg-4 image container and expand col-lg-8 to col-12
  // Let's locate Section 1
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
  // Also handle if comment is slightly different
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

// Test on admin-dashboard.html
const original = fs.readFileSync('admin-dashboard.html', 'utf8');
const transformed = transformDashboardContent(original, 'admin-dashboard.html');

console.log('Original length:', original.length, 'Transformed length:', transformed.length);
console.log('Contains footer:', transformed.includes('<footer'));
console.log('Contains dashboard.js:', transformed.includes('assets/js/dashboard.js'));
console.log('Section 1 contains img:', transformed.match(/<section[^>]*>[\s\S]*?<\/section>/)[0].includes('<img'));

// Check section count
const sections = transformed.match(/<section[\s\S]*?<\/section>/g) || [];
console.log('Sections count in transformed:', sections.length);

// Print Section 1
console.log('\n--- Transformed Section 1 ---\n', transformed.match(/<section[^>]*>[\s\S]*?<\/section>/)[0]);

// Check div count balance
const openDivs = (transformed.match(/<div/g) || []).length;
const closeDivs = (transformed.match(/<\/div>/g) || []).length;
console.log('\nDiv balance:', { openDivs, closeDivs, balanced: openDivs === closeDivs });
