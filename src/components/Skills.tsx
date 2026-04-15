import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'UI/UX Design', level: 'Expert' },
  { name: 'Motion Design', level: 'Advanced' },
  { name: 'React / Next.js', level: 'Expert' },
  { name: 'GSAP / Framer', level: 'Expert' },
  { name: 'Three.js / WebGL', level: 'Intermediate' },
  { name: 'Art Direction', level: 'Advanced' },
  { name: 'Product Strategy', level: 'Advanced' },
  { name: 'Type Design', level: 'Intermediate' },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-item', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="max-w-6xl w-full">
        <div className="mb-24 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 block">
            02 / Expertise
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase">
            The Stack
          </h2>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-800"
        >
          {SKILLS.map((skill, index) => (
            <div 
              key={index}
              aria-label={`${skill.name} - ${skill.level}`}
              className="skill-item group relative p-12 border-r border-b border-gray-800 hover:bg-white transition-colors duration-500 cursor-none"
            >
              <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-400 mb-8 block">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-black transition-colors duration-500">
                {skill.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-gray-600 group-hover:text-gray-400">
                {skill.level}
              </p>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <span className="text-[9vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter">
          Capability
        </span>
      </div>
    </section>
  );
}
