#!/bin/bash

# Quick fix for rate limit issues
# This script temporarily disables API keys to use public RPC endpoints

echo "🔧 Fixing rate limit issues..."

# Create .env.local with public endpoints only
cat > .env.local << 'EOF'
# ChainBrawler Web UI - Rate Limit Fix
# Using public RPC endpoints to avoid rate limits

# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=b4e498515364475312f3eea4265b2180

# Disabled API keys to use public endpoints
# VITE_CONFLUX_API_KEY=
# VITE_ALCHEMY_API_KEY=
# VITE_INFURA_API_KEY=

# The app will automatically use public RPC endpoints
# This prevents hitting daily rate limits
EOF

echo "✅ Created .env.local with public RPC endpoints"
echo "🚀 The app will now use public endpoints instead of API keys"
echo "📝 To re-enable API keys later, edit .env.local and uncomment the API key lines"
echo ""
echo "🔄 Restart your development server:"
echo "   npm run dev"
