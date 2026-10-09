import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Library, ArrowLeft, BookOpen } from 'lucide-react';
import { fetchBooks } from '@/lib/api';
import type { Book } from '@/types';
import { LoadingScreen, ErrorScreen, EmptyState } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { Stamp } from '@/components/vintage/Stamp';

export default function Books() {
  const [items, setItems] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBooks();
        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingScreen message="Arranging the shelves..." />;
  if (error) return <ErrorScreen message="Could not load the library" />;
  if (items.length === 0) return <EmptyState message="The library shelves are empty." />;

  return (
    <div className="min-h-screen vintage-wood-bg py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <Library className="w-8 h-8 text-amber-500" />
            <h1 className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider">
              The Library
            </h1>
          </div>
          <p className="font-body text-amber-200/50 italic text-lg">
            Where every page carries the weight of years
          </p>
          <Ornament />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((book, i) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
            >
              <div className="flex flex-col h-full">
                {/* Book cover */}
                <div className="relative aspect-[3/4] overflow-hidden mb-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #8b6b3a 0%, #6b4e2a 50%, #4a3520 100%)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.3)',
                    border: '2px solid #4a3520',
                    borderRadius: '2px 6px 6px 2px',
                  }}
                >
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : null}

                  {/* Cover overlay with title if no image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                    style={{ display: book.cover_url ? 'none' : 'flex' }}
                  >
                    <BookOpen className="w-12 h-12 text-amber-200/40 mb-4" />
                    <h3 className="font-display text-xl text-amber-200/80 tracking-wide leading-tight">
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className="font-hand text-lg text-amber-200/50 mt-2">
                        {book.author}
                      </p>
                    )}
                  </div>

                  {/* Spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-2"
                    style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
                  />

                  {/* Gold border decoration */}
                  <div className="absolute inset-2 border border-amber-500/20 pointer-events-none" />
                </div>

                {/* Book info */}
                <div className="vintage-paper p-4 flex-1 transition-all duration-500 group-hover:shadow-xl">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg text-stone-800 tracking-wide leading-tight">
                      {book.title}
                    </h3>
                    {book.genre && (
                      <Stamp className="flex-shrink-0">{book.genre}</Stamp>
                    )}
                  </div>
                  {book.author && (
                    <p className="font-hand text-lg text-amber-700/70 mb-2">
                      {book.author}
                    </p>
                  )}
                  {book.description && (
                    <p className="font-body text-sm text-stone-600 italic leading-relaxed line-clamp-2">
                      {book.description}
                    </p>
                  )}
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
