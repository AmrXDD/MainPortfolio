import { useRef } from 'react';

const WORDS = [
  "DIGITAL EXCELLENCE", "—", "UI/UX DESIGN", "—", "FRONTEND ARCHITECTURE", "—",
  "INTERACTIVE EXPERIENCES", "—", "CREATIVE DEVELOPMENT", "—"
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 md:py-32 overflow-hidden border-y border-white/5 bg-white/5 backdrop-blur-sm relative z-20 flex">
      <div 
        ref={containerRef}
        className="flex whitespace-nowrap marquee-content"
        style={{ width: 'max-content' }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex justify-around items-center gap-8 md:gap-16 px-4 md:px-8">
            {WORDS.map((word, index) => (
              <span 
                key={index} 
                className={`text-4xl md:text-7xl font-display font-black tracking-tighter ${
                  word === "—" ? "text-white/20" : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] hover:[-webkit-text-stroke:1px_#fff] transition-all duration-300"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />
    </section>
  );
}
