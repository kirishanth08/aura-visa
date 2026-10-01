const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function testMobileMenu() {
  const env = Object.assign({}, process.env, { PORT: '5055' });
  const server = spawn('node', ['dev-server.js'], { cwd: process.cwd(), env });
  await sleep(1000);

  const profileDir = path.join(os.tmpdir(), 'chrome_mobile_test_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9445',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await sleep(1500);

  try {
    const listRes = await fetch('http://127.0.0.1:9445/json/new?http://localhost:5055/index.html', { method: 'PUT' });
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
    await send('Page.navigate', { url: 'http://localhost:5055/index.html' });
    await sleep(2000);

    for (const width of [360, 768]) {
      console.log(`\n=== TESTING WIDTH ${width}px ===`);
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 800,
        deviceScaleFactor: 1,
        mobile: true
      });
      await sleep(500);

      // Check toggler state before click
      const togglerState = await send('Runtime.evaluate', {
        expression: `(() => {
          const t = document.querySelector('.navbar-toggler');
          if (!t) return { found: false };
          const cs = window.getComputedStyle(t);
          const r = t.getBoundingClientRect();
          return { found: true, display: cs.display, visible: cs.visibility, top: r.top, left: r.left, width: r.width, height: r.height };
        })()`,
        returnByValue: true
      });
      console.log('Toggler state:', togglerState.result.value);

      // Click toggler
      await send('Runtime.evaluate', {
        expression: `document.querySelector('.navbar-toggler').click()`
      });

      await sleep(1000);

      const inspection = await send('Runtime.evaluate', {
        expression: `(() => {
          const offcanvas = document.getElementById('offcanvasNavbar');
          const navLinks = document.querySelectorAll('.offcanvas .nav-link');
          const searchInput = document.getElementById('offcanvasSearchInput');
          const offcanvasBody = document.querySelector('.offcanvas-body');

          const offcanvasStyle = offcanvas ? window.getComputedStyle(offcanvas) : null;
          const bodyStyle = offcanvasBody ? window.getComputedStyle(offcanvasBody) : null;
          const linksData = Array.from(navLinks).map(l => {
            const rect = l.getBoundingClientRect();
            const cs = window.getComputedStyle(l);
            return {
              text: l.innerText.trim(),
              display: cs.display,
              visibility: cs.visibility,
              color: cs.color,
              top: Math.round(rect.top),
              left: Math.round(rect.left),
              height: Math.round(rect.height),
              width: Math.round(rect.width)
            };
          });

          return {
            title: document.title,
            offcanvasClasses: offcanvas ? offcanvas.className : '',
            offcanvasDisplay: offcanvasStyle ? offcanvasStyle.display : null,
            offcanvasVisibility: offcanvasStyle ? offcanvasStyle.visibility : null,
            offcanvasTransform: offcanvasStyle ? offcanvasStyle.transform : null,
            offcanvasZIndex: offcanvasStyle ? offcanvasStyle.zIndex : null,
            bodyDisplay: bodyStyle ? bodyStyle.display : null,
            linksCount: navLinks.length,
            linksData
          };
        })()`,
        returnByValue: true
      });

      console.log('Inspection result:', JSON.stringify(inspection.result.value, null, 2));

      // Capture screenshot
      const ssRes = await send('Page.captureScreenshot', { format: 'png' });
      const ssPath = path.join(process.cwd(), `auravisa_menu_${width}px.png`);
      fs.writeFileSync(ssPath, Buffer.from(ssRes.data, 'base64'));
      console.log(`Saved screenshot to: ${ssPath}`);

      // Close offcanvas before next test
      await send('Runtime.evaluate', {
        expression: `(() => {
          const closeBtn = document.querySelector('.offcanvas .btn-close');
          if (closeBtn) closeBtn.click();
        })()`
      });
      await sleep(500);
    }

    ws.close();
  } catch (e) {
    console.error('Test error:', e);
  } finally {
    chrome.kill();
    server.kill();
  }
}

testMobileMenu();
