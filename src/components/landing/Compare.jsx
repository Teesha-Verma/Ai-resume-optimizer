import React from 'react';

function Compare() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[var(--surface)] border-y border-[var(--border)] relative z-[1]" id="compare">
      <div className="text-center mb-16">
        <div className="font-mono text-[10px] text-[var(--amber)] tracking-[0.2em] uppercase mb-3">// Why This Approach</div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-[1.1]">
          Guesswork vs.<br/><em className="italic text-[var(--amber)]">Intelligence</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
        <div className="border border-[var(--border)] overflow-hidden flex flex-col">
          <div className="bg-[rgba(239,68,68,0.08)] text-[var(--red)] p-4 lg:p-6 border-b border-[var(--border)] font-mono text-[11px] font-bold tracking-[0.12em] uppercase flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--red)]"></span>
            Traditional Approach
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--red)] font-mono text-[11.5px] font-bold shrink-0 mt-px">x</span> Submit same resume everywhere
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--red)] font-mono text-[11.5px] font-bold shrink-0 mt-px">x</span> No feedback on rejections
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--red)] font-mono text-[11.5px] font-bold shrink-0 mt-px">x</span> Unaware of ATS requirements
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--red)] font-mono text-[11.5px] font-bold shrink-0 mt-px">x</span> Guessing what employers want
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--red)] font-mono text-[11.5px] font-bold shrink-0 mt-px">x</span> No way to measure improvement
          </div>
          <div className="p-4 lg:p-6 text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--red)] font-mono text-[11.5px] font-bold shrink-0 mt-px">x</span> Time wasted on weak applications
          </div>
        </div>

        <div className="border border-[var(--border)] overflow-hidden flex flex-col">
          <div className="bg-[rgba(34,197,94,0.08)] text-[var(--green)] p-4 lg:p-6 border-b border-[var(--border)] font-mono text-[11px] font-bold tracking-[0.12em] uppercase flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--green)]"></span>
            AI Job Optimizer
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--green)] font-mono text-[11.5px] font-bold shrink-0 mt-px">+</span> Custom resume per role
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--green)] font-mono text-[11.5px] font-bold shrink-0 mt-px">+</span> Detailed gap and feedback reports
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--green)] font-mono text-[11.5px] font-bold shrink-0 mt-px">+</span> Full ATS compatibility analysis
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--green)] font-mono text-[11.5px] font-bold shrink-0 mt-px">+</span> Data-driven alignment scoring
          </div>
          <div className="p-4 lg:p-6 border-b border-[var(--border)] text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--green)] font-mono text-[11.5px] font-bold shrink-0 mt-px">+</span> Track score across versions
          </div>
          <div className="p-4 lg:p-6 text-[13px] text-[var(--text-muted)] flex items-start gap-3 font-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <span className="text-[var(--green)] font-mono text-[11.5px] font-bold shrink-0 mt-px">+</span> Apply only when ready
          </div>
        </div>
      </div>
    </section>
  );
}

export default Compare;
