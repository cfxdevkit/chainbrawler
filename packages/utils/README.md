# @chainbrawler/utils

Utility tools and orchestrators for ChainBrawler repository maintenance.

## Overview

This package provides essential tooling for development, testing, and maintenance of the ChainBrawler ecosystem. It includes:

- **Development Orchestrator**: Complete development environment setup
- **Test Runner**: Comprehensive testing capabilities
- **Chain Configuration**: Conflux network configurations
- **Contract Management**: Address lookup and deployment utilities
- **Logging**: Centralized logging system
- **Conflux Node Management**: Local node setup and management

## Features

### Development Orchestrator

The `DevelopmentOrchestrator` provides a complete development environment:

- Starts local Conflux node
- Deploys contracts using Hardhat
- Generates SDK types using Wagmi CLI
- Manages development lifecycle

### Test Runner

The `TestRunner` provides comprehensive testing:

- Contract tests using Hardhat
- SDK tests using Vitest
- Example tests
- CI-friendly operation

### Chain Configuration

Pre-configured Conflux network settings:

- Local development chain (ChainBrawler Local)
- Testnet configuration
- Mainnet configuration
- Custom chain support

### Contract Management

Utilities for contract address management:

- Address lookup by chain ID
- Network-specific address resolution
- Integration with core package

### Logging

Centralized logging system with:

- Multiple output formats (console, file, pretty)
- Structured logging
- Operation tracking
- Throttled logging

### Conflux Node Management

Local Conflux node management:

- Node configuration
- Account generation
- Server management
- Development utilities

## Usage

### CLI Scripts

The package provides two main CLI scripts:

#### Development Orchestrator

```bash
# Start full development environment
npx tsx packages/utils/src/scripts/dev-orchestrator.ts

# Skip deployment, use existing contracts
npx tsx packages/utils/src/scripts/dev-orchestrator.ts --skip-deploy

# Keep node running for manual testing
npx tsx packages/utils/src/scripts/dev-orchestrator.ts --keep-running

# Enable verbose logging
npx tsx packages/utils/src/scripts/dev-orchestrator.ts --verbose
```

#### Test Runner

```bash
# Run all tests
npx tsx packages/utils/src/scripts/test-runner.ts

# Run only contract tests
npx tsx packages/utils/src/scripts/test-runner.ts --only contract

# Skip SDK tests
npx tsx packages/utils/src/scripts/test-runner.ts --skip-sdk

# Enable verbose logging
npx tsx packages/utils/src/scripts/test-runner.ts --verbose
```

### Programmatic Usage

```typescript
import { DevelopmentOrchestrator, TestRunner } from '@chainbrawler/utils';

// Development orchestrator
const orchestrator = new DevelopmentOrchestrator({
  skipDeploy: false,
  skipSdkGeneration: false,
  verbose: true
});

await orchestrator.start();
// ... use development environment
await orchestrator.stop();

// Test runner
const testRunner = new TestRunner({
  skipContractTests: false,
  skipSdkTests: false,
  verbose: true
});

const success = await testRunner.runTests();
```

## Configuration

### Environment Variables

- `LOG_LEVEL`: Logging level (silent, error, warn, info, debug)
- `LOG_MODE`: Logging mode (console, file, pretty)
- `LOG_FILE`: Log file path (for file mode)
- `HARDHAT_VAR_DEPLOYER_MNEMONIC`: Mnemonic for account generation

### Options

Both orchestrator and test runner support extensive configuration options:

- **Skip operations**: Skip deployment, SDK generation, or specific tests
- **Verbose logging**: Enable detailed logging output
- **Node configuration**: Customize Conflux node settings
- **Data management**: Control data persistence and cleanup
- **CI mode**: Non-interactive operation for CI/CD

## Integration

The utils package integrates with:

- **@chainbrawler/core**: Contract address management and core functionality
- **Hardhat**: Contract deployment and testing
- **Wagmi**: SDK type generation
- **Vitest**: SDK testing
- **@xcfx/node**: Conflux node management

## Development

### Building

```bash
pnpm --filter @chainbrawler/utils build
```

### Testing

```bash
pnpm --filter @chainbrawler/utils test
```

### Linting

```bash
pnpm --filter @chainbrawler/utils lint
```

## License

Apache-2.0

## Copyright

Copyright 2025 ChainBrawler Team
