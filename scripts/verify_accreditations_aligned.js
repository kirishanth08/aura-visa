const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function test() {
  const profileDir = path.join(os.tmpdir(), 'chrome_acc_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9876',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9876/json/new?http://localhost:5055/about.html', { method: 'PUT' });
    const target = await listRes.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (msg) => {
      const res = JSON.parse(msg.data);
      if (res.id && callbacks.has(res.id)) {
        callbacks.get(res.id).resolve(res.result);
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
    await send('Page.navigate', { url: 'http://localhost:5055/about.html' });
    await new Promise(r => setTimeout(r, 1500));

    await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 400));

    await send('Runtime.evaluate', { expression: 'document.getElementById("about-accreditations").scrollIntoView()' });
    await new Promise(r => setTimeout(r, 500));

    const metrics = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const cards = Array.from(document.querySelectorAll('#about-accreditations .card-auravisa'));
          return cards.map((c, i) => {
            const h = c.querySelector('.accreditation-header');
            const s = c.querySelector('.accreditation-subtitle');
            const p = c.querySelector('.accreditation-desc');
            const n = c.querySelector('.accreditation-note');
            const b = c.querySelector('.btn');
            return {
              card: i + 1,
              cardH: c.getBoundingClientRect().height,
              headerH: h.getBoundingClientRect().height,
              subtitleH: s.getBoundingClientRect().height,
              pH: p.getBoundingClientRect().height,
              noteTop: n.getBoundingClientRect().top,
              noteH: n.getBoundingClientRect().height
            };
          });
        })()
      `,
      returnByValue: true
    });

    console.log('Detailed metrics:', JSON.stringify(metrics.result.value, null, 2));

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('accreditations_aligned_clean.png', Buffer.from(ss.data, 'base64'));

    ws.close();
    chrome.kill();
  } catch (e) {
    console.error(e);
    chrome.kill();
  }
}

test();
