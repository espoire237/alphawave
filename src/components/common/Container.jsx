/**
 * Container Component
 * Responsive content container with max-width
 * @component
 */

/**
 * @typedef {Object} ContainerProps
 * @property {React.ReactNode} children - Container content
 * @property {string} [size='lg'] - Container size
 * @property {string} [className] - Additional CSS classes
 */

const sizeVariants = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-7xl',
  xl: 'max-w-7xl',
};

/**
 * Responsive Container Component
 * @param {ContainerProps} props - Component props
 * @returns {JSX.Element}
 */
const Container = ({
  children,
  size = 'lg',
  className = '',
}) => {
  const sizeClass = sizeVariants[size] || sizeVariants.lg;

  return (
    <div className={`${sizeClass} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
