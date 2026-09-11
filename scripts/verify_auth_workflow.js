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
  'register.html validates inputs, saves account to auravisa_users, and redirects to login.html?registered=1',
  registerHtml.includes('auravisa_users') &&
  registerHtml.includes('auravisa_flash_msg') &&
  registerHtml.includes("window.location.href = 'login.html?registered=1'")
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
  'login.html detects registration flash message and auto-populates registered email',
  loginHtml.includes('auravisa_flash_msg') &&
  loginHtml.includes('auravisa_last_registered_email')
);

check(
  'login.html strictly validates credentials against auravisa_users (registered accounts only)',
  loginHtml.includes('auravisa_users') &&
  loginHtml.includes('userAccount.password !== password') &&
  loginHtml.includes('auravisa_logged_in_user')
);

check(
  'login.html displays specific rejection when account is not found or password is wrong',
  loginHtml.includes('Account not found!') &&
  loginHtml.includes('Incorrect password!')
);

check(
  'login.html redirects to client-dashboard.html only upon verified credentials',
  loginHtml.includes("window.location.href = 'client-dashboard.html'")
);

// 3. User Dashboard Checks
check(
  'client-dashboard.html does NOT enforce an aggressive auth-guard redirecting unauthenticated visitors',
  !dashboardHtml.includes("window.location.href = 'login.html'") &&
  !dashboardHtml.includes('location.replace("login.html")')
);

check(
  'client-dashboard.html dynamically personalizes welcome greeting if user session is present',
  dashboardHtml.includes('id="clientGreeting"') &&
  dashboardHtml.includes('auravisa_logged_in_user')
);

console.log(`\nVerification Summary: ${passes} passed, ${issues} failed.`);
process.exit(issues > 0 ? 1 : 0);
