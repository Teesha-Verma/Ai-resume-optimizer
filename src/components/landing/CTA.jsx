import React from 'react';
import { Link } from 'react-router-dom';

function CTA() {
  return (
    <section className="py-40 px-6 lg:px-12 text-center relative overflow-hidden z-[1]">
      <div className="absolute w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <span className="font-mono text-[10px] text-[var(--amber)] tracking-[0.2em] uppercase mb-4 block">// Ready to Optimize</span>
      <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] mb-6">
        Stop being<br/><em className="italic text-[var(--amber)]">filtered out.</em>
      </h2>
      <p className="text-[1rem] text-[var(--text-dim)] max-w-[480px] mx-auto mb-12 leading-[1.8] font-light">
        A system that analyzes resume-job alignment, identifies gaps, and enables iterative improvement to increase your shortlisting chances.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/signup" className="group font-mono text-[12px] font-bold tracking-[0.1em] uppercase bg-[var(--amber)] text-black border-none px-8 py-4 cursor-none transition-all duration-250 relative overflow-hidden inline-block hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)] w-full sm:w-auto">
          <span className="relative z-10">Start Optimizing Now</span>
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.2)] -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
        </Link>
        <button className="font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--text-muted)] bg-transparent border border-[var(--border)] px-7 py-4 cursor-none transition-all duration-250 hover:border-[var(--amber)] hover:text-[var(--amber)] w-full sm:w-auto">
          Read the Docs
        </button>
      </div>
    </section>
  );
}

export default CTA;
