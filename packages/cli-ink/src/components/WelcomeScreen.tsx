import React from 'react';
import { Box, Text, useInput } from 'ink';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  useInput((input, key) => {
    if (key.return || input === ' ') {
      onStart();
    }
  });

  const title = figlet.textSync('ChainBrawler', {
    font: 'ANSI Shadow',
    horizontalLayout: 'fitted',
    verticalLayout: 'fitted'
  });

  const gradientTitle = gradient.rainbow.multiline(title);

  return (
    <Box flexDirection="column" alignItems="center" padding={2}>
      <Text>{gradientTitle}</Text>
      <Box marginTop={1} marginBottom={2}>
        <Text color="cyan" bold>
          Welcome to the Blockchain Arena!
        </Text>
      </Box>
      
      <Box flexDirection="column" alignItems="center" marginBottom={2}>
        <Text color="yellow">⚔️  Create your warrior and fight enemies</Text>
        <Text color="green">💰  Earn rewards and climb the leaderboard</Text>
        <Text color="blue">🏆  Compete with other players worldwide</Text>
      </Box>

      <Box marginTop={2} padding={1} borderStyle="round" borderColor="cyan">
        <Text color="white" bold>
          Press ENTER or SPACE to start your adventure!
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Use arrow keys to navigate, ENTER to select, ESC to go back
        </Text>
      </Box>
    </Box>
  );
}
