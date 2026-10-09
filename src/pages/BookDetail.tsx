import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Library } from 'lucide-react';
import { fetchBook, fetchBookPages } from '@/lib/api';
import type { Book, BookPage } from '@/types';
import { LoadingScreen, ErrorScreen } from '@/components/States';
import { Ornament } from '@/components/vintage/Ornament';
import { Stamp } from '@/components/vintage/Stamp';
import { Recommendations } from '@/components/Recommendations';
import { getRecommendations, type Recommendation } from '@/lib/recommendations';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [pages, setPages] = useState<BookPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recs, setRecs] = useState<Recommendation[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [b, p] = await Promise.all([fetchBook(id!), fetchBookPages(id!)]);
        setBook(b);
        setPages(p);
        if (b) {
          const recommendations = await getRecommendations('book', id!, b.genre, b.author);
          setRecs(recommendations);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingScreen message="Opening the book..." />;
  if (error || !book) return <ErrorScreen message="This book could not be found" />;

  const chapters = pages.reduce((acc, page) => {
    const ch = page.chapter_title || 'Unchaptered';
    if (!acc[ch]) acc[ch] = [];
    acc[ch].push(page);
    return acc;
  }, {} as Record<string, BookPage[]>);

  return (
    <div className="min-h-screen vintage-wood-bg py-16 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <Link to="/books" className="vintage-btn-outline mb-8 inline-flex">
          <ArrowLeft className="w-4 h-4" /> The Library
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-scale-in">
          <div className="md:col-span-1">
            <div className="relative aspect-[3/4] overflow-hidden book-spine-left"
              style={{
                background: 'linear-gradient(135deg, #8b6b3a 0%, #6b4e2a 50%, #4a3520 100%)',
                border: '2px solid #4a3520',
              }}
            >
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : null}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                style={{ display: book.cover_url ? 'none' : 'flex' }}
              >
                <BookOpen className="w-12 h-12 text-amber-200/40 mb-4" />
                <h3 className="font-display text-xl text-amber-200/80 tracking-wide leading-tight">
                  {book.title}
                </h3>
                {book.author && (
                  <p className="font-hand text-lg text-amber-200/50 mt-2">{book.author}</p>
                )}
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-2"
                style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
              />
              <div className="absolute inset-2 border border-amber-500/20 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="vintage-paper p-8 h-full">
              <div className="flex items-start justify-between gap-2 mb-4">
                <h1 className="font-display text-3xl md:text-4xl text-stone-800 tracking-wide leading-tight">
                  {book.title}
                </h1>
                {book.genre && <Stamp>{book.genre}</Stamp>}
              </div>
              {book.author && (
                <p className="font-hand text-2xl text-amber-700/70 mb-4">
                  by {book.author}
                </p>
              )}
              {book.description && (
                <p className="font-body text-lg text-stone-600 italic leading-relaxed mb-4">
                  {book.description}
                </p>
              )}
              {book.about && (
                <div>
                  <h3 className="font-display text-sm tracking-wider uppercase text-amber-700/60 mb-2">
                    About
                  </h3>
                  <p className="font-body text-stone-700 leading-relaxed whitespace-pre-line">
                    {book.about}
                  </p>
                </div>
              )}
              <div className="mt-6 flex items-center gap-3">
                <Link to={`/books/${book.id}/read`} className="vintage-btn">
                  <BookOpen className="w-4 h-4" /> Begin Reading
                </Link>
                <span className="font-hand text-lg text-amber-700/60">
                  {pages.length} {pages.length === 1 ? 'page' : 'pages'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {pages.length > 0 && (
          <div className="vintage-paper-aged p-8">
            <div className="flex items-center gap-3 mb-4">
              <Library className="w-5 h-5 text-amber-700/60" />
              <h2 className="font-display text-xl text-stone-800 tracking-wide">
                Table of Contents
              </h2>
            </div>
            <Ornament />
            <div className="space-y-6">
              {Object.entries(chapters).map(([chapter, chPages]) => (
                <div key={chapter}>
                  <h3 className="font-display text-base text-amber-800 tracking-wide mb-2">
                    {chapter}
                  </h3>
                  <div className="space-y-1 pl-4">
                    {chPages.map((page) => (
                      <Link
                        key={page.id}
                        to={`/books/${book.id}/read?page=${page.page_number}`}
                        className="flex items-center gap-3 font-body text-stone-600 hover:text-amber-700 transition-colors group"
                      >
                        <span className="text-amber-700/40 text-sm w-8">
                          pg. {page.page_number}
                        </span>
                        <span className="flex-1 truncate group-hover:underline">
                          {page.content?.substring(0, 60) || '...'}
                        </span>
                        <span className="text-amber-700 group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Recommendations items={recs} />
      </div>
    </div>
  );
}
