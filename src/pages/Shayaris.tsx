import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, ArrowLeft } from 'lucide-react';
import { fetchShayaris } from '@/lib/api';
import type { Shayari } from '@/types';
import { LoadingScreen, ErrorScreen, EmptyState } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { Ribbon } from '@/components/vintage/Ribbon';

export default function Shayaris() {
  const [items, setItems] = useState<Shayari[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchShayaris();
        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingScreen message="Unfolding the verses..." />;
  if (error) return <ErrorScreen message="Could not load the shayaris" />;
  if (items.length === 0) return <EmptyState message="No shayaris yet. The pages are blank." />;

  const categories = ['all', ...Array.from(new Set(items.map((s) => s.category).filter(Boolean))) as string[]];
  const filtered = filter === 'all' ? items : items.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen vintage-wood-bg py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <Feather className="w-8 h-8 text-amber-500" />
            <h1 className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider">
              Shayaris
            </h1>
          </div>
          <p className="font-body text-amber-200/50 italic text-lg">
            Where words become feelings and feelings become eternal
          </p>
          <Ornament />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`old-tab ${filter === cat ? 'old-tab-active' : ''}`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <Link
              key={item.id}
              to={`/shayaris/${item.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <div className="vintage-paper p-6 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl relative">
                {item.category && (
                  <div className="absolute -top-3 left-4">
                    <Ribbon>{item.category}</Ribbon>
                  </div>
                )}
                {item.title && (
                  <h3 className="font-display text-lg text-amber-800 tracking-wide mt-2 mb-3">
                    {item.title}
                  </h3>
                )}
                <p className="font-serif-vintage text-lg text-stone-700 italic leading-relaxed whitespace-pre-line line-clamp-6">
                  {item.content}
                </p>
                <div className="mt-4 pt-3 border-t border-amber-700/20 flex items-center justify-between">
                  {item.author ? (
                    <span className="font-hand text-lg text-amber-700/70">
                      {item.author}
                    </span>
                  ) : (
                    <span className="font-hand text-lg text-stone-500/50">Unknown</span>
                  )}
                  <span className="text-amber-700 group-hover:translate-x-1 transition-transform">
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
