import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';

export function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box flexDirection="column" alignItems="center" padding={2}>
      <Box marginBottom={2}>
        <Text color="cyan" bold>
          ⚔️ Initializing ChainBrawler{dots}
        </Text>
      </Box>
      
      <Box flexDirection="column" alignItems="center">
        <Text color="yellow">Loading character data...</Text>
        <Text color="green">Connecting to blockchain...</Text>
        <Text color="blue">Preparing game interface...</Text>
      </Box>
    </Box>
  );
}
