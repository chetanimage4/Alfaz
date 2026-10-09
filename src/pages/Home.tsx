import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Feather,
  ScrollText,
  Mail,
  Library,
  PenTool,
  Settings,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { OrnamentDark } from '@/components/vintage/Ornament';
import { HangingLabel } from '@/components/vintage/HangingLabel';
import { fetchShayaris, fetchStories, fetchKhats, fetchBooks } from '@/lib/api';
import type { Shayari, Story, Khat, Book } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Home() {
  const [counts, setCounts] = useState({ shayaris: 0, stories: 0, khats: 0, books: 0 });
  const [featuredShayaris, setFeaturedShayaris] = useState<Shayari[]>([]);
  const ref = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    (async () => {
      try {
        const [s, st, k, b] = await Promise.all([
          fetchShayaris(),
          fetchStories(),
          fetchKhats(),
          fetchBooks(),
        ]);
        setCounts({ shayaris: s.length, stories: st.length, khats: k.length, books: b.length });
        setFeaturedShayaris(s.slice(0, 3));
      } catch {
        // counts stay at 0
      }
    })();
  }, []);

  const sections = [
    { to: '/shayaris', label: 'Shayaris', desc: 'Verses that breathe in the silence between words', icon: Feather, count: counts.shayaris, shape: 'blob-1' },
    { to: '/stories', label: 'Stories', desc: 'Tales woven from the fabric of memory and time', icon: ScrollText, count: counts.stories, shape: 'blob-2' },
    { to: '/khats', label: 'Unsent Khats', desc: 'Letters that were folded but never delivered', icon: Mail, count: counts.khats, shape: 'blob-3' },
    { to: '/books', label: 'Books', desc: 'A library where every page carries the weight of years', icon: Library, count: counts.books, shape: 'blob-4' },
    { to: '/thoughts', label: 'Thoughts', desc: 'Share what your heart whispers in quiet moments', icon: PenTool, count: 0, shape: 'blob-1' },
  ];

  return (
    <div ref={ref} className="min-h-screen vintage-wood-bg relative overflow-hidden">
      {/* Stage curtains top */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ background: 'linear-gradient(180deg, rgba(60,20,15,0.95) 0%, rgba(40,15,10,0.7) 60%, transparent 100%)' }}
        />
        <div className="absolute top-0 left-0 w-full h-28"
          style={{ background: 'repeating-linear-gradient(90deg, rgba(80,30,20,0.6) 0px, rgba(50,18,12,0.4) 30px, rgba(80,30,20,0.6) 60px, rgba(40,15,10,0.5) 90px)' }}
        />
        {/* Curtain tassels */}
        {[15, 35, 55, 75, 95].map((pos) => (
          <div key={pos} className="absolute animate-swing" style={{ left: `${pos}%`, top: '0px', transformOrigin: 'top center', animationDelay: `${pos * 0.02}s` }}>
            <div className="w-1 h-12 bg-gradient-to-b from-amber-700/40 to-amber-900/20" />
            <div className="w-3 h-3 rounded-full bg-amber-600/30 mx-auto -mt-1" />
          </div>
        ))}
      </div>

      {/* Hanging banners */}
      <div className="absolute top-8 left-4 md:left-12 z-20 animate-swing-slow" style={{ transformOrigin: 'top center' }}>
        <div className="w-1 h-16 bg-amber-800/40" />
        <div className="vintage-ribbon text-xs">Est. Today</div>
      </div>
      <div className="absolute top-8 right-4 md:right-12 z-20 animate-swing" style={{ transformOrigin: 'top center' }}>
        <div className="w-1 h-20 bg-amber-800/40" />
        <div className="vintage-ribbon text-xs">Literary</div>
      </div>

      {/* Hero section */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12">
        <div className="text-center max-w-4xl animate-text-blur-in">
          <p className="font-hand text-amber-500/60 text-2xl md:text-3xl mb-4">
            Welcome to the world of
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient font-bold tracking-wider mb-2 text-shadow-vintage animate-pulse-glow"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(201,168,76,0.3))' }}
          >
            ALFAZ
          </h1>
          <p className="font-serif-vintage text-xl md:text-2xl text-amber-200/60 italic tracking-wide mb-8">
            ٱلفاظ
          </p>
          <OrnamentDark className="my-6" />
          <p className="font-body text-lg md:text-xl text-amber-100/50 max-w-2xl mx-auto leading-relaxed">
            Step into an old library where shayaris echo through dusty shelves,
            stories wait in yellowed pages, and unsent letters rest in forgotten
            drawers. Here, every word is a relic — and every relic, a world.
          </p>
        </div>

        {/* Featured Shayari — floating card */}
        {featuredShayaris.length > 0 && (
          <div className="mt-12 max-w-2xl animate-scale-in">
            <div className="vintage-paper p-8 md:p-10 torn-bottom relative animate-float">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <HangingLabel>Today's Verse</HangingLabel>
              </div>
              {featuredShayaris[0].title && (
                <h3 className="font-display text-lg text-amber-800 text-center mb-4 tracking-wider">
                  {featuredShayaris[0].title}
                </h3>
              )}
              <p className="font-serif-vintage text-xl md:text-2xl text-stone-800 italic text-center leading-relaxed whitespace-pre-line">
                {featuredShayaris[0].content}
              </p>
              {featuredShayaris[0].author && (
                <p className="font-hand text-xl text-amber-700/70 text-right mt-4">
                  — {featuredShayaris[0].author}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in">
          <Link to="/shayaris" className="vintage-btn">
            <Feather className="w-4 h-4" /> Read Shayaris
          </Link>
          <Link to="/books" className="vintage-btn-outline">
            <Library className="w-4 h-4" /> Browse Books
          </Link>
        </div>
      </section>

      {/* Section cards */}
      <section className="relative z-20 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-500/70" />
              <h2 className="font-display text-3xl md:text-4xl text-amber-400 tracking-wider">
                The Collection
              </h2>
            </div>
            <OrnamentDark />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.to}
                  to={section.to}
                  className="group scroll-reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="vintage-paper p-8 h-full transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-25 group-hover:rotate-12 transition-all duration-700">
                      <Icon className="w-full h-full text-amber-800" />
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-amber-900/10 border border-amber-700/30 group-hover:bg-amber-900/20 group-hover:border-amber-600/50 transition-all duration-300">
                        <Icon className="w-6 h-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-stone-800 tracking-wide">
                          {section.label}
                        </h3>
                        {section.count > 0 && (
                          <span className="font-hand text-base text-amber-700/60">
                            {section.count} {section.count === 1 ? 'entry' : 'entries'}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-body text-stone-600 italic leading-relaxed">
                      {section.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-amber-700 group-hover:gap-4 transition-all duration-300">
                      <span className="font-display text-xs tracking-wider uppercase">Enter</span>
                      <span className="text-amber-700">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Admin card */}
            <Link to="/admin" className="group scroll-reveal" style={{ transitionDelay: '500ms' }}>
              <div className="vintage-paper-aged p-8 h-full transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl relative overflow-hidden border border-amber-800/20">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-25 group-hover:rotate-12 transition-all duration-700">
                  <Settings className="w-full h-full text-amber-800" />
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-amber-900/10 border border-amber-700/30 group-hover:bg-amber-900/20 group-hover:border-amber-600/50 transition-all duration-300">
                    <Settings className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-stone-800 tracking-wide">
                      Admin Panel
                    </h3>
                    <span className="font-hand text-base text-amber-700/60">Manage content</span>
                  </div>
                </div>
                <p className="font-body text-stone-600 italic leading-relaxed">
                  Add, edit, and curate the collection. The keeper's quarters.
                </p>
                <div className="mt-4 flex items-center gap-2 text-amber-700 group-hover:gap-4 transition-all duration-300">
                  <span className="font-display text-xs tracking-wider uppercase">Enter</span>
                  <span className="text-amber-700">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* More featured shayaris strip */}
      {featuredShayaris.length > 1 && (
        <section className="relative z-20 px-4 md:px-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 scroll-reveal">
              <h2 className="font-display text-2xl md:text-3xl text-amber-400 tracking-wide">
                Verses of the Day
              </h2>
              <OrnamentDark />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredShayaris.slice(1).map((shayari, i) => (
                <Link
                  key={shayari.id}
                  to={`/shayaris/${shayari.id}`}
                  className="group scroll-reveal"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="vintage-paper-aged p-6 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl relative">
                    {shayari.title && (
                      <h3 className="font-display text-base text-amber-800 tracking-wide mb-2">
                        {shayari.title}
                      </h3>
                    )}
                    <p className="font-serif-vintage text-lg text-stone-700 italic leading-relaxed line-clamp-4 whitespace-pre-line">
                      {shayari.content}
                    </p>
                    {shayari.author && (
                      <p className="font-hand text-lg text-amber-700/60 mt-3">
                        — {shayari.author}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom stage curtain */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10">
        <div className="absolute bottom-0 left-0 w-full h-full"
          style={{ background: 'linear-gradient(0deg, rgba(60,20,15,0.95) 0%, rgba(40,15,10,0.7) 60%, transparent 100%)' }}
        />
      </div>

      {/* Floating book icon */}
      <div className="absolute bottom-32 right-8 md:right-20 opacity-20 pointer-events-none animate-float">
        <BookOpen className="w-32 h-32 text-amber-600/30" />
      </div>
    </div>
  );
}
