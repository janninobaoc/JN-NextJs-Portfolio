'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ❗ Wait for BOTH mount and theme
  if (!mounted || !resolvedTheme) {
    return null;
  }

  return <>{children}</>;
}
