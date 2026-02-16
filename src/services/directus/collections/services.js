/**
 * Services Service
 * CRUD operations for Services collection
 */

import directus from '../client';
import { buildReadQuery, buildReadOneQuery } from '../queries';
import { handleDirectusError } from '../utils';
import { directusConfig } from '../../../config/directus.config';

/**
 * Get all published services
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Services array
 */
export const getAllServices = async (options = {}) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.SERVICES,
      {
        ...options,
        filter: {
          status: { _eq: 'published' },
          ...options.filter,
        },
        sort: ['order', '-created_at'],
        fields: directusConfig.fields.services,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching services:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get single service by slug
 * @param {string} slug - Service slug
 * @returns {Promise<Object>} Service object
 */
export const getServiceBySlug = async (slug) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.SERVICES,
      {
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        fields: directusConfig.fields.services,
        limit: 1,
      }
    );

    const services = await directus.request(query);
    return services?.[0] || null;
  } catch (error) {
    console.error(`Error fetching service with slug "${slug}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get single service by ID
 * @param {string|number} id - Service ID
 * @returns {Promise<Object>} Service object
 */
export const getServiceById = async (id) => {
  try {
    const query = buildReadOneQuery(
      directusConfig.collections.SERVICES,
      id,
      directusConfig.fields.services
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching service with ID "${id}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get featured services (limited number for homepage)
 * @param {number} limit - Number of services to return
 * @returns {Promise<Array>} Featured services
 */
export const getFeaturedServices = async (limit = 6) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.SERVICES,
      {
        filter: { status: { _eq: 'published' } },
        sort: ['order', '-created_at'],
        limit,
        fields: directusConfig.fields.services,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching featured services:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get related services
 * @param {string} serviceId - Current service ID
 * @param {number} limit - Number of related services
 * @returns {Promise<Array>} Related services
 */
export const getRelatedServices = async (serviceId, limit = 3) => {
  try {
    // Get current service
    const currentService = await getServiceById(serviceId);
    
    if (!currentService || !currentService.related_services) {
      // If no related services specified, return popular services
      return getFeaturedServices(limit);
    }

    // Filter services by related IDs
    const relatedIds = Array.isArray(currentService.related_services)
      ? currentService.related_services
      : [currentService.related_services];

    const query = buildReadQuery(
      directusConfig.collections.SERVICES,
      {
        filter: {
          status: { _eq: 'published' },
          id: { _in: relatedIds },
        },
        sort: ['order'],
        limit,
        fields: directusConfig.fields.services,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching related services:', error);
    throw handleDirectusError(error);
  }
};

export default {
  getAllServices,
  getServiceBySlug,
  getServiceById,
  getFeaturedServices,
  getRelatedServices,
};
