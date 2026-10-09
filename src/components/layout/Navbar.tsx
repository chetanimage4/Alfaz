import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Feather, ScrollText, Mail, Library, Home as HomeIcon, PenTool } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/shayaris', label: 'Shayaris', icon: Feather },
  { to: '/stories', label: 'Stories', icon: ScrollText },
  { to: '/khats', label: 'Khats', icon: Mail },
  { to: '/books', label: 'Books', icon: Library },
  { to: '/thoughts', label: 'Thoughts', icon: PenTool },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 vintage-wood-bg border-b-2 border-amber-800/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <BookOpen className="w-7 h-7 text-amber-500 group-hover:text-amber-300 transition-colors animate-flicker" />
            <span className="font-display text-xl md:text-2xl text-gold-gradient font-bold tracking-wider">
              ALFAZ
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 font-display text-xs tracking-wider uppercase transition-all duration-300 ${
                    active
                      ? 'text-amber-400 border-b-2 border-amber-500'
                      : 'text-amber-200/60 hover:text-amber-400 border-b-2 border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden text-amber-400 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-amber-500 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-amber-500 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-amber-500 transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 font-display text-sm tracking-wider uppercase transition-all ${
                    active ? 'text-amber-400 bg-amber-900/20' : 'text-amber-200/60 hover:text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
