const { chromium } = require('playwright');

async function debugChainBrawler() {
  console.log('🚀 Starting headless browser debugging...');
  
  const browser = await chromium.launch({ 
    headless: false, // Set to true for headless mode
    devtools: true   // Open devtools for debugging
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  // Capture console logs
  const logs = [];
  context.on('console', msg => {
    const logEntry = {
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    };
    logs.push(logEntry);
    console.log(`[${logEntry.timestamp}] ${logEntry.type.toUpperCase()}: ${logEntry.text}`);
  });
  
  // Capture page errors
  const errors = [];
  context.on('page', page => {
    page.on('pageerror', error => {
      const errorEntry = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      errors.push(errorEntry);
      console.error(`[${errorEntry.timestamp}] PAGE ERROR: ${errorEntry.message}`);
    });
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(3000);
    
    // Check if wallet connection screen is visible
    const walletConnectionVisible = await page.isVisible('[data-testid="wallet-connection"]');
    console.log('🔌 Wallet connection screen visible:', walletConnectionVisible);
    
    // Look for ConnectKit modal or wallet connection elements
    const connectButton = await page.locator('button:has-text("Connect")').first();
    const connectButtonExists = await connectButton.isVisible().catch(() => false);
    console.log('🔗 Connect button found:', connectButtonExists);
    
    if (connectButtonExists) {
      console.log('🖱️ Clicking connect button...');
      await connectButton.click();
      await page.waitForTimeout(2000);
    }
    
    // Check for any fight-related elements
    const fightButton = await page.locator('button:has-text("Fight")').first();
    const fightButtonExists = await fightButton.isVisible().catch(() => false);
    console.log('⚔️ Fight button found:', fightButtonExists);
    
    if (fightButtonExists) {
      console.log('🖱️ Clicking fight button...');
      await fightButton.click();
      await page.waitForTimeout(2000);
    }
    
    // Look for any error messages or status indicators
    const errorElements = await page.locator('[class*="error"], [class*="Error"]').all();
    console.log('❌ Error elements found:', errorElements.length);
    
    for (let i = 0; i < errorElements.length; i++) {
      const text = await errorElements[i].textContent();
      console.log(`   Error ${i + 1}: ${text}`);
    }
    
    // Check for any status messages
    const statusElements = await page.locator('[class*="status"], [class*="Status"]').all();
    console.log('📊 Status elements found:', statusElements.length);
    
    for (let i = 0; i < statusElements.length; i++) {
      const text = await statusElements[i].textContent();
      console.log(`   Status ${i + 1}: ${text}`);
    }
    
    // Wait a bit more to capture any delayed logs
    console.log('⏳ Waiting for additional logs...');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Error during debugging:', error);
  } finally {
    console.log('\n📋 SUMMARY:');
    console.log(`   Total console logs: ${logs.length}`);
    console.log(`   Total errors: ${errors.length}`);
    
    // Filter relevant logs
    const relevantLogs = logs.filter(log => 
      log.text.includes('ChainBrawler') || 
      log.text.includes('fightEnemy') || 
      log.text.includes('wallet') ||
      log.text.includes('contract') ||
      log.text.includes('WagmiContractClient') ||
      log.text.includes('CombatOperations')
    );
    
    console.log(`   Relevant logs: ${relevantLogs.length}`);
    
    if (relevantLogs.length > 0) {
      console.log('\n🔍 RELEVANT LOGS:');
      relevantLogs.forEach((log, index) => {
        console.log(`   ${index + 1}. [${log.type}] ${log.text}`);
      });
    }
    
    if (errors.length > 0) {
      console.log('\n❌ ERRORS:');
      errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.message}`);
      });
    }
    
    await browser.close();
  }
}

// Run the debug function
debugChainBrawler().catch(console.error);



