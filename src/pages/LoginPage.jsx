import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoFill = () => {
    setEmail('demo@aijo.dev');
    setPassword('demo1234');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email });

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }

    login(email, password);
    toast.success('Login Successful');
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--bg)] text-[var(--text)] p-4 sm:p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      <div className="relative w-full max-w-md cursor-auto">
        {/* Outer glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[var(--amber)]/20 via-[var(--border)] to-[var(--border)] pointer-events-none" />

        <div className="relative bg-gradient-to-b from-[#0f1328] to-[#090d1a] rounded-2xl border border-[var(--border)] shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Decorative top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent opacity-60" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-[var(--amber)]/5 blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="pt-8 pb-2 px-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--amber)]/15 to-[var(--amber)]/5 border border-[var(--amber)]/20 mb-5 relative group cursor-pointer" onClick={() => navigate('/')}>
              <Sparkles className="w-6 h-6 text-[var(--amber)] group-hover:scale-110 transition-transform" strokeWidth={1.8} />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[var(--text)] tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)]">
              Access your account securely
            </p>
          </div>

          {/* Form Content */}
          <div className="px-8 pt-6 pb-8">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--text-muted)] block">
                  Email or Phone
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] transition-colors duration-200 group-focus-within:text-[var(--amber)]" strokeWidth={1.8} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or phone"
                    className="w-full pl-11 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 font-sans transition-all duration-200 focus:outline-none focus:border-[var(--amber)]/50 focus:shadow-[0_0_16px_rgba(245,158,11,0.08)] cursor-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--text-muted)] block">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] transition-colors duration-200 group-focus-within:text-[var(--amber)]" strokeWidth={1.8} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-11 pr-12 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 font-sans transition-all duration-200 focus:outline-none focus:border-[var(--amber)]/50 focus:shadow-[0_0_16px_rgba(245,158,11,0.08)] cursor-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors duration-200 hover:bg-[var(--surface2)] cursor-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.8} />
                    ) : (
                      <Eye className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </div>

              {/* Extras Row */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--amber)]/70 hover:text-[var(--amber)] transition-colors duration-200 cursor-none border border-[var(--amber)]/20 rounded-md px-2.5 py-1 hover:border-[var(--amber)]/40 hover:bg-[var(--amber)]/5"
                >
                  ⚡ Demo Fill
                </button>
                <button
                  type="button"
                  className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--text-muted)] hover:text-[var(--amber)] transition-colors duration-200 cursor-none"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full mt-2 py-3.5 bg-[var(--amber)] text-black font-mono text-[12px] font-bold tracking-[0.12em] uppercase rounded-xl transition-all duration-300 hover:bg-[#fbbf24] hover:shadow-[0_8px_32px_rgba(245,158,11,0.25)] hover:-translate-y-px active:translate-y-0 cursor-none flex items-center justify-center gap-2"
              >
                Login
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
              </button>
            </form>

            {/* Footer Divider */}
            <div className="mt-6 pt-5 border-t border-[var(--border)]">
              <p className="text-center font-mono text-[10px] tracking-[0.06em] text-[var(--text-muted)]">
                Don&apos;t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-[var(--amber)] hover:underline cursor-none font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
               <Link to="/" className="text-[var(--text-muted)] hover:text-[var(--amber)] font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 cursor-none flex items-center justify-center gap-1 opacity-60 hover:opacity-100">
                  <ArrowRight className="w-3 h-3 rotate-180" /> Back to Home
               </Link>
            </div>
            
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent opacity-20" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
