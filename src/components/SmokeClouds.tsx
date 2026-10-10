export function SmokeClouds() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large COC-style cloud puffs — irregular SVG blobs that drift slowly */}
      <div className="absolute top-[5%] left-[-10%] w-[55vw] h-[40vh] animate-cloud-1 opacity-[0.08]">
        <svg viewBox="0 0 600 400" className="w-full h-full">
          <defs>
            <filter id="cloudBlur1">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>
          <g filter="url(#cloudBlur1)">
            <ellipse cx="200" cy="180" rx="180" ry="120" fill="#c9a84c" />
            <ellipse cx="350" cy="150" rx="140" ry="100" fill="#c9a84c" />
            <ellipse cx="420" cy="220" rx="110" ry="80" fill="#a88a2e" />
            <ellipse cx="150" cy="250" rx="90" ry="70" fill="#c9a84c" opacity="0.7" />
          </g>
        </svg>
      </div>

      <div className="absolute top-[30%] right-[-15%] w-[50vw] h-[35vh] animate-cloud-2 opacity-[0.06]">
        <svg viewBox="0 0 600 400" className="w-full h-full">
          <defs>
            <filter id="cloudBlur2">
              <feGaussianBlur stdDeviation="35" />
            </filter>
          </defs>
          <g filter="url(#cloudBlur2)">
            <ellipse cx="250" cy="200" rx="200" ry="130" fill="#8b3a3a" />
            <ellipse cx="400" cy="170" rx="120" ry="90" fill="#8b3a3a" opacity="0.8" />
            <ellipse cx="180" cy="260" rx="100" ry="70" fill="#6b2222" opacity="0.6" />
          </g>
        </svg>
      </div>

      <div className="absolute bottom-[-5%] left-[20%] w-[60vw] h-[40vh] animate-cloud-3 opacity-[0.05]">
        <svg viewBox="0 0 600 400" className="w-full h-full">
          <defs>
            <filter id="cloudBlur3">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
          <g filter="url(#cloudBlur3)">
            <ellipse cx="300" cy="200" rx="220" ry="140" fill="#8b7355" />
            <ellipse cx="450" cy="230" rx="130" ry="95" fill="#8b7355" opacity="0.7" />
            <ellipse cx="160" cy="170" rx="100" ry="75" fill="#a88a2e" opacity="0.5" />
          </g>
        </svg>
      </div>

      <div className="absolute top-[60%] left-[-8%] w-[40vw] h-[30vh] animate-cloud-1 opacity-[0.07]" style={{ animationDelay: '-10s' }}>
        <svg viewBox="0 0 600 400" className="w-full h-full">
          <defs>
            <filter id="cloudBlur4">
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>
          <g filter="url(#cloudBlur4)">
            <ellipse cx="250" cy="180" rx="160" ry="110" fill="#c9a84c" />
            <ellipse cx="380" cy="210" rx="120" ry="85" fill="#c9a84c" opacity="0.7" />
          </g>
        </svg>
      </div>

      {/* Small ember-like glow spots */}
      <div className="absolute top-[15%] left-[40%] w-32 h-32 rounded-full opacity-[0.1] blur-2xl animate-ember-glow"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-[25%] right-[30%] w-40 h-40 rounded-full opacity-[0.08] blur-2xl animate-ember-glow"
        style={{ background: 'radial-gradient(circle, rgba(139,58,58,0.35) 0%, transparent 70%)', animationDelay: '-2s' }}
      />
    </div>
  );
}
