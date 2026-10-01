const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testScreenshots() {
  const profileDir = path.join(os.tmpdir(), 'chrome_check_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9444',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9444/json/new?http://localhost:5055/about.html', { method: 'PUT' });
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
    await send('Page.navigate', { url: 'http://localhost:5055/about.html' });
    await new Promise(r => setTimeout(r, 2000));

    await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1200, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 400));

    // Measure accreditations
    const accMetrics = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('#about-accreditations .card-auravisa'));
        return cards.map(c => {
          const rect = c.getBoundingClientRect();
          const btn = c.querySelector('.btn');
          const note = c.querySelector('.accreditation-note');
          const desc = c.querySelector('.accreditation-desc');
          return {
            height: rect.height,
            top: rect.top,
            bottom: rect.bottom,
            noteTop: note ? note.getBoundingClientRect().top : null,
            noteHeight: note ? note.getBoundingClientRect().height : null,
            btnTop: btn ? btn.getBoundingClientRect().top : null,
            btnBottom: btn ? btn.getBoundingClientRect().bottom : null,
            btnHeight: btn ? btn.getBoundingClientRect().height : null,
          };
        });
      })()`,
      returnByValue: true
    });
    console.log('ACCREDITATIONS METRICS:', JSON.stringify(accMetrics.result.value, null, 2));

    // Scroll to accreditations and screenshot
    await send('Runtime.evaluate', { expression: 'document.getElementById("about-accreditations").scrollIntoView()' });
    await new Promise(r => setTimeout(r, 500));
    const ssAcc = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/audit_accreditations_full.png', Buffer.from(ssAcc.data, 'base64'));

    // Measure team cards in AuraVisa
    const teamMetrics = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('#about-team .card-auravisa'));
        return cards.map(c => {
          const rect = c.getBoundingClientRect();
          const img = c.querySelector('img');
          const header = c.querySelector('.team-advocate-header');
          const p = c.querySelector('p');
          return {
            height: rect.height,
            top: rect.top,
            bottom: rect.bottom,
            imgHeight: img ? img.getBoundingClientRect().height : null,
            headerTop: header ? header.getBoundingClientRect().top : null,
            headerHeight: header ? header.getBoundingClientRect().height : null,
            pTop: p ? p.getBoundingClientRect().top : null,
            pHeight: p ? p.getBoundingClientRect().height : null
          };
        });
      })()`,
      returnByValue: true
    });
    console.log('AURAVISA TEAM METRICS:', JSON.stringify(teamMetrics.result.value, null, 2));

    // Scroll to team and screenshot
    await send('Runtime.evaluate', { expression: 'document.getElementById("about-team").scrollIntoView()' });
    await new Promise(r => setTimeout(r, 500));
    const ssTeam = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/audit_team_full.png', Buffer.from(ssTeam.data, 'base64'));

    ws.close();
    chrome.kill();
  } catch (e) {
    console.error(e);
    chrome.kill();
  }
}

testScreenshots();
