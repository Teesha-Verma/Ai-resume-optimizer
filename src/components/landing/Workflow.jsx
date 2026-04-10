import React from 'react';

function Workflow() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[var(--surface)] border-y border-[var(--border)]" id="workflow">
      <div className="text-center mb-12 lg:mb-20">
        <div className="font-mono text-[10px] text-[var(--amber)] tracking-[0.2em] uppercase mb-3">// System Workflow</div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-[1.1]">
          Five stages to a<br/><em className="italic text-[var(--amber)]">winning</em> application
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 relative gap-8 lg:gap-0">
        {/* Horizontal line for desktop */}
        <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[var(--amber-dim)] to-transparent z-0"></div>
        
        <div className="flex flex-col items-center text-center px-4 relative z-[1] group">
          <div className="w-[56px] h-[56px] bg-[var(--bg)] border-2 border-[var(--amber)] flex items-center justify-center font-serif text-[1.2rem] font-black text-[var(--amber)] mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:text-black group-hover:scale-110">1</div>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase mb-2 text-[var(--text)]">Input</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.6] font-light">Upload your resume and paste the target job description</div>
        </div>
        
        <div className="flex flex-col items-center text-center px-4 relative z-[1] group">
          <div className="w-[56px] h-[56px] bg-[var(--bg)] border-2 border-[var(--amber)] flex items-center justify-center font-serif text-[1.2rem] font-black text-[var(--amber)] mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:text-black group-hover:scale-110">2</div>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase mb-2 text-[var(--text)]">Analysis</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.6] font-light">AI evaluates alignment, keywords, and relevance against the role</div>
        </div>
        
        <div className="flex flex-col items-center text-center px-4 relative z-[1] group">
          <div className="w-[56px] h-[56px] bg-[var(--bg)] border-2 border-[var(--amber)] flex items-center justify-center font-serif text-[1.2rem] font-black text-[var(--amber)] mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:text-black group-hover:scale-110">3</div>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase mb-2 text-[var(--text)]">Feedback</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.6] font-light">Detailed gap report with scored insights and priority areas</div>
        </div>
        
        <div className="flex flex-col items-center text-center px-4 relative z-[1] group">
          <div className="w-[56px] h-[56px] bg-[var(--bg)] border-2 border-[var(--amber)] flex items-center justify-center font-serif text-[1.2rem] font-black text-[var(--amber)] mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:text-black group-hover:scale-110">4</div>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase mb-2 text-[var(--text)]">Improve</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.6] font-light">AI rewrites bullet points with action verbs and measurable outcomes</div>
        </div>
        
        <div className="flex flex-col items-center text-center px-4 relative z-[1] group">
          <div className="w-[56px] h-[56px] bg-[var(--bg)] border-2 border-[var(--amber)] flex items-center justify-center font-serif text-[1.2rem] font-black text-[var(--amber)] mb-6 transition-all duration-300 group-hover:bg-[var(--amber)] group-hover:text-black group-hover:scale-110">5</div>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase mb-2 text-[var(--text)]">Iterate</div>
          <div className="text-[12px] text-[var(--text-muted)] leading-[1.6] font-light">Re-evaluate and track score improvements across versions</div>
        </div>
      </div>
    </section>
  );
}

export default Workflow;
