import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const target = id === 'home' ? 0 : `#${id}`;
    if (window.lenis) {
      window.lenis.scrollTo(target, { duration: 1.2 });
    } else {
      gsap.to(window, {
        scrollTo: { y: target, autoKill: false },
        duration: 1.2,
        ease: 'expo.inOut'
      });
    }
  };

  const navLinks = [
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-20 py-6 md:py-10 flex justify-between items-center ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg py-4 md:py-6 border-b border-white/5' : ''
      }`}>
        <button 
          onClick={() => scrollToSection('home')}
          className="group flex flex-col cursor-none"
        >
          <span className="text-sm font-black uppercase tracking-[0.2em] leading-none">
            A. Ghamrawy
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <div className="flex gap-4 items-center">
            {navLinks.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className="group relative px-5 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-md hover:border-white transition-all duration-500 overflow-hidden cursor-none"
              >
                <span className="relative z-10 text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors duration-500">
                  {item.name}
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </button>
            ))}
            
            <a 
              href="https://cal.com/amrghamrawy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:border-white transition-all duration-500 overflow-hidden cursor-none ml-4"
            >
              <span className="relative z-10 text-[10px] uppercase tracking-widest group-hover:text-black transition-colors duration-500">
                Book a Free Call
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 cursor-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-black z-[99] flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col gap-8 text-center items-center">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-4xl font-black uppercase tracking-tighter hover:text-gray-500 transition-colors"
              >
                Home
              </button>
              {navLinks.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-gray-500 transition-colors"
                >
                  {item.name}
                </button>
              ))}
              
              <a 
                href="https://cal.com/amrghamrawy/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:border-white transition-all duration-500 overflow-hidden mt-4"
              >
                <span className="relative z-10 text-xs uppercase tracking-widest group-hover:text-black transition-colors duration-500">
                  Book a Free Call
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </a>
            </div>
            
            <div className="absolute bottom-12 text-[10px] uppercase tracking-[0.3em] text-gray-600">
              © 2026 Amr Ghamrawy
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[101]"
        style={{ scaleX }}
      />
    </>
  );
}
