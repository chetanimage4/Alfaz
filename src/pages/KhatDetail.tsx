import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { fetchKhat } from '@/lib/api';
import type { Khat } from '@/types';
import { LoadingScreen, ErrorScreen } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { WaxSeal } from '@/components/vintage/WaxSeal';
import { Stamp } from '@/components/vintage/Stamp';
import { Recommendations } from '@/components/Recommendations';
import { getRecommendations, type Recommendation } from '@/lib/recommendations';

export default function KhatDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Khat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recs, setRecs] = useState<Recommendation[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchKhat(id!);
        setItem(data);
        if (data) {
          const recommendations = await getRecommendations('khat', id!, null, data.author);
          setRecs(recommendations);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingScreen message="Unfolding the letter..." />;
  if (error || !item) return <ErrorScreen message="This letter could not be found" />;

  return (
    <div className="min-h-screen vintage-wood-bg py-16 px-4 md:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <Link to="/khats" className="vintage-btn-outline mb-8 inline-flex">
          <ArrowLeft className="w-4 h-4" /> All Khats
        </Link>

        <div className="envelope p-10 md:p-14 relative animate-letter-slide">
          <div className="absolute top-6 right-6 flex flex-col items-center gap-3">
            <WaxSeal text="Unsent" />
            <Stamp>Postage</Stamp>
          </div>

          <div className="text-center mb-8">
            <Mail className="w-8 h-8 text-amber-700/50 mx-auto mb-4 animate-float" />
            <h1 className="font-display text-3xl text-stone-800 tracking-wide mb-2">
              {item.title}
            </h1>
            <Ornament />
          </div>

          <div className="border border-amber-700/20 p-4 mb-6 bg-amber-50/30">
            {item.recipient && (
              <p className="font-hand text-xl text-stone-700">
                <span className="text-amber-700/60 text-sm font-display tracking-wider uppercase mr-2">To:</span>
                {item.recipient}
              </p>
            )}
            {item.author && (
              <p className="font-hand text-xl text-stone-700 mt-2">
                <span className="text-amber-700/60 text-sm font-display tracking-wider uppercase mr-2">From:</span>
                {item.author}
              </p>
            )}
          </div>

          <div className="font-body text-lg text-stone-700 leading-loose whitespace-pre-line italic">
            {item.content}
          </div>

          <div className="mt-8 pt-6 border-t border-amber-700/20 text-center">
            <p className="font-body text-sm text-stone-500/60">
              {new Date(item.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <Recommendations items={recs} />
      </div>
    </div>
  );
}
