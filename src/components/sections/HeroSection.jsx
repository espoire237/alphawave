/**
 * HeroSection Component
 * Large banner section with CTA
 * @component
 */

import { Link } from 'react-router-dom';
import { Container, Button } from '../common';

/**
 * @typedef {Object} HeroSectionProps
 * @property {string} title - Main heading
 * @property {string} [subtitle] - Subheading text
 * @property {string} [backgroundImage] - Background image URL
 * @property {string} [backgroundGradient] - CSS gradient for background
 * @property {Object} [ctaButton] - Call-to-action button config
 * @property {string} ctaButton.label - Button text
 * @property {string} ctaButton.path - Button link path
 * @property {string} [ctaButton.variant] - Button variant
 * @property {React.ReactNode} [children] - Additional content
 * @property {string} [className] - Additional CSS classes
 */

/**
 * HeroSection Component
 * @param {HeroSectionProps} props - Component props
 * @returns {JSX.Element}
 */
const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  backgroundGradient = 'from-primary to-primary-600',
  ctaButton,
  children,
  className = '',
}) => {
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  const bgClass = !backgroundImage
    ? `bg-gradient-to-br ${backgroundGradient}`
    : '';

  return (
    <section
      className={`relative py-20 md:py-32 ${bgClass} ${className}`}
      style={bgStyle}
    >
      {/* Overlay for image backgrounds */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      )}

      {/* Content */}
      <Container size="lg">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Custom Content */}
          {children && <div className="mb-8">{children}</div>}

          {/* CTA Button */}
          {ctaButton && (
            <Link to={ctaButton.path}>
              <Button
                variant={ctaButton.variant || 'primary'}
                size="lg"
                className=""
              >
                {ctaButton.label}
              </Button>
            </Link>
          )}
        </div>
      </Container>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -z-10 opacity-5">
        <div className="w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-5">
        <div className="w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default HeroSection;
