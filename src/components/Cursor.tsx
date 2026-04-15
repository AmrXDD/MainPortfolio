import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isProject, setIsProject] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Main dot - instant
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      // Follower - smooth lag
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .clickable')) {
        setIsHovering(true);
      }
      if (target.closest('.project-card')) {
        setIsProject(true);
      }
    };

    const onMouseLeave = () => {
      setIsHovering(false);
      setIsProject(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      
      {/* Follower Circle */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 border border-white rounded-full transition-all duration-500 ease-out ${
          isHovering ? 'w-12 h-12 bg-white border-none' : 'w-10 h-10'
        } ${isProject ? 'w-16 h-16 border-white bg-transparent' : ''}`}
      >
        {isProject && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        )}
      </div>
    </>
  );
}
