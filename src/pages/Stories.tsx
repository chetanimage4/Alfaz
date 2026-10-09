import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollText, ArrowLeft, Clock } from 'lucide-react';
import { fetchStories } from '@/lib/api';
import type { Story } from '@/types';
import { LoadingScreen, ErrorScreen, EmptyState } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { Stamp } from '@/components/vintage/Stamp';

export default function Stories() {
  const [items, setItems] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchStories();
        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingScreen message="Opening the storybook..." />;
  if (error) return <ErrorScreen message="Could not load the stories" />;
  if (items.length === 0) return <EmptyState message="No stories yet. The book awaits its author." />;

  return (
    <div className="min-h-screen vintage-wood-bg py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <ScrollText className="w-8 h-8 text-amber-500" />
            <h1 className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider">
              Stories
            </h1>
          </div>
          <p className="font-body text-amber-200/50 italic text-lg">
            Tales woven from the fabric of memory and time
          </p>
          <Ornament />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <Link
              key={item.id}
              to={`/stories/${item.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${i * 120}ms`, opacity: 0 }}
            >
              <div className="vintage-paper p-8 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl relative">
                {item.category && (
                  <div className="absolute -top-3 right-6">
                    <Stamp>{item.category}</Stamp>
                  </div>
                )}
                <h3 className="font-display text-2xl text-stone-800 tracking-wide mb-2 pr-20">
                  {item.title}
                </h3>
                {item.author && (
                  <p className="font-hand text-xl text-amber-700/70 mb-4">
                    by {item.author}
                  </p>
                )}
                <p className="font-body text-stone-600 italic leading-relaxed mb-4">
                  {item.excerpt || item.content.substring(0, 150) + '...'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-amber-700/20">
                  <span className="flex items-center gap-2 font-body text-sm text-stone-500/60">
                    <Clock className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="font-display text-xs tracking-wider uppercase text-amber-700 group-hover:translate-x-1 transition-transform">
                    Read →
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
