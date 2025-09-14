// React hook for UX state management
// Based on UX_STATE_MANAGEMENT_SPEC.md

import { useState, useEffect } from 'react';
import { UXStore, UXState } from '@chainbrawler/core';

export function useUXState(store: UXStore): UXState {
  const [state, setState] = useState<UXState>(store.getState());
  
  useEffect(() => {
    // Update state when store changes
    setState(store.getState());
    const unsubscribe = store.subscribe(setState);
    return unsubscribe;
  }, [store]);
  
  return state;
}
