import { Link } from 'react-router-dom';
import { BookOpen, Feather } from 'lucide-react';
import { OrnamentDark } from '@/components/vintage/Ornament';

export function Footer() {
  return (
    <footer className="vintage-wood-bg border-t border-amber-700/30 mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <OrnamentDark />
        <div className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500 animate-flicker" />
            <span className="font-display text-2xl text-gold-gradient font-bold tracking-wider">
              ALFAZ
            </span>
          </div>
          <p className="font-serif-vintage text-xl text-amber-100/60 italic max-w-lg leading-relaxed">
            "Words are the only thing that last forever. Empires crumble, cities fade,
            but alfaaz — alfaaz zinda rahenge."
          </p>
          <div className="flex flex-wrap gap-6 mt-4 justify-center">
            <Link to="/shayaris" className="font-display text-xs tracking-wider uppercase text-amber-200/50 hover:text-amber-400 transition-colors">
              Shayaris
            </Link>
            <Link to="/stories" className="font-display text-xs tracking-wider uppercase text-amber-200/50 hover:text-amber-400 transition-colors">
              Stories
            </Link>
            <Link to="/khats" className="font-display text-xs tracking-wider uppercase text-amber-200/50 hover:text-amber-400 transition-colors">
              Khats
            </Link>
            <Link to="/books" className="font-display text-xs tracking-wider uppercase text-amber-200/50 hover:text-amber-400 transition-colors">
              Books
            </Link>
            <Link to="/thoughts" className="font-display text-xs tracking-wider uppercase text-amber-200/50 hover:text-amber-400 transition-colors">
              Thoughts
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-7 border-t border-amber-700/20 pt-5">
            <Feather className="w-4 h-4 text-amber-600/40" />
            <p className="font-hand text-amber-200/40 text-base">
              Crafted with love for the written word
            </p>
          </div>
        </div>
        <OrnamentDark />
      </div>
    </footer>
  );
}
