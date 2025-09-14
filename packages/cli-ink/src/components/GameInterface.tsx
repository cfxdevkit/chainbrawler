import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { useWebChainBrawlerContext } from '@chainbrawler/react';
import { CharacterDisplay } from './CharacterDisplay';
import { TransactionHistory } from './TransactionHistory';
import { Menu } from './Menu';
import { FightInterface } from './FightInterface';
import { PoolsDisplay } from './PoolsDisplay';
import { LeaderboardDisplay } from './LeaderboardDisplay';
import { ClaimsDisplay } from './ClaimsDisplay';

type TabType = 'character' | 'history' | 'pools' | 'leaderboard' | 'claims' | 'fight';

export function GameInterface() {
  const {
    character,
    menu,
    operation,
    statusMessage,
    isLoading,
    error,
    actions,
    pools,
    leaderboard,
    claims
  } = useWebChainBrawlerContext();

  const [activeTab, setActiveTab] = useState<TabType>('character');
  const [showFight, setShowFight] = useState(false);

  useInput((input, key) => {
    if (key.escape) {
      if (showFight) {
        setShowFight(false);
      } else {
        process.exit(0);
      }
      return;
    }

    if (key.tab) {
      const tabs: TabType[] = ['character', 'history', 'pools', 'leaderboard', 'claims'];
      const currentIndex = tabs.indexOf(activeTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex]);
      return;
    }

    // Tab shortcuts
    if (input === '1') setActiveTab('character');
    if (input === '2') setActiveTab('history');
    if (input === '3') setActiveTab('pools');
    if (input === '4') setActiveTab('leaderboard');
    if (input === '5') setActiveTab('claims');
    if (input === 'f' && character?.exists && !character.inCombat) {
      setShowFight(true);
    }
  });

  if (isLoading) {
    return (
      <Box flexDirection="column" alignItems="center" padding={2}>
        <Text color="cyan">Loading ChainBrawler...</Text>
        <Text color="yellow">{statusMessage}</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flexDirection="column" alignItems="center" padding={2}>
        <Text color="red">Error: {error}</Text>
      </Box>
    );
  }

  if (!character?.exists) {
    return (
      <Box flexDirection="column" alignItems="center" padding={2}>
        <Text color="yellow">No character found. Please create one first.</Text>
        <Text color="gray">This feature will be implemented in the next version.</Text>
      </Box>
    );
  }

  if (showFight) {
    return (
      <FightInterface
        character={character}
        onBack={() => setShowFight(false)}
        onFightEnemy={actions?.fightEnemy}
        onContinueFight={actions?.continueFight}
        onFleeRound={actions?.fleeRound}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Box flexDirection="column" height="100%">
      {/* Header */}
      <Box borderStyle="round" borderColor="cyan" padding={1} marginBottom={1}>
        <Box flexDirection="column">
          <Text color="cyan" bold>
            ⚔️ ChainBrawler CLI
          </Text>
          <Text color="gray">
            Tab: Switch tabs | F: Fight | ESC: Exit
          </Text>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Box marginBottom={1}>
        <Text color="white">
          {activeTab === 'character' && '1. Character'}
          {activeTab === 'history' && '2. History'}
          {activeTab === 'pools' && '3. Pools'}
          {activeTab === 'leaderboard' && '4. Leaderboard'}
          {activeTab === 'claims' && '5. Claims'}
        </Text>
      </Box>

      {/* Content */}
      <Box flexDirection="column" flexGrow={1}>
        {activeTab === 'character' && (
          <CharacterDisplay
            character={character}
            menu={menu}
            onHealCharacter={actions?.healCharacter}
            onResurrectCharacter={actions?.resurrectCharacter}
            onFightEnemy={() => setShowFight(true)}
            onContinueFight={actions?.continueFight}
            onFleeRound={actions?.fleeRound}
            isLoading={isLoading}
          />
        )}
        
        {activeTab === 'history' && <TransactionHistory />}
        {activeTab === 'pools' && <PoolsDisplay pools={pools} />}
        {activeTab === 'leaderboard' && <LeaderboardDisplay leaderboard={leaderboard} />}
        {activeTab === 'claims' && <ClaimsDisplay claims={claims} />}
      </Box>

      {/* Status Bar */}
      {operation && (
        <Box borderStyle="round" borderColor="yellow" padding={1} marginTop={1}>
          <Text color="yellow">
            {operation.status}: {operation.message}
          </Text>
        </Box>
      )}
    </Box>
  );
}
