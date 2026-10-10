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
  Flame,
  Quote,
} from 'lucide-react';
import { OrnamentDark } from '@/components/vintage/Ornament';
import { HangingLabel } from '@/components/vintage/HangingLabel';
import { fetchShayaris, fetchStories, fetchKhats, fetchBooks } from '@/lib/api';
import type { Shayari } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const tornShapes = ['torn-paper-a', 'torn-paper-b', 'torn-paper-c'];

export default function Home() {
  const [counts, setCounts] = useState({ shayaris: 0, stories: 0, khats: 0, books: 0 });
  const [featuredShayaris, setFeaturedShayaris] = useState<Shayari[]>([]);
  const ref = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    (async () => {
      try {
        const [s, st, k, b] = await Promise.all([
          fetchShayaris(), fetchStories(), fetchKhats(), fetchBooks(),
        ]);
        setCounts({ shayaris: s.length, stories: st.length, khats: k.length, books: b.length });
        setFeaturedShayaris(s.slice(0, 3));
      } catch { /* counts stay 0 */ }
    })();
  }, []);

  const sections = [
    { to: '/shayaris', label: 'Shayaris', desc: 'Verses that breathe in the silence between words', icon: Feather, count: counts.shayaris },
    { to: '/stories', label: 'Stories', desc: 'Tales woven from the fabric of memory and time', icon: ScrollText, count: counts.stories },
    { to: '/khats', label: 'Unsent Khats', desc: 'Letters that were folded but never delivered', icon: Mail, count: counts.khats },
    { to: '/books', label: 'Books', desc: 'A library where every page carries the weight of years', icon: Library, count: counts.books },
    { to: '/thoughts', label: 'Thoughts', desc: 'Share what your heart whispers in quiet moments', icon: PenTool, count: 0 },
  ];

  return (
    <div ref={ref} className="min-h-screen vintage-wood-bg relative overflow-hidden">
      {/* Top dark gradient with curtain tassels */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ background: 'linear-gradient(180deg, rgba(60,20,15,0.9) 0%, rgba(40,15,10,0.5) 60%, transparent 100%)' }}
        />
        {[12, 28, 44, 60, 76, 92].map((pos, i) => (
          <div key={pos} className="absolute animate-swing" style={{ left: `${pos}%`, top: 0, transformOrigin: 'top center', animationDelay: `${i * 0.3}s` }}>
            <div className="w-0.5 h-10 bg-gradient-to-b from-amber-700/30 to-transparent" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600/20 mx-auto -mt-0.5" />
          </div>
        ))}
      </div>

      {/* Hanging tags — asymmetric positions */}
      <div className="absolute top-6 left-6 md:left-16 z-20 animate-swing-slow" style={{ transformOrigin: 'top center' }}>
        <div className="w-0.5 h-14 bg-amber-800/30" />
        <div className="vintage-ribbon text-xs">Est. Today</div>
      </div>
      <div className="absolute top-10 right-8 md:right-20 z-20 animate-swing" style={{ transformOrigin: 'top center', animationDelay: '1s' }}>
        <div className="w-0.5 h-20 bg-amber-800/30" />
        <div className="vintage-ribbon text-xs">Literary</div>
      </div>

      {/* Hero — offset, asymmetric layout */}
      <section className="relative z-20 min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 pb-8">
        {/* Ember glow behind title */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl animate-ember-glow pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)' }}
        />

        <div className="text-center max-w-4xl animate-text-blur-in relative">
          <p className="font-hand text-amber-500/50 text-2xl md:text-3xl mb-3">
            Welcome to the world of
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] text-gold-gradient font-bold tracking-wider mb-2 text-shadow-vintage animate-pulse-glow leading-none">
            ALFAZ
          </h1>
          <p className="font-serif-vintage text-xl md:text-2xl text-amber-200/50 italic tracking-[0.3em] mb-6">
            ٱلفاظ
          </p>
          <OrnamentDark className="my-4" />
          <p className="font-body text-base md:text-lg text-amber-100/40 max-w-xl mx-auto leading-relaxed">
            Step into an old library where shayaris echo through dusty shelves,
            stories wait in yellowed pages, and unsent letters rest in forgotten
            drawers. Here, every word is a relic — and every relic, a world.
          </p>
        </div>

        {/* Featured shayari — rotated, torn, half-burnt card */}
        {featuredShayaris.length > 0 && (
          <div className="mt-10 max-w-xl animate-scale-in">
            <div className="paper-half-burnt torn-paper-b burnt-edges p-8 md:p-10 relative animate-float" style={{ transform: 'rotate(-1.5deg)' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <HangingLabel>Today's Verse</HangingLabel>
              </div>
              <Quote className="absolute top-6 left-6 w-8 h-8 text-amber-700/15" />
              {featuredShayaris[0].title && (
                <h3 className="font-display text-lg text-amber-800 text-center mb-3 tracking-wider">
                  {featuredShayaris[0].title}
                </h3>
              )}
              <p className="font-serif-vintage text-xl md:text-2xl text-stone-800 italic text-center leading-relaxed whitespace-pre-line">
                {featuredShayaris[0].content}
              </p>
              {featuredShayaris[0].author && (
                <p className="font-hand text-xl text-amber-700/60 text-right mt-4">
                  — {featuredShayaris[0].author}
                </p>
              )}
              {/* Burnt corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at bottom right, rgba(30,15,5,0.4) 0%, transparent 70%)' }}
              />
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3 justify-center animate-fade-in">
          <Link to="/shayaris" className="vintage-btn">
            <Feather className="w-4 h-4" /> Read Shayaris
          </Link>
          <Link to="/books" className="vintage-btn-outline">
            <Library className="w-4 h-4" /> Browse Books
          </Link>
        </div>
      </section>

      {/* Collection — asymmetric scattered grid with torn, burnt cards */}
      <section className="relative z-20 px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 scroll-reveal">
            <div className="inline-flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-amber-500/60 animate-ember-glow" />
              <h2 className="font-display text-3xl md:text-4xl text-amber-400 tracking-wider">
                The Collection
              </h2>
              <Flame className="w-5 h-5 text-amber-500/60 animate-ember-glow" style={{ animationDelay: '1.5s' }} />
            </div>
            <OrnamentDark />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sections.map((section, i) => {
              const Icon = section.icon;
              const shape = tornShapes[i % 3];
              const rotation = i % 2 === 0 ? '-1deg' : '1.5deg';
              return (
                <Link
                  key={section.to}
                  to={section.to}
                  className="group scroll-reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`vintage-paper ${shape} burnt-edges p-7 h-full transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-0 group-hover:shadow-2xl relative overflow-hidden`}
                    style={{ transform: `rotate(${rotation})` }}
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 opacity-10 group-hover:opacity-25 group-hover:rotate-12 transition-all duration-700">
                      <Icon className="w-full h-full text-amber-800" />
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-11 h-11 flex items-center justify-center bg-amber-900/10 border border-amber-700/25 group-hover:bg-amber-900/20 group-hover:border-amber-600/50 transition-all duration-300">
                        <Icon className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-stone-800 tracking-wide">
                          {section.label}
                        </h3>
                        {section.count > 0 && (
                          <span className="font-hand text-base text-amber-700/50">
                            {section.count} {section.count === 1 ? 'entry' : 'entries'}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-body text-sm text-stone-600 italic leading-relaxed">
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

            {/* Admin card — more burnt, aged */}
            <Link to="/admin" className="group scroll-reveal" style={{ transitionDelay: '400ms' }}>
              <div
                className="vintage-paper-aged torn-paper-c burnt-corner-br p-7 h-full transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-0 group-hover:shadow-2xl relative overflow-hidden"
                style={{ transform: 'rotate(-1deg)' }}
              >
                <div className="absolute top-0 right-0 w-28 h-28 opacity-10 group-hover:opacity-25 group-hover:rotate-12 transition-all duration-700">
                  <Settings className="w-full h-full text-amber-800" />
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 flex items-center justify-center bg-amber-900/10 border border-amber-700/25 group-hover:bg-amber-900/20 group-hover:border-amber-600/50 transition-all duration-300">
                    <Settings className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-stone-800 tracking-wide">Admin Panel</h3>
                    <span className="font-hand text-base text-amber-700/50">Manage content</span>
                  </div>
                </div>
                <p className="font-body text-sm text-stone-600 italic leading-relaxed">
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

      {/* Verses of the day — staggered, asymmetric */}
      {featuredShayaris.length > 1 && (
        <section className="relative z-20 px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 scroll-reveal">
              <div className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500/50" />
                <h2 className="font-display text-2xl md:text-3xl text-amber-400 tracking-wide">
                  Verses of the Day
                </h2>
                <Sparkles className="w-4 h-4 text-amber-500/50" />
              </div>
              <OrnamentDark />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredShayaris.slice(1).map((shayari, i) => {
                const shape = tornShapes[(i + 1) % 3];
                const rotation = i % 2 === 0 ? '2deg' : '-1.5deg';
                return (
                  <Link
                    key={shayari.id}
                    to={`/shayaris/${shayari.id}`}
                    className="group scroll-reveal"
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div
                      className={`paper-half-burnt ${shape} burnt-edges p-6 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-xl relative`}
                      style={{ transform: `rotate(${rotation})` }}
                    >
                      {shayari.title && (
                        <h3 className="font-display text-base text-amber-800 tracking-wide mb-2">
                          {shayari.title}
                        </h3>
                      )}
                      <p className="font-serif-vintage text-lg text-stone-700 italic leading-relaxed line-clamp-4 whitespace-pre-line">
                        {shayari.content}
                      </p>
                      {shayari.author && (
                        <p className="font-hand text-lg text-amber-700/50 mt-3">
                          — {shayari.author}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10">
        <div className="absolute bottom-0 left-0 w-full h-full"
          style={{ background: 'linear-gradient(0deg, rgba(60,20,15,0.9) 0%, transparent 100%)' }}
        />
      </div>

      {/* Floating book icon — decorative */}
      <div className="absolute bottom-24 right-6 md:right-16 opacity-[0.08] pointer-events-none animate-float">
        <BookOpen className="w-24 h-24 text-amber-600/40" />
      </div>
    </div>
  );
}
