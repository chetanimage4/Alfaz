import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { fetchKhats } from '@/lib/api';
import type { Khat } from '@/types';
import { LoadingScreen, ErrorScreen, EmptyState } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { WaxSeal } from '@/components/vintage/WaxSeal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Khats() {
  const [items, setItems] = useState<Khat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();

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
    <div ref={ref} className="min-h-screen vintage-wood-bg khats-page py-16 px-4 md:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-text-blur-in khats-heading">
          <div className="inline-flex items-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-amber-500 animate-float" />
            <h1 className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider">
              Unsent Khats
            </h1>
          </div>
          <p className="font-body text-amber-200/50 italic text-lg">
            Letters that were folded but never delivered
          </p>
          <Ornament />
        </div>

        <div className="flex flex-col gap-8">
          {items.map((item, i) => (
            <Link
              key={item.id}
              to={`/khats/${item.id}`}
              className="group scroll-reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="envelope khat-letter p-7 md:p-9 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl relative">
                <div className="khat-letter-body flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <WaxSeal text="Unsent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-stone-800 tracking-wide mb-1">
                      {item.title}
                    </h3>
                    <div className="khat-meta flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
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
                    <p className="khat-content font-serif-vintage text-stone-700 italic leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                  <span className="text-amber-700 group-hover:translate-x-2 transition-transform flex-shrink-0">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="vintage-btn-outline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
