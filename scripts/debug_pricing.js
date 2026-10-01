const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function debugPricing() {
  const env = Object.assign({}, process.env, { PORT: '5055' });
  const server = spawn('node', ['dev-server.js'], { cwd: process.cwd(), env });
  await new Promise(r => setTimeout(r, 1000));

  const profileDir = path.join(os.tmpdir(), 'chrome_pricing_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9565',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9565/json/new?http://localhost:5055/pricing.html', { method: 'PUT' });
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
    await send('Page.navigate', { url: 'http://localhost:5055/pricing.html' });
    await new Promise(r => setTimeout(r, 2000));

    await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 500));

    await send('Runtime.evaluate', { expression: 'document.getElementById("pricing-packages").scrollIntoView()' });
    await new Promise(r => setTimeout(r, 600));

    const ssRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('pricing_desktop.png', Buffer.from(ssRes.data, 'base64'));

    ws.close();
  } finally {
    chrome.kill();
    server.kill();
  }
}
debugPricing();
