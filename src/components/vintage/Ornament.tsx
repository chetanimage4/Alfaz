import { BookOpen } from 'lucide-react';

interface OrnamentProps {
  className?: string;
}

export function Ornament({ className = '' }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700/40 to-amber-700/60 w-20" />
      <BookOpen className="w-4 h-4 text-amber-700/50" />
      <div className="h-px bg-gradient-to-l from-transparent via-amber-700/40 to-amber-700/60 w-20" />
    </div>
  );
}

export function OrnamentDark({ className = '' }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-amber-500/50 w-16" />
      <div className="w-2 h-2 rotate-45 border border-amber-500/40" />
      <div className="h-px bg-gradient-to-l from-transparent via-amber-600/30 to-amber-500/50 w-16" />
    </div>
  );
}
