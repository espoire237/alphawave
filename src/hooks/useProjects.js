/**
 * useProjects Custom Hook
 * Hook for fetching and managing projects data
 */

import { useFetch } from './useFetch';
import { getAllProjects, getProjectBySlug, getFeaturedProjects } from '../services';
import { CACHE_DURATION } from '../config/constants';

/**
 * Fetch all projects
 * @param {Object} options - Fetch options
 * @returns {Object} Projects state
 */
export const useAllProjects = (options = {}) => {
  const { filter = {}, limit = 12, page = 1 } = options;

  return useFetch(
    () => getAllProjects({ filter, limit, page }),
    [JSON.stringify(filter), limit, page],
    {
      cacheKey: `projects_${JSON.stringify(filter)}_${limit}_${page}`,
      cacheDuration: CACHE_DURATION.PROJECTS,
    }
  );
};

/**
 * Fetch featured projects
 * @param {number} limit - Number of projects
 * @returns {Object} Featured projects state
 */
export const useFeaturedProjects = (limit = 3) => {
  return useFetch(
    () => getFeaturedProjects(limit),
    [limit],
    {
      cacheKey: `featured_projects_${limit}`,
      cacheDuration: CACHE_DURATION.PROJECTS,
    }
  );
};

/**
 * Fetch project by slug
 * @param {string} slug - Project slug
 * @returns {Object} Project state
 */
export const useProjectBySlug = (slug) => {
  return useFetch(
    () => getProjectBySlug(slug),
    [slug],
    {
      cacheKey: `project_${slug}`,
      cacheDuration: CACHE_DURATION.PROJECTS,
    }
  );
};

export default {
  useAllProjects,
  useFeaturedProjects,
  useProjectBySlug,
};
