/**
 * ProjectCard Component
 * Project preview card with image and metadata
 * @component
 */

import { Link } from 'react-router-dom';
import { Card } from '../common';

/**
 * @typedef {Object} ProjectCardProps
 * @property {string} image - Project image URL
 * @property {string} title - Project name
 * @property {string} category - Project category
 * @property {string[]} [technologies] - Tech stack used
 * @property {string} slug - URL slug for case study
 * @property {string} [description] - Short description
 * @property {string} [className] - Additional CSS classes
 */

/**
 * ProjectCard Component
 * @param {ProjectCardProps} props - Component props
 * @returns {JSX.Element}
 */
const ProjectCard = ({
  image,
  title,
  category,
  technologies = [],
  slug,
  description,
  className = '',
}) => {
  return (
    <Link to={`/portfolio/${slug}`}>
      <Card
        hoverable
        interactive
        padding="none"
        className={`
          h-full overflow-hidden transition-all duration-300
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Image Container */}
          <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-200">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                {category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow flex flex-col p-5 md:p-6">
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                {description}
              </p>
            )}

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {technologies.length > 3 && (
                    <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded">
                      +{technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* View Case Study Link */}
            <div className="flex items-center text-primary font-semibold group">
              <span>View Case Study</span>
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
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
