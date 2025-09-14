#!/usr/bin/env node

import React from 'react';
import { render } from 'ink';
import { ChainBrawlerCLI } from './components/ChainBrawlerCLI';

// Main CLI entry point
const main = () => {
  render(<ChainBrawlerCLI />);
};

main();
