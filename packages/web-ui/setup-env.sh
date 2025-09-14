#!/bin/bash

# ChainBrawler Web UI - Environment Setup Script
# This script helps you set up the environment variables for the web-ui package

echo "🔧 Setting up ChainBrawler Web UI Environment Variables..."

# Create .env.local file
cat > .env.local << 'EOF'
# ChainBrawler Web UI - Local Environment Variables
# This file is for local development and should not be committed to version control

# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=b4e498515364475312f3eea4265b2180

# Conflux RPC Pro-Service API Key
VITE_CONFLUX_API_KEY=6sgTmSuJbfBH6yp2i1ic4NUbfmjVbAVYFHvA4jPN78W1e123ntVXnukn9UAyZmR56hNGNLPtWZHBDgFY8AyvHDtwu

# Optional: Add other API keys if you have them
# VITE_ALCHEMY_API_KEY=your_alchemy_key_here
# VITE_INFURA_API_KEY=your_infura_key_here
EOF

echo "✅ Created .env.local file with your Conflux API key"
echo "🔗 Your Conflux RPC Pro-Service will be used for better performance and reliability"
echo ""
echo "📝 To use additional RPC providers, edit .env.local and add:"
echo "   - VITE_ALCHEMY_API_KEY=your_alchemy_key"
echo "   - VITE_INFURA_API_KEY=your_infura_key"
echo ""
echo "🚀 You can now run 'npm run dev' to start the development server"
