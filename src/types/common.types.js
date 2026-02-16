/**
 * Common Type Definitions (JSDoc)
 * Shared types across the application
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {string} sort - Sort field and direction
 */

/**
 * @typedef {Object} ApiError
 * @property {string} message - Error message
 * @property {number} [status] - HTTP status code
 * @property {string} [code] - Error code
 * @property {any} [originalError] - Original error (dev only)
 */

/**
 * @typedef {Object} ContactFormData
 * @property {string} full_name - Full name (required)
 * @property {string} email - Email address (required)
 * @property {string} phone - Phone number
 * @property {string} company_name - Company name
 * @property {string} service_interested_in - Service interest (required)
 * @property {string} budget_range - Budget range (required)
 * @property {string} project_description - Project description (required)
 * @property {string} timeline_urgency - Timeline (required)
 * @property {string} how_did_you_find_us - Discovery source (required)
 * @property {string} notes - Additional notes
 */

/**
 * @typedef {Object} FormValidationError
 * @property {boolean} isValid - Is form valid
 * @property {Object<string, string>} errors - Field errors
 */

/**
 * @typedef {Object} AsyncState
 * @property {any} [data] - Loaded data
 * @property {boolean} loading - Is loading
 * @property {ApiError} [error] - Error object
 */

/**
 * @typedef {Object} CacheEntry
 * @property {any} value - Cached value
 * @property {number} [expiry] - Cache expiry timestamp
 */

/**
 * @typedef {Object} ComponentProps
 * @property {string} [className] - CSS classes
 * @property {any} [children] - Component children
 * @property {Function} [onClick] - Click handler
 * @property {boolean} [disabled] - Is disabled
 * @property {boolean} [loading] - Is loading
 */

export {};
