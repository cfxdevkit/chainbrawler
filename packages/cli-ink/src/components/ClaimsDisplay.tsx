import React from 'react';
import { Box, Text } from 'ink';
import { ClaimsData } from '@chainbrawler/core';

interface ClaimsDisplayProps {
  claims: ClaimsData | null;
}

export function ClaimsDisplay({ claims }: ClaimsDisplayProps) {
  if (!claims) {
    return (
      <Box flexDirection="column" alignItems="center" padding={2}>
        <Text color="yellow">Loading claims...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold marginBottom={1}>
        🎁 Claims
      </Text>
      
      <Box flexDirection="column">
        {claims.availableClaims?.length > 0 ? (
          claims.availableClaims.map((claim, index) => (
            <Box key={index} flexDirection="column" marginBottom={1}>
              <Text color="white">
                Epoch {claim.epoch}: {claim.amount} ETH
              </Text>
              <Text color="gray">
                Index: {claim.index}
              </Text>
            </Box>
          ))
        ) : (
          <Text color="gray">No claims available</Text>
        )}
      </Box>
    </Box>
  );
}
