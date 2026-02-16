/**
 * Project Type Definitions (JSDoc)
 * Type hints for projects collection
 */

/**
 * @typedef {Object} Project
 * @property {string} id - Project unique identifier
 * @property {string} project_name - Project name
 * @property {string} slug - URL slug
 * @property {string} client_name - Client company name
 * @property {boolean} client_confidential - Flag for confidential clients
 * @property {string} industry_category - Industry/category
 * @property {string} project_type - Type of project
 * @property {string} status - Publishing status (published, draft)
 * @property {string} short_description - Brief description
 * @property {string} full_description - Detailed description
 * @property {string} challenge_description - Problem statement
 * @property {string} solution_description - Solution details
 * @property {string} featured_image - Featured image asset ID
 * @property {string} hero_image - Hero image asset ID
 * @property {Array<string>} gallery_images - Gallery image IDs
 * @property {string} demo_video_url - Video demo URL
 * @property {Object} result_metrics - Key metrics and results
 * @property {Array<Object>} technologies_used - Technologies implemented
 * @property {Array<string>} key_features - Key features delivered
 * @property {string} project_timeline - Timeline/duration
 * @property {number} team_size - Team size
 * @property {string} launch_date - Launch date
 * @property {string} client_testimonial - Client testimonial
 * @property {Array<string>} related_projects - Related project IDs
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} ProjectsResponse
 * @property {Array<Project>} data - Array of projects
 * @property {number} total - Total projects count
 * @property {number} limit - Items per page
 * @property {number} page - Current page
 */

/**
 * @typedef {Object} ProjectFilters
 * @property {string} [category] - Filter by category
 * @property {string} [status] - Filter by status
 * @property {number} [limit] - Results limit
 * @property {number} [page] - Page number
 * @property {string} [search] - Search term
 */

export {};
