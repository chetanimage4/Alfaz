export function SmokeClouds() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Drifting smoke layers */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl animate-drift-slow"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl animate-drift-reverse"
        style={{ background: 'radial-gradient(circle, rgba(139,58,58,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[700px] h-[400px] rounded-full opacity-[0.04] blur-3xl animate-drift-slow"
        style={{ background: 'radial-gradient(ellipse, rgba(139,115,85,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-2/3 left-1/2 w-[450px] h-[450px] rounded-full opacity-[0.06] blur-3xl animate-drift-reverse"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%)' }}
      />
    </div>
  );
}
