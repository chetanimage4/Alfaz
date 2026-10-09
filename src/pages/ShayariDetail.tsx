import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Feather } from 'lucide-react';
import { fetchShayari } from '@/lib/api';
import type { Shayari } from '@/types';
import { LoadingScreen, ErrorScreen } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { WaxSeal } from '@/components/vintage/WaxSeal';

export default function ShayariDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Shayari | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchShayari(id!);
        setItem(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingScreen message="Reading the verse..." />;
  if (error || !item) return <ErrorScreen message="This shayari could not be found" />;

  return (
    <div className="min-h-screen vintage-wood-bg py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/shayaris" className="vintage-btn-outline mb-8 inline-flex">
          <ArrowLeft className="w-4 h-4" /> All Shayaris
        </Link>

        <div className="vintage-paper p-10 md:p-14 relative animate-scale-in">
          <div className="absolute top-6 right-6">
            <WaxSeal text="Verse" />
          </div>

          <div className="text-center mb-6">
            <Feather className="w-8 h-8 text-amber-700/50 mx-auto mb-4" />
            {item.title && (
              <h1 className="font-display text-3xl md:text-4xl text-stone-800 tracking-wide mb-2">
                {item.title}
              </h1>
            )}
            {item.category && (
              <span className="font-hand text-xl text-amber-700/60">
                {item.category}
              </span>
            )}
            <Ornament />
          </div>

          <p className="font-serif-vintage text-2xl md:text-3xl text-stone-700 italic text-center leading-loose whitespace-pre-line">
            {item.content}
          </p>

          <div className="mt-8 flex items-center justify-between pt-6 border-t border-amber-700/20">
            {item.author ? (
              <p className="font-hand text-2xl text-amber-700/80">
                — {item.author}
              </p>
            ) : (
              <p className="font-hand text-2xl text-stone-500/50">— Anonymous</p>
            )}
            <p className="font-body text-sm text-stone-500/60">
              {new Date(item.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
