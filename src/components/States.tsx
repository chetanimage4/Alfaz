import { BookOpenText } from 'lucide-react';

export function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <BookOpenText className="w-12 h-12 text-amber-500/60 animate-flicker" />
      <p className="font-hand text-amber-200/50 text-xl">{message}</p>
    </div>
  );
}

export function ErrorScreen({ message = 'Something went wrong' }: { message?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="font-serif-vintage text-2xl text-amber-700">{message}</p>
      <p className="font-body text-amber-200/40 text-sm italic">Please try again in a moment.</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <p className="font-hand text-amber-200/40 text-2xl">{message}</p>
    </div>
  );
}
