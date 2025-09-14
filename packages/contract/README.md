# @chainbrawler/contract

Smart contracts for the ChainBrawler blockchain game built with Hardhat and Solidity.

## Overview

This package contains the core smart contracts that power the ChainBrawler game, including character management, combat mechanics, reward systems, and governance features. Built with Solidity and deployed on Conflux Espace.

## Features

- **Character System**: Create and manage game characters with different classes
- **Combat Mechanics**: Turn-based combat with enemies and rewards
- **Reward System**: XP, equipment drops, and token rewards
- **Governance**: Pool management and community features
- **Security**: Comprehensive testing and auditing tools

## Smart Contracts

### Core Contracts

- **ChainBrawlerClean**: Main game contract with character and combat logic
- **ChainBrawlerState**: State management and storage
- **CombatEngine**: Combat mechanics and calculations
- **LeaderboardManager**: Leaderboard and scoring system
- **LeaderboardTreasury**: Prize pool and reward distribution

### Character System

Characters have four classes with different stat distributions:

| Class | Combat | Endurance | Defense | Luck | Specialization |
|-------|--------|-----------|---------|------|----------------|
| Warrior | 12 | 90 | 4 | 2 | Balanced fighter (baseline) |
| Tank | 10 | 120 | 6 | 1 | High defense and HP |
| Defender | 11 | 100 | 7 | 1 | High defense, moderate stats |
| Rogue | 13 | 80 | 3 | 4 | High attack and luck |

### Combat System

- Turn-based combat with multiple rounds
- Enemy scaling based on level and difficulty
- Equipment drops and XP rewards
- Flee mechanics for strategic gameplay

## Installation

```bash
# This package is private and used internally within the monorepo
pnpm install
```

## Development

### Prerequisites

- Node.js 18+
- PNPM package manager
- Conflux Espace testnet access
- Hardhat development environment

### Scripts

```bash
# Compile contracts
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm coverage

# Generate documentation
pnpm doc

# Lint Solidity code
pnpm lint

# Format Solidity code
pnpm format

# Run all checks
pnpm check
```

### Environment Setup

The main environment variable needed is the deployer mnemonic:

```env
# Required: Deployer mnemonic for wallet operations
HARDHAT_VAR_DEPLOYER_MNEMONIC=your_twelve_word_mnemonic_phrase_here
```

**Note**: All other configuration (RPC URLs, network settings, etc.) is already configured in `hardhat.config.ts`. Only the mnemonic needs to be set for full functionality.

## Testing

The contract suite includes comprehensive tests:

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test test/chainbrawler.test.ts

# Run with gas reporting
GAS_REPORT=true pnpm test

# Run with coverage
pnpm coverage
```

### Test Structure

- **Unit Tests**: Individual function testing (`units/` directory)
- **Integration Tests**: Multi-contract interactions (`integration/` directory)
- **Gas Tests**: Gas usage optimization and reporting
- **Comprehensive Tests**: Full game flow testing
- **Bug Reproduction Tests**: Specific issue validation

## Deployment

### Local Development

```bash
# Start local Conflux node
npx hardhat node

# Deploy to local network
npx hardhat ignition deploy ignition/modules/ChainBrawlerModule.ts --network localhost
```

### Testnet Deployment

```bash
# Deploy to Conflux Espace testnet
npx hardhat ignition deploy ignition/modules/ChainBrawlerModule.ts --network confluxEspaceTestnet
```

### Mainnet Deployment

```bash
# Deploy to Conflux Espace mainnet
npx hardhat ignition deploy ignition/modules/ChainBrawlerModule.ts --network confluxEspace
```

## Code Quality

### Solidity Linting

The project uses Solhint for Solidity code quality:

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

### Code Formatting

Prettier with Solidity plugin for consistent formatting:

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Security

- **OpenZeppelin**: Battle-tested security patterns
- **Hardhat Security**: Built-in security plugins
- **Coverage Reports**: Comprehensive test coverage
- **Gas Optimization**: Efficient contract design

## Documentation

Generate contract documentation:

```bash
# Generate NatSpec documentation
pnpm doc
```

Documentation is generated in the `docs/` directory with detailed function descriptions, parameters, and usage examples.

## Architecture

### Design Patterns

- **State Pattern**: Separated state management in ChainBrawlerState
- **Library Pattern**: Reusable combat logic in CombatEngine
- **Access Control**: Role-based permissions with OpenZeppelin
- **Modular Architecture**: Separated concerns across multiple contracts

### Gas Optimization

- **Packed Structs**: Efficient storage layout
- **Batch Operations**: Reduced transaction costs
- **Event Optimization**: Minimal event data
- **Function Optimization**: Efficient algorithms

## Dependencies

- **Hardhat**: Development framework
- **OpenZeppelin**: Security libraries and access control
- **Viem**: TypeScript interface for Ethereum
- **Solhint**: Solidity linter
- **Prettier**: Code formatter with Solidity plugin
- **Solidity Coverage**: Test coverage reporting
- **Hardhat Ignition**: Deployment management

## License

ISC License - See LICENSE file for details.
