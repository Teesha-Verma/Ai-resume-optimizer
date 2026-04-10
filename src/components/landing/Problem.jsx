import React from 'react';

function Problem() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-[1]" id="problem">
      <div>
        <div className="font-mono text-[10px] text-[var(--amber)] tracking-[0.2em] uppercase mb-3">// The Problem</div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-[1.1] mb-4">
          Why most resumes<br/>never get <em className="italic text-[var(--amber)]">read</em>
        </h2>
        <p className="text-[1rem] text-[var(--text-dim)] leading-[1.8] font-light max-w-[500px]">
          The modern job market is broken. Candidates spend hours crafting resumes that are rejected in seconds by automated systems — not because they are underqualified, but because of poor alignment and missing keywords.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
        <div className="bg-[var(--surface)] p-7 relative transition-colors duration-300 hover:bg-[var(--surface2)] group">
          <div className="font-mono text-[10px] text-[var(--text-muted)] mb-3 tracking-[0.1em]">01 //</div>
          <div className="font-serif text-[1rem] font-bold mb-2 leading-[1.3]">No Resume-Job Alignment</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.65] font-light">Candidates are unaware of how well their resumes actually match a given job description.</div>
          <svg className="absolute bottom-4 right-4 w-[20px] h-[20px] opacity-20 text-[var(--text)] group-hover:opacity-40 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
        </div>
        <div className="bg-[var(--surface)] p-7 relative transition-colors duration-300 hover:bg-[var(--surface2)] group">
          <div className="font-mono text-[10px] text-[var(--text-muted)] mb-3 tracking-[0.1em]">02 //</div>
          <div className="font-serif text-[1rem] font-bold mb-2 leading-[1.3]">No Actionable Feedback</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.65] font-light">Most applicants never receive feedback explaining why their applications were rejected.</div>
          <svg className="absolute bottom-4 right-4 w-[20px] h-[20px] opacity-20 text-[var(--text)] group-hover:opacity-40 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div className="bg-[var(--surface)] p-7 relative transition-colors duration-300 hover:bg-[var(--surface2)] group">
          <div className="font-mono text-[10px] text-[var(--text-muted)] mb-3 tracking-[0.1em]">03 //</div>
          <div className="font-serif text-[1rem] font-bold mb-2 leading-[1.3]">One Resume, All Jobs</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.65] font-light">Using the same resume for different roles dramatically reduces relevance and match rates.</div>
          <svg className="absolute bottom-4 right-4 w-[20px] h-[20px] opacity-20 text-[var(--text)] group-hover:opacity-40 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div className="bg-[var(--surface)] p-7 relative transition-colors duration-300 hover:bg-[var(--surface2)] group">
          <div className="font-mono text-[10px] text-[var(--text-muted)] mb-3 tracking-[0.1em]">04 //</div>
          <div className="font-serif text-[1rem] font-bold mb-2 leading-[1.3]">ATS Blind Spots</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.65] font-light">Formatting issues and missing keywords cause rejection before a human ever sees the resume.</div>
          <svg className="absolute bottom-4 right-4 w-[20px] h-[20px] opacity-20 text-[var(--text)] group-hover:opacity-40 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
      </div>
    </section>
  );
}

export default Problem;
