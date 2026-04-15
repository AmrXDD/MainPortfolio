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
    image: 'https://picsum.photos/seed/lumina/1200/800',
  },
  {
    id: '02',
    title: 'Aether',
    category: 'Fintech Platform',
    year: '2023',
    image: 'https://picsum.photos/seed/aether/1200/800',
  },
  {
    id: '03',
    title: 'Onyx',
    category: 'Architecture Studio',
    year: '2023',
    image: 'https://picsum.photos/seed/onyx/1200/800',
  },
  {
    id: '04',
    title: 'Vesper',
    category: 'Lifestyle Brand',
    year: '2022',
    image: 'https://picsum.photos/seed/vesper/1200/800',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop horizontal scroll
      gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: `-${(PROJECTS.length - 1) * 100}vw`,
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '2000 top',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        }
      );
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
    <div ref={triggerRef} className="overflow-hidden bg-black">
      <div 
        ref={sectionRef} 
        className="flex flex-col md:flex-row items-center md:w-max"
      >
        {PROJECTS.map((project, index) => (
          <section 
            key={project.id}
            className={`project-card project-card-${index} relative w-full md:w-screen h-screen flex items-center justify-center px-6 md:px-24 shrink-0`}
          >
            <div className="relative w-full h-[60vh] md:h-[70vh] group overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm">
              {/* Project Image */}
              <img 
                src={project.image} 
                alt={`${project.title} - ${project.category}`}
                className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-75 group-hover:scale-105 transition-all duration-1000 ease-expo"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Info */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest text-gray-600">
                    Project {project.id}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gray-600">
                    © {project.year}
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm max-w-sm mb-8">
                      High-end digital concept for {project.category.toLowerCase()}.
                    </p>
                    <a 
                      href="#" 
                      aria-label={`View ${project.title} case study`}
                      className="text-[11px] uppercase tracking-[0.1em] underline underline-offset-4 pointer-events-auto"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
