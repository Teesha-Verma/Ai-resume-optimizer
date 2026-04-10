import React from 'react';

function Features() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 relative z-[1]" id="features">
      <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 lg:gap-0">
        <div>
          <div className="font-mono text-[10px] text-[var(--amber)] tracking-[0.2em] uppercase mb-3">// Key Features</div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-[1.1]">
            Seven systems.<br/>One <em className="italic text-[var(--amber)]">goal</em>.
          </h2>
        </div>
        <p className="text-[14px] text-[var(--text-dim)] leading-[1.8] font-light max-w-[500px]">
          Each feature is designed around a specific failure point in the job application process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
        <div className="bg-[var(--bg)] p-10 relative overflow-hidden cursor-none transition-colors duration-300 hover:bg-[var(--surface)] group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber)] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100"></div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] mb-5">Feature 01 //</div>
          <div className="w-[42px] h-[42px] bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:border-[var(--amber)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[var(--amber)] transition-colors duration-300 group-hover:text-black"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div className="font-serif text-[1.15rem] font-bold mb-3 leading-[1.3]">Resume-Job Matching</div>
          <div className="text-[13px] text-[var(--text-muted)] leading-[1.7] font-light mb-5">Generates a precise match score evaluating how closely your resume aligns with any given job description.</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Match score out of 100</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Identifies matched skills</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Highlights critical gaps</div>
          </div>
        </div>

        <div className="bg-[var(--bg)] p-10 relative overflow-hidden cursor-none transition-colors duration-300 hover:bg-[var(--surface)] group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber)] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100"></div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] mb-5">Feature 02 //</div>
          <div className="w-[42px] h-[42px] bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:border-[var(--amber)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[var(--amber)] transition-colors duration-300 group-hover:text-black"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div className="font-serif text-[1.15rem] font-bold mb-3 leading-[1.3]">Skill Gap Identification</div>
          <div className="text-[13px] text-[var(--text-muted)] leading-[1.7] font-light mb-5">Pinpoints exactly which skills and qualifications are missing or underrepresented in your resume.</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Detects missing skills</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Ranks by job criticality</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Apply-or-prepare verdict</div>
          </div>
        </div>

        <div className="bg-[var(--bg)] p-10 relative overflow-hidden cursor-none transition-colors duration-300 hover:bg-[var(--surface)] group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber)] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100"></div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] mb-5">Feature 03 //</div>
          <div className="w-[42px] h-[42px] bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:border-[var(--amber)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[var(--amber)] transition-colors duration-300 group-hover:text-black"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div className="font-serif text-[1.15rem] font-bold mb-3 leading-[1.3]">Content Improvement</div>
          <div className="text-[13px] text-[var(--text-muted)] leading-[1.7] font-light mb-5">Rewrites your bullet points to be professional, impactful, and aligned with the specific role.</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Strong action verbs</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Measurable outcomes</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Job-specific alignment</div>
          </div>
        </div>

        <div className="bg-[var(--bg)] p-10 relative overflow-hidden cursor-none transition-colors duration-300 hover:bg-[var(--surface)] group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber)] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100"></div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] mb-5">Feature 04 //</div>
          <div className="w-[42px] h-[42px] bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:border-[var(--amber)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[var(--amber)] transition-colors duration-300 group-hover:text-black"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div className="font-serif text-[1.15rem] font-bold mb-3 leading-[1.3]">ATS Compatibility</div>
          <div className="text-[13px] text-[var(--text-muted)] leading-[1.7] font-light mb-5">Evaluates whether your resume is likely to pass automated screening systems used by employers.</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Format issue detection</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Keyword presence check</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Structure validation</div>
          </div>
        </div>

        <div className="bg-[var(--bg)] p-10 relative overflow-hidden cursor-none transition-colors duration-300 hover:bg-[var(--surface)] group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber)] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100"></div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] mb-5">Feature 05 //</div>
          <div className="w-[42px] h-[42px] bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:border-[var(--amber)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[var(--amber)] transition-colors duration-300 group-hover:text-black"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <div className="font-serif text-[1.15rem] font-bold mb-3 leading-[1.3]">Iterative Improvement</div>
          <div className="text-[13px] text-[var(--text-muted)] leading-[1.7] font-light mb-5">Track multiple resume versions and measure your score improvement across each iteration.</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Version tracking</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Progress comparison</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Data-driven workflow</div>
          </div>
        </div>

        <div className="bg-[var(--bg)] p-10 relative overflow-hidden cursor-none transition-colors duration-300 hover:bg-[var(--surface)] group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber)] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100"></div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] mb-5">Feature 06-07 //</div>
          <div className="w-[42px] h-[42px] bg-[var(--amber-glow)] border border-[var(--border-amber)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:border-[var(--amber)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[var(--amber)] transition-colors duration-300 group-hover:text-black"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div className="font-serif text-[1.15rem] font-bold mb-3 leading-[1.3]">Rejection Analysis + Guided Workflow</div>
          <div className="text-[13px] text-[var(--text-muted)] leading-[1.7] font-light mb-5">Understand exactly why an application failed and follow a structured improvement path from input to shortlist.</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Rejection reason insights</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Structured step-by-step flow</div>
            <div className="flex items-start gap-2 text-[12px] text-[var(--text-dim)]"><span className="font-mono text-[10.5px] text-[var(--amber)] mt-px">--</span>Logical progression design</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
