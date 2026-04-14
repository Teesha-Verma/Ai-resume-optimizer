import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Eye, EyeOff, ArrowRight, Mail, Lock, UserIcon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const modalPanelRef = useRef(null);
  const firstInputRef = useRef(null);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Close with animation
  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 200);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first input after animation
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Outside click close
  const handleBackdropClick = (e) => {
    if (modalPanelRef.current && !modalPanelRef.current.contains(e.target)) {
      handleClose();
    }
  };

  // Demo fill
  const handleDemoFill = () => {
    setLoginEmail('demo@aijo.dev');
    setLoginPassword('demo1234');
  };

  // Form submit handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email: loginEmail, password: loginPassword });

    if (!loginEmail.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!loginPassword.trim()) {
      toast.error('Password is required');
      return;
    }

    login(loginEmail, loginPassword);
    toast.success('Login Successful');
    handleClose();
    navigate('/dashboard');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', { name: signupName, email: signupEmail, password: signupPassword });

    if (!signupName.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      toast.error('Valid email is required');
      return;
    }
    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    signup(signupName, signupEmail, signupPassword);
    toast.success('Account Created');
    handleClose();
    navigate('/dashboard');
  };

  // Reset password visibility on tab switch
  useEffect(() => {
    setShowPassword(false);
  }, [activeTab]);

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
      style={{
        animation: isAnimatingOut
          ? 'authBackdropOut 0.2s ease forwards'
          : 'authBackdropIn 0.25s ease forwards',
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Panel */}
      <div
        ref={modalPanelRef}
        className="relative w-full max-w-md cursor-auto"
        style={{
          animation: isAnimatingOut
            ? 'authPanelOut 0.2s ease forwards'
            : 'authPanelIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Outer glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[var(--amber)]/20 via-[var(--border)] to-[var(--border)] pointer-events-none" />

        <div className="relative bg-gradient-to-b from-[#0f1328] to-[#090d1a] rounded-2xl border border-[var(--border)] shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden">

          {/* Decorative top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent opacity-60" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-[var(--amber)]/5 blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--surface2)]/60 border border-[var(--border)] transition-all duration-200 hover:bg-[var(--surface2)] hover:border-[var(--text-muted)]/30 cursor-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--amber)]"
          >
            <X className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={2} />
          </button>

          {/* Header */}
          <div className="pt-8 pb-2 px-8 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--amber)]/15 to-[var(--amber)]/5 border border-[var(--amber)]/20 mb-5">
              <Sparkles className="w-6 h-6 text-[var(--amber)]" strokeWidth={1.8} />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[var(--text)] tracking-tight mb-2">
              Welcome
            </h2>
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)]">
              Access your account securely
            </p>
          </div>

          {/* Tab Switch */}
          <div className="px-8 pt-5 pb-1">
            <div className="relative flex bg-[var(--surface)]/80 rounded-xl p-1 border border-[var(--border)]">
              {/* Sliding indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-lg bg-[var(--surface2)] border border-[var(--border)] shadow-lg transition-all duration-300 ease-out"
                style={{
                  left: activeTab === 'login' ? '4px' : '50%',
                  width: 'calc(50% - 4px)',
                }}
              />
              <button
                onClick={() => setActiveTab('login')}
                className={`relative z-10 flex-1 py-2.5 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase rounded-lg transition-colors duration-200 cursor-none ${
                  activeTab === 'login'
                    ? 'text-[var(--amber)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-dim)]'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`relative z-10 flex-1 py-2.5 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase rounded-lg transition-colors duration-200 cursor-none ${
                  activeTab === 'signup'
                    ? 'text-[var(--amber)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-dim)]'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 pt-5 pb-8">
            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4" style={{ animation: 'authFadeIn 0.25s ease forwards' }}>
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--text-muted)] block">
                    Email or Phone
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] transition-colors duration-200 group-focus-within:text-[var(--amber)]" strokeWidth={1.8} />
                    <input
                      ref={firstInputRef}
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
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
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
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
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4" style={{ animation: 'authFadeIn 0.25s ease forwards' }}>
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--text-muted)] block">
                    Full Name
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] transition-colors duration-200 group-focus-within:text-[var(--amber)]" strokeWidth={1.8} />
                    <input
                      ref={activeTab === 'signup' ? firstInputRef : undefined}
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-11 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 font-sans transition-all duration-200 focus:outline-none focus:border-[var(--amber)]/50 focus:shadow-[0_0_16px_rgba(245,158,11,0.08)] cursor-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--text-muted)] block">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] transition-colors duration-200 group-focus-within:text-[var(--amber)]" strokeWidth={1.8} />
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Enter your email"
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
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Create a password"
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

                {/* Submit */}
                <button
                  type="submit"
                  className="group w-full mt-2 py-3.5 bg-[var(--amber)] text-black font-mono text-[12px] font-bold tracking-[0.12em] uppercase rounded-xl transition-all duration-300 hover:bg-[#fbbf24] hover:shadow-[0_8px_32px_rgba(245,158,11,0.25)] hover:-translate-y-px active:translate-y-0 cursor-none flex items-center justify-center gap-2"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
                </button>
              </form>
            )}

            {/* Footer Divider */}
            <div className="mt-6 pt-5 border-t border-[var(--border)]">
              <p className="text-center font-mono text-[10px] tracking-[0.06em] text-[var(--text-muted)]">
                {activeTab === 'login' ? (
                  <>Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className="text-[var(--amber)] hover:underline cursor-none font-semibold"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-[var(--amber)] hover:underline cursor-none font-semibold"
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent opacity-20" />
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
