/**
 * Navigation Component
 * Main navigation menu with links
 * @component
 */

import { Link, useLocation } from 'react-router-dom';

/**
 * @typedef {Object} NavItem
 * @property {string} label - Link text
 * @property {string} path - Link path
 */

/**
 * Navigation Component
 * @param {Object} props - Component props
 * @param {boolean} [props.mobile=false] - Mobile menu style
 * @param {Function} [props.onClose] - Called when link clicked (for mobile)
 * @returns {JSX.Element}
 */
const Navigation = ({ mobile = false, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const containerClass = mobile 
    ? 'flex flex-col space-y-1 px-2 pt-2 pb-3'
    : 'hidden md:flex items-center space-x-1';

  const linkClass = (path) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${isActive(path)
      ? 'bg-primary text-white'
      : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  return (
    <nav className={containerClass}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={linkClass(item.path)}
          onClick={() => onClose?.()}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
