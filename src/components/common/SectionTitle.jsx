/**
 * SectionTitle Component
 * Reusable section heading with optional subtitle
 * @component
 */

/**
 * @typedef {Object} SectionTitleProps
 * @property {string} title - Main title
 * @property {string} [subtitle] - Subtitle/description
 * @property {boolean} [centered=true] - Center align text
 * @property {string} [className] - Additional CSS classes
 */

/**
 * Section Title Component
 * @param {SectionTitleProps} props - Component props
 * @returns {JSX.Element}
 */
const SectionTitle = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  const alignClass = centered ? 'text-center' : '';

  return (
    <div className={`${alignClass} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
