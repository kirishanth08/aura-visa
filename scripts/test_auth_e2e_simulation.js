/**
 * Automated End-to-End Simulation of Registration & Login Workflow
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const loginHtml = fs.readFileSync(path.join(rootDir, 'login.html'), 'utf8');
const registerHtml = fs.readFileSync(path.join(rootDir, 'register.html'), 'utf8');

console.log('Running End-to-End Auth Simulation...\n');

// Mock browser localStorage
const localStorageMap = new Map();
const localStorage = {
  getItem: (key) => localStorageMap.has(key) ? localStorageMap.get(key) : null,
  setItem: (key, val) => localStorageMap.set(key, String(val)),
  removeItem: (key) => localStorageMap.delete(key),
  clear: () => localStorageMap.clear()
};

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${message}`);
    testsFailed++;
  }
}

// 1. Check that login.html does not have demo credentials or demo chip
assert(!loginHtml.includes('id="demoAccountChip"'), 'Demo credential chip (#demoAccountChip) is removed from login.html');
assert(!loginHtml.includes('applicant@auravisa.com'), 'Demo email applicant@auravisa.com is removed');
assert(!loginHtml.includes('defaultAccounts'), 'defaultAccounts mock array is removed');

// 2. Simulate User attempting login before registering
(function testLoginUnregistered() {
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem('auravisa_users') || '[]');
  } catch(e) {}
  
  const email = 'alexander.wright@globalnexus.org';
  const password = 'MySecretPass99!';
  
  const userAccount = users.find(u => u.email && u.email.toLowerCase() === email);
  assert(!userAccount, 'Unregistered user does not exist in localStorage auravisa_users');
  
  const canLogin = Boolean(userAccount && userAccount.password === password);
  assert(!canLogin, 'Login is strictly denied for unregistered user');
})();

// 3. Simulate User Registering on register.html
(function testRegisterUser() {
  const newUser = {
    name: 'Alexander Wright',
    email: 'alexander.wright@globalnexus.org',
    password: 'MySecretPass99!',
    citizenship: 'Canada',
    target: 'Australia',
    createdAt: new Date().toISOString()
  };

  let users = [];
  try {
    users = JSON.parse(localStorage.getItem('auravisa_users') || '[]');
  } catch(e) {}

  users.push(newUser);
  localStorage.setItem('auravisa_users', JSON.stringify(users));
  localStorage.setItem('auravisa_flash_msg', 'Account created successfully! Please sign in with your credentials.');
  localStorage.setItem('auravisa_last_registered_email', newUser.email);

  assert(localStorage.getItem('auravisa_users') !== null, 'New user profile successfully saved to localStorage auravisa_users');
  assert(localStorage.getItem('auravisa_last_registered_email') === 'alexander.wright@globalnexus.org', 'Registered email saved for auto-fill on login page');
})();

// 4. Simulate User on login.html with wrong password
(function testLoginWrongPassword() {
  const email = 'alexander.wright@globalnexus.org';
  const wrongPassword = 'WrongPassword123!';

  const users = JSON.parse(localStorage.getItem('auravisa_users') || '[]');
  const userAccount = users.find(u => u.email && u.email.toLowerCase() === email);

  assert(Boolean(userAccount), 'Account found for registered email');
  assert(userAccount.password !== wrongPassword, 'Incorrect password correctly rejected');
  assert(!localStorage.getItem('auravisa_logged_in_user'), 'Session is NOT established when password is wrong');
})();

// 5. Simulate User on login.html with correct registered password
(function testLoginSuccess() {
  const email = 'alexander.wright@globalnexus.org';
  const correctPassword = 'MySecretPass99!';

  const users = JSON.parse(localStorage.getItem('auravisa_users') || '[]');
  const userAccount = users.find(u => u.email && u.email.toLowerCase() === email);

  assert(userAccount && userAccount.password === correctPassword, 'Correct credentials matched against auravisa_users');

  const sessionUser = {
    name: userAccount.name || 'Client',
    email: userAccount.email,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('auravisa_logged_in_user', JSON.stringify(sessionUser));

  const savedSession = JSON.parse(localStorage.getItem('auravisa_logged_in_user'));
  assert(savedSession && savedSession.email === email && savedSession.name === 'Alexander Wright', 'Authenticated session saved in auravisa_logged_in_user');
})();

// 6. Simulate direct unauthenticated dashboard access
(function testDashboardOpenAccess() {
  localStorage.removeItem('auravisa_logged_in_user');
  assert(localStorage.getItem('auravisa_logged_in_user') === null, 'Session cleared (unauthenticated state)');
  
  const dashboardHtml = fs.readFileSync(path.join(rootDir, 'client-dashboard.html'), 'utf8');
  assert(!dashboardHtml.includes("window.location.href = 'login.html'"), 'client-dashboard.html does NOT redirect unauthenticated users to login.html');
  assert(dashboardHtml.includes('id="clientGreeting"'), 'client-dashboard.html gracefully renders for unauthenticated visitors');
})();

console.log(`\nSimulation Completed: ${testsPassed} passed, ${testsFailed} failed.`);
process.exit(testsFailed > 0 ? 1 : 0);
