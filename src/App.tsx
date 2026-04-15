import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Skills from './components/Skills';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    lenis: any;
  }
}

export default function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(tickerCb);
    };
  }, []);

  return (
    <main className="relative bg-black selection:bg-white selection:text-black">
      {/* Global Noise Overlay */}
      <div className="noise" />
      
      {/* Grid Overlay */}
      <div className="grid-overlay">
        {[...Array(11)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
      
      {/* Custom Cursor */}
      <Cursor />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Sections */}
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="contact">
        <Contact />
      </div>

      {/* Footer (Simplified as it's part of Contact) */}
    </main>
  );
}
