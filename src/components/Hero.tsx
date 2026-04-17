import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const magneticRef1 = useRef<HTMLAnchorElement>(null);
  const magneticRef2 = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!firstNameRef.current || !lastNameRef.current) return;

    const splitFirst = new SplitType(firstNameRef.current, { types: 'chars' });
    const splitLast = new SplitType(lastNameRef.current, { types: 'chars' });
    
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from([...splitFirst.chars!, ...splitLast.chars!], {
      y: 150,
      rotateX: -90,
      opacity: 0,
      stagger: 0.02,
      duration: 1.5,
      delay: 0.2,
      transformOrigin: "0% 50% -50",
    })
    .from(subtextRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
    }, '-=1.2')
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
    }, '-=1');

    // Clean up props after animation
    tl.set([subtextRef.current, ctaRef.current], { opacity: 1, clearProps: 'none' });

    // 3D Hover Effect for Name
    const handleMouseMove = (e: MouseEvent) => {
      if (!firstNameRef.current || !lastNameRef.current) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      const intensity = window.innerWidth < 768 ? 10 : 30;

      gsap.to([firstNameRef.current, lastNameRef.current], {
        rotateY: x * intensity,
        rotateX: -y * intensity,
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: "center"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Magnetic Button Logic
    const initMagnetic = (element: HTMLElement | null) => {
      if (!element) return;
      
      const magnetMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        });
      };

      const magnetLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        });
      };

      element.addEventListener('mousemove', magnetMove);
      element.addEventListener('mouseleave', magnetLeave);

      return () => {
        element.removeEventListener('mousemove', magnetMove);
        element.removeEventListener('mouseleave', magnetLeave);
      };
    };

    const cleanup1 = initMagnetic(magneticRef1.current);
    const cleanup2 = initMagnetic(magneticRef2.current);

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
      splitFirst.revert();
      splitLast.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-10 perspective-1000"
    >
      {/* Background Gradient */}
      <div className="hero-bg-gradient absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="relative z-[60] w-full max-w-[90rem] mx-auto px-6 md:px-10 flex flex-col items-center md:items-start">

        {/* Eyebrow */}
        <div ref={subtextRef} className="mb-4 overflow-hidden self-center md:self-start">
          <div className="flex items-center gap-4">
            <div className="status-dot relative">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
            </div>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gray-400">
              Available for freelance work
            </span>
          </div>
        </div>
        
        {/* Name (Staggered Layout) */}
        <div className="w-full flex flex-col items-center md:items-start relative my-8 perspective-1000">
          <h1 
            ref={firstNameRef}
            className="text-[clamp(4rem,15vw,12rem)] leading-[0.8] font-black font-display tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)]"
          >
            Amr
          </h1>
          <h1 
            ref={lastNameRef}
            className="text-[clamp(4rem,15vw,12rem)] leading-[0.8] font-black font-display tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)] ml-0 md:ml-[10vw] drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)]"
          >
            Ghamrawy
          </h1>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-10 mt-8 md:mt-20">
          <div className="max-w-xl text-center md:text-left">
            <p className="text-gray-400 text-sm sm:text-lg md:text-2xl leading-relaxed font-light px-4 md:px-0">
              Designing and building <span className="text-white font-medium">high-end digital experiences</span> that elevate luxury brands and drive exceptional results.
            </p>
          </div>

          {/* CTA Block */}
          <div ref={ctaRef} className="flex flex-row items-center gap-4 mt-8 md:mt-0">
            <a 
              ref={magneticRef1}
              href="https://cal.com/amrghamrawy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[130px] h-[130px] md:w-[180px] md:h-[180px] flex items-center justify-center border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:bg-white text-white hover:text-black transition-colors duration-500 overflow-hidden cursor-none"
            >
              <span className="relative z-10 text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-center px-4">
                Book a<br/>Free Call
              </span>
            </a>

            <button 
              ref={magneticRef2}
              onClick={() => {
                if (window.lenis) {
                  window.lenis.scrollTo('#work', { duration: 1.2 });
                } else {
                  gsap.to(window, { scrollTo: { y: '#work', autoKill: false }, duration: 1.2, ease: 'expo.inOut' });
                }
              }}
              aria-label="Explore Work"
              className="group relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] flex items-center justify-center border border-white/20 rounded-full bg-transparent text-white hover:bg-white/10 transition-colors duration-500 cursor-none"
            >
              <span className="relative z-10 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold">
                Explore
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-6 md:left-10 flex flex-col items-center gap-4 hidden md:flex">
        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 origin-left -rotate-90 translate-y-[-40px] translate-x-[10px] whitespace-nowrap">
          Scroll
        </div>
        <div className="w-[1px] h-[80px] bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}