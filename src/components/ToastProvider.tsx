import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const config: Record<ToastType, { icon: typeof CheckCircle2; ring: string; bg: string; iconColor: string; border: string }> = {
  success: { icon: CheckCircle2, ring: 'border-emerald-600/50', bg: 'from-emerald-900/90 to-stone-900/95', iconColor: 'text-emerald-400', border: 'border-emerald-600/40' },
  error: { icon: AlertCircle, ring: 'border-red-600/50', bg: 'from-red-900/90 to-stone-900/95', iconColor: 'text-red-400', border: 'border-red-600/40' },
  warning: { icon: AlertTriangle, ring: 'border-amber-600/50', bg: 'from-amber-900/90 to-stone-900/95', iconColor: 'text-amber-400', border: 'border-amber-600/40' },
  info: { icon: Info, ring: 'border-sky-600/50', bg: 'from-sky-900/90 to-stone-900/95', iconColor: 'text-sky-400', border: 'border-sky-600/40' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[10000] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => {
          const c = config[t.type];
          const Icon = c.icon;
          return (
            <div
              key={t.id}
              className={`pointer-events-auto relative overflow-hidden bg-gradient-to-br ${c.bg} border ${c.border} backdrop-blur-md px-5 py-4 pr-10 max-w-sm shadow-2xl animate-toast-in`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 98% 10%, 100% 20%, 96% 35%, 100% 50%, 98% 65%, 100% 80%, 97% 90%, 100% 100%, 0% 100%, 3% 95%, 0% 85%, 2% 70%, 0% 50%, 3% 30%, 0% 15%, 2% 5%)',
              }}
            >
              {/* smoke effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(200,180,140,0.3) 0%, transparent 60%)' }}
              />
              <div className="relative flex items-start gap-3">
                <Icon className={`w-5 h-5 ${c.iconColor} flex-shrink-0 mt-0.5`} />
                <p className="font-body text-sm text-amber-50/90 leading-snug">{t.message}</p>
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="absolute top-2 right-2 text-amber-200/40 hover:text-amber-200/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {/* progress bar */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-amber-500/40 animate-toast-progress" />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
