import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });

      // Abstract shape animation
      gsap.to(shapeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        rotate: 180,
        scale: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center px-6 py-24 md:py-0 overflow-hidden"
    >
      {/* Left: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
        <div ref={textRef} className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 block">
            01 / About
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            I build digital products that feel <span className="text-gray-500">expensive.</span>
          </h2>
          <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
            <p>
              Based in the intersection of design and technology, I specialize in creating high-end digital experiences for brands that value aesthetics as much as performance.
            </p>
            <p>
              My approach is rooted in minimalism, cinematic motion, and a relentless focus on detail. Every pixel has a purpose, every animation has a soul.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-medium mb-2">Design</h4>
              <p className="text-sm text-gray-500">UI/UX, Art Direction, Motion Design, Branding</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Development</h4>
              <p className="text-sm text-gray-500">React, GSAP, Three.js, Performance Optimization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Abstract Shape */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center relative">
        <div 
          ref={shapeRef}
          className="relative w-64 h-64 md:w-96 md:h-96"
        >
          {/* Layered Rings */}
          <div className="absolute inset-0 border border-white/10 rounded-full" />
          <div className="absolute inset-4 border border-white/20 rounded-full" />
          <div className="absolute inset-12 border border-white/40 rounded-full" />
          <div className="absolute inset-24 border border-white/60 rounded-full" />
          
          {/* Floating dots */}
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-white rounded-full -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-white rounded-full -translate-y-1/2" />
        </div>
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      </div>
    </section>
  );
}
