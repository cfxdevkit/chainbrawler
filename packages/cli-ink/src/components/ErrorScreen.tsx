import React from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  useInput((input, key) => {
    if (key.return || input === 'r') {
      onRetry();
    }
  });

  return (
    <Box flexDirection="column" alignItems="center" padding={2}>
      <Box marginBottom={2}>
        <Text color="red" bold>
          ❌ Error
        </Text>
      </Box>
      
      <Box flexDirection="column" alignItems="center" marginBottom={2}>
        <Text color="red">We encountered an unexpected error:</Text>
        <Text color="yellow">{error}</Text>
      </Box>

      <Box marginTop={2} padding={1} borderStyle="round" borderColor="red">
        <Text color="white" bold>
          Press R or ENTER to retry
        </Text>
      </Box>
    </Box>
  );
}
