import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== (children as React.ReactElement<{ location?: { pathname: string } }>)?.props?.location?.pathname) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitioning(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, children]);

  return (
    <>
      {transitioning && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(30,20,10,0.98) 0%, rgba(20,12,5,0.95) 40%, rgba(10,6,3,0.9) 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.2\' numOctaves=\'5\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0 0.05 0 0 0 1 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />
        </div>
      )}
      <div
        key={location.pathname}
        className={transitioning ? 'opacity-0' : 'animate-fade-in'}
      >
        {displayChildren}
      </div>
    </>
  );
}
