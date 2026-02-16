/**
 * useFetch Custom Hook
 * Generic hook for fetching data with caching and error handling
 */

import { useState, useEffect } from 'react';
import { handleError } from '../../utils/errorHandler';
import { getFromCache, setCache } from '../../utils/cache';

/**
 * Generic fetch hook
 * @param {Function} queryFn - Directus query function
 * @param {Array} dependencies - Dependency array
 * @param {Object} options - Hook options
 * @returns {Object} Data, loading, error states
 */
export const useFetch = (queryFn, dependencies = [], options = {}) => {
  const {
    cacheKey = null,
    cacheDuration = null,
    onError = null,
    onSuccess = null,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache
        if (cacheKey) {
          const cached = getFromCache(cacheKey);
          if (cached) {
            if (isMounted) {
              setData(cached);
              setLoading(false);
              onSuccess?.(cached);
            }
            return;
          }
        }

        // Fetch fresh data
        const result = await queryFn();

        if (isMounted) {
          setData(result);
          onSuccess?.(result);

          // Cache result
          if (cacheKey) {
            setCache(cacheKey, result, cacheDuration);
          }
        }
      } catch (err) {
        if (isMounted) {
          const errorObj = handleError(err, 'useFetch');
          setError(errorObj);
          onError?.(errorObj);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await queryFn();
      setData(result);
      onSuccess?.(result);

      if (cacheKey) {
        setCache(cacheKey, result, cacheDuration);
      }
    } catch (err) {
      const errorObj = handleError(err, 'useFetch.refetch');
      setError(errorObj);
      onError?.(errorObj);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useFetch;
