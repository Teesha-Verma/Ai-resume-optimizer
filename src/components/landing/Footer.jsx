import React from 'react';

function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[var(--border)] py-10 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
      <div className="font-mono text-[12px] text-[var(--amber)] tracking-[0.12em] uppercase font-bold">
        AIJO :: Optimizer
      </div>
      <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.1em]">
        AI Job Application Optimizer &mdash; Decision-Support Platform &mdash; 2026
      </div>
    </footer>
  );
}

export default Footer;
