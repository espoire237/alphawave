/**
 * Layout Component
 * Main layout wrapper with Header and Footer
 * @component
 */

import Header from './Header';
import Footer from './Footer';

/**
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children - Page content
 */

/**
 * Main Layout Component
 * Wraps all pages with Header and Footer
 * @param {LayoutProps} props - Component props
 * @returns {JSX.Element}
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
