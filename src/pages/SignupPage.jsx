import React from 'react';
import { Link } from 'react-router-dom';

function SignupPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[var(--bg)] text-[var(--text)]">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold mb-4">Sign Up</h1>
        <Link to="/" className="text-[var(--text-muted)] hover:text-[var(--amber)] font-mono text-sm uppercase tracking-widest transition-colors duration-200 border border-[var(--border)] px-4 py-2">&lt; Back to Home</Link>
      </div>
    </div>
  );
}

export default SignupPage;
