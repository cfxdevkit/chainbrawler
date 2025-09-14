/*
 * Copyright 2025 ChainBrawler Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// React adapter package exports
// Based on REFACTORING_PLAN.md

// Hooks
export { useChainBrawler } from './hooks/useChainBrawler';
export { useWebChainBrawler } from './hooks/useWebChainBrawler';
export { useUXState } from './hooks/useUXState';
export { usePools } from './hooks/usePools';
export { useLeaderboard } from './hooks/useLeaderboard';
export { useClaims } from './hooks/useClaims';
export { useWebPools } from './hooks/useWebPools';
export { useWebLeaderboard } from './hooks/useWebLeaderboard';
export { useWebClaims } from './hooks/useWebClaims';
export { useWalletManager } from './hooks/useWalletManager';

// Providers
export { ChainBrawlerProvider, useChainBrawlerContext } from './providers/ChainBrawlerProvider';
export { WebChainBrawlerProvider, useWebChainBrawlerContext } from './providers/WebChainBrawlerProvider';
export { RouterProvider } from './providers/RouterProvider';

// Components
export { CharacterDisplay } from './components/CharacterDisplay';
export { PoolsDisplay } from './components/PoolsDisplay';
export { LeaderboardDisplay } from './components/LeaderboardDisplay';
export { ClaimsDisplay } from './components/ClaimsDisplay';
export { ErrorDisplay } from './components/ErrorDisplay';
export { StatusDisplay } from './components/StatusDisplay';

// Enhanced UI Components
export { CharacterDisplay as EnhancedCharacterDisplay } from './ui/enhanced/CharacterDisplay';
export { PoolsDisplay as EnhancedPoolsDisplay } from './ui/enhanced/PoolsDisplay';
export { LeaderboardDisplay as EnhancedLeaderboardDisplay } from './ui/enhanced/LeaderboardDisplay';
export { ClaimsDisplay as EnhancedClaimsDisplay } from './ui/enhanced/ClaimsDisplay';
export { StatusDisplay as EnhancedStatusDisplay } from './ui/enhanced/StatusDisplay';
export { ErrorDisplay as EnhancedErrorDisplay } from './ui/enhanced/ErrorDisplay';

// Primitive UI Components
export { EnemySelection } from './ui/primitives/EnemySelection';
export { FightSummary } from './ui/primitives/FightSummary';
export { OperationStatus } from './ui/primitives/OperationStatus';

// Adapters
export { ReactAdapter } from './adapters/ReactAdapter';
export { WebAdapter } from './adapters/WebAdapter';

// Re-export core types
export type { ChainBrawlerConfig, UXState } from '@chainbrawler/core';
