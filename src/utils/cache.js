/**
 * Cache Utility
 * Simple caching mechanism for API responses
 */

/**
 * Cache storage
 */
const cache = new Map();

/**
 * Get cached data
 * @param {string} key - Cache key
 * @returns {Object|null} Cached data or null
 */
export const getFromCache = (key) => {
  const item = cache.get(key);
  
  if (!item) return null;

  // Check if cache has expired
  if (item.expiry && Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.value;
};

/**
 * Set cache data
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} duration - Cache duration in milliseconds
 */
export const setCache = (key, value, duration = null) => {
  const item = {
    value,
    expiry: duration ? Date.now() + duration : null,
  };

  cache.set(key, item);
};

/**
 * Clear specific cache
 * @param {string} key - Cache key
 */
export const clearCache = (key) => {
  cache.delete(key);
};

/**
 * Clear all cache
 */
export const clearAllCache = () => {
  cache.clear();
};

/**
 * Get cache size
 * @returns {number} Number of cached items
 */
export const getCacheSize = () => {
  return cache.size;
};

/**
 * With cache wrapper
 * @param {string} key - Cache key
 * @param {Function} fn - Function to execute
 * @param {number} duration - Cache duration
 * @returns {Promise} Cached or fresh result
 */
export const withCache = async (key, fn, duration = null) => {
  // Check cache first
  const cached = getFromCache(key);
  if (cached) {
    return cached;
  }

  // Fetch fresh data
  const result = await fn();

  // Cache result
  setCache(key, result, duration);

  return result;
};

export default {
  getFromCache,
  setCache,
  clearCache,
  clearAllCache,
  getCacheSize,
  withCache,
};
