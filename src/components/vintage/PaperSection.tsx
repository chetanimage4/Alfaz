import type { ReactNode } from 'react';

interface PaperSectionProps {
  children: ReactNode;
  className?: string;
  aged?: boolean;
}

export function PaperSection({ children, className = '', aged = false }: PaperSectionProps) {
  return (
    <div className={`${aged ? 'vintage-paper-aged' : 'vintage-paper'} p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
