/**
 * Projects Service
 * CRUD operations for Projects collection
 */

import directus from '../client';
import { buildReadQuery, buildReadOneQuery } from '../queries';
import { handleDirectusError } from '../utils';
import { directusConfig } from '../../../config/directus.config';

/**
 * Get all published projects with pagination
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Projects array
 */
export const getAllProjects = async (options = {}) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.PROJECTS,
      {
        ...options,
        filter: {
          status: { _eq: 'published' },
          ...options.filter,
        },
        fields: directusConfig.fields.projects,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get single project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object>} Project object
 */
export const getProjectBySlug = async (slug) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.PROJECTS,
      {
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        fields: directusConfig.fields.projects,
        limit: 1,
      }
    );

    const projects = await directus.request(query);
    return projects?.[0] || null;
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get single project by ID
 * @param {string|number} id - Project ID
 * @returns {Promise<Object>} Project object
 */
export const getProjectById = async (id) => {
  try {
    const query = buildReadOneQuery(
      directusConfig.collections.PROJECTS,
      id,
      directusConfig.fields.projects
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching project with ID "${id}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get featured projects
 * @param {number} limit - Number of projects to return
 * @returns {Promise<Array>} Array of featured projects
 */
export const getFeaturedProjects = async (limit = 3) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.PROJECTS,
      {
        filter: {
          status: { _eq: 'published' },
          featured: { _eq: true },
        },
        sort: ['-created_at'],
        limit,
        fields: directusConfig.fields.projects,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get projects by category
 * @param {string} category - Industry category
 * @param {number} limit - Number of projects
 * @returns {Promise<Array>} Projects in category
 */
export const getProjectsByCategory = async (category, limit = 12) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.PROJECTS,
      {
        filter: {
          status: { _eq: 'published' },
          industry_category: { _eq: category },
        },
        sort: ['-created_at'],
        limit,
        fields: directusConfig.fields.projects,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching projects in category "${category}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Search projects
 * @param {string} searchTerm - Search term
 * @param {number} limit - Number of results
 * @returns {Promise<Array>} Matching projects
 */
export const searchProjects = async (searchTerm, limit = 12) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.PROJECTS,
      {
        filter: {
          status: { _eq: 'published' },
          _or: [
            { project_name: { _icontains: searchTerm } },
            { short_description: { _icontains: searchTerm } },
            { client_name: { _icontains: searchTerm } },
          ],
        },
        limit,
        fields: directusConfig.fields.projects,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error searching projects for "${searchTerm}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get related projects
 * @param {string} projectId - Current project ID
 * @param {number} limit - Number of related projects
 * @returns {Promise<Array>} Related projects
 */
export const getRelatedProjects = async (projectId, limit = 3) => {
  try {
    // Get current project to determine category
    const currentProject = await getProjectById(projectId);
    
    if (!currentProject) {
      return [];
    }

    // Get projects in same category
    const query = buildReadQuery(
      directusConfig.collections.PROJECTS,
      {
        filter: {
          status: { _eq: 'published' },
          industry_category: { _eq: currentProject.industry_category },
          id: { _neq: projectId },
        },
        sort: ['-created_at'],
        limit,
        fields: directusConfig.fields.projects,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    throw handleDirectusError(error);
  }
};

export default {
  getAllProjects,
  getProjectBySlug,
  getProjectById,
  getFeaturedProjects,
  getProjectsByCategory,
  searchProjects,
  getRelatedProjects,
};
