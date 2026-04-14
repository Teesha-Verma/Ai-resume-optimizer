import React, { useEffect, useRef } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx - 5}px`;
        cursorRef.current.style.top = `${my - 5}px`;
      }
    };

    let animationFrameId;
    const animateRing = () => {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      animationFrameId = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateRing();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-[10px] h-[10px] bg-[var(--amber)] rounded-full top-0 left-0 pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference"
      ></div>
      <div 
        ref={ringRef}
        className="fixed w-[36px] h-[36px] border border-[var(--amber)] rounded-full top-0 left-0 pointer-events-none z-[9998] opacity-50"
      ></div>
    </>
  );
}

export default CustomCursor;
