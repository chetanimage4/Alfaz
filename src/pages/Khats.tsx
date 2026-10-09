import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { fetchKhats } from '@/lib/api';
import type { Khat } from '@/types';
import { LoadingScreen, ErrorScreen, EmptyState } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { WaxSeal } from '@/components/vintage/WaxSeal';

export default function Khats() {
  const [items, setItems] = useState<Khat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchKhats();
        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingScreen message="Opening the drawers..." />;
  if (error) return <ErrorScreen message="Could not load the khats" />;
  if (items.length === 0) return <EmptyState message="No letters yet. The drawer is empty." />;

  return (
    <div className="min-h-screen vintage-wood-bg py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-amber-500" />
            <h1 className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider">
              Unsent Khats
            </h1>
          </div>
          <p className="font-body text-amber-200/50 italic text-lg">
            Letters that were folded but never delivered
          </p>
          <Ornament />
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item, i) => (
            <Link
              key={item.id}
              to={`/khats/${item.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
            >
              <div className="envelope p-6 md:p-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <WaxSeal text="Unsent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-stone-800 tracking-wide mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      {item.author && (
                        <span className="font-hand text-lg text-amber-700/70">
                          From: {item.author}
                        </span>
                      )}
                      {item.recipient && (
                        <span className="font-hand text-lg text-amber-700/70">
                          To: {item.recipient}
                        </span>
                      )}
                    </div>
                    <p className="font-body text-stone-600 italic leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                  <span className="text-amber-700 group-hover:translate-x-1 transition-transform flex-shrink-0">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="vintage-btn-outline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
