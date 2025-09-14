import React from 'react';
import { Box, Text } from 'ink';

export function Menu() {
  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold>Navigation</Text>
      <Text color="white">1-5: Switch tabs</Text>
      <Text color="white">F: Fight (when available)</Text>
      <Text color="white">ESC: Exit</Text>
    </Box>
  );
}
