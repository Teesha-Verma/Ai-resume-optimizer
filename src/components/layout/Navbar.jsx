import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Project Overview';
    if (path.startsWith('/analysis')) return 'New Analysis Suite';
    if (path.startsWith('/results')) return 'Intelligence Results';
    if (path.startsWith('/improvement')) return 'Interactive Studio';
    if (path.startsWith('/versions')) return 'Version Tracking';
    if (path.startsWith('/rejection')) return 'Rejection Post-Mortem';
    return 'Dashboard';
  };

  return (
    <header className="h-20 bg-[rgba(7,9,15,0.8)] backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-xl tracking-tight text-[#f0f4ff]">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* User profile mocked simple visual dropdown */}
        <div className="relative group cursor-pointer flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold text-gray-200">{user?.name || 'Authorized User'}</div>
            <div className="text-[10px] uppercase font-mono text-indigo-400 tracking-wider">Premium Plan</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="absolute right-0 top-full mt-2 w-48 bg-[#0e1220] border border-white/5 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
            <div className="px-4 py-3 border-b border-white/5 sm:hidden">
              <div className="text-sm text-gray-200">{user?.name || 'User'}</div>
              <div className="text-xs text-gray-500">{user?.email || 'user@example.com'}</div>
            </div>
            
            <button 
              onClick={logout}
              className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
