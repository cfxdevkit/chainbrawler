# ChainBrawler CLI

A command-line interface for ChainBrawler built with Ink React, providing the same functionality as the web UI in a terminal environment.

## Features

- **Character Management**: View character stats, health, and equipment
- **Transaction History**: Track all blockchain transactions with status updates
- **Combat System**: Fight enemies and manage combat state
- **Treasury Pools**: View available rewards and pools
- **Leaderboard**: See top players and rankings
- **Claims**: Manage prize claims and rewards

## Installation

```bash
npm install @chainbrawler/cli-ink
```

## Usage

```bash
# Run the CLI
npx chainbrawler-cli

# Or install globally
npm install -g @chainbrawler/cli-ink
chainbrawler-cli
```

## Controls

- **Tab**: Switch between different sections
- **1-5**: Quick access to tabs (Character, History, Pools, Leaderboard, Claims)
- **F**: Fight enemies (when available)
- **H**: Heal character (when available)
- **R**: Resurrect character (when dead)
- **C**: Continue fight (when in combat)
- **E**: Flee from combat (when in combat)
- **ESC**: Exit or go back
- **↑↓**: Navigate lists (in transaction history)
- **ENTER**: Select or toggle details

## Architecture

This CLI reuses the same business logic from the web UI:

- **Core Package**: All blockchain interactions and game logic
- **React Package**: Shared hooks and context providers
- **Ink Components**: Terminal-specific UI components

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Start the built CLI
npm start
```

## Components

- `ChainBrawlerCLI`: Main CLI application
- `GameInterface`: Main game interface with tab navigation
- `CharacterDisplay`: Character stats and actions
- `TransactionHistory`: Transaction history with status tracking
- `FightInterface`: Combat system interface
- `PoolsDisplay`: Treasury pools information
- `LeaderboardDisplay`: Player rankings
- `ClaimsDisplay`: Prize claims management

## Business Logic Reuse

The CLI shares the same business logic as the web UI:

- **Transaction Management**: Same grouping and status update logic
- **Character State**: Same character data and menu state
- **Event Handling**: Same transaction event listeners
- **Data Persistence**: Same localStorage integration

This ensures consistency between the web and CLI interfaces.
