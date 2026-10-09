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
} from 'lucide-react';
import { OrnamentDark } from '@/components/vintage/Ornament';
import { HangingLabel } from '@/components/vintage/HangingLabel';
import { fetchShayaris, fetchStories, fetchKhats, fetchBooks } from '@/lib/api';
import type { Shayari, Story, Khat, Book } from '@/types';

export default function Home() {
  const [counts, setCounts] = useState({ shayaris: 0, stories: 0, khats: 0, books: 0 });
  const [featuredShayari, setFeaturedShayari] = useState<Shayari | null>(null);

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
        if (s.length > 0) setFeaturedShayari(s[0]);
      } catch {
        // counts stay at 0
      }
    })();
  }, []);

  const sections = [
    {
      to: '/shayaris',
      label: 'Shayaris',
      desc: 'Verses that breathe in the silence between words',
      icon: Feather,
      count: counts.shayaris,
    },
    {
      to: '/stories',
      label: 'Stories',
      desc: 'Tales woven from the fabric of memory and time',
      icon: ScrollText,
      count: counts.stories,
    },
    {
      to: '/khats',
      label: 'Unsent Khats',
      desc: 'Letters that were folded but never delivered',
      icon: Mail,
      count: counts.khats,
    },
    {
      to: '/books',
      label: 'Books',
      desc: 'A library where every page carries the weight of years',
      icon: Library,
      count: counts.books,
    },
    {
      to: '/thoughts',
      label: 'Thoughts',
      desc: 'Share what your heart whispers in quiet moments',
      icon: PenTool,
      count: 0,
    },
  ];

  return (
    <div className="min-h-screen vintage-wood-bg relative overflow-hidden">
      {/* Stage curtains top */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(60,20,15,0.95) 0%, rgba(40,15,10,0.7) 60%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-24"
          style={{
            background:
              'repeating-linear-gradient(90deg, rgba(80,30,20,0.6) 0px, rgba(50,18,12,0.4) 30px, rgba(80,30,20,0.6) 60px, rgba(40,15,10,0.5) 90px)',
          }}
        />
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
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
        <div className="text-center max-w-4xl animate-fade-in-up">
          <p className="font-hand text-amber-500/60 text-2xl md:text-3xl mb-4">
            Welcome to the world of
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient font-bold tracking-wider mb-2 text-shadow-vintage">
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

        {/* Featured Shayari */}
        {featuredShayari && (
          <div className="mt-12 max-w-2xl animate-scale-in">
            <div className="vintage-paper p-8 md:p-10 torn-bottom relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <HangingLabel>Today's Verse</HangingLabel>
              </div>
              {featuredShayari.title && (
                <h3 className="font-display text-lg text-amber-800 text-center mb-4 tracking-wider">
                  {featuredShayari.title}
                </h3>
              )}
              <p className="font-serif-vintage text-xl md:text-2xl text-stone-800 italic text-center leading-relaxed whitespace-pre-line">
                {featuredShayari.content}
              </p>
              {featuredShayari.author && (
                <p className="font-hand text-xl text-amber-700/70 text-right mt-4">
                  — {featuredShayari.author}
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
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-amber-400 tracking-wider">
              The Collection
            </h2>
            <OrnamentDark />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.to}
                  to={section.to}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
                >
                  <div className="vintage-paper p-8 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Icon className="w-full h-full text-amber-800" />
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-amber-900/10 border border-amber-700/30">
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
                    <div className="mt-4 flex items-center gap-2 text-amber-700 group-hover:gap-3 transition-all">
                      <span className="font-display text-xs tracking-wider uppercase">Enter</span>
                      <span className="text-amber-700">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Admin card - only visible on home */}
            <Link
              to="/admin"
              className="group animate-fade-in-up"
              style={{ animationDelay: '500ms', opacity: 0 }}
            >
              <div className="vintage-paper-aged p-8 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl relative overflow-hidden border border-amber-800/20">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Settings className="w-full h-full text-amber-800" />
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-amber-900/10 border border-amber-700/30">
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
                <div className="mt-4 flex items-center gap-2 text-amber-700 group-hover:gap-3 transition-all">
                  <span className="font-display text-xs tracking-wider uppercase">Enter</span>
                  <span className="text-amber-700">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom stage curtain */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10">
        <div
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background:
              'linear-gradient(0deg, rgba(60,20,15,0.95) 0%, rgba(40,15,10,0.7) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Floating book icon */}
      <div className="absolute bottom-32 right-8 md:right-20 opacity-20 pointer-events-none animate-float">
        <BookOpen className="w-32 h-32 text-amber-600/30" />
      </div>
    </div>
  );
}
