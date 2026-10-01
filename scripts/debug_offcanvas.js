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
    '--remote-debugging-port=9558',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9558/json/new?http://localhost:5055/index.html', { method: 'PUT' });
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

    await send('Runtime.evaluate', { expression: 'document.querySelector(".navbar-toggler").click()' });
    await new Promise(r => setTimeout(r, 1000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        function toObj(rect) {
          if (!rect) return null;
          return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
        }
        const oc = document.getElementById("offcanvasNavbar");
        const header = oc ? oc.querySelector(".offcanvas-header") : null;
        const body = oc ? oc.querySelector(".offcanvas-body") : null;
        const nav = document.querySelector(".navbar-auravisa");
        const container = document.querySelector(".navbar-auravisa > .container");
        const hdr = document.querySelector("header.sticky-top");

        return {
          ocClasses: oc ? oc.className : '',
          ocRect: toObj(oc.getBoundingClientRect()),
          headerRect: toObj(header.getBoundingClientRect()),
          bodyRect: toObj(body.getBoundingClientRect()),
          links: Array.from(oc.querySelectorAll('.nav-link')).map(l => ({
            text: l.innerText,
            rect: toObj(l.getBoundingClientRect()),
            csColor: getComputedStyle(l).color,
            csDisplay: getComputedStyle(l).display
          }))
        };
      })()`,
      returnByValue: true
    });

    console.log('Inspection:', JSON.stringify(res.result.value, null, 2));

    const ssRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('debug_screenshot_360.png', Buffer.from(ssRes.data, 'base64'));

    ws.close();
  } finally {
    chrome.kill();
    server.kill();
  }
}
debug();
