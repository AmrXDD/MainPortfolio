import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'Lumina',
    category: 'Luxury E-commerce',
    year: '2024',
    image: 'https://picsum.photos/seed/lumina/1600/900',
  },
  {
    id: '02',
    title: 'Aether',
    category: 'Fintech Platform',
    year: '2023',
    image: 'https://picsum.photos/seed/aether/1600/900',
  },
  {
    id: '03',
    title: 'Onyx',
    category: 'Architecture Studio',
    year: '2023',
    image: 'https://picsum.photos/seed/onyx/1600/900',
  },
  {
    id: '04',
    title: 'Vesper',
    category: 'Lifestyle Brand',
    year: '2022',
    image: 'https://picsum.photos/seed/vesper/1600/900',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Horizontal Scroll
      const sections = gsap.utils.toArray('.project-card');
      
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.8 },
            ease: "power1.inOut"
          },
          end: () => `+=${triggerRef.current?.offsetWidth || window.innerWidth * sections.length}`,
        }
      });

      // Parallax Image Effect & Text Reveal
      sections.forEach((section: any) => {
        const img = section.querySelector('.parallax-img');
        const content = section.querySelectorAll('.reveal-text');
        
        // Inner Image Parallax
        gsap.to(img, {
          xPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });

        // Text reveal on enter
        gsap.from(content, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile vertical scroll - just fade in projects
      PROJECTS.forEach((_, i) => {
        gsap.from(`.project-card-${i}`, {
          scrollTrigger: {
            trigger: `.project-card-${i}`,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-black relative z-10">
      <div 
        ref={sectionRef} 
        className="flex flex-col md:flex-row items-center md:w-[400vw] h-auto md:h-screen"
      >
        {PROJECTS.map((project, index) => (
          <section 
            key={project.id}
            className={`project-card project-card-${index} relative w-full md:w-screen h-[100svh] md:h-screen flex flex-col justify-center px-4 md:px-20 shrink-0 py-16 md:py-0`}
          >
            <div className="flex flex-col h-full justify-center max-w-7xl mx-auto w-full gap-8 md:gap-12">
              
              <div className="flex justify-between items-end reveal-text">
                <span className="text-sm md:text-lg uppercase tracking-[0.3em] text-gray-500 font-bold">
                  [{project.id}]
                </span>
                <span className="text-xs md:text-sm uppercase tracking-widest text-gray-500">
                  © {project.year}
                </span>
              </div>
              
              <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden group cursor-none">
                {/* Image Container */}
                <div className="absolute inset-[-15%] w-[130%] h-[130%]">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - ${project.category}`}
                    className="parallax-img w-full h-full object-cover grayscale brightness-[0.4] group-hover:brightness-75 group-hover:grayscale-0 transition-all duration-1000 ease-expo"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Hover Glow / Border */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-white/40 transition-colors duration-700 pointer-events-none mix-blend-overlay" />
                
                {/* Center "View Project" prompt on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">View</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-10">
                <h3 className="text-4xl md:text-8xl font-black font-display uppercase tracking-tighter reveal-text leading-none">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base max-w-sm reveal-text font-light">
                  A high-end digital concept crafted specifically for {project.category}.
                </p>
              </div>

            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
