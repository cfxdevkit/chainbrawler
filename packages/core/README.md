# @chainbrawler/core

Core business logic for ChainBrawler - environment agnostic blockchain RPG game engine.

## Overview

The core package contains all the essential business logic, types, and utilities for the ChainBrawler blockchain RPG game. It's designed to be environment-agnostic, working in both Node.js and browser environments.

## Features

- **Character Management**: Character creation, stats, leveling, and progression
- **Combat System**: Turn-based combat mechanics with deterministic results
- **Equipment System**: Equipment rewards and stat bonuses
- **Treasury Pools**: Six distinct pools managing game economics
- **Leaderboard System**: Epoch-based competitive scoring
- **Blockchain Integration**: Viem-based contract interaction
- **Type Safety**: Comprehensive TypeScript types and interfaces

## Installation

```bash
pnpm add @chainbrawler/core
```

## Quick Start

```typescript
import { ChainBrawlerSDK } from '@chainbrawler/core'

// Initialize the SDK
const chainBrawler = new ChainBrawlerSDK({
  address: contractAddress,
  chain: publicClient.chain,
  publicClient: publicClient,
  walletClient: walletClient
})

await chainBrawler.initialize()

// Check if player has character
const hasCharacter = await chainBrawler.character.hasCharacter(playerAddress)

// Create a character
const result = await chainBrawler.character.createCharacter(0) // Warrior class

// Fight an enemy
const fightResult = await chainBrawler.combat.fightEnemy(enemyId)
```

## API Reference

### Character Operations

```typescript
// Character management
await chainBrawler.character.hasCharacter(address)
await chainBrawler.character.createCharacter(classId)
await chainBrawler.character.getCharacter(address)
await chainBrawler.character.healCharacter()
await chainBrawler.character.resurrectCharacter()
```

### Combat System

```typescript
// Combat operations
await chainBrawler.combat.fightEnemy(enemyId)
await chainBrawler.combat.continueFight()
await chainBrawler.combat.fleeRound()
```

### Pool Management

```typescript
// Pool data
const pools = await chainBrawler.pools.getAllPoolData()
const pool = await chainBrawler.pools.getPoolData(poolId)
```

### Leaderboard

```typescript
// Leaderboard operations
const leaderboard = await chainBrawler.leaderboard.getCurrentEpoch()
const playerScore = await chainBrawler.leaderboard.getPlayerScore(address)
```

## Types

### Character Data

```typescript
interface CharacterData {
  exists: boolean
  isAlive: boolean
  class: number
  className: string
  level: number
  experience: number
  endurance: {
    current: number
    max: number
    percentage: number
  }
  stats: {
    combat: number
    defense: number
    luck: number
  }
  equipment: EquipmentData[]
  inCombat: boolean
  combatState?: CombatState
  totalKills: number
}
```

### Combat System

```typescript
interface CombatState {
  enemyId: number
  enemyLevel: number
  roundsElapsed: number
  playerHealthRemaining: number
  enemyHealthRemaining: number
  isPlayerTurn: boolean
}
```

## Configuration

The SDK requires a configuration object with blockchain connection details:

```typescript
interface ChainBrawlerConfig {
  address: `0x${string}`
  chain: Chain
  publicClient: PublicClient
  walletClient: WalletClient
  wagmiConfig: Config
  contractClient?: ContractClient
}
```

## Dependencies

- **viem**: TypeScript interface for Ethereum
- **zustand**: State management

## Development

```bash
# Build the package
pnpm build

# Run tests
pnpm test

# Watch mode
pnpm dev
```

## License

Apache-2.0
