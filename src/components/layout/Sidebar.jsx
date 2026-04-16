import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { 
  LayoutDashboard, 
  FileText, 
  Sparkles, 
  History, 
  ShieldAlert,
  Menu
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cx(...inputs) {
  return twMerge(clsx(inputs));
}

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { activeAnalysisId, versions } = useResume(); // STEP 10: context awareness

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Analysis', path: '/analysis/new', icon: Sparkles },
    { name: 'Latest Results', path: '/results', icon: FileText },
    { name: 'Resume Versions', path: '/versions', icon: History },
    { name: 'Rejection Analysis', path: '/rejection', icon: ShieldAlert },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={cx(
          "fixed top-0 left-0 z-50 h-screen bg-[#0e1220] border-r border-white/5 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Header / Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0 justify-between">
          {isOpen ? (
            <div className="font-mono text-sm font-bold text-indigo-400 tracking-[0.1em] uppercase whitespace-nowrap overflow-hidden text-ellipsis">
              AIJO<span className="text-gray-500">::</span>Dash
            </div>
          ) : (
            <div className="font-mono text-sm font-bold text-indigo-400 tracking-widest hidden lg:block mx-auto uppercase">
               A<span className="text-gray-500">::</span>D
            </div>
          )}
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);

            // STEP 10: Intelligent badges
            let badge = null;
            if (link.path === '/results' && activeAnalysisId && !isActive) {
              badge = (
                <span className="ml-auto w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.6)] shrink-0" title="Active analysis available" />
              );
            }
            if (link.path === '/versions' && versions.length > 0 && !isActive) {
              badge = (
                <span className="ml-auto text-[9px] font-mono font-bold text-gray-500 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 shrink-0">
                  {versions.length}
                </span>
              );
            }
            
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={cx(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden",
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
                )}
                title={!isOpen ? link.name : undefined}
              >
                {/* Active indicator side bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-indigo-500 rounded-r-full" />
                )}
                
                <Icon className={cx(
                  "w-5 h-5 shrink-0 transition-colors", 
                  isActive ? "text-indigo-400" : "group-hover:text-gray-200"
                )} />
                
                <span className={cx(
                  "font-mono text-[11px] font-semibold tracking-widest uppercase transition-opacity duration-200 whitespace-nowrap",
                  !isOpen && "lg:opacity-0"
                )}>
                  {link.name}
                </span>

                {/* STEP 10: Badge rendering (only when sidebar is expanded) */}
                {isOpen && badge}
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
