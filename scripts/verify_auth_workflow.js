const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const loginHtml = fs.readFileSync(path.join(rootDir, 'login.html'), 'utf8');
const registerHtml = fs.readFileSync(path.join(rootDir, 'register.html'), 'utf8');
const dashboardHtml = fs.readFileSync(path.join(rootDir, 'client-dashboard.html'), 'utf8');

console.log('Auditing Login & Sign Up Workflow Configuration (Custom Registered Credentials Only)...\n');

let passes = 0;
let issues = 0;

function check(title, condition, detail = '') {
  if (condition) {
    console.log(`[PASS] ${title}`);
    passes++;
  } else {
    console.error(`[FAIL] ${title} - ${detail}`);
    issues++;
  }
}

// 1. Register Page Checks
check(
  'register.html has registration form with id="registerForm" and alert container',
  registerHtml.includes('id="registerForm"') &&
  registerHtml.includes('id="registerAlert"')
);

check(
  'register.html has all required registration inputs (name, email, citizenship, target, password, confirm, terms)',
  registerHtml.includes('id="regName"') &&
  registerHtml.includes('id="regEmail"') &&
  registerHtml.includes('id="regCitizenship"') &&
  registerHtml.includes('id="regTarget"') &&
  registerHtml.includes('id="regPassword"') &&
  registerHtml.includes('id="regConfirm"') &&
  registerHtml.includes('id="termsCheck"')
);

check(
  'register.html validates inputs, saves account to auravisa_users, shows Sign up success, and does NOT redirect',
  registerHtml.includes('auravisa_users') &&
  registerHtml.includes('Sign up success') &&
  !registerHtml.includes('window.location.href')
);

// 2. Login Page Checks
check(
  'login.html has login form with id="loginForm" and alert container',
  loginHtml.includes('id="loginForm"') &&
  loginHtml.includes('id="loginAlert"')
);

check(
  'login.html has REMOVED demo credentials chip and demo accounts',
  !loginHtml.includes('id="demoAccountChip"') &&
  !loginHtml.includes('applicant@auravisa.com') &&
  !loginHtml.includes('defaultAccounts')
);

check(
  'login.html establishes session, displays static Login success message, and does NOT redirect',
  loginHtml.includes('auravisa_logged_in_user') &&
  loginHtml.includes('Login success') &&
  !loginHtml.includes('window.location.href')
);

// 3. User Dashboard Checks
check(
  'client-dashboard.html does NOT enforce an aggressive auth-guard redirecting unauthenticated visitors',
  !dashboardHtml.includes("window.location.href = 'login.html'") &&
  !dashboardHtml.includes('location.replace("login.html")')
);

// 4. Navbar Dashboard Link Verification
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
check(
  'index.html navbar has Dashboard link with speedometer icon positioned after Contact',
  indexHtml.includes('href="contact.html"') &&
  indexHtml.includes('href="client-dashboard.html"') &&
  indexHtml.indexOf('href="contact.html"') < indexHtml.indexOf('href="client-dashboard.html"') &&
  indexHtml.includes('bi-speedometer2')
);

console.log(`\nVerification Summary: ${passes} passed, ${issues} failed.`);
process.exit(issues > 0 ? 1 : 0);
