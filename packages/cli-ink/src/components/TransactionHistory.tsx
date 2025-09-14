import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';

interface TransactionRecord {
  id: string;
  timestamp: number;
  type: string;
  args: any;
  result: any;
  status: 'pending' | 'confirming' | 'completed' | 'error';
  hash?: string;
  statusHistory: Array<{
    status: 'pending' | 'confirming' | 'completed' | 'error';
    timestamp: number;
    result?: any;
  }>;
}

export function TransactionHistory() {
  const [history, setHistory] = useState<TransactionRecord[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Load transaction history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chainbrawler-tx-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Migrate existing records to include statusHistory
        const migratedHistory = parsedHistory.map((record: any) => ({
          ...record,
          statusHistory: record.statusHistory || [{
            status: record.status || 'pending',
            timestamp: record.timestamp || Date.now(),
            result: record.result || null
          }]
        }));
        setHistory(migratedHistory);
      } catch (error) {
        console.error('Failed to parse transaction history:', error);
      }
    }
  }, []);

  // Listen for transaction events to add to history
  useEffect(() => {
    const handleTransactionEvent = (event: CustomEvent) => {
      const { type, args, result, status, hash } = event.detail;
      
      setHistory(prev => {
        // Group by hash - find existing record with same hash
        const existingIndex = prev.findIndex(record => record.hash === hash);
        
        const statusEntry = {
          status: status || 'pending',
          timestamp: Date.now(),
          result: result || null
        };
        
        if (existingIndex >= 0) {
          // Update existing record - add new status to history
          const newHistory = [...prev];
          const existingRecord = newHistory[existingIndex];
          
          // Add new status to history
          const updatedStatusHistory = [...existingRecord.statusHistory, statusEntry];
          
          newHistory[existingIndex] = {
            ...existingRecord,
            status: status || 'pending',
            result: result || existingRecord.result,
            statusHistory: updatedStatusHistory
          };
          
          return newHistory;
        } else {
          // Create new record
          const newRecord: TransactionRecord = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            type,
            args: args || {},
            result: result || null,
            status: status || 'pending',
            hash,
            statusHistory: [statusEntry]
          };
          
          return [newRecord, ...prev].slice(0, 100); // Keep last 100 records
        }
      });
    };

    window.addEventListener('transactionStatus', handleTransactionEvent as EventListener);
    return () => {
      window.removeEventListener('transactionStatus', handleTransactionEvent as EventListener);
    };
  }, []);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex(prev => Math.max(0, prev - 1));
    }
    if (key.downArrow) {
      setSelectedIndex(prev => Math.min(history.length - 1, prev + 1));
    }
    if (key.return) {
      setShowDetails(!showDetails);
    }
    if (key.escape) {
      setShowDetails(false);
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'success': return 'green';
      case 'error': return 'red';
      case 'confirming': return 'blue';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatArgs = (args: any) => {
    if (!args || Object.keys(args).length === 0) return 'No arguments';
    return JSON.stringify(args, null, 2);
  };

  const formatResult = (result: any) => {
    if (result === null || result === undefined) return 'No result';
    return JSON.stringify(result, null, 2);
  };

  if (history.length === 0) {
    return (
      <Box flexDirection="column" alignItems="center" padding={2}>
        <Text color="yellow">No transactions yet.</Text>
        <Text color="gray">Perform an action to see history!</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text color="cyan" bold>Transaction History ({history.length})</Text>
      </Box>

      <Box flexDirection="column">
        {history.map((record, index) => (
          <Box
            key={record.id}
            flexDirection="column"
            borderStyle={index === selectedIndex ? "round" : "single"}
            borderColor={index === selectedIndex ? "cyan" : "gray"}
            padding={1}
            marginBottom={1}
          >
            <Box flexDirection="row" justifyContent="space-between">
              <Text color={getStatusColor(record.status)}>
                {record.status.toUpperCase()}
              </Text>
              <Text color="white">{record.type}</Text>
              <Text color="gray">{formatTimestamp(record.timestamp)}</Text>
            </Box>
            
            {record.hash && (
              <Text color="gray" dimColor>
                Hash: {record.hash.slice(0, 10)}...
              </Text>
            )}

            {index === selectedIndex && showDetails && (
              <Box flexDirection="column" marginTop={1}>
                <Text color="white" bold>Status History:</Text>
                {(record.statusHistory || []).map((statusEntry, statusIndex) => (
                  <Text key={statusIndex} color={getStatusColor(statusEntry.status)}>
                    - {statusEntry.status} at {formatTimestamp(statusEntry.timestamp)}
                  </Text>
                ))}
                
                <Text color="white" bold marginTop={1}>Arguments:</Text>
                <Text color="gray">{formatArgs(record.args)}</Text>
                
                <Text color="white" bold marginTop={1}>Result:</Text>
                <Text color="gray">{formatResult(record.result)}</Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box marginTop={1}>
        <Text color="gray">
          ↑↓ Navigate | ENTER: Toggle details | ESC: Close details
        </Text>
      </Box>
    </Box>
  );
}
