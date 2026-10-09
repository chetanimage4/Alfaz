import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import type { Recommendation } from '@/lib/recommendations';

export function Recommendations({ items }: { items: Recommendation[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-16 relative">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500/70" />
          <h3 className="font-display text-2xl text-amber-400/80 tracking-wide">You May Also Like</h3>
        </div>
        <p className="font-hand text-lg text-amber-200/40">Drift further into the world of words</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((rec, i) => (
          <Link
            key={rec.id}
            to={rec.link}
            className="group animate-reveal"
            style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
          >
            <div className="relative p-5 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(244,232,208,0.95) 0%, rgba(232,217,184,0.9) 100%)',
                clipPath: i % 2 === 0
                  ? 'polygon(0% 0%, 100% 3%, 98% 100%, 2% 97%)'
                  : 'polygon(3% 0%, 100% 0%, 97% 98%, 0% 100%)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <span className="font-display text-[0.6rem] tracking-widest uppercase text-amber-700/50 block mb-2">
                {rec.tag}
              </span>
              <h4 className="font-serif-vintage text-lg text-stone-800 leading-tight mb-1 group-hover:text-amber-800 transition-colors">
                {rec.title}
              </h4>
              <p className="font-hand text-base text-amber-700/60">{rec.subtitle}</p>
              <div className="mt-3 flex items-center gap-1 text-amber-700 group-hover:gap-2 transition-all">
                <span className="font-display text-[0.6rem] tracking-wider uppercase">Read</span>
                <span className="text-xs">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
