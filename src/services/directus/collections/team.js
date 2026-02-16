/**
 * Team Service
 * CRUD operations for Team collection
 */

import directus from '../client';
import { buildReadQuery, buildReadOneQuery } from '../queries';
import { handleDirectusError } from '../utils';
import { directusConfig } from '../../../config/directus.config';

/**
 * Get all active team members
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Team members array
 */
export const getAllTeamMembers = async (options = {}) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.TEAM,
      {
        ...options,
        filter: {
          status: { _eq: 'active' },
          ...options.filter,
        },
        sort: ['order', 'name'],
        fields: directusConfig.fields.team,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get single team member by ID
 * @param {string|number} id - Team member ID
 * @returns {Promise<Object>} Team member object
 */
export const getTeamMemberById = async (id) => {
  try {
    const query = buildReadOneQuery(
      directusConfig.collections.TEAM,
      id,
      directusConfig.fields.team
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching team member with ID "${id}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get team members by category
 * @param {string} category - Team category
 * @returns {Promise<Array>} Team members in category
 */
export const getTeamMembersByCategory = async (category) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.TEAM,
      {
        filter: {
          status: { _eq: 'active' },
          team_category: { _eq: category },
        },
        sort: ['order', 'name'],
        fields: directusConfig.fields.team,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching team members in category "${category}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get team leaders/management
 * @param {number} limit - Number of leaders
 * @returns {Promise<Array>} Team leaders
 */
export const getTeamLeaders = async (limit = 5) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.TEAM,
      {
        filter: {
          status: { _eq: 'active' },
          _or: [
            { role: { _icontains: 'Lead' } },
            { role: { _icontains: 'Manager' } },
            { role: { _icontains: 'Director' } },
            { role: { _icontains: 'CEO' } },
          ],
        },
        sort: ['order'],
        limit,
        fields: directusConfig.fields.team,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching team leaders:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Search team members
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Matching team members
 */
export const searchTeamMembers = async (searchTerm) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.TEAM,
      {
        filter: {
          status: { _eq: 'active' },
          _or: [
            { name: { _icontains: searchTerm } },
            { role: { _icontains: searchTerm } },
            { expertise_areas: { _icontains: searchTerm } },
          ],
        },
        sort: ['order'],
        fields: directusConfig.fields.team,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error searching team members for "${searchTerm}":`, error);
    throw handleDirectusError(error);
  }
};

export default {
  getAllTeamMembers,
  getTeamMemberById,
  getTeamMembersByCategory,
  getTeamLeaders,
  searchTeamMembers,
};
