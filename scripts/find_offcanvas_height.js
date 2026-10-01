const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

async function debug() {
  const env = Object.assign({}, process.env, { PORT: '5055' });
  const server = spawn('node', ['dev-server.js'], { cwd: process.cwd(), env });
  await new Promise(r => setTimeout(r, 1000));

  const profileDir = path.join(os.tmpdir(), 'chrome_debug_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9557',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9557/json/new?http://localhost:5055/index.html', { method: 'PUT' });
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
    await send('CSS.enable');
    await send('Page.navigate', { url: 'http://localhost:5055/index.html' });
    await new Promise(r => setTimeout(r, 2000));

    await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 1, mobile: true });
    await new Promise(r => setTimeout(r, 500));

    const doc = await send('DOM.getDocument');
    const nodeRes = await send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: '#offcanvasNavbar' });
    const matched = await send('CSS.getMatchedStylesForNode', { nodeId: nodeRes.nodeId });

    console.log('Matched rules for #offcanvasNavbar:');
    matched.matchedCSSRules.forEach(r => {
      const heightProps = r.rule.style.cssProperties.filter(p => p.name.includes('height'));
      if (heightProps.length > 0) {
        console.log('Selector:', r.rule.selectorList.text);
        console.log('Origin:', r.rule.origin);
        heightProps.forEach(p => console.log(`  ${p.name}: ${p.value} (${p.important ? '!important' : ''})`));
      }
    });

    ws.close();
  } finally {
    chrome.kill();
    server.kill();
  }
}
debug();
