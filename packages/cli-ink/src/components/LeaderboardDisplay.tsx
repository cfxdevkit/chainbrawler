import React from 'react';
import { Box, Text } from 'ink';
import { LeaderboardData } from '@chainbrawler/core';

interface LeaderboardDisplayProps {
  leaderboard: LeaderboardData | null;
}

export function LeaderboardDisplay({ leaderboard }: LeaderboardDisplayProps) {
  if (!leaderboard) {
    return (
      <Box flexDirection="column" alignItems="center" padding={2}>
        <Text color="yellow">Loading leaderboard...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold marginBottom={1}>
        🏆 Leaderboard
      </Text>
      
      <Box flexDirection="column">
        {leaderboard.topPlayers?.slice(0, 10).map((player, index) => (
          <Box key={index} flexDirection="row" justifyContent="space-between">
            <Text color="white">
              {index + 1}. {player.address?.slice(0, 10)}...
            </Text>
            <Text color="yellow">
              {player.score || 0} points
            </Text>
          </Box>
        )) || (
          <Text color="gray">No players yet</Text>
        )}
      </Box>
    </Box>
  );
}
