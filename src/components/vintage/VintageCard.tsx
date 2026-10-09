import type { ReactNode } from 'react';

interface VintageCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function VintageCard({ children, className = '', onClick, hover = true }: VintageCardProps) {
  return (
    <div
      onClick={onClick}
      className={`vintage-paper p-6 transition-all duration-500 ${
        hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
