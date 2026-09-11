const fs = require('fs');
const path = require('path');

const expectedPages = [
  // Public & Content Pages (21)
  'index.html', 'home-2.html', 'about.html', 'services.html', 'service-details.html',
  'pricing.html', 'country-guide.html', 'eligibility-checker.html', 'success-stories.html',
  'blog.html', 'blog-details.html', 'blog-details-australia.html', 'blog-details-uk.html',
  'blog-details-golden-visa.html', 'blog-details-germany.html', 'blog-details-eb2-niw.html',
  'blog-details-new-zealand.html', 'contact.html', '404.html', 'coming-soon.html', 'maintenance.html',

  // Auth Pages (3)
  'login.html', 'register.html', 'forgot-password.html',

  // Dashboard Pages (18)
  'client-dashboard.html', 'client-application-details.html',
  'client-documents.html', 'client-appointments.html', 'client-payments.html',
  'client-profile.html', 'admin-dashboard.html', 'admin-users.html', 'admin-applications.html',
  'admin-services.html', 'admin-countries.html', 'admin-documents.html', 'admin-appointments.html',
  'admin-payments.html', 'admin-messages.html', 'admin-blog.html', 'admin-analytics.html',
  'admin-settings.html'
];

console.log('Total expected pages:', expectedPages.length);

const imageMap = new Map();
let allPassed = true;

expectedPages.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error('MISSING FILE:', file);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const isDashboard = file.startsWith('admin-') || file.startsWith('client-');
  const isAuth = file === 'login.html' || file === 'register.html' || file === 'forgot-password.html';
  
  // Check header and footer
  const hasHeader = /<header[\s>]/i.test(content);
  const hasFooter = /<footer[\s>]/i.test(content);
  
  // Count content sections
  const sectionMatches = content.match(/<section[\s>]/gi) || [];
  const sectionCount = sectionMatches.length;

  if (isAuth) {
    // Auth pages: standalone form card, no header, no footer
    if (hasHeader || hasFooter) {
      console.error(`FAIL auth page ${file}: header or footer present (should be standalone)`);
      allPassed = false;
    }
    if (!content.includes('brand-logo')) {
      console.error(`FAIL auth page ${file}: missing company brand logo`);
      allPassed = false;
    }
    if (!content.includes('rtl-toggle-btn') || !content.includes('theme-toggle-btn')) {
      console.error(`FAIL auth page ${file}: missing RTL or Theme toggle controls`);
      allPassed = false;
    }
    console.log(`OK (AUTH): ${file.padEnd(30)} | Standalone Card with Logo & Controls`);
    return;
  }
  
  // Check section count rule (5 to 6) for non-auth pages
  const validSections = sectionCount >= 5 && sectionCount <= 6;
  if (!validSections) {
    console.error(`FAIL section count for ${file}: found ${sectionCount}`);
    allPassed = false;
  }
  
  if (!hasHeader) {
    console.error(`FAIL header for ${file}: header missing`);
    allPassed = false;
  }

  // Dashboards intentionally have no public footer per user design specification
  if (!isDashboard && !hasFooter) {
    console.error(`FAIL footer for ${file}: footer missing`);
    allPassed = false;
  }

  if (isDashboard && hasFooter) {
    console.error(`FAIL footer for ${file}: dashboard pages must NOT have footer`);
    allPassed = false;
  }
  
  // Check primary image in hero for public / non-dashboard pages
  if (!isDashboard) {
    const imgMatches = content.match(/class="[^"]*hero-featured-img[^"]*"[^>]*src="([^"]+)"/i) ||
                       content.match(/src="([^"]+)"[^>]*class="[^"]*hero-featured-img[^"]*"/i) ||
                       content.match(/src="(https:\/\/images\.unsplash\.com\/[^"]+)"/i);
                       
    if (!imgMatches) {
      console.error(`FAIL primary image for ${file}: NO IMAGE FOUND`);
      allPassed = false;
    } else {
      const imgUrl = imgMatches[1].split('?')[0]; // Base image URL
      if (imageMap.has(imgUrl)) {
        console.error(`FAIL duplicate primary image between ${file} and ${imageMap.get(imgUrl)}: ${imgUrl}`);
        allPassed = false;
      } else {
        imageMap.set(imgUrl, file);
      }
    }
  }
  
  console.log(`OK: ${file.padEnd(32)} | Sections: ${sectionCount} | Header: ${hasHeader} | Footer: ${hasFooter}`);
});

console.log('\nDistinct primary images count on public pages:', imageMap.size);
console.log('Audit Result:', allPassed ? `ALL ${expectedPages.length} PAGES PASSED PERFECTLY!` : 'SOME CHECKS FAILED');
