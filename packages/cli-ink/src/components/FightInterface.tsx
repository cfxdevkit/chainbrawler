import React from 'react';
import { Box, Text, useInput } from 'ink';
import { CharacterData } from '@chainbrawler/core';

interface FightInterfaceProps {
  character: CharacterData;
  onBack: () => void;
  onFightEnemy?: () => void;
  onContinueFight?: () => void;
  onFleeRound?: () => void;
  isLoading?: boolean;
}

export function FightInterface({
  character,
  onBack,
  onFightEnemy,
  onContinueFight,
  onFleeRound,
  isLoading = false
}: FightInterfaceProps) {
  useInput((input, key) => {
    if (isLoading) return;

    if (key.escape) {
      onBack();
      return;
    }

    if (character.inCombat) {
      if (input === 'c') {
        onContinueFight?.();
      }
      if (input === 'f') {
        onFleeRound?.();
      }
    } else {
      if (input === 'f') {
        onFightEnemy?.();
      }
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="round" borderColor="red" padding={1} marginBottom={1}>
        <Text color="red" bold>
          ⚔️ Combat Arena
        </Text>
      </Box>

      {character.inCombat ? (
        <Box flexDirection="column">
          <Text color="yellow" bold>You are in combat!</Text>
          <Text color="white">Choose your action:</Text>
          <Text color="green">C - Continue Fight</Text>
          <Text color="red">F - Flee Round</Text>
        </Box>
      ) : (
        <Box flexDirection="column">
          <Text color="white">Ready to fight!</Text>
          <Text color="green">F - Fight Enemy</Text>
        </Box>
      )}

      <Box marginTop={2}>
        <Text color="gray">ESC - Back to main menu</Text>
      </Box>

      {isLoading && (
        <Box marginTop={1}>
          <Text color="cyan">Processing action...</Text>
        </Box>
      )}
    </Box>
  );
}
