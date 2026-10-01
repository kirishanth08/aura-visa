const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function debug() {
  const env = Object.assign({}, process.env, { PORT: '5055' });
  const server = spawn('node', ['dev-server.js'], { cwd: process.cwd(), env });
  await new Promise(r => setTimeout(r, 1000));

  const profileDir = path.join(os.tmpdir(), 'chrome_debug_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9560',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9560/json/new?http://localhost:5055/index.html', { method: 'PUT' });
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
    await new Promise(r => setTimeout(r, 2000));

    await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 1, mobile: true });
    await new Promise(r => setTimeout(r, 500));

    // Remove backdrop-filter from navbar-auravisa
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nav = document.querySelector('.navbar-auravisa');
        nav.style.backdropFilter = 'none';
        nav.style.webkitBackdropFilter = 'none';
        nav.style.transform = 'none';
      })()`
    });

    await send('Runtime.evaluate', { expression: 'document.querySelector(".navbar-toggler").click()' });
    await new Promise(r => setTimeout(r, 1000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        function toObj(rect) {
          if (!rect) return null;
          return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
        }
        const oc = document.getElementById("offcanvasNavbar");
        return {
          offsetParent: oc.offsetParent ? oc.offsetParent.tagName + '.' + oc.offsetParent.className : null,
          ocRect: toObj(oc.getBoundingClientRect()),
          linksCount: oc.querySelectorAll('.nav-link').length
        };
      })()`,
      returnByValue: true
    });

    console.log('Result with backdrop-filter removed from nav:', JSON.stringify(res.result.value, null, 2));

    const ssRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('fixed_menu_360.png', Buffer.from(ssRes.data, 'base64'));

    ws.close();
  } finally {
    chrome.kill();
    server.kill();
  }
}
debug();
