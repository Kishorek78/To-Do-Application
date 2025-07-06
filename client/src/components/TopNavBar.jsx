import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const TopNavBar = ({ navLinks }) => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 w-full z-50 bg-[#0a0a0a] border-b border-[#00eaff]/20 shadow-lg">
      <div className="flex items-center justify-between h-12 sm:h-14 px-4 max-w-6xl mx-auto">
        {/* Left: Logo */}
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 group"
          aria-label="Go to dashboard"
        >
          <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-to-br from-[#00eaff] to-[#a259ff] rounded-md flex items-center justify-center border border-[#00eaff] shadow-md group-hover:scale-105 transition-transform">
            <svg
              className="h-4 w-4 text-white drop-shadow-md"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <span className="hidden sm:inline text-lg font-bold bg-gradient-to-r from-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent">
            TaskFlow
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav
          className="flex-1 flex justify-center items-center space-x-2 sm:space-x-4"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.href ||
              (link.href !== '/dashboard' &&
                location.pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 group touch-manipulation ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30 shadow-cyan'
                    : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: User Avatar */}
        <div className="flex items-center space-x-3">
          <div
            className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-to-br from-[#00eaff] to-[#f1c27d] rounded-full flex items-center justify-center text-[#0a0a0a] font-bold text-sm border border-[#00eaff]"
            aria-label="User avatar"
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
