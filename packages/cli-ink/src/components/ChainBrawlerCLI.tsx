import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { ChainBrawlerProvider } from '@chainbrawler/react';
import { GameInterface } from './GameInterface';
import { WelcomeScreen } from './WelcomeScreen';
import { LoadingScreen } from './LoadingScreen';
import { ErrorScreen } from './ErrorScreen';

export function ChainBrawlerCLI() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Simulate initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={() => setError(null)} />;
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  return (
    <ChainBrawlerProvider config={undefined}>
      <GameInterface />
    </ChainBrawlerProvider>
  );
}
