const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const artifactDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain', '8efbd508-1752-4059-b599-2379bb543ff6');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const profileDir = path.join(os.tmpdir(), 'chrome_cdp_profile_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await sleep(1500);

  try {
    const listRes = await fetch('http://localhost:9222/json/new?http://localhost:3000/index.html', { method: 'PUT' });
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

    const viewports = [1000, 1024, 1100, 1200, 1280, 768, 390];
    console.log('=== TESTING NAVBAR ACROSS VIEWPORTS ===\n');

    for (const width of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 800,
        deviceScaleFactor: 1,
        mobile: width < 992
      });

      await sleep(500);

      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const nav = document.querySelector('.navbar-auravisa');
          const brand = document.querySelector('.navbar-auravisa .brand-logo');
          const navNav = document.querySelector('.navbar-auravisa .navbar-nav');
          const actions = document.querySelector('.navbar-auravisa .offcanvas-body .d-flex.align-items-center.gap-2:not(.d-none)');
          const toggler = document.querySelector('.navbar-auravisa .navbar-toggler');
          const container = document.querySelector('.navbar-auravisa > .container');

          const navRect = nav ? nav.getBoundingClientRect() : null;
          const brandRect = brand ? brand.getBoundingClientRect() : null;
          const actionsRect = actions ? actions.getBoundingClientRect() : null;
          const containerRect = container ? container.getBoundingClientRect() : null;

          const actionButtons = actions ? Array.from(actions.children).map(c => {
            const r = c.getBoundingClientRect();
            return { tag: c.tagName, text: c.innerText.trim(), top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
          }) : [];

          // Check if any action button has wrapped to a second line
          let wrapped = false;
          if (actionButtons.length > 1) {
            const firstTop = actionButtons[0].top;
            wrapped = actionButtons.some(b => Math.abs(b.top - firstTop) > 10);
          }

          return {
            windowWidth: window.innerWidth,
            navHeight: navRect ? Math.round(navRect.height) : 0,
            containerWidth: containerRect ? Math.round(containerRect.width) : 0,
            brandRight: brandRect ? Math.round(brandRect.right) : 0,
            actionsLeft: actionsRect ? Math.round(actionsRect.left) : 0,
            actionsRight: actionsRect ? Math.round(actionsRect.right) : 0,
            actionButtonsCount: actionButtons.length,
            wrapped,
            togglerVisible: toggler ? window.getComputedStyle(toggler).display !== 'none' : false,
            buttons: actionButtons
          };
        })()`,
        returnByValue: true
      });

      const metrics = evalRes.result.value;
      console.log(`[Viewport: ${width}px]`);
      console.log(`  Navbar Height: ${metrics.navHeight}px`);
      console.log(`  Container Width: ${metrics.containerWidth}px`);
      console.log(`  Action Buttons Wrapped? ${metrics.wrapped ? 'YES (BROKEN)' : 'NO (SINGLE LINE - PERFECT)'}`);
      console.log(`  Toggler visible: ${metrics.togglerVisible}`);
      if (metrics.buttons.length > 0) {
        console.log(`  Buttons tops: ${metrics.buttons.map(b => b.top).join(', ')}`);
      }

      // Capture screenshot at test viewports
      if ([1000, 1024, 1100, 768].includes(width)) {
        const ssRes = await send('Page.captureScreenshot', { format: 'png' });
        const filePath = path.join(artifactDir, `navbar_${width}px.png`);
        fs.writeFileSync(filePath, Buffer.from(ssRes.data, 'base64'));
        console.log(`  Screenshot saved: ${filePath}`);
      }

      console.log('---');
    }

    ws.close();
  } catch (err) {
    console.error('Error during CDP test:', err);
  } finally {
    chrome.kill();
  }
}

run();
