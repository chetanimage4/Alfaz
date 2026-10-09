import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ScrollText } from 'lucide-react';
import { fetchStory } from '@/lib/api';
import type { Story } from '@/types';
import { LoadingScreen, ErrorScreen } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { Stamp } from '@/components/vintage/Stamp';
import { Recommendations } from '@/components/Recommendations';
import { getRecommendations, type Recommendation } from '@/lib/recommendations';

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recs, setRecs] = useState<Recommendation[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchStory(id!);
        setItem(data);
        if (data) {
          const recommendations = await getRecommendations('story', id!, data.category, data.author);
          setRecs(recommendations);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingScreen message="Turning the pages..." />;
  if (error || !item) return <ErrorScreen message="This story could not be found" />;

  return (
    <div className="min-h-screen vintage-wood-bg py-16 px-4 md:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <Link to="/stories" className="vintage-btn-outline mb-8 inline-flex">
          <ArrowLeft className="w-4 h-4" /> All Stories
        </Link>

        <div className="vintage-paper p-10 md:p-14 relative animate-scale-in">
          <div className="text-center mb-8">
            <ScrollText className="w-10 h-10 text-amber-700/50 mx-auto mb-4 animate-float" />
            <h1 className="font-display text-3xl md:text-4xl text-stone-800 tracking-wide mb-2">
              {item.title}
            </h1>
            {item.author && (
              <p className="font-hand text-2xl text-amber-700/70">
                by {item.author}
              </p>
            )}
            {item.category && (
              <div className="mt-3">
                <Stamp>{item.category}</Stamp>
              </div>
            )}
            <Ornament />
          </div>

          {item.excerpt && (
            <p className="font-serif-vintage text-xl text-amber-800/70 italic text-center mb-8 leading-relaxed">
              {item.excerpt}
            </p>
          )}

          <div className="font-body text-lg text-stone-700 leading-loose whitespace-pre-line">
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
