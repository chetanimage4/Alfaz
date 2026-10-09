import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Feather, ScrollText, Mail, Library, PenTool, Home as HomeIcon, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon, angle: -4 },
  { to: '/shayaris', label: 'Shayaris', icon: Feather, angle: 3 },
  { to: '/stories', label: 'Stories', icon: ScrollText, angle: -2 },
  { to: '/khats', label: 'Khats', icon: Mail, angle: 5 },
  { to: '/books', label: 'Books', icon: Library, angle: -3 },
  { to: '/thoughts', label: 'Thoughts', icon: PenTool, angle: 2 },
];

export function FloatingNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating hanging nav buttons — desktop */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pointer-events-none">
        <div className="flex items-start gap-3 pt-2 pointer-events-auto">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const active = location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to));
            return (
              <div key={item.to} className="flex flex-col items-center"
                style={{ animation: `fadeInDown 0.5s ease-out ${i * 80}ms both` }}>
                <div className="w-px h-6 bg-gradient-to-b from-transparent to-amber-700/50" />
                <Link
                  to={item.to}
                  className="group flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    transform: `rotate(${item.angle}deg)`,
                    animation: `swing ${4 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                    transformOrigin: 'top center',
                  }}
                >
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all duration-300 ${
                    active
                      ? 'bg-amber-900/40 border-amber-500/60 shadow-lg shadow-amber-900/30'
                      : 'bg-stone-900/70 border-amber-800/30 hover:border-amber-600/50 backdrop-blur-sm'
                  }`}>
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-amber-400' : 'text-amber-200/50 group-hover:text-amber-400'}`} />
                    <span className={`font-display text-[0.65rem] tracking-wider uppercase ${active ? 'text-amber-400' : 'text-amber-200/50 group-hover:text-amber-400'}`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile floating menu */}
      <div className="md:hidden fixed top-3 right-3 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 flex items-center justify-center bg-stone-900/80 border border-amber-700/40 backdrop-blur-md text-amber-400 transition-all hover:border-amber-500/60"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        {open && (
          <div className="absolute top-14 right-0 flex flex-col gap-1 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 bg-stone-900/90 border backdrop-blur-md transition-all ${
                    active ? 'border-amber-500/60 text-amber-400' : 'border-amber-800/30 text-amber-200/60 hover:text-amber-400 hover:border-amber-600/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-display text-xs tracking-wider uppercase">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
