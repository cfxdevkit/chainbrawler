#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function debugExports() {
  console.log('🔍 Debugging export issues with headless browser...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Capture all console messages
  const messages = [];
  
  page.on('console', msg => {
    const message = {
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    };
    messages.push(message);
    
    if (msg.type() === 'error') {
      console.error(`❌ ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      console.warn(`⚠️  ${msg.text()}`);
    } else {
      console.log(`ℹ️  ${msg.text()}`);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.error(`💥 Page Error: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
  });

  try {
    console.log('🌐 Loading http://localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    console.log('⏳ Waiting for modules to load...');
    await page.waitForTimeout(10000);

    // Try to access the problematic module directly
    console.log('🔍 Checking module exports...');
    
    const moduleCheck = await page.evaluate(() => {
      const results = [];
      
      // Check if we can access the react-ui module
      try {
        // This will trigger the import and show any errors
        const reactUIPath = '/@fs/workspaces/chainbrawler_dev/packages/react-ui/dist/index.js';
        results.push(`Attempting to access: ${reactUIPath}`);
        
        // Try to fetch the module
        return fetch(reactUIPath)
          .then(response => {
            results.push(`Response status: ${response.status}`);
            return response.text();
          })
          .then(text => {
            results.push(`Module content length: ${text.length}`);
            results.push(`Contains formatDamage: ${text.includes('formatDamage')}`);
            results.push(`Contains exports: ${text.includes('exports')}`);
            return results;
          })
          .catch(error => {
            results.push(`Fetch error: ${error.message}`);
            return results;
          });
      } catch (error) {
        results.push(`Evaluation error: ${error.message}`);
        return results;
      }
    });

    console.log('📋 Module Check Results:');
    console.log(moduleCheck);

  } catch (error) {
    console.error('❌ Error during debugging:', error.message);
  }

  // Filter for export-related errors
  const exportErrors = messages.filter(msg => 
    msg.text.includes('formatDamage') || 
    msg.text.includes('export') || 
    msg.text.includes('module') ||
    msg.text.includes('import')
  );

  console.log('\n📊 Export-related messages:');
  console.log('============================');
  exportErrors.forEach((msg, index) => {
    console.log(`\n${index + 1}. [${msg.type.toUpperCase()}] ${msg.text}`);
  });

  await browser.close();
  console.log('\n✅ Debug session complete.');
}

debugExports().catch(console.error);
