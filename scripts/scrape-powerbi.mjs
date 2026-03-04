import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const URL = 'https://app.powerbi.com/view?r=eyJrIjoiOWU4MjlmYTktNjE2MS00OGRhLTgwMjYtZWZhNTFhZmRhZjI2IiwidCI6IjZlZjAyOWFiLTNmZDctNGQ5OC05YjBlLWQxZjVmZWRlYTZkMSIsImMiOjh9&pageName=ffe4f1f9018d7bd035bc';

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Opening Power BI dashboard...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Wait for the report to fully render
  console.log('Waiting for report to load...');
  await page.waitForTimeout(15000);

  // Take a screenshot for debugging
  await page.screenshot({ path: 'scripts/powerbi-screenshot.png', fullPage: true });
  console.log('Screenshot saved to scripts/powerbi-screenshot.png');

  // Try to extract text content from the visual elements
  const items = await page.evaluate(() => {
    const results = [];

    // Power BI renders in various ways, try multiple selectors
    const selectors = [
      // Matrix/table cells
      '.tablixCellContent',
      '.bi-dashboard-card',
      // Visual containers
      '.visual-sandbox iframe',
      // Generic text elements in visuals
      '[class*="textRun"]',
      '[class*="cell"]',
      '.pivotTableCellWrap',
      // Try broader selectors
      '.visualContainer text',
      'text',
      '.label',
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log(`Found ${elements.length} elements with selector: ${selector}`);
        elements.forEach(el => {
          const text = el.textContent?.trim();
          if (text && text.length > 2 && text.length < 200) {
            results.push({ text, selector });
          }
        });
      }
    }

    // Also get all text content from the page body
    const allText = document.body.innerText;

    return { items: results, allText: allText.substring(0, 10000) };
  });

  console.log(`Found ${items.items.length} items`);
  console.log('Page text (first 3000 chars):', items.allText.substring(0, 3000));

  writeFileSync('scripts/scraped-data.json', JSON.stringify(items, null, 2));
  console.log('Data saved to scripts/scraped-data.json');

  await browser.close();
}

scrape().catch(console.error);
