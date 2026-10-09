import { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { fetchBook, fetchBookPages } from '@/lib/api';
import type { Book, BookPage } from '@/types';
import { LoadingScreen, ErrorScreen } from '@/components/States';

export default function BookReader() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [book, setBook] = useState<Book | null>(null);
  const [pages, setPages] = useState<BookPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [turning, setTurning] = useState(false);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageIndex = Math.max(0, Math.min(currentPage - 1, pages.length - 1));
  const page = pages[pageIndex];

  useEffect(() => {
    (async () => {
      try {
        const [b, p] = await Promise.all([fetchBook(id!), fetchBookPages(id!)]);
        setBook(b);
        setPages(p);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const goToPage = useCallback(
    (pageNum: number) => {
      setTurning(true);
      setTimeout(() => {
        setSearchParams({ page: String(pageNum) });
        setTurning(false);
      }, 300);
    },
    [setSearchParams]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && pageIndex < pages.length - 1) {
        goToPage(currentPage + 1);
      } else if (e.key === 'ArrowLeft' && pageIndex > 0) {
        goToPage(currentPage - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pageIndex, pages.length, currentPage, goToPage]);

  if (loading) return <LoadingScreen message="Preparing the book..." />;
  if (error || !book) return <ErrorScreen message="This book could not be opened" />;
  if (pages.length === 0)
    return (
      <div className="min-h-screen vintage-wood-bg flex items-center justify-center">
        <div className="vintage-paper p-10 text-center max-w-md animate-scale-in">
          <BookOpen className="w-12 h-12 text-amber-700/50 mx-auto mb-4" />
          <p className="font-serif-vintage text-xl text-stone-700 italic">
            This book has no pages yet.
          </p>
          <Link to={`/books/${book.id}`} className="vintage-btn-outline mt-6 inline-flex">
            <ArrowLeft className="w-4 h-4" /> Back to Book
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen vintage-wood-bg py-8 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/books/${book.id}`} className="vintage-btn-outline">
            <ArrowLeft className="w-4 h-4" /> Close Book
          </Link>
          <div className="text-center">
            <p className="font-display text-sm text-amber-400 tracking-wider">
              {book.title}
            </p>
          </div>
          <div className="w-28" />
        </div>

        {/* Book spread */}
        <div className="relative perspective-1000">
          <div
            className={`vintage-paper p-8 md:p-14 min-h-[60vh] relative preserve-3d transition-all duration-300 ${
              turning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              {page.chapter_title ? (
                <span className="font-display text-xs tracking-wider uppercase text-amber-700/60">
                  {page.chapter_title}
                </span>
              ) : (
                <span />
              )}
              <span className="font-hand text-lg text-amber-700/50">
                Page {page.page_number}
              </span>
            </div>

            {page.image_url && (
              <div className="mb-6 border border-amber-700/20 p-2 bg-amber-50/30">
                <img
                  src={page.image_url}
                  alt={page.chapter_title || 'Page illustration'}
                  className="w-full max-h-64 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                />
              </div>
            )}

            <div className="font-body text-lg md:text-xl text-stone-700 leading-loose whitespace-pre-line">
              {page.content || 'This page is empty.'}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px bg-amber-700/20 w-12" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-700/30" />
              <div className="h-px bg-amber-700/20 w-12" />
            </div>
          </div>

          {turning && (
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.2) 100%)',
                animation: 'fadeIn 0.3s ease-out',
              }}
            />
          )}
        </div>

        {/* Navigation controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={pageIndex === 0}
            className={`vintage-btn-outline ${pageIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex items-center gap-2">
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goToPage(i + 1)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === pageIndex
                    ? 'bg-amber-500 scale-125'
                    : 'bg-amber-700/30 hover:bg-amber-600/50'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={pageIndex >= pages.length - 1}
            className={`vintage-btn-outline ${
              pageIndex >= pages.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-4 text-center font-body text-sm text-amber-200/30 italic">
          Use arrow keys to navigate pages
        </p>
      </div>
    </div>
  );
}
