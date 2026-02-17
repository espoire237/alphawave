/**
 * Header Component
 * Main site header with logo and navigation
 * @component
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { siteConfig } from '../../config/site.config';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ No more useEffect for closing menu — Navigation's onClose handles it

  return (
    <header
      className={`
        bg-dark sticky top-0 z-40
        transition-shadow duration-300
        ${scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.5)]' : ''}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)} // ✅ close on logo click too
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={siteConfig.logo}
                alt={siteConfig.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-primary rounded-lg items-center justify-center hidden">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline">
              Alpha<span className="text-primary">Waves</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex flex-col items-center justify-center w-9 h-9 gap-1.5 rounded-md hover:bg-white/5 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className={`block w-5 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="bg-dark border-t border-white/10">
          <Navigation
            mobile
            onClose={() => setMobileMenuOpen(false)} 
          />
        </div>
      </div>

    </header>
  );
};

export default Header;