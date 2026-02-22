import { useState, useEffect, useRef } from 'react';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const blobStyle = {
    transform: `translate(${mousePos.x * 30 - 15}px, ${mousePos.y * 30 - 15}px)`,
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#1a1a1a] text-[#f5f0e8] overflow-hidden relative flex flex-col"
    >
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#c8ff00] opacity-20 blur-[100px] -top-[20%] -left-[10%] animate-blob-1"
          style={blobStyle}
        />
        <div
          className="absolute w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[#ff6b35] opacity-15 blur-[120px] top-[40%] -right-[15%] animate-blob-2"
          style={blobStyle}
        />
        <div
          className="absolute w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] rounded-full bg-[#7b68ee] opacity-20 blur-[80px] -bottom-[10%] left-[20%] animate-blob-3"
          style={blobStyle}
        />
      </div>

      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-noise" />

      {/* Main content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 py-12 md:py-20">
        <div className="max-w-4xl w-full">
          {/* Header tag */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-2 border border-[#f5f0e8]/30 rounded-full text-xs md:text-sm tracking-[0.2em] uppercase mb-6 md:mb-8">
              Welcome
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`font-display text-[clamp(3rem,15vw,10rem)] leading-[0.85] tracking-[-0.04em] mb-6 md:mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="block">This is</span>
            <span className="block text-[#c8ff00] italic">Me.</span>
          </h1>

          {/* Description */}
          <p
            className={`font-serif text-lg md:text-xl lg:text-2xl text-[#f5f0e8]/70 max-w-xl leading-relaxed mb-10 md:mb-14 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A digital space carved out of the infinite void.
            <span className="text-[#f5f0e8]"> Existing somewhere between dreams and pixels.</span>
          </p>

          {/* Interactive cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Card
              title="Create"
              description="Building things that matter"
              accent="#c8ff00"
            />
            <Card
              title="Explore"
              description="Wandering through possibilities"
              accent="#ff6b35"
            />
            <Card
              title="Connect"
              description="Bridging the gaps between"
              accent="#7b68ee"
            />
          </div>

          {/* Stats row */}
          <div
            className={`flex flex-wrap justify-start gap-8 md:gap-16 mt-12 md:mt-20 pt-8 md:pt-12 border-t border-[#f5f0e8]/10 transition-all duration-1000 delay-[900ms] ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Stat number="01" label="Identity" />
            <Stat number="42" label="Ideas" />
            <Stat number="∞" label="Possibilities" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 py-6 px-6 text-center transition-all duration-1000 delay-[1100ms] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-[#f5f0e8]/30 text-xs tracking-wide">
          Requested by <span className="text-[#f5f0e8]/50">@dontbuytops</span> · Built by <span className="text-[#f5f0e8]/50">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

function Card({ title, description, accent }: { title: string; description: string; accent: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative p-6 md:p-8 border border-[#f5f0e8]/10 rounded-2xl cursor-pointer transition-all duration-500 hover:border-[#f5f0e8]/30 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent}15, transparent 70%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className="w-3 h-3 rounded-full mb-4 md:mb-6 transition-transform duration-500"
          style={{
            backgroundColor: accent,
            transform: isHovered ? 'scale(1.5)' : 'scale(1)'
          }}
        />
        <h3 className="font-display text-xl md:text-2xl mb-2 tracking-tight">{title}</h3>
        <p className="font-serif text-[#f5f0e8]/50 text-sm md:text-base">{description}</p>
      </div>

      {/* Corner accent */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accent}10 50%)`,
          transform: isHovered ? 'scale(1.5)' : 'scale(1)',
          transformOrigin: 'bottom right'
        }}
      />
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl md:text-4xl lg:text-5xl text-[#c8ff00] tracking-tight">{number}</span>
      <span className="font-serif text-[#f5f0e8]/50 text-sm mt-1">{label}</span>
    </div>
  );
}

export default App;
