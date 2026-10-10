import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/Users/waytoahmed/.gemini/antigravity-ide/brain/e50ec1d1-717a-4274-aabd-53b52bef87d8/screenshots';
fs.mkdirSync(OUT_DIR, { recursive: true });

const SCREENS = [
  { id: 'splash',      label: 'Splash',             step: '00' },
  { id: 'auth',        label: 'Sign in',             step: '01' },
  { id: 'scan',        label: 'Scan machine',        step: '02' },
  { id: 'connecting',  label: 'BLE connection',      step: '03' },
  { id: 'reservation', label: 'Reserve machine',     step: '04' },
  { id: 'calibration', label: 'Calibration',         step: '05' },
  { id: 'tracking',    label: 'Live tracking',       step: '06' },
  { id: 'rest',        label: 'Rest timer',          step: '07' },
  { id: 'summary',     label: 'Session summary',     step: '08' },
  { id: 'profile',     label: 'Profile & progress',  step: '09' },
  { id: 'unavailable', label: 'Machine reserved',    step: '10' },
];

const SIDEBAR_LABELS = {
  splash: 'Splash',
  auth: 'Sign in',
  scan: 'Scan machine',
  connecting: 'BLE connection',
  reservation: 'Reserve machine',
  calibration: 'Calibration',
  tracking: 'Live tracking',
  rest: 'Rest timer',
  summary: 'Session summary',
  profile: 'Profile',
  unavailable: 'Machine reserved',
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to app...');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));

  const screenshotPaths = [];

  for (const screen of SCREENS) {
    console.log(`Capturing: ${screen.step} ${screen.label}`);
    const sidebarLabel = SIDEBAR_LABELS[screen.id];
    
    const clicked = await page.evaluate((label) => {
      const nav = document.querySelector('aside nav');
      if (!nav) return false;
      const buttons = nav.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes(label)) {
          btn.click();
          return true;
        }
      }
      return false;
    }, sidebarLabel);

    if (!clicked) console.warn(`  Could not click nav for "${sidebarLabel}"`);

    await new Promise(r => setTimeout(r, 1800));

    const phoneEl = await page.$('main');
    const filename = `${screen.step}_${screen.id}.png`;
    const filepath = path.join(OUT_DIR, filename);
    
    if (phoneEl) {
      await phoneEl.screenshot({ path: filepath });
    } else {
      await page.screenshot({ path: filepath });
    }
    
    screenshotPaths.push({ ...screen, filepath, filename });
    console.log(`  Saved: ${filename}`);
  }

  await browser.close();
  console.log('\nDone!');
  
  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(
    screenshotPaths.map(s => ({ step: s.step, label: s.label, id: s.id, filename: s.filename, filepath: s.filepath })),
    null, 2
  ));
})();
