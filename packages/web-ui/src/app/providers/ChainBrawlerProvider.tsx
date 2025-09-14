import React from 'react'
import { WebChainBrawlerProvider } from '@chainbrawler/react'
import { BrowserRouter } from 'react-router-dom'
import type { ChainBrawlerConfig } from '@chainbrawler/core'

interface ChainBrawlerProviderProps {
  children: React.ReactNode
  chainBrawlerConfig?: ChainBrawlerConfig
}

export function ChainBrawlerProvider({ children, chainBrawlerConfig }: ChainBrawlerProviderProps) {
  // Always wrap with BrowserRouter and WebChainBrawlerProvider
  // The WebChainBrawlerProvider will handle the case when config is undefined
  return (
    <BrowserRouter>
      <WebChainBrawlerProvider config={chainBrawlerConfig}>
        {children}
      </WebChainBrawlerProvider>
    </BrowserRouter>
  )
}