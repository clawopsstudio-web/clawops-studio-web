const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to Paperclip...');
    await page.goto('https://vmi3094584-1.tailec7a72.ts.net/command-center/', { timeout: 30000, waitUntil: 'networkidle0' });
    
    // Wait for page to fully load
    await page.waitForTimeout(5000);
    
    console.log('Page title:', await page.title());
    console.log('Current URL:', page.url());
    
    // Check if there's a login form
    const bodyText = await page.textContent('body');
    console.log('Body text (first 500 chars):', bodyText.substring(0, 500));
    
    // Look for any visible elements
    const buttons = await page.$$('button');
    console.log('Number of buttons:', buttons.length);
    
    // Take screenshot
    await page.screenshot({ path: '/root/.openclaw/workspaces/arjun/paperclip-screenshot.png', fullPage: true });
    console.log('Screenshot saved');
    
    // Try to find and click any "Agents" or "Team" menu
    const navItems = await page.$$('nav a, .nav-item, [role="menuitem"]');
    console.log('Nav items found:', navItems.length);
    
    // Get all links
    const links = await page.$$eval('a', els => els.map(e => ({ text: e.textContent.trim(), href: e.href })).slice(0, 20));
    console.log('Links:', JSON.stringify(links, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
