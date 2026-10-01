const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function run() {
  const profileDir = path.join(os.tmpdir(), 'chrome_test_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9678',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9678/json/new?http://localhost:5055/pricing.html', { method: 'PUT' });
    const target = await listRes.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (msg) => {
      const res = JSON.parse(msg.data);
      if (res.id && callbacks.has(res.id)) {
        const { resolve, reject } = callbacks.get(res.id);
        callbacks.delete(res.id);
        if (res.error) reject(res.error);
        else resolve(res.result);
      }
    };
    await new Promise(r => ws.onopen = r);

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');

    console.log('--- TEST 1: Pricing straight-line cost alignment ---');
    await send('Page.navigate', { url: 'http://localhost:5055/pricing.html' });
    await new Promise(r => setTimeout(r, 1500));
    await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 400));
    await send('Runtime.evaluate', { expression: 'document.getElementById("pricing-packages").scrollIntoView()' });
    await new Promise(r => setTimeout(r, 500));

    const priceBoxEval = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const boxes = Array.from(document.querySelectorAll('#pricing-packages .pricing-price-box'));
          const amounts = Array.from(document.querySelectorAll('#pricing-packages .pricing-amount'));
          return {
            boxTops: boxes.map(b => b.getBoundingClientRect().top),
            amountTops: amounts.map(a => a.getBoundingClientRect().top)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Pricing boxes tops:', priceBoxEval.result.value.boxTops);
    console.log('Pricing amounts tops:', priceBoxEval.result.value.amountTops);
    const ssPricing = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('test_pricing_aligned.png', Buffer.from(ssPricing.data, 'base64'));

    console.log('--- TEST 2: About page Pillars (SVGs) and Advocates (height & uniform) ---');
    await send('Page.navigate', { url: 'http://localhost:5055/about.html' });
    await new Promise(r => setTimeout(r, 1500));
    await send('Runtime.evaluate', { expression: 'document.getElementById("about-mission").scrollIntoView()' });
    await new Promise(r => setTimeout(r, 500));
    const ssPillars = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('test_pillars_svg.png', Buffer.from(ssPillars.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'document.getElementById("about-team").scrollIntoView()' });
    await new Promise(r => setTimeout(r, 500));
    const advocateHeights = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const imgs = Array.from(document.querySelectorAll('#about-team .team-advocate-img'));
          const cards = Array.from(document.querySelectorAll('#about-team .card-auravisa'));
          return {
            imgHeights: imgs.map(i => i.getBoundingClientRect().height),
            cardHeights: cards.map(c => c.getBoundingClientRect().height)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Advocate img heights:', advocateHeights.result.value.imgHeights);
    console.log('Advocate card heights:', advocateHeights.result.value.cardHeights);
    const ssAdvocates = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('test_advocates_aligned.png', Buffer.from(ssAdvocates.data, 'base64'));

    console.log('--- TEST 3: Dashboard logo redirect ---');
    await send('Page.navigate', { url: 'http://localhost:5055/client-dashboard.html' });
    await new Promise(r => setTimeout(r, 1200));
    const logoHref = await send('Runtime.evaluate', {
      expression: `document.querySelector('.brand-logo').getAttribute('href')`,
      returnByValue: true
    });
    console.log('Dashboard brand logo href:', logoHref.result.value);

    console.log('--- TEST 4: Responsive 760px Hamburger Dropdown Menu ---');
    await send('Page.navigate', { url: 'http://localhost:5055/index.html' });
    await new Promise(r => setTimeout(r, 1200));
    await send('Emulation.setDeviceMetricsOverride', { width: 760, height: 900, deviceScaleFactor: 1, mobile: true });
    await new Promise(r => setTimeout(r, 400));
    
    // Open offcanvas
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('offcanvasNavbar');
          const bs = bootstrap.Offcanvas.getOrCreateInstance(el);
          bs.show();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const drawerNavMetrics = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const contactLink = Array.from(document.querySelectorAll('.offcanvas .nav-link')).find(l => l.textContent.includes('Contact'));
          const dashLink = Array.from(document.querySelectorAll('.offcanvas .nav-link')).find(l => l.textContent.includes('Dashboard'));
          
          function getMetrics(link) {
            if (!link) return null;
            const icon = link.querySelector('i');
            const rect = link.getBoundingClientRect();
            const iconRect = icon ? icon.getBoundingClientRect() : null;
            return {
              linkLeft: rect.left,
              linkRight: rect.right,
              linkWidth: rect.width,
              iconLeft: iconRect ? iconRect.left : null,
              iconRight: iconRect ? iconRect.right : null,
              justifyContent: window.getComputedStyle(link).justifyContent
            };
          }

          return {
            contact: getMetrics(contactLink),
            dashboard: getMetrics(dashLink)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Drawer nav metrics:', JSON.stringify(drawerNavMetrics.result.value, null, 2));

    const ssMobileMenu = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('test_mobile_drawer_760.png', Buffer.from(ssMobileMenu.data, 'base64'));

    ws.close();
    chrome.kill();
    console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error during testing:', err);
    chrome.kill();
  }
}

run();
