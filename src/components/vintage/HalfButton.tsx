import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface HalfButtonProps {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: 'solid' | 'outline';
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}

export function HalfButton({
  children,
  onClick,
  to,
  variant = 'solid',
  type = 'button',
  className = '',
  disabled = false,
}: HalfButtonProps) {
  const classes = `${variant === 'solid' ? 'vintage-btn' : 'vintage-btn-outline'} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
