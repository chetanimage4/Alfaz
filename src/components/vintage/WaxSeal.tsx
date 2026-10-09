interface WaxSealProps {
  text?: string;
  className?: string;
}

export function WaxSeal({ text = 'Sealed', className = '' }: WaxSealProps) {
  return (
    <div className={`wax-seal ${className}`}>
      {text}
    </div>
  );
}
