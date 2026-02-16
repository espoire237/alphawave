/**
 * Directus Utilities
 * Helper functions for common operations
 */

import { directusConfig } from '../../config/directus.config';

/**
 * Build asset URL for image
 * @param {string} assetId - Asset ID from Directus
 * @param {string} size - Size preset: 'thumbnail' or 'full'
 * @returns {string} Complete asset URL
 */
export const getAssetUrl = (assetId, size = 'full') => {
  const baseUrl = directusConfig.images.assetPath;
  const params = size === 'thumbnail' 
    ? directusConfig.images.thumbnailParams 
    : directusConfig.images.fullParams;
  
  return `${baseUrl}${assetId}${params}`;
};

/**
 * Extract slug from asset filename
 * @param {string} filename - Asset filename
 * @returns {string} Slug without extension
 */
export const getSlugFromFilename = (filename) => {
  return filename.split('.')[0];
};

/**
 * Format Directus date to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDirectusDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Check if item is published
 * @param {Object} item - Item object
 * @returns {boolean} True if published
 */
export const isPublished = (item) => {
  return item?.status === 'published';
};

/**
 * Check if item is active
 * @param {Object} item - Item object
 * @returns {boolean} True if active
 */
export const isActive = (item) => {
  return item?.status === 'active';
};

/**
 * Filter published items
 * @param {Array} items - Array of items
 * @returns {Array} Published items only
 */
export const filterPublished = (items = []) => {
  return items.filter(isPublished);
};

/**
 * Sort items by order and date
 * @param {Array} items - Array of items
 * @returns {Array} Sorted items
 */
export const sortByOrderAndDate = (items = []) => {
  return [...items].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });
};

/**
 * Transform Directus response for use in app
 * @param {Array|Object} data - Directus response data
 * @returns {Array|Object} Transformed data
 */
export const transformDirectusData = (data) => {
  if (Array.isArray(data)) {
    return data.map(transformDirectusData);
  }

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  return {
    ...data,
    // Add transformed fields here as needed
    assetUrl: data.featured_image ? getAssetUrl(data.featured_image) : null,
    formattedDate: formatDirectusDate(data.created_at),
  };
};

/**
 * Handle Directus API errors
 * @param {Error} error - Error object
 * @returns {Object} Standardized error object
 */
export const handleDirectusError = (error) => {
  const errorObj = {
    message: 'An error occurred',
    status: null,
    code: null,
  };

  if (error.response) {
    errorObj.status = error.response.status;
    errorObj.message = error.response.data?.message || error.message;
  } else if (error.request) {
    errorObj.code = 'NO_RESPONSE';
    errorObj.message = 'Server did not respond';
  } else {
    errorObj.code = 'REQUEST_ERROR';
    errorObj.message = error.message;
  }

  return errorObj;
};

export default {
  getAssetUrl,
  getSlugFromFilename,
  formatDirectusDate,
  isPublished,
  isActive,
  filterPublished,
  sortByOrderAndDate,
  transformDirectusData,
  handleDirectusError,
};
