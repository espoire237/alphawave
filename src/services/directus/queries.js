/**
 * Directus Query Configurations
 * Reusable query presets for common operations
 */

import { readItems, readItem, readSingleton, createItem, updateItem, deleteItem } from '@directus/sdk';

/**
 * Build a read query with common presets
 * @param {string} collection - Collection name
 * @param {Object} options - Query options
 * @returns {Object} Query configuration
 */
export const buildReadQuery = (collection, options = {}) => {
  const {
    filter = {},
    sort = [],
    limit = 12,
    page = 1,
    fields = ['*'],
    search = null,
  } = options;

  const queryConfig = {
    filter,
    sort: sort.length > 0 ? sort : ['-created_at'],
    limit,
    offset: (page - 1) * limit,
    fields,
  };

  return readItems(collection, queryConfig);
};

/**
 * Build a read single item query
 * @param {string} collection - Collection name
 * @param {string|number} id - Item ID
 * @param {Array} fields - Fields to retrieve
 * @returns {Object} Query configuration
 */
export const buildReadOneQuery = (collection, id, fields = ['*']) => {
  return readItem(collection, id, {
    fields,
  });
};

/**
 * Build a read singleton query
 * @param {string} collection - Collection name
 * @param {Array} fields - Fields to retrieve
 * @returns {Object} Query configuration
 */
export const buildSingletonQuery = (collection, fields = ['*']) => {
  return readSingleton(collection, {
    fields,
  });
};

/**
 * Build a create item query
 * @param {string} collection - Collection name
 * @param {Object} data - Item data
 * @returns {Object} Query configuration
 */
export const buildCreateQuery = (collection, data) => {
  return createItem(collection, data);
};

/**
 * Build an update item query
 * @param {string} collection - Collection name
 * @param {string|number} id - Item ID
 * @param {Object} data - Updated data
 * @returns {Object} Query configuration
 */
export const buildUpdateQuery = (collection, id, data) => {
  return updateItem(collection, id, data);
};

/**
 * Build a delete item query
 * @param {string} collection - Collection name
 * @param {string|number} id - Item ID
 * @returns {Object} Query configuration
 */
export const buildDeleteQuery = (collection, id) => {
  return deleteItem(collection, id);
};

export default {
  buildReadQuery,
  buildReadOneQuery,
  buildSingletonQuery,
  buildCreateQuery,
  buildUpdateQuery,
  buildDeleteQuery,
};
