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

// Core package exports
// Based on REFACTORING_PLAN.md

// Main SDK
export { ChainBrawlerSDK } from './ChainBrawlerSDK';

// State management
export { UXStore } from './state/UXStore';

// Utilities
export { FightDataNormalizer } from './utils/FightDataNormalizer';
export { MerkleTreeUtils, generateMerkleTree, verifyMerkleProof, generatePlayerMerkleProof } from './utils/MerkleTreeUtils';
export { SUPPORTED_CHAINS, isSupportedChain, getChainConfig, detectWalletType, getSupportedChainById, hasContractDeployed } from './utils/ChainUtils';
export { ENEMY_TYPES, getEnemyType, getEnemyName, calculateEnemyStats, getDifficultyLevel, getDifficultyColor } from './utils/EnemyUtils';
export { CHARACTER_CLASSES, getCharacterClass, getCharacterClassName } from './utils/CharacterUtils';
export { getFightOutcome, formatEthAmount, formatTimeRemaining, formatAddress, formatHealthDisplay } from './utils/UIUtils';

// Constants
export * from './constants/enemies';

// Contract client
export { ContractClient } from './contract/ContractClient';
export { WagmiContractClient } from './contract/WagmiContractClient';
export { ContractClientFactory } from './contract/ContractClientFactory';

// Operations
export { CharacterOperations } from './operations/CharacterOperations';
export { PoolsOperations } from './operations/PoolsOperations';
export { LeaderboardOperations } from './operations/LeaderboardOperations';
export { ClaimsOperations } from './operations/ClaimsOperations';
export { BaseOperation } from './operations/BaseOperation';

// Events
export { EventEmitter } from './events/EventEmitter';
export { EventHandler } from './events/EventHandler';

// Managers
export { StatusMessageManager } from './managers/StatusMessageManager';
export { ErrorRecoveryManager } from './managers/ErrorRecoveryManager';
export { CharacterStateManager } from './managers/CharacterStateManager';
export { UXManager } from './managers/UXManager';
export { OperationTracker } from './managers/OperationTracker';

// Types
export * from './types';
export { StatusMessageType } from './types/StatusMessageType';
export { ErrorType, ChainBrawlerError } from './types/ErrorType';
export { EventType } from './types/EventType';

// Validation
export { ValidationRules, ValidationResult } from './validation/ValidationRules';
export { ValidationManager } from './validation/ValidationManager';

// Generated utilities
export { getContractAddresses } from './generated/contractAddresses';