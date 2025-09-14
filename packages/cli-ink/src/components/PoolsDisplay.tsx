import React from 'react';
import { Box, Text } from 'ink';
import { PoolsData } from '@chainbrawler/core';

interface PoolsDisplayProps {
  pools: PoolsData | null;
}

export function PoolsDisplay({ pools }: PoolsDisplayProps) {
  if (!pools) {
    return (
      <Box flexDirection="column" alignItems="center" padding={2}>
        <Text color="yellow">Loading pools...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold marginBottom={1}>
        💰 Treasury Pools
      </Text>
      
      <Box flexDirection="column">
        <Text color="white">Total Pool: {pools.totalPool || 0} ETH</Text>
        <Text color="green">Fight Pool: {pools.fightPool || 0} ETH</Text>
        <Text color="blue">Leaderboard Pool: {pools.leaderboardPool || 0} ETH</Text>
        <Text color="purple">Claims Pool: {pools.claimsPool || 0} ETH</Text>
      </Box>
    </Box>
  );
}
