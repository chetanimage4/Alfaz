import type { ReactNode } from 'react';

interface HangingLabelProps {
  children: ReactNode;
  className?: string;
}

export function HangingLabel({ children, className = '' }: HangingLabelProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="hanging-label animate-swing-slow">
        {children}
      </div>
    </div>
  );
}
