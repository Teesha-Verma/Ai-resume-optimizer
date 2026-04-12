import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import AuthModal from './AuthModal';

function LandingNavbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const triggerRef = useRef(null);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    // Optional: Return focus to trigger after modal closes
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 200);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-5 flex items-center justify-between border-b border-[var(--border)] backdrop-blur-[20px] bg-[rgba(7,9,15,0.7)]">
        <div className="font-mono text-xs lg:text-sm font-bold text-[var(--amber)] tracking-[0.12em] uppercase">
          AIJO<span className="text-[var(--text-muted)]">::</span>Optimizer
        </div>
        <ul className="hidden lg:flex gap-8 list-none">
          <li>
            <a href="#problem" onClick={(e) => handleScroll(e, '#problem')} className="font-mono text-[11px] text-[var(--text-muted)] no-underline tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--amber)]">Problem</a>
          </li>
          <li>
            <a href="#workflow" onClick={(e) => handleScroll(e, '#workflow')} className="font-mono text-[11px] text-[var(--text-muted)] no-underline tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--amber)]">Workflow</a>
          </li>
          <li>
            <a href="#features" onClick={(e) => handleScroll(e, '#features')} className="font-mono text-[11px] text-[var(--text-muted)] no-underline tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--amber)]">Features</a>
          </li>
          <li>
            <a href="#compare" onClick={(e) => handleScroll(e, '#compare')} className="font-mono text-[11px] text-[var(--text-muted)] no-underline tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--amber)]">Compare</a>
          </li>
        </ul>

        {/* Auth Icon Trigger */}
        <div className="relative">
          <button
            ref={triggerRef}
            onClick={openAuthModal}
            aria-label="Sign In / Get Started"
            aria-expanded={isAuthModalOpen}
            aria-haspopup="dialog"
            className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:border-[var(--amber)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--amber)] cursor-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <User
              className="w-[18px] h-[18px] text-[var(--text-muted)] transition-all duration-300 group-hover:text-[var(--amber)] group-hover:scale-110"
              strokeWidth={1.8}
            />
            {/* Subtle pulse ring on hover */}
            <span className="absolute inset-0 rounded-full border border-[var(--amber)] opacity-0 scale-100 transition-all duration-500 group-hover:opacity-20 group-hover:scale-125 pointer-events-none" />
          </button>

          {/* Tooltip */}
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[10px] font-mono tracking-[0.08em] uppercase text-[var(--text-dim)] bg-[var(--surface2)] border border-[var(--border)] rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 select-none"
            style={{ zIndex: 101 }}
          >
            Sign In
          </span>
        </div>
      </nav>
      
      {/* Auth Modal Container */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}

export default LandingNavbar;
