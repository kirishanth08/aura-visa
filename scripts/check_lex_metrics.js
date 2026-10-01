const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function checkBoth() {
  const lexDir = path.resolve(__dirname, '../../lex-Vanguard');
  const server = spawn('node', ['-e', `
    const http = require('http');
    const fs = require('fs');
    const path = require('path');
    const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.jpg': 'image/jpeg', '.png': 'image/png' };
    http.createServer((req, res) => {
      let p = req.url.split('?')[0];
      if (p === '/') p = '/index.html';
      const f = path.join('${lexDir.replace(/\\/g, '\\\\')}', p);
      fs.readFile(f, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not found'); return; }
        const ext = path.extname(f);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
        res.end(data);
      });
    }).listen(5098);
  `]);

  await new Promise(r => setTimeout(r, 1000));

  const profileDir = path.join(os.tmpdir(), 'chrome_both_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9445',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9445/json/new?http://localhost:5098/about.html', { method: 'PUT' });
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
    await send('Page.navigate', { url: 'http://localhost:5098/about.html' });
    await new Promise(r => setTimeout(r, 1500));
    await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1100, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 400));

    const lexMetrics = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.team-card'));
        return cards.map(c => {
          const rect = c.getBoundingClientRect();
          const img = c.querySelector('img');
          const name = c.querySelector('.team-name');
          const role = c.querySelector('.team-role');
          const bio = c.querySelector('.team-bio');
          const soc = c.querySelector('.team-socials');
          return {
            cardH: rect.height,
            cardTop: rect.top,
            imgH: img ? img.getBoundingClientRect().height : null,
            nameTop: name ? name.getBoundingClientRect().top : null,
            roleTop: role ? role.getBoundingClientRect().top : null,
            roleH: role ? role.getBoundingClientRect().height : null,
            bioTop: bio ? bio.getBoundingClientRect().top : null,
            bioH: bio ? bio.getBoundingClientRect().height : null,
            socTop: soc ? soc.getBoundingClientRect().top : null
          };
        });
      })()`,
      returnByValue: true
    });
    console.log('LEX-VANGUARD TEAM METRICS:', JSON.stringify(lexMetrics.result.value, null, 2));

    ws.close();
    chrome.kill();
    server.kill();
  } catch (e) {
    console.error(e);
    chrome.kill();
    server.kill();
  }
}

checkBoth();
