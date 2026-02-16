/**
 * Service Type Definitions (JSDoc)
 * Type hints for services collection
 */

/**
 * @typedef {Object} Service
 * @property {string} id - Service unique identifier
 * @property {string} service_name - Service name
 * @property {string} slug - URL slug
 * @property {string} icon - Icon name or SVG
 * @property {string} short_description - Brief description
 * @property {string} full_description - Detailed description
 * @property {Array<string>} key_features - Key features offered
 * @property {Array<string>} use_cases - Common use cases
 * @property {Array<Object>} technologies_used - Technologies used
 * @property {string} starting_price - Starting price
 * @property {string} status - Publishing status
 * @property {number} order - Display order
 * @property {Array<string>} related_services - Related service IDs
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} ServiceCard
 * @property {string} id - Service ID
 * @property {string} title - Display title
 * @property {string} description - Short description
 * @property {Array<string>} features - Key features (max 3-4)
 * @property {string} slug - URL slug
 * @property {string} icon - Icon/image
 */

/**
 * @typedef {Object} ServiceFilter
 * @property {Array<string>} [technologies] - Filter by tech stack
 * @property {Array<string>} [industries] - Filter by industry
 * @property {string} [priceRange] - Filter by price range
 */

export {};
