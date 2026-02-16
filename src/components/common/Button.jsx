/**
 * Button Component
 * Reusable button with multiple variants
 * @component
 */

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Button content
 * @property {'primary' | 'secondary' | 'outline' | 'danger'} [variant='primary'] - Button style variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Button size
 * @property {boolean} [disabled=false] - Is disabled
 * @property {boolean} [loading=false] - Show loading state
 * @property {string} [className] - Additional CSS classes
 * @property {Function} onClick - Click handler
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Button type
 * @property {string} [title] - Tooltip title
 */

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-secondary text-white hover:bg-secondary-light active:bg-secondary-dark',
  outline: 'border-2 border-primary text-primary hover:bg-primary-50 active:bg-primary-100',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Reusable Button Component
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  title,
  ...rest
}) => {
  const variantClass = buttonVariants[variant] || buttonVariants.primary;
  const sizeClass = sizeVariants[size] || sizeVariants.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      className={`
        inline-flex items-center justify-center
        font-semibold rounded-lg
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        ${variantClass}
        ${sizeClass}
        ${className}
      `}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
