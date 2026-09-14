import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isOwner, isSupervisor } = useAuth();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore Flats', path: '/explore' },
    { label: 'AI Match', path: '/ai-match' },
    { label: 'Compare', path: '/compare' },
    { label: 'Lease Analyzer', path: '/lease-analyzer' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_1px_12px_rgba(74,53,37,0.05)]">
      <div className="h-20 max-w-[1200px] mx-auto px-margin flex items-center justify-between gap-gutter">
        {/* Brand Logo & Campus Selector */}
        <div className="flex items-center gap-space-md shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold shadow-warm-sm">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
              Maskan <span className="text-secondary font-bold">AI</span>
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface-variant text-label-md font-label-md border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
            <span>Cairo Campus</span>
            <span className="material-symbols-outlined text-[16px] opacity-70">expand_more</span>
          </div>
        </div>

        {/* Center Navigation Links (Pill Container) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface-container-lowest/80 border border-outline-variant/25 shadow-warm-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all duration-150 ${
                isActive(link.path)
                  ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons & User Profile */}
        <div className="flex items-center gap-space-sm shrink-0">
          {/* Quick Search */}
          <button
            type="button"
            onClick={() => navigate('/explore')}
            aria-label="Search"
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Saved Favorites Counter */}
          <Link
            to="/explore?saved=true"
            aria-label="Saved Flats"
            className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {favorites.length > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-on-secondary animate-pulse">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Messages link if authenticated */}
          {isAuthenticated && (
            <Link
              to="/messages"
              aria-label="Messages"
              className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </Link>
          )}

          {/* User Profile / Auth State */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-surface-container-high transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-label-sm shadow-sm">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl p-2 shadow-warm-lg border border-outline-variant/30 flex flex-col gap-1 z-50 text-left animate-fade-in"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-outline-variant/20">
                    <p className="font-label-md text-primary truncate">{user.fullName}</p>
                    <p className="text-body-sm text-on-surface-variant/70 truncate text-xs">
                      {user.email}
                    </p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                      {user.role}
                    </span>
                  </div>

                  {isOwner && (
                    <Link
                      to="/owner"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-3 py-2 rounded-lg text-body-sm text-on-surface hover:bg-surface-container flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
                      <span>Owner Portal</span>
                    </Link>
                  )}

                  {isSupervisor && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-3 py-2 rounded-lg text-body-sm text-on-surface hover:bg-surface-container flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                      <span>Verification Queue</span>
                    </Link>
                  )}

                  <Link
                    to="/viewings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="px-3 py-2 rounded-lg text-body-sm text-on-surface hover:bg-surface-container flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span>My Viewings</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-body-sm text-error hover:bg-error-container/40 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary px-3 py-1.5"
            >
              Sign In
            </Link>
          )}

          {/* Primary CTA Button */}
          <Link
            to="/explore"
            className="hidden sm:inline-flex items-center justify-center px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_10px_24px_-4px_rgba(74,53,37,0.12)] hover:bg-primary transition-all active:scale-[0.98]"
          >
            Find My Flat
          </Link>

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-margin py-4 flex flex-col gap-2 shadow-warm-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-between ${
                isActive(link.path)
                  ? 'bg-surface-container-high text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span>{link.label}</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="pt-2 border-t border-outline-variant/20 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center rounded-lg border border-outline-variant font-label-md text-primary"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center rounded-lg bg-primary text-on-primary font-label-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
