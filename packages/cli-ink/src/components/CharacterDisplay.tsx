import React from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import { CharacterData, MenuState } from '@chainbrawler/core';

interface CharacterDisplayProps {
  character: CharacterData;
  menu: MenuState | null;
  onHealCharacter?: () => void;
  onResurrectCharacter?: () => void;
  onFightEnemy?: () => void;
  onContinueFight?: () => void;
  onFleeRound?: () => void;
  isLoading?: boolean;
}

export function CharacterDisplay({
  character,
  menu,
  onHealCharacter,
  onResurrectCharacter,
  onFightEnemy,
  onContinueFight,
  onFleeRound,
  isLoading = false
}: CharacterDisplayProps) {
  useInput((input, key) => {
    if (isLoading) return;

    if (input === 'h' && menu?.canHeal) {
      onHealCharacter?.();
    }
    if (input === 'r' && menu?.canResurrect) {
      onResurrectCharacter?.();
    }
    if (input === 'f' && menu?.canFight) {
      onFightEnemy?.();
    }
    if (input === 'c' && menu?.canContinueFight) {
      onContinueFight?.();
    }
    if (input === 'e' && menu?.canFlee) {
      onFleeRound?.();
    }
  });

  const healthPercentage = character.endurance
    ? (character.endurance.current / character.endurance.max) * 100
    : 0;

  const getHealthColor = (percentage: number) => {
    if (percentage > 75) return 'green';
    if (percentage > 50) return 'yellow';
    if (percentage > 25) return 'orange';
    return 'red';
  };

  const healthColor = getHealthColor(healthPercentage);
  const healthBar = '█'.repeat(Math.floor(healthPercentage / 5)) + 
                   '░'.repeat(20 - Math.floor(healthPercentage / 5));

  // Calculate equipment bonuses
  const equipmentBonuses = character.equipment?.reduce((bonuses, item) => {
    return {
      combat: bonuses.combat + (item.combat || 0),
      defense: bonuses.defense + (item.defense || 0),
      luck: bonuses.luck + (item.luck || 0)
    };
  }, { combat: 0, defense: 0, luck: 0 }) || { combat: 0, defense: 0, luck: 0 };

  return (
    <Box flexDirection="column" padding={1}>
      {/* Character Header */}
      <Box borderStyle="round" borderColor="cyan" padding={1} marginBottom={1}>
        <Box flexDirection="column" width="100%">
          <Text color="cyan" bold>
            {character.isAlive ? '⚔️' : '💀'} {character.className || 'Unknown'} 
            {character.inCombat && ' 🔥'}
          </Text>
          <Text color="white">
            Level {character.level || 0} | {character.isAlive ? 'Alive' : 'Dead'}
            {character.inCombat && ' | In Combat'}
          </Text>
        </Box>
      </Box>

      {/* Health Bar */}
      <Box flexDirection="column" marginBottom={1}>
        <Text color="white" bold>Health</Text>
        <Text color={healthColor}>
          {healthBar} {character.endurance?.current || 0}/{character.endurance?.max || 0}
        </Text>
      </Box>

      {/* Stats */}
      <Box flexDirection="column" marginBottom={1}>
        <Text color="white" bold>Combat Stats</Text>
        <Text color="red">
          Combat: {character.stats?.combat || 0}
          {equipmentBonuses.combat > 0 && ` (+${equipmentBonuses.combat})`}
        </Text>
        <Text color="blue">
          Defense: {character.stats?.defense || 0}
          {equipmentBonuses.defense > 0 && ` (+${equipmentBonuses.defense})`}
        </Text>
        <Text color="green">
          Luck: {character.stats?.luck || 0}
          {equipmentBonuses.luck > 0 && ` (+${equipmentBonuses.luck})`}
        </Text>
        <Text color="purple">
          Experience: {character.experience || 0}
        </Text>
        <Text color="yellow">
          Kills: {character.totalKills || 0}
        </Text>
      </Box>

      {/* Actions */}
      <Box flexDirection="column" marginBottom={1}>
        <Text color="white" bold>Actions</Text>
        {menu?.canFight && (
          <Text color="green">F - Fight Enemy</Text>
        )}
        {menu?.canHeal && (
          <Text color="blue">H - Heal Character</Text>
        )}
        {menu?.canResurrect && (
          <Text color="purple">R - Resurrect Character</Text>
        )}
        {menu?.canContinueFight && (
          <Text color="yellow">C - Continue Fight</Text>
        )}
        {menu?.canFlee && (
          <Text color="red">E - Flee Round</Text>
        )}
      </Box>

      {/* Status Messages */}
      {menu?.healingCooldownRemaining && menu.healingCooldownRemaining > 0 && (
        <Box marginBottom={1}>
          <Text color="yellow">
            Healing cooldown: {menu.healingCooldownRemaining}s remaining
          </Text>
        </Box>
      )}

      {isLoading && (
        <Box>
          <Text color="cyan">Processing action...</Text>
        </Box>
      )}
    </Box>
  );
}
