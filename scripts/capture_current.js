const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:5055/about.html', { waitUntil: 'networkidle0' });

  const acc = await page.$('#about-accreditations');
  if (acc) {
    await acc.screenshot({ path: 'scripts/current_accreditations.png' });
    console.log('Saved scripts/current_accreditations.png');
  }

  const team = await page.$('#about-team');
  if (team) {
    await team.screenshot({ path: 'scripts/current_team.png' });
    console.log('Saved scripts/current_team.png');
  }

  await browser.close();
})();
