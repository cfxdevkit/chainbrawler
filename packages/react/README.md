# @chainbrawler/react

React adapter for ChainBrawler - hooks, context providers, and web-specific components.

## Overview

The react package provides React-specific hooks, context providers, and adapters for integrating ChainBrawler into React applications. It bridges the core SDK with React's component lifecycle and state management.

## Features

- **React Hooks**: Custom hooks for game state and operations
- **Context Providers**: React context for global state management
- **Web Adapters**: Browser-specific implementations
- **Type Safety**: Full TypeScript support
- **State Management**: Reactive state updates and subscriptions

## Installation

```bash
pnpm add @chainbrawler/react
```

## Quick Start

```typescript
import { WebChainBrawlerProvider, useWebChainBrawlerContext } from '@chainbrawler/react'

// Wrap your app with the provider
function App() {
  return (
    <WebChainBrawlerProvider config={chainBrawlerConfig}>
      <GameComponent />
    </WebChainBrawlerProvider>
  )
}

// Use the context in components
function GameComponent() {
  const {
    character,
    menu,
    operation,
    statusMessage,
    isLoading,
    error,
    actions
  } = useWebChainBrawlerContext()

  return (
    <div>
      {isLoading ? 'Loading...' : character?.className}
    </div>
  )
}
```

## API Reference

### Hooks

#### `useWebChainBrawler(config)`

Main hook for accessing ChainBrawler functionality in React components.

```typescript
const chainBrawler = useWebChainBrawler(config)
```

**Returns:**
- `character`: Character data and state
- `menu`: Menu state and navigation
- `operation`: Current operation status
- `pools`: Treasury pool data
- `leaderboard`: Leaderboard information
- `claims`: Claimable rewards
- `statusMessage`: Current status message
- `isLoading`: Loading state
- `error`: Error state
- `actions`: Game action functions

#### `useWebChainBrawlerContext()`

Context hook for accessing ChainBrawler state from any component within the provider.

```typescript
const {
  character,
  menu,
  operation,
  pools,
  leaderboard,
  claims,
  statusMessage,
  isLoading,
  error,
  actions,
  config
} = useWebChainBrawlerContext()
```

### Context Providers

#### `WebChainBrawlerProvider`

Main context provider for web applications.

```typescript
interface WebChainBrawlerProviderProps {
  config?: ChainBrawlerConfig
  children: ReactNode
}
```

#### `ChainBrawlerProvider`

Generic context provider for non-web environments.

```typescript
interface ChainBrawlerProviderProps {
  config?: ChainBrawlerConfig
  children: ReactNode
}
```

### Web Adapter

#### `WebAdapter`

Browser-specific adapter that handles web-specific functionality.

```typescript
class WebAdapter {
  constructor(config: ChainBrawlerConfig)
  subscribe(callback: (state: UXState) => void): () => void
  updateWalletClient(walletClient: WalletClient | undefined): void
  refreshCharacterData(address: string): Promise<void>
  cleanup(): void
}
```

## Usage Examples

### Character Management

```typescript
function CharacterComponent() {
  const { character, actions, isLoading } = useWebChainBrawlerContext()

  const handleCreateCharacter = async () => {
    const result = await actions.createCharacter(0) // Warrior
    if (result.success) {
      console.log('Character created!')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!character) return <button onClick={handleCreateCharacter}>Create Character</button>

  return (
    <div>
      <h2>{character.className}</h2>
      <p>Level: {character.level}</p>
      <p>Combat: {character.stats.combat}</p>
    </div>
  )
}
```

### Combat Interface

```typescript
function CombatComponent() {
  const { character, actions } = useWebChainBrawlerContext()

  const handleFightEnemy = async (enemyId: number) => {
    const result = await actions.fightEnemy(enemyId)
    if (result.success) {
      console.log('Fight started!')
    }
  }

  return (
    <div>
      {character?.inCombat ? (
        <div>
          <p>In Combat!</p>
          <button onClick={() => actions.continueFight()}>Continue Fight</button>
          <button onClick={() => actions.fleeRound()}>Flee</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleFightEnemy(1)}>Fight Goblin</button>
          <button onClick={() => handleFightEnemy(2)}>Fight Orc</button>
        </div>
      )}
    </div>
  )
}
```

### Pool Information

```typescript
function PoolsComponent() {
  const { pools, isLoading } = useWebChainBrawlerContext()

  if (isLoading) return <div>Loading pools...</div>

  return (
    <div>
      <h3>Treasury Pools</h3>
      {pools?.map(pool => (
        <div key={pool.id}>
          <h4>{pool.name}</h4>
          <p>Balance: {pool.balance} CFX</p>
        </div>
      ))}
    </div>
  )
}
```

## State Management

The react package uses a subscription-based state management system that automatically updates React components when the underlying game state changes.

### State Structure

```typescript
interface UXState {
  playerAddress: string | null
  character: CharacterData | null
  menu: MenuState | null
  operation: OperationState | null
  pools: PoolsData | null
  leaderboard: LeaderboardData | null
  claims: ClaimsData | null
  statusMessage: string
  isLoading: boolean
  error: string | null
}
```

### Event System

The package listens for various events and updates the state accordingly:

- `characterDataRefresh`: Refreshes character data
- `transactionStatus`: Updates operation status
- `fightSummary`: Handles fight completion
- `poolsUpdate`: Updates pool information

## Dependencies

- **@chainbrawler/core**: Core business logic
- **react**: React library
- **react-dom**: React DOM
- **react-router-dom**: Client-side routing
- **@wagmi/core**: Web3 React hooks

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
