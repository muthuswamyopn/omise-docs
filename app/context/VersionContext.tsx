'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { DEFAULT_VERSION } from '../lib/apiVersions';

interface VersionContextType {
  currentVersion: string;
  setCurrentVersion: (version: string) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [currentVersion, setCurrentVersion] = useState(DEFAULT_VERSION);

  return (
    <VersionContext.Provider value={{ currentVersion, setCurrentVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
}
