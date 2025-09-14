# ChainBrawler Web UI

A complete web application for the ChainBrawler blockchain RPG game, built with React, Mantine, and TypeScript.

## 🚀 Features

- **Complete Game Interface**: Full blockchain RPG game experience
- **Modern Web Stack**: React 18, TypeScript, Vite, Mantine UI
- **Responsive Design**: Mobile-first design with touch-friendly controls
- **Web3 Integration**: Wallet connection and blockchain interaction
- **Beautiful UI**: Custom theming and animations
- **Error Handling**: Comprehensive error boundaries and loading states
- **Multi-Chain Support**: Conflux eSpace (Mainnet, Testnet, Local)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Mantine v7
- **Styling**: CSS-in-JS with custom themes
- **Routing**: React Router DOM
- **State Management**: React Context + Hooks
- **Web3**: Wagmi, Viem integration
- **Icons**: Tabler Icons
- **Build Tool**: Vite with TypeScript

## 📦 Dependencies

- `@chainbrawler/core` - Core game logic and types
- `@chainbrawler/react` - React hooks and context providers
- `@mantine/core` - Mantine UI components
- `@mantine/hooks` - Mantine hooks
- `@mantine/notifications` - Notifications system
- `@mantine/modals` - Modal system
- `react-router-dom` - Client-side routing
- `wagmi` - Web3 React hooks
- `viem` - TypeScript interface for Ethereum
- `connectkit` - Wallet connection UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MetaMask wallet

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Development Server

The development server runs on `http://localhost:3001` by default.

## 🎮 Game Features

### Welcome Screen
- Beautiful landing page with game features
- Statistics and social links
- Smooth onboarding experience

### Main Game Interface
- **Character Creation**: Create and customize your character
- **Character Management**: View stats, equipment, and skills
- **Combat System**: Turn-based combat with enemies
- **Equipment System**: Collect and manage equipment rewards
- **Leaderboard**: Compete in epoch-based competitions
- **Treasury Pools**: View and interact with game economy

### Wallet Integration
- **Multi-Chain Support**: Conflux eSpace Mainnet, Testnet, and Local
- **MetaMask Integration**: Seamless wallet connection
- **Chain Switching**: Automatic chain detection and switching
- **Transaction Management**: Real-time transaction status

## 🌐 Supported Networks

### Conflux eSpace Mainnet (Chain ID: 1030)
- Production deployment
- Real CFX rewards
- Full game functionality

### Conflux eSpace Testnet (Chain ID: 71)
- Testing and development
- Free testnet CFX
- Full game functionality

### Conflux eSpace Local (Chain ID: 2030)
- Local development
- Custom gas settings
- Full debugging capabilities

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm dev-simple       # Start with simple Vite config

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm check-module     # Check module exports
```

### Environment Variables

Create a `.env.local` file in the web-ui directory:

```env
# RPC API Keys (optional - uses public RPCs if not set)
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_INFURA_API_KEY=your_infura_key
VITE_CONFLUX_API_KEY=your_conflux_key
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── WalletConnection.tsx
│   ├── RPCStatus.tsx
│   └── ErrorBoundary.tsx
├── features/            # Feature-specific components
│   ├── game/           # Main game interface
│   ├── character/      # Character management
│   ├── combat/         # Combat system
│   ├── pools/          # Treasury pools
│   ├── leaderboard/    # Leaderboard
│   └── claims/         # Rewards and claims
├── hooks/              # Custom React hooks
├── config/             # Configuration files
│   ├── wagmi.ts        # Wagmi configuration
│   ├── chains.ts       # Chain definitions
│   ├── gas.ts          # Gas configuration
│   └── connectors.ts   # Wallet connectors
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🎯 Game Mechanics

### Character Classes
- **Warrior**: Balanced fighter (12 Combat, 90 Endurance, 4 Defense, 2 Luck)
- **Tank**: Defensive specialist (10 Combat, 120 Endurance, 6 Defense, 1 Luck)
- **Defender**: Moderate attacker (11 Combat, 100 Endurance, 7 Defense, 1 Luck)
- **Rogue**: High damage/luck (13 Combat, 80 Endurance, 3 Defense, 4 Luck)

### Combat System
- Turn-based combat with strategic depth
- Equipment bonuses and stat progression
- Multiple enemy types with different difficulty levels
- Flee mechanics for tactical gameplay

### Economy
- Six treasury pools managing game economics
- Epoch-based leaderboard competitions
- Equipment reward system
- Gas refund mechanisms

## 🔐 Security

- **Wallet Security**: MetaMask integration with secure connection
- **Transaction Safety**: Gas estimation and transaction validation
- **Error Handling**: Comprehensive error boundaries and recovery
- **Input Validation**: Client-side validation for all user inputs

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# The built files will be in the dist/ directory
```

### Docker Deployment

```bash
# Build Docker image
docker build -t chainbrawler-web-ui .

# Run container
docker run -p 3000:3000 chainbrawler-web-ui
```

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Ensure MetaMask is installed and unlocked
   - Check if you're on a supported network
   - Try refreshing the page

2. **Transaction Failures**
   - Check your CFX balance for gas fees
   - Ensure you're on the correct network
   - Try increasing gas limit

3. **Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check TypeScript errors: `pnpm build`

### Debug Mode

Enable debug logging by opening browser console and looking for debug messages prefixed with:
- `🔍` - General debugging
- `🎯` - Component-specific debugging
- `⚡` - Performance debugging

## 📚 Documentation

- [Wallet Connection Guide](./WALLET_CONNECTION_GUIDE.md)
- [RPC Configuration](./RPC_CONFIGURATION.md)
- [Local Chain Integration](./LOCAL_CHAIN_INTEGRATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

Apache-2.0

## 🔗 Links

- [ChainBrawler Core](../core/README.md)
- [ChainBrawler React](../react/README.md)
- [Conflux Network](https://confluxnetwork.org/)
- [Mantine UI](https://mantine.dev/)
- [Wagmi](https://wagmi.sh/)