interface RibbonProps {
  children: React.ReactNode;
  className?: string;
}

export function Ribbon({ children, className = '' }: RibbonProps) {
  return (
    <div className={`vintage-ribbon inline-block ${className}`}>
      {children}
    </div>
  );
}
