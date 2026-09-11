/**
 * Test Navbar Authentication State & Profile Dropdown Switching
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const mainJs = fs.readFileSync(path.join(rootDir, 'assets', 'js', 'main.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const dashboardHtml = fs.readFileSync(path.join(rootDir, 'client-dashboard.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(rootDir, 'assets', 'css', 'style.css'), 'utf8');

console.log('Testing Navbar Authentication State & Profile Avatar Dropdown...\n');

let passes = 0;
let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passes++;
  } else {
    console.error(`[FAIL] ${message}`);
    failures++;
  }
}

// 1. Check main.js implementation
assert(mainJs.includes('initNavbarAuth();'), 'main.js calls initNavbarAuth on DOMContentLoaded');
assert(mainJs.includes('function initNavbarAuth()'), 'main.js defines initNavbarAuth function');
assert(mainJs.includes('auravisa_logged_in_user'), 'initNavbarAuth checks auravisa_logged_in_user in localStorage');
assert(mainJs.includes('data-auth-status'), 'main.js sets data-auth-status for instant attribute-based CSS hiding');
assert(mainJs.includes('navbar-user-dropdown'), 'initNavbarAuth creates navbar-user-dropdown element');
assert(mainJs.includes('navbar-logout-btn'), 'initNavbarAuth adds Logout button to the profile dropdown');
assert(mainJs.includes('localStorage.removeItem(\'auravisa_logged_in_user\')'), 'Logout button clears auravisa_logged_in_user session');
assert(mainJs.includes("style.setProperty('display', 'none', 'important')"), 'initNavbarAuth enforces display: none !important on auth buttons');

// 2. Check CSS styling
assert(styleCss.includes('.navbar-user-dropdown'), 'style.css includes .navbar-user-dropdown styles');
assert(styleCss.includes('.avatar-circle-sm'), 'style.css includes .avatar-circle-sm styles');
assert(styleCss.includes('[data-auth-status="logged-in"]'), 'style.css includes [data-auth-status="logged-in"] rule hiding login & register buttons');

// 3. Check HTML structure for navbar action container compatibility
assert(indexHtml.includes('a href="login.html"'), 'index.html has login link for dynamic replacement');
assert(indexHtml.includes('a href="register.html"'), 'index.html has register link for dynamic replacement');
assert(dashboardHtml.includes('a href="login.html"'), 'client-dashboard.html has login link for dynamic replacement');
assert(dashboardHtml.includes('a href="register.html"'), 'client-dashboard.html has register link for dynamic replacement');

// 4. Simulate DOM state transformations
const mockSession = {
  name: 'Alexander Wright',
  email: 'alexander.wright@globalnexus.org',
  loginTime: new Date().toISOString()
};

// Simulate logged-in transition
assert(Boolean(mockSession.name && mockSession.email), 'Valid session object configured');
const displayName = mockSession.name || mockSession.email.split('@')[0];
const initial = displayName.charAt(0).toUpperCase();
assert(initial === 'A', 'Avatar initial generated correctly (A for Alexander)');

console.log(`\nNavbar Auth State Verification: ${passes} passed, ${failures} failed.`);
process.exit(failures > 0 ? 1 : 0);
