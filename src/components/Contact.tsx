import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Instagram, MessageCircle } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="max-w-4xl w-full text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 block">
          03 / Contact
        </span>
        
        <h2 
          ref={titleRef}
          className="text-5xl md:text-8xl font-bold uppercase mb-16 leading-[0.9] tracking-tighter"
        >
          Let’s build something <span className="text-outline">iconic.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-24">
          <div className="space-y-12">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Email</h4>
              <a 
                href="mailto:lowmoch@gmail.com" 
                className="text-2xl md:text-3xl font-medium hover:text-gray-400 transition-colors duration-300 underline underline-offset-8 decoration-gray-800"
              >
                lowmoch@gmail.com
              </a>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Availability</h4>
              <a 
                href="https://cal.com/amrghamrawy/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:border-white transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 text-xs uppercase tracking-widest group-hover:text-black transition-colors duration-500">
                  Book Free Call
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </a>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Social</h4>
              <div className="flex gap-8">
                <a 
                  href="https://instagram.com/amhxw_" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group relative flex items-center justify-center w-10 h-10 border border-gray-800 rounded-full hover:border-white transition-all duration-500"
                >
                  <Instagram size={18} className="text-gray-500 group-hover:text-white transition-colors duration-500" />
                  <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                </a>
                <a 
                  href="https://wa.link/9t280w" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="group relative flex items-center justify-center w-10 h-10 border border-gray-800 rounded-full hover:border-white transition-all duration-500"
                >
                  <MessageCircle size={18} className="text-gray-500 group-hover:text-white transition-colors duration-500" />
                  <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-6" aria-label="Contact form">
            <div className="relative group">
              <label htmlFor="name" className="sr-only">Name</label>
              <input 
                id="name"
                type="text" 
                placeholder="Name"
                className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-focus-within:w-full" />
            </div>
            <div className="relative group">
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                id="email"
                type="email" 
                placeholder="Email"
                className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-focus-within:w-full" />
            </div>
            <div className="relative group">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea 
                id="message"
                placeholder="Message"
                rows={4}
                className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 resize-none"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-focus-within:w-full" />
            </div>
            
            <button 
              type="submit"
              aria-label="Send Message"
              className="group relative w-full py-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:border-white transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 text-xs uppercase tracking-[0.3em] font-bold group-hover:text-black transition-colors duration-500">
                Send Message
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            </button>
          </form>
        </div>

        <div className="pt-24 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-600 text-[10px] uppercase tracking-widest">
          <p>© 2026 — Designed and developed with soul by Amr Ghamrawy</p>
          <p>Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GMT+2</p>
        </div>
      </div>
    </section>
  );
}
