# ChainBrawler

> A blockchain-based RPG combat game built on Conflux eSpace with character creation, turn-based combat, equipment systems, and epoch-based leaderboards.

ChainBrawler is a fully on-chain RPG where players create characters, engage in tactical turn-based combat with enemies, collect equipment rewards, and compete in timed epochs for CFX prize pools. The game features sophisticated combat mathematics, treasury pool management, and a comprehensive SDK for integration.

## 🎮 Game Overview

- **Character System**: Create characters with 4 distinct classes (Warrior, Tank, Defender, Rogue)
- **Turn-Based Combat**: Engage enemies using combat skill, defense, endurance, and luck stats
- **Equipment & Rewards**: Earn equipment bonuses from combat victories
- **Epoch Leaderboards**: Compete in timed epochs for CFX prize distribution
- **Treasury Pools**: Distributed reward pools supporting sustainable gameplay economics

## 🏗️ Architecture

This monorepo contains the essential packages for ChainBrawler:

```
chainbrawler_dev/
├── packages/
│   ├── contract/     # Solidity smart contracts
│   ├── core/         # Core business logic and types
│   ├── react/        # React hooks and context providers
│   ├── utils/        # Development utilities and local node management
│   └── web-ui/       # Web-based game client (React + Wagmi)
```

## 📦 Package Overview

### Core Infrastructure

- **[@chainbrawler/contract](./packages/contract)** - Smart contracts deployed on Conflux eSpace
- **[@chainbrawler/core](./packages/core)** - Core business logic, types, and blockchain utilities
- **[@chainbrawler/react](./packages/react)** - React hooks, context providers, and web adapters
- **[@chainbrawler/utils](./packages/utils)** - Development utilities and local node management

### Client Applications

