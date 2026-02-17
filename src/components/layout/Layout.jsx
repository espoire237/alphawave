/**
 * Layout Component
 * Global wrapper — Navbar + Footer around all pages
 * @component
 */

import Navbar from '../layout/NavBar';
import Footer from './Footer';
import { MY_COLORS } from '../../constants/color';
import { FONTS } from '../../assets/fonts/fonts';

/**
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children - Page content
 */

/**
 * Layout Component
 * @param {LayoutProps} props
 * @returns {JSX.Element}
 */
const Layout = ({ children }) => {
  return (
    <div style={{
      display:       'flex',
      flexDirection: 'column',
      minHeight:     '100vh',
      background:    MY_COLORS.dark,
      color:         MY_COLORS.textPrimary,
      fontFamily:    FONTS.secondary,
    }}>

      {/* ── Global Navbar ── */}
      <Navbar />

      {/* ── Page content pushed below fixed navbar ── */}
      <main style={{
        flexGrow:   1,
        paddingTop: '72px', // matches navbar height
      }}>
        {children}
      </main>

      {/* ── Global Footer ── */}
      <Footer />

    </div>
  );
};

export default Layout;