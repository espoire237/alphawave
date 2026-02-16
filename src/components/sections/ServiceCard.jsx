/**
 * ServiceCard Component
 * Service preview card with icon and description
 * @component
 */

import { Link } from 'react-router-dom';
import { Card } from '../common';

/**
 * @typedef {Object} ServiceCardProps
 * @property {string} [icon] - Icon URL or SVG
 * @property {string} title - Service name
 * @property {string} description - Service description
 * @property {string[]} [features] - List of key features
 * @property {string} slug - URL slug for detail page
 * @property {boolean} [featured=false] - Highlight as featured
 * @property {string} [className] - Additional CSS classes
 */

/**
 * ServiceCard Component
 * @param {ServiceCardProps} props - Component props
 * @returns {JSX.Element}
 */
const ServiceCard = ({
  icon,
  title,
  description,
  features = [],
  slug,
  featured = false,
  className = '',
}) => {
  return (
    <Link to={`/services/${slug}`}>
      <Card
        hoverable
        interactive
        padding="lg"
        className={`
          h-full transition-all duration-300 transform
          ${featured ? 'md:scale-105 shadow-lg' : ''}
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Icon */}
          {icon && (
            <div className="mb-6 inline-flex">
              {icon.startsWith('<svg') ? (
                <div
                  className="w-12 h-12 text-primary"
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
              ) : (
                <img
                  src={icon}
                  alt={title}
                  className="w-12 h-12 object-contain"
                />
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {title}
          </h3>

          {/* Featured Badge */}
          {featured && (
            <div className="mb-2 inline-block">
              <span className="text-xs font-semibold px-3 py-1 bg-primary text-white rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {description}
          </p>

          {/* Features List */}
          {features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Text */}
          <div className="flex items-center text-primary font-semibold group">
            <span>Learn More</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCard;