- **[@chainbrawler/web-ui](./packages/web-ui)** - Complete web-based game client with React and Wagmi

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 9.1.0
- **Conflux Node** (for local development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd chainbrawler_dev

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development Setup

1. **Start Local Development Environment**:
```bash
pnpm dev
```

2. **Run Web Client**:
```bash
pnpm web
```

3. **Build Specific Packages**:
```bash
pnpm build:core
pnpm build:react
pnpm build:contract
pnpm build:web-ui
```

## 🎯 Game Mechanics

### Character Classes
Four distinct character classes with different stat profiles:

- **Warrior (0)**: Balanced fighter - 12 Combat, 90 Endurance, 4 Defense, 2 Luck
- **Tank (1)**: Defensive specialist - 10 Combat, 120 Endurance, 6 Defense, 1 Luck  
- **Defender (2)**: Moderate attacker - 11 Combat, 100 Endurance, 7 Defense, 1 Luck
- **Rogue (3)**: High damage/luck - 13 Combat, 80 Endurance, 3 Defense, 4 Luck

### Combat System
- **Turn-based mechanics** with initiative based on stats
- **Combat Math**: Damage calculated using Combat, Defense, Endurance, and Luck
- **Weight system**: Combat(9), Defense(3), Luck(2), Endurance(0) with normalizer(14)
- **Level progression**: +2 Combat, +5 Endurance, +1 Defense per level
- **Experience-based leveling** with increasing XP requirements

### Equipment & Rewards
- **Equipment bonuses** applied to base character stats
- **Equipment reward pool** enhances drop rates based on pool size
- **Tiered multipliers** based on equipment pool balance
- **Combat victory rewards** with randomized equipment drops

### Treasury Pool System
Six distinct pools managing game economics:

- **Prize Pool**: Rewards for epoch leaderboard winners
- **Equipment Reward Pool**: Enhanced drop rates and equipment bonuses
- **Gas Refund Pool**: Transaction cost subsidies for players
- **Developer Fund**: Project development and maintenance funding
- **Next Epoch Reserve**: Future epoch prize allocation
- **Emergency Reserve**: Dispute resolution and emergency funds

### Epoch & Leaderboard System
- **Configurable epoch duration** (default: 7 days)
- **Player scoring** based on combat victories and enemy defeats
- **Top 10 qualification** for CFX prize distribution
- **Merkle tree distribution** (requires LeaderboardTreasury setup)
- **Real-time leaderboard** tracking during active epochs

## 🔧 Development

### Build Commands

```bash
# Build all packages
pnpm build

# Build specific packages
pnpm build:core
pnpm build:react
pnpm build:contract
pnpm build:web-ui

# Clean build artifacts
pnpm clean
```

### Development Environment

```bash
# Start full development environment
pnpm dev

# Stop development environment
pnpm dev:stop

# Deploy contracts and generate ABI
pnpm dev:init

# Run web client
pnpm web
```

## 🌐 Network Support

### Conflux eSpace
- **Mainnet**: Production deployment
- **Testnet**: Testing and development  
- **Local**: Development with local Conflux node (Chain ID: 2030)

### Supported Chains
- **Conflux eSpace Mainnet** (Chain ID: 1030)
- **Conflux eSpace Testnet** (Chain ID: 71)
- **Conflux eSpace Local** (Chain ID: 2030)

## 🔐 Security & Architecture

- **OpenZeppelin security patterns** - AccessControl, ReentrancyGuard
- **Bit-packed character storage** - Efficient on-chain data storage
- **Deterministic combat** - Reproducible results based on blockchain state
- **Treasury pool distribution** - Fair fee distribution across game systems
- **Comprehensive test coverage** - Contract and SDK testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/combat-enhancement`)
3. Commit your changes (`git commit -m 'Add combat feature'`)
4. Push to the branch (`git push origin feature/combat-enhancement`) 
5. Open a Pull Request

### Development Guidelines

- Follow existing TypeScript/Solidity patterns
- Add tests for new functionality
- Update documentation for API changes
- Ensure all packages build successfully (`pnpm build`)

## 📜 License

This project is licensed under the Apache-2.0 License - see individual package.json files for details.

## 🎮 Getting Started as a Player

### Web Client
1. Connect your Conflux eSpace wallet
2. Create a character (15 CFX fee)
3. Choose your class: Warrior, Tank, Defender, or Rogue
4. Fight enemies to gain experience and equipment
5. Compete in epoch leaderboards for prizes

### SDK Integration
Developers can integrate ChainBrawler into their applications:

```typescript
import { ChainBrawlerSDK } from '@chainbrawler/core'
import { useWebChainBrawler } from '@chainbrawler/react'

// Initialize ChainBrawler SDK
const chainBrawler = new ChainBrawlerSDK({
  address: contractAddress,
  chain: publicClient.chain,
  publicClient: publicClient,
  walletClient: walletClient
})

await chainBrawler.initialize()

// Use ChainBrawler methods
const hasCharacter = await chainBrawler.character.hasCharacter(playerAddress)
const poolData = await chainBrawler.getAllPoolData()
const currentEpoch = await chainBrawler.leaderboard.getCurrentEpoch()
```

## ⚠️ Important Notes

- **Experimental software** - Use at your own risk on public blockchains
- **Contract addresses** auto-generated during deployment
- **Game mechanics** subject to change during active development
- **Test thoroughly** on testnet before mainnet deployment
- **Private keys** never commit to version control

## 🔗 Links

- [Conflux Network](https://confluxnetwork.org/)
- [Conflux eSpace Documentation](https://doc.confluxnetwork.org/docs/espace)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)

## 💡 Key Features

- **Fully On-Chain**: All game state stored on blockchain
- **Deterministic Combat**: Reproducible combat results
- **Fair Economics**: Transparent treasury and reward distribution
- **Developer Friendly**: Comprehensive SDK and examples
- **Modern Web Interface**: React-based web client with wallet integration
- **Production Ready**: Security audited patterns and comprehensive testing

---

For detailed package-specific documentation, see the README files in each package directory.