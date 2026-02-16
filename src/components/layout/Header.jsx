/**
 * Header Component
 * Main site header with logo and navigation
 * @component
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { siteConfig } from '../../config/site.config';

/**
 * Header Component
 * @returns {JSX.Element}
 */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* CTA Button - Desktop */}
          <Link
            to="/contact"
            className="hidden md:inline-flex px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 transition-transform ${mobileMenuOpen ? 'transform rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <Navigation
              mobile
              onClose={() => setMobileMenuOpen(false)}
            />
            <div className="px-2 pb-3">
              <Link
                to="/contact"
                className="block w-full px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
