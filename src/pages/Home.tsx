import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Feather,
  ScrollText,
  Mail,
  Library,
  PenTool,
  Settings,
  Quote,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { OrnamentDark } from '@/components/vintage/Ornament';
import { HangingLabel } from '@/components/vintage/HangingLabel';
import { fetchShayaris, fetchStories, fetchKhats, fetchBooks } from '@/lib/api';
import type { Shayari } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const collectionShapes = ['torn-paper-a', 'torn-paper-b', 'torn-paper-c', 'torn-paper-b', 'torn-paper-a', 'torn-paper-c'];
const collectionStyles = ['collection-card-ink', 'collection-card-wine', 'collection-card-letter', 'collection-card-library', 'collection-card-quiet'];

function formatPoetry(value: string) {
  return value.replace(/\\n/g, '\n');
}

export default function Home() {
  const [counts, setCounts] = useState({ shayaris: 0, stories: 0, khats: 0, books: 0 });
  const [featuredShayaris, setFeaturedShayaris] = useState<Shayari[]>([]);
  const ref = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    (async () => {
      try {
        const [shayaris, stories, khats, books] = await Promise.all([
          fetchShayaris(), fetchStories(), fetchKhats(), fetchBooks(),
        ]);
        setCounts({ shayaris: shayaris.length, stories: stories.length, khats: khats.length, books: books.length });
        setFeaturedShayaris(shayaris.slice(0, 3));
      } catch {
        setCounts({ shayaris: 0, stories: 0, khats: 0, books: 0 });
      }
    })();
  }, []);

  const sections = [
    { to: '/shayaris', label: 'Shayaris', kicker: 'The verse room', desc: 'Verses that breathe in the silence between words.', icon: Feather, count: counts.shayaris },
    { to: '/stories', label: 'Stories', kicker: 'The long shelf', desc: 'Tales woven from the fabric of memory and time.', icon: ScrollText, count: counts.stories },
    { to: '/khats', label: 'Unsent Khats', kicker: 'The writing desk', desc: 'Letters folded, sealed, and never delivered.', icon: Mail, count: counts.khats },
    { to: '/books', label: 'Books', kicker: 'The library', desc: 'A library where every page carries the weight of years.', icon: Library, count: counts.books },
    { to: '/thoughts', label: 'Thoughts', kicker: 'The margins', desc: 'Small truths whispered in the quiet between chapters.', icon: PenTool, count: 0 },
  ];

  return (
    <div ref={ref} className="min-h-screen vintage-wood-bg relative overflow-hidden">
      <section className="theatre-stage relative z-20 px-5 pt-24 pb-16 md:px-10 md:pt-28 md:pb-24">
        <div className="velvet-curtain velvet-curtain-left" aria-hidden="true" />
        <div className="velvet-curtain velvet-curtain-right" aria-hidden="true" />
        <div className="stage-warmth" aria-hidden="true" />
        <div className="stage-threads" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 flex items-center justify-between border-y border-amber-700/20 py-3 text-[0.62rem] uppercase tracking-[0.3em] text-amber-200/45">
            <span>Vol. I · The house of words</span>
            <span className="hidden sm:inline">An archive of feeling</span>
            <span>Est. in the quiet</span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
            <div className="animate-text-blur-in">
              <p className="mb-4 font-hand text-2xl text-amber-400/75 md:text-3xl">Welcome to the world of</p>
              <h1 className="font-display text-6xl font-semibold leading-[0.86] tracking-[0.08em] text-gold-gradient text-shadow-vintage sm:text-8xl lg:text-[8.5rem]">
                ALFAZ
              </h1>
              <div className="mt-5 flex items-center gap-4">
                <span className="h-px w-14 bg-amber-500/60" />
                <p className="font-serif-vintage text-2xl italic tracking-[0.25em] text-amber-100/75">ٱلفاظ</p>
                <span className="h-px w-14 bg-amber-500/60" />
              </div>
              <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-amber-50/70 md:text-xl">
                An old library for new feelings — where shayaris echo through dusty shelves,
                stories wait in yellowed pages, and every word becomes a relic.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shayaris" className="vintage-btn"><Feather className="h-4 w-4" /> Read the verses</Link>
                <Link to="/books" className="vintage-btn-outline">Enter the library <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </div>

            {featuredShayaris.length > 0 && (
              <div className="relative animate-scale-in lg:pt-8">
                <div className="verse-shadow" aria-hidden="true" />
                <article className="today-verse torn-paper-b burnt-edges relative px-7 py-10 sm:px-10 sm:py-12">
                  <HangingLabel>Today's shayari</HangingLabel>
                  <Quote className="absolute right-6 top-7 h-10 w-10 rotate-180 text-amber-800/15" />
                  <p className="mb-5 font-display text-[0.65rem] uppercase tracking-[0.28em] text-amber-800/70">From the newest page</p>
                  {featuredShayaris[0].title && (
                    <h2 className="mb-4 font-serif-vintage text-2xl font-semibold text-stone-800 sm:text-3xl">
                      {featuredShayaris[0].title}
                    </h2>
                  )}
                  <p className="poetry-text font-serif-vintage text-xl italic leading-[1.7] text-stone-800 sm:text-2xl">
                    {formatPoetry(featuredShayaris[0].content)}
                  </p>
                  {featuredShayaris[0].author && (
                    <p className="mt-7 border-t border-amber-800/20 pt-4 text-right font-hand text-2xl text-amber-800/75">
                      — {featuredShayaris[0].author}
                    </p>
                  )}
                  <div className="absolute bottom-4 left-7 h-px w-16 bg-amber-800/30" />
                </article>
                <span className="absolute -bottom-5 -left-3 rotate-[-8deg] font-hand text-xl text-amber-100/45">a page worth keeping</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-20 px-5 pb-20 pt-12 md:px-10 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-amber-700/25 pb-6 sm:flex-row sm:items-end">
            <div className="scroll-reveal">
              <p className="mb-2 font-display text-[0.65rem] uppercase tracking-[0.3em] text-amber-500/75">A living archive</p>
              <h2 className="font-serif-vintage text-4xl font-semibold text-amber-100/90 md:text-5xl">The Collection</h2>
            </div>
            <p className="max-w-xs font-body text-base italic leading-relaxed text-amber-100/50 sm:text-right">
              Five rooms. Countless voices. Take the long way through.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link key={section.to} to={section.to} className="group scroll-reveal" style={{ transitionDelay: `${index * 80}ms` }}>
                  <div className={`collection-card ${collectionStyles[index] ?? collectionStyles[0]} ${collectionShapes[index]} relative h-full min-h-[245px] overflow-hidden p-7`}>
                    <div className="card-engraving" aria-hidden="true"><Icon /></div>
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-7 flex items-start justify-between">
                        <span className="font-display text-[0.62rem] uppercase tracking-[0.24em] text-amber-900/60">0{index + 1} / {section.kicker}</span>
                        <Icon className="h-5 w-5 text-amber-800/65 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                      </div>
                      <h3 className="font-serif-vintage text-3xl font-semibold text-stone-800">{section.label}</h3>
                      {section.count > 0 && <span className="mt-1 font-hand text-lg text-amber-800/65">{section.count} {section.count === 1 ? 'entry' : 'entries'}</span>}
                      <p className="mt-auto max-w-[18rem] pt-6 font-body text-lg italic leading-relaxed text-stone-700/85">{section.desc}</p>
                      <span className="mt-5 flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.2em] text-amber-800 transition-all group-hover:gap-4">Open room <ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </Link>
              );
            })}

            <Link to="/admin" className="group scroll-reveal" style={{ transitionDelay: '400ms' }}>
              <div className="collection-card collection-card-admin torn-paper-c relative h-full min-h-[245px] overflow-hidden p-7">
                <div className="card-engraving" aria-hidden="true"><Settings /></div>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-7 flex items-start justify-between"><span className="font-display text-[0.62rem] uppercase tracking-[0.24em] text-amber-100/50">06 / The keeper's desk</span><Settings className="h-5 w-5 text-amber-200/65 transition-transform duration-500 group-hover:rotate-45" /></div>
                  <h3 className="font-serif-vintage text-3xl font-semibold text-amber-50">Admin Panel</h3>
                  <p className="mt-auto max-w-[18rem] pt-6 font-body text-lg italic leading-relaxed text-amber-50/65">Add, edit, and curate the collection from the keeper's desk.</p>
                  <span className="mt-5 flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.2em] text-amber-300 transition-all group-hover:gap-4">Enter quietly <ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {featuredShayaris.length > 1 && (
        <section className="relative z-20 px-5 pb-24 md:px-10">
          <div className="mx-auto max-w-5xl border-t border-amber-700/20 pt-14">
            <div className="mb-9 text-center scroll-reveal"><Sparkles className="mx-auto mb-3 h-4 w-4 text-amber-500/65" /><h2 className="font-serif-vintage text-3xl text-amber-100/85 md:text-4xl">More from the reading room</h2><OrnamentDark /></div>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredShayaris.slice(1).map((shayari, index) => (
                <Link key={shayari.id} to={`/shayaris/${shayari.id}`} className="group scroll-reveal" style={{ transitionDelay: `${index * 120}ms` }}>
                  <article className={`paper-half-burnt ${collectionShapes[index + 1]} burnt-edges relative h-full p-7 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`} style={{ transform: `rotate(${index === 0 ? '1.2deg' : '-1.2deg'})` }}>
                    {shayari.title && <h3 className="mb-3 font-serif-vintage text-2xl text-stone-800">{shayari.title}</h3>}
                    <p className="poetry-text font-serif-vintage text-xl italic leading-relaxed text-stone-700">{formatPoetry(shayari.content)}</p>
                    {shayari.author && <p className="mt-4 text-right font-hand text-xl text-amber-700/65">— {shayari.author}</p>}
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
