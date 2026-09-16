const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

async function debugAbout() {
  const profileDir = path.join(os.tmpdir(), 'chrome_cdp_profile_' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=' + profileDir
  ]);
  await new Promise(r => setTimeout(r, 1500));

  const listRes = await fetch('http://localhost:9222/json/new?http://localhost:3000/about.html', { method: 'PUT' });
  const target = await listRes.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (msg) => {
    const res = JSON.parse(msg.data);
    if (res.id && callbacks.has(res.id)) {
      callbacks.get(res.id).resolve(res.result);
      callbacks.delete(res.id);
    }
  };
  await new Promise(r => ws.onopen = r);
  const send = (method, params = {}) => new Promise(resolve => {
    const msgId = id++;
    callbacks.set(msgId, { resolve });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await send('Emulation.setDeviceMetricsOverride', { width: 1000, height: 800, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 400));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const nav = document.querySelector('.navbar-auravisa');
      const actions = document.querySelector('.navbar-auravisa .offcanvas-body .d-flex.align-items-center.gap-2');
      const btns = actions ? Array.from(actions.children).map(c => ({ t: c.innerText.trim(), top: Math.round(c.getBoundingClientRect().top), l: Math.round(c.getBoundingClientRect().left), w: Math.round(c.getBoundingClientRect().width) })) : [];
      const brand = document.querySelector('.navbar-auravisa .brand-logo').getBoundingClientRect();
      const navNav = document.querySelector('.navbar-auravisa .navbar-nav').getBoundingClientRect();
      const container = document.querySelector('.navbar-auravisa > .container').getBoundingClientRect();
      const links = Array.from(document.querySelectorAll('.navbar-auravisa .navbar-nav .nav-link')).map(l => ({
        t: l.innerText.trim(),
        top: Math.round(l.getBoundingClientRect().top),
        w: Math.round(l.getBoundingClientRect().width)
      }));
      return {
        navHeight: nav.offsetHeight,
        container: { w: Math.round(container.width), l: Math.round(container.left) },
        brand: { w: Math.round(brand.width), r: Math.round(brand.right) },
        navNav: { w: Math.round(navNav.width), l: Math.round(navNav.left), r: Math.round(navNav.right), top: Math.round(navNav.top) },
        btns,
        links
      };
    })()`,
    returnByValue: true
  });
  console.log(JSON.stringify(evalRes.result.value, null, 2));
  ws.close();
  chrome.kill();
}
debugAbout();
