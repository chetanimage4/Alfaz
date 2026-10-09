import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, ArrowLeft, Send } from 'lucide-react';
import { fetchThoughts, createThought } from '@/lib/api';
import type { Thought } from '@/types';
import { LoadingScreen, ErrorScreen, EmptyState } from '@/components/States';
import { OrnamentDark } from '@/components/vintage/Ornament';
import { useToast } from '@/components/ToastProvider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Thoughts() {
  const [items, setItems] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const ref = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchThoughts();
        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const newThought = await createThought({
        content: content.trim(),
        author: author.trim() || null,
      });
      setItems([newThought, ...items]);
      setContent('');
      setAuthor('');
      toast('Your thought has been shared. Thank you.', 'success');
    } catch {
      toast('Could not share your thought. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="min-h-screen vintage-wood-bg py-16 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-text-blur-in">
          <div className="inline-flex items-center gap-3 mb-2">
            <PenTool className="w-8 h-8 text-amber-500 animate-float" />
            <h1 className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider">
              Share Your Thoughts
            </h1>
          </div>
          <p className="font-body text-amber-200/50 italic text-lg">
            What does your heart whisper in quiet moments?
          </p>
          <OrnamentDark />
        </div>

        {/* Submit form */}
        <div className="vintage-paper p-8 md:p-10 mb-10 relative animate-scale-in">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="vintage-ribbon">Write</div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-2">
                Your Thought
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="vintage-textarea"
                placeholder="Share what's on your mind..."
                rows={4}
                required
              />
            </div>
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="vintage-input"
                placeholder="Anonymous"
              />
            </div>
            <button type="submit" disabled={submitting} className="vintage-btn">
              <Send className="w-4 h-4" />
              {submitting ? 'Sharing...' : 'Share Thought'}
            </button>
          </form>
        </div>

        {/* Shared thoughts */}
        <div>
          <div className="text-center mb-6 scroll-reveal">
            <h2 className="font-display text-2xl text-amber-400 tracking-wide">
              Shared Reflections
            </h2>
            <OrnamentDark />
          </div>

          {loading ? (
            <LoadingScreen message="Gathering thoughts..." />
          ) : error ? (
            <ErrorScreen message="Could not load thoughts" />
          ) : items.length === 0 ? (
            <EmptyState message="No thoughts shared yet. Be the first." />
          ) : (
            <div className="space-y-6 mt-6">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="vintage-paper-aged p-6 scroll-reveal relative"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-amber-700/10 border border-amber-700/20 flex items-center justify-center">
                      <PenTool className="w-4 h-4 text-amber-700/50" />
                    </div>
                  </div>
                  <p className="font-serif-vintage text-xl text-stone-700 italic leading-relaxed pr-12">
                    "{item.content}"
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-hand text-lg text-amber-700/70">
                      — {item.author || 'Anonymous'}
                    </p>
                    <p className="font-body text-xs text-stone-500/50">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
