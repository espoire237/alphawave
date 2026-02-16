/**
 * Card Component
 * Reusable card container with flexible content
 * @component
 */

/**
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Card content
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [hoverable=false] - Enable hover effect
 * @property {boolean} [interactive=false] - Show cursor pointer
 * @property {Function} [onClick] - Click handler
 * @property {string} [padding='p-6'] - Padding override
 */

/**
 * Reusable Card Component
 * @param {CardProps} props - Component props
 * @returns {JSX.Element}
 */
const Card = ({
  children,
  className = '',
  hoverable = false,
  interactive = false,
  onClick,
  padding = 'p-6',
}) => {
  const hoverClass = hoverable
    ? 'hover:shadow-card-hover transition-shadow duration-300'
    : '';
  const cursorClass = interactive ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl
        shadow-card
        ${padding}
        ${hoverClass}
        ${cursorClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
