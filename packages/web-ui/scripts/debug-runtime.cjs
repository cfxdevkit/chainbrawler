#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureRuntimeErrors() {
  console.log('🔍 Starting headless browser to capture runtime errors...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  
  // Capture console messages
  const consoleMessages = [];
  const errors = [];
  const warnings = [];
  const logs = [];

  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    const timestamp = new Date().toISOString();
    
    const message = {
      timestamp,
      type,
      text,
      location: msg.location()
    };

    consoleMessages.push(message);

    switch (type) {
      case 'error':
        errors.push(message);
        console.error(`❌ [${timestamp}] ${text}`);
        break;
      case 'warning':
        warnings.push(message);
        console.warn(`⚠️  [${timestamp}] ${text}`);
        break;
      case 'log':
        logs.push(message);
        console.log(`📝 [${timestamp}] ${text}`);
        break;
      default:
        console.log(`ℹ️  [${timestamp}] ${text}`);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    const timestamp = new Date().toISOString();
    const errorMessage = {
      timestamp,
      type: 'pageerror',
      text: error.message,
      stack: error.stack,
      location: { url: page.url() }
    };
    
    errors.push(errorMessage);
    console.error(`💥 [${timestamp}] Page Error: ${error.message}`);
  });

  // Capture network errors
  page.on('requestfailed', request => {
    const timestamp = new Date().toISOString();
    const errorMessage = {
      timestamp,
      type: 'network',
      text: `Request failed: ${request.url()}`,
      url: request.url(),
      failure: request.failure()
    };
    
    errors.push(errorMessage);
    console.error(`🌐 [${timestamp}] Network Error: ${request.url()}`);
  });

  try {
    console.log('🌐 Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    console.log('⏳ Waiting for page to load completely...');
    await page.waitForTimeout(5000);

    // Try to interact with the page to trigger any lazy-loaded errors
    console.log('🖱️  Interacting with page elements...');
    
    // Click on any buttons or elements that might trigger errors
    try {
      await page.click('button');
    } catch (e) {
      // Ignore if no buttons found
    }

    // Wait a bit more for any async operations
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('❌ Error during page navigation:', error.message);
    errors.push({
      timestamp: new Date().toISOString(),
      type: 'navigation',
      text: error.message,
      stack: error.stack
    });
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    url: 'http://localhost:3000',
    summary: {
      totalMessages: consoleMessages.length,
      errors: errors.length,
      warnings: warnings.length,
      logs: logs.length
    },
    errors,
    warnings,
    logs,
    allMessages: consoleMessages
  };

  // Save report to file
  const reportPath = path.join(__dirname, '../debug-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('\n📊 Runtime Error Report:');
  console.log('========================');
  console.log(`Total Messages: ${consoleMessages.length}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Logs: ${logs.length}`);
  console.log(`\n📄 Full report saved to: ${reportPath}`);

  if (errors.length > 0) {
    console.log('\n❌ ERRORS FOUND:');
    console.log('================');
    errors.forEach((error, index) => {
      console.log(`\n${index + 1}. [${error.timestamp}] ${error.type.toUpperCase()}`);
      console.log(`   Message: ${error.text}`);
      if (error.location) {
        console.log(`   Location: ${JSON.stringify(error.location)}`);
      }
      if (error.stack) {
        console.log(`   Stack: ${error.stack}`);
      }
    });
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    console.log('=============');
    warnings.forEach((warning, index) => {
      console.log(`\n${index + 1}. [${warning.timestamp}] ${warning.text}`);
    });
  }

  await browser.close();
  console.log('\n✅ Browser closed. Debug session complete.');
}

// Run the debug session
captureRuntimeErrors().catch(console.error);
