import React from 'react';
import { Link } from 'react-router-dom';

function LandingNavbar() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
      <Link 
        to="/signup" 
        className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase bg-[var(--amber)] text-black border-none px-5 py-2 cursor-none transition-all duration-200 hover:bg-white hover:-translate-y-px inline-block"
      >
        Get Started
      </Link>
    </nav>
  );
}

export default LandingNavbar;
