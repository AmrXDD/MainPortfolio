import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current) return;

    const text = new SplitType(nameRef.current, { types: 'chars' });
    
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from(text.chars, {
      y: 150,
      rotateX: -90,
      opacity: 0,
      stagger: 0.03,
      duration: 2,
      delay: 0.5,
      transformOrigin: "0% 50% -50",
    })
    .from(subtextRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
    }, '-=1.5')
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
    }, '-=1');

    // Force full opacity after animation completes on the subtext and cta
    tl.set(subtextRef.current, { opacity: 1, clearProps: 'none' });
    tl.set(ctaRef.current, { opacity: 1, clearProps: 'none' });

    // 3D Hover Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !nameRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const intensity = window.innerWidth < 768 ? 5 : 20;

      gsap.to(nameRef.current, {
        rotateY: x * intensity,
        rotateX: -y * intensity,
        x: x * 10,
        y: y * 10,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Subtle background movement
    gsap.to('.hero-bg-gradient', {
      x: '10%',
      y: '10%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      text.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 perspective-1000"
    >
      {/* Background Gradient */}
      <div className="hero-bg-gradient absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="relative z-[60] text-center w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center">

        {/* Eyebrow */}
        <div ref={subtextRef} className="mb-6 overflow-hidden">
          <span className="hero-visible" style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}>
            Senior UI/UX Designer & Full Stack Developer
          </span>
        </div>
        
        {/* Name */}
        <div className="perspective-1000 w-full flex justify-center">
          <h1 
            ref={nameRef}
            className="main-title mb-8 md:mb-12 transform-style-3d glass-text !whitespace-nowrap"
          >
            Amr Ghamrawy
          </h1>
        </div>

        {/* CTA Block */}
        <div ref={ctaRef} className="flex flex-col items-center gap-10 mt-8 md:mt-12 w-full">
          <p className="hero-visible font-bold text-xl md:text-3xl max-w-3xl leading-tight">
            I design and build high-end digital experiences that elevate brands and drive results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <a 
              href="https://cal.com/amrghamrawy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-5 border-2 border-white rounded-full bg-white text-black hover:bg-transparent hover:text-white transition-all duration-500 overflow-hidden text-center min-w-[220px] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 text-[12px] uppercase tracking-widest font-black">
                Book a Free Call
              </span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            </a>

            <button 
              onClick={() => {
                if (window.lenis) {
                  window.lenis.scrollTo('#work', { duration: 1.2 });
                } else {
                  gsap.to(window, { scrollTo: { y: '#work', autoKill: false }, duration: 1.2, ease: 'expo.inOut' });
                }
              }}
              aria-label="View Work"
              className="group relative px-10 py-5 border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500 overflow-hidden text-center min-w-[220px] shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 text-[12px] uppercase tracking-widest font-black group-hover:text-black transition-colors duration-500">
                View Work
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-10 flex flex-col items-start gap-4">
        <div className="text-[10px] uppercase tracking-[0.1em] text-gray-600 origin-left -rotate-90 translate-y-[-20px] translate-x-[10px] whitespace-nowrap">
          Scroll to Explore
        </div>
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}