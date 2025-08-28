'use client';

import { AaveProvider } from '@aave/react';
import { aaveClient } from '@/lib/aaveClient';

export function AaveProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AaveProvider client={aaveClient}>{children}</AaveProvider>;
}
