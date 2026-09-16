const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

async function testPages() {
  const profileDir = path.join(os.tmpdir(), 'chrome_cdp_profile_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=' + profileDir
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const pages = ['about.html', 'home-2.html', 'services.html', 'contact.html', 'pricing.html', 'client-dashboard.html'];
  for (const page of pages) {
    const listRes = await fetch('http://localhost:9222/json/new?http://localhost:3000/' + page, { method: 'PUT' });
    const target = await listRes.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (msg) => {
      const res = JSON.parse(msg.data);
      if (res.id && callbacks.has(res.id)) {
        const { resolve } = callbacks.get(res.id);
        callbacks.delete(res.id);
        resolve(res.result);
      }
    };
    await new Promise(r => ws.onopen = r);

    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await send('Emulation.setDeviceMetricsOverride', { width: 1000, height: 800, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 600));

    const evalRes = await send('Runtime.evaluate', {
      expression: 'document.querySelector(".navbar-auravisa").offsetHeight',
      returnByValue: true
    });
    console.log(`${page.padEnd(25)} navbar height at 1000px: ${evalRes.result.value}px`);
    ws.close();
  }
  chrome.kill();
}
testPages();
