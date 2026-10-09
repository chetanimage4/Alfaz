interface StampProps {
  children: React.ReactNode;
  className?: string;
}

export function Stamp({ children, className = '' }: StampProps) {
  return (
    <span className={`vintage-stamp ${className}`}>
      {children}
    </span>
  );
}
