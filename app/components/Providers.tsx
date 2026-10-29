'use client';

import { ReactNode } from 'react';
import { VersionProvider } from '../context/VersionContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <VersionProvider>
      {children}
    </VersionProvider>
  );
}
