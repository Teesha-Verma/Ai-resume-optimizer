import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const scoreNumRef = useRef(null);
  const miniNumRefs = useRef([]);

  useEffect(() => {
    const countUp = (el, target, duration) => {
      let start = 0;
      const step = target / (duration / 16);
      const interval = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.round(start);
        if (start >= target) clearInterval(interval);
      }, 16);
    };

    setTimeout(() => {
      if (scoreNumRef.current) countUp(scoreNumRef.current, 75, 1800);
      miniNumRefs.current.forEach(el => {
        if (el) countUp(el, parseInt(el.dataset.target), 1500);
      });
    }, 600);
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-12 pt-28 lg:pt-28 pb-12 lg:pb-16 relative z-[1] gap-8 lg:gap-16">
        <div className="absolute w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] lg:text-[11px] text-[var(--amber)] tracking-[0.15em] uppercase border border-[var(--border-amber)] px-4 py-1.5 mb-7 bg-[var(--amber-glow)]">
            <span className="w-1.5 h-1.5 bg-[var(--amber)] rounded-full animate-pulse-glow"></span>
            AI-Powered Resume Intelligence
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,5.5rem)] font-black leading-[1.02] tracking-[-0.02em] mb-6">
            <span className="block">Get</span>
            <em className="italic text-[var(--amber)]">Shortlisted.</em>
            <span className="block">Not Filtered.</span>
          </h1>
          <p className="text-[1.05rem] text-[var(--text-dim)] leading-[1.75] max-w-[460px] mb-10 font-light">
            Stop submitting the same resume to every job. Our AI analyzes your resume against job descriptions, identifies critical gaps, and guides you through data-driven improvements that actually get you hired.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link to="/signup" className="group font-mono text-[12px] font-bold tracking-[0.1em] uppercase bg-[var(--amber)] text-black border-none px-8 py-4 cursor-none transition-all duration-250 relative overflow-hidden inline-block hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)] w-full sm:w-auto text-center">
              <span className="relative z-10">Optimize My Resume</span>
              <div className="absolute inset-0 bg-[rgba(255,255,255,0.2)] -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
            </Link>
            <a href="#workflow" onClick={(e) => handleScroll(e, '#workflow')} className="font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--text-muted)] bg-transparent border border-[var(--border)] px-7 py-4 cursor-none transition-all duration-250 hover:border-[var(--amber)] hover:text-[var(--amber)] w-full sm:w-auto text-center">
              See How It Works
            </a>
          </div>
        </div>

        <div className="relative hidden lg:flex flex-col gap-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] p-7 relative overflow-hidden scanline-container">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--amber)] to-transparent"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] uppercase">Match Analysis</div>
                <div className="typing-animation border-r-2 border-[var(--amber)] whitespace-nowrap overflow-hidden font-mono text-[12px] text-[var(--amber)] mt-1.5 max-w-full inline-block">Analyzing: Software Engineer @ TechCorp...</div>
              </div>
              <div className="font-mono text-[9px] text-[var(--amber)] border border-[var(--border-amber)] px-2 py-1 bg-[var(--amber-glow)]">LIVE DEMO</div>
            </div>
            
            <div className="flex items-center gap-8 mb-6">
              <div className="relative w-[90px] h-[90px] shrink-0">
                <svg width="90" height="90" viewBox="0 0 90 90" className="-rotate-90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
                  <circle cx="45" cy="45" r="38" fill="none" stroke="#f59e0b" strokeWidth="6"
                    strokeDasharray="238.76" strokeDashoffset="59.69"
                    strokeLinecap="butt"
                    className="animate-ringFill"
                    style={{ animationDelay: '0.5s' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span ref={scoreNumRef} className="font-serif text-[1.6rem] font-black text-[var(--amber)] leading-none">0</span>
                  <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[0.1em]">SCORE</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.08em]">Keywords</span>
                  <div className="w-[80px] h-[3px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
                    <div className="h-full bg-[var(--amber)] origin-left animate-barFill scale-x-0" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.08em]">Relevance</span>
                  <div className="w-[80px] h-[3px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
                    <div className="h-full bg-[var(--amber)] origin-left animate-barFill scale-x-0" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.08em]">Structure</span>
                  <div className="w-[80px] h-[3px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
                    <div className="h-full bg-[var(--amber)] origin-left animate-barFill scale-x-0" style={{ animationDelay: '0.7s' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.08em]">Impact</span>
                  <div className="w-[80px] h-[3px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
                    <div className="h-full bg-[var(--amber)] origin-left animate-barFill scale-x-0" style={{ animationDelay: '0.9s' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] px-2.5 py-1 tracking-[0.08em] bg-[rgba(34,197,94,0.12)] text-[var(--green)] border border-[rgba(34,197,94,0.25)]">Python</span>
              <span className="font-mono text-[10px] px-2.5 py-1 tracking-[0.08em] bg-[rgba(34,197,94,0.12)] text-[var(--green)] border border-[rgba(34,197,94,0.25)]">Machine Learning</span>
              <span className="font-mono text-[10px] px-2.5 py-1 tracking-[0.08em] bg-[rgba(34,197,94,0.12)] text-[var(--green)] border border-[rgba(34,197,94,0.25)]">SQL</span>
              <span className="font-mono text-[10px] px-2.5 py-1 tracking-[0.08em] bg-[rgba(239,68,68,0.12)] text-[var(--red)] border border-[rgba(239,68,68,0.25)]">Kubernetes</span>
              <span className="font-mono text-[10px] px-2.5 py-1 tracking-[0.08em] bg-[rgba(239,68,68,0.12)] text-[var(--red)] border border-[rgba(239,68,68,0.25)]">Docker</span>
              <span className="font-mono text-[10px] px-2.5 py-1 tracking-[0.08em] bg-[var(--amber-glow)] text-[var(--amber)] border border-[var(--border-amber)]">Leadership</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] p-5 relative overflow-hidden">
              <div className="w-[28px] h-[28px] mb-3 bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] text-[var(--amber)]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div ref={el => miniNumRefs.current[0] = el} className="font-serif text-[1.8rem] font-black text-[var(--text)] leading-none mb-1" data-target="75">0</div>
              <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.1em] uppercase">Match Score</div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] p-5 relative overflow-hidden">
              <div className="w-[28px] h-[28px] mb-3 bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] text-[var(--amber)]"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div ref={el => miniNumRefs.current[1] = el} className="font-serif text-[1.8rem] font-black text-[var(--text)] leading-none mb-1" data-target="5">0</div>
              <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.1em] uppercase">Skill Gaps</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="relative z-[1] border-y border-[var(--border)] bg-[var(--surface)] py-8 px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center relative">
          <span className="font-serif text-[2.5rem] font-black text-[var(--amber)] leading-none block">3x</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.12em] uppercase mt-1.5 block">Higher shortlist rate</span>
        </div>
        <div className="text-center relative lg:before:content-[''] lg:before:absolute lg:before:-left-4 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-10 lg:before:w-px lg:before:bg-[var(--border)]">
          <span className="font-serif text-[2.5rem] font-black text-[var(--amber)] leading-none block">7</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.12em] uppercase mt-1.5 block">Core AI features</span>
        </div>
        <div className="text-center relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:h-10 before:w-px before:bg-[var(--border)] hidden lg:block">
          <span className="font-serif text-[2.5rem] font-black text-[var(--amber)] leading-none block">100</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.12em] uppercase mt-1.5 block">Point match scoring</span>
        </div>
        <div className="text-center relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:h-10 before:w-px before:bg-[var(--border)] hidden lg:block">
          <span className="font-serif text-[2.5rem] font-black text-[var(--amber)] leading-none block">inf</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.12em] uppercase mt-1.5 block">Iteration cycles</span>
        </div>
      </div>
    </>
  );
}

export default Hero;
