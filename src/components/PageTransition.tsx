import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<'idle' | 'billow-in' | 'billow-out'>('idle');

  useEffect(() => {
    const currentPath = (children as React.ReactElement<{ location?: { pathname: string } }>)?.props?.location?.pathname;
    if (location.pathname !== currentPath) {
      setPhase('billow-in');
      const swapTimer = setTimeout(() => {
        setDisplayChildren(children);
        setPhase('billow-out');
      }, 500);
      const doneTimer = setTimeout(() => setPhase('idle'), 900);
      return () => { clearTimeout(swapTimer); clearTimeout(doneTimer); };
    }
  }, [location.pathname, children]);

  return (
    <>
      {phase !== 'idle' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* COC-style smoke clouds billowing across the screen */}
          <div
            className="absolute"
            style={{
              top: '-20%', left: '-30%', width: '160%', height: '140%',
              animation: 'smokeBillowIn 0.9s ease-in-out forwards',
            }}
          >
            <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <filter id="transCloudBlur">
                  <feGaussianBlur stdDeviation="40" />
                </filter>
                <filter id="transCloudBlur2">
                  <feGaussianBlur stdDeviation="60" />
                </filter>
              </defs>
              <g filter="url(#transCloudBlur2)">
                <ellipse cx="200" cy="300" rx="280" ry="200" fill="#1a1208" />
                <ellipse cx="500" cy="200" rx="250" ry="180" fill="#2a1f17" />
                <ellipse cx="800" cy="350" rx="300" ry="220" fill="#1a1208" />
                <ellipse cx="1050" cy="250" rx="200" ry="160" fill="#2a1f17" opacity="0.8" />
              </g>
              <g filter="url(#transCloudBlur)">
                <ellipse cx="350" cy="500" rx="240" ry="170" fill="#241a10" />
                <ellipse cx="700" cy="550" rx="280" ry="200" fill="#1a1208" opacity="0.9" />
                <ellipse cx="100" cy="600" rx="180" ry="130" fill="#2a1f17" opacity="0.7" />
                <ellipse cx="950" cy="500" rx="220" ry="150" fill="#241a10" opacity="0.8" />
              </g>
              <g filter="url(#transCloudBlur)">
                <ellipse cx="400" cy="100" rx="200" ry="140" fill="#1a1208" opacity="0.6" />
                <ellipse cx="900" cy="80" rx="160" ry="110" fill="#2a1f17" opacity="0.5" />
              </g>
            </svg>
          </div>
        </div>
      )}
      <div
        key={location.pathname}
        className={phase === 'billow-in' ? 'opacity-0' : 'animate-fade-in'}
      >
        {displayChildren}
      </div>
    </>
  );
}
