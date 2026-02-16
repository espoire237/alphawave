/**
 * FAQ Service
 * CRUD operations for FAQ collection
 */

import directus from '../client';
import { buildReadQuery, buildReadOneQuery } from '../queries';
import { handleDirectusError } from '../utils';
import { directusConfig } from '../../../config/directus.config';

/**
 * Get all published FAQs
 * @param {Object} options - Query options
 * @returns {Promise<Array>} FAQs array
 */
export const getAllFAQs = async (options = {}) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.FAQ,
      {
        ...options,
        filter: {
          status: { _eq: 'published' },
          ...options.filter,
        },
        sort: ['display_order', '-created_at'],
        fields: directusConfig.fields.faq,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get FAQs by category
 * @param {string} category - FAQ category
 * @returns {Promise<Array>} FAQs in category
 */
export const getFAQsByCategory = async (category) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.FAQ,
      {
        filter: {
          status: { _eq: 'published' },
          category: { _eq: category },
        },
        sort: ['display_order'],
        fields: directusConfig.fields.faq,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching FAQs in category "${category}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get single FAQ by ID
 * @param {string|number} id - FAQ ID
 * @returns {Promise<Object>} FAQ object
 */
export const getFAQById = async (id) => {
  try {
    const query = buildReadOneQuery(
      directusConfig.collections.FAQ,
      id,
      directusConfig.fields.faq
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching FAQ with ID "${id}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get featured FAQs
 * @param {number} limit - Number of FAQs to return
 * @returns {Promise<Array>} Featured FAQs
 */
export const getFeaturedFAQs = async (limit = 5) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.FAQ,
      {
        filter: {
          status: { _eq: 'published' },
          is_featured: { _eq: true },
        },
        sort: ['display_order'],
        limit,
        fields: directusConfig.fields.faq,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching featured FAQs:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Search FAQs
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Matching FAQs
 */
export const searchFAQs = async (searchTerm) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.FAQ,
      {
        filter: {
          status: { _eq: 'published' },
          _or: [
            { question: { _icontains: searchTerm } },
            { answer: { _icontains: searchTerm } },
          ],
        },
        sort: ['display_order'],
        fields: directusConfig.fields.faq,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error searching FAQs for "${searchTerm}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get FAQs with full category details
 * @returns {Promise<Object>} FAQs grouped by category
 */
export const getFAQsByAllCategories = async () => {
  try {
    const categories = [
      'services',
      'pricing',
      'process',
      'technology',
      'african-market',
      'support',
    ];

    const faqsByCategory = {};

    await Promise.all(
      categories.map(async (category) => {
        faqsByCategory[category] = await getFAQsByCategory(category);
      })
    );

    return faqsByCategory;
  } catch (error) {
    console.error('Error fetching FAQs by all categories:', error);
    throw handleDirectusError(error);
  }
};

export default {
  getAllFAQs,
  getFAQsByCategory,
  getFAQById,
  getFeaturedFAQs,
  searchFAQs,
  getFAQsByAllCategories,
};
