'use client';

import { ReactNode } from 'react';
import { useTheme } from 'next-themes';

interface Props {
  children: ReactNode;
  className?: string; // optional extra Tailwind classes
}

const ThemedGradient = ({ children, className = '' }: Props) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // You can customize your gradients here
  const gradientClass = isDark
    ? 'bg-gradient-to-r from-white via-blue-100 to-purple-200'
    : 'bg-gradient-to-r from-black via-gray-600 to-gray-800';

  return (
    <span className={`bg-clip-text text-transparent ${gradientClass} ${className}`}>
      {children}
    </span>
  );
};

export default ThemedGradient;
