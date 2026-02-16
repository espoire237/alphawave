/**
 * Hooks Index
 * Central export for all custom hooks
 */

export { useFetch, default as useFetchDefault } from './useFetch';
export {
  useAllProjects,
  useFeaturedProjects,
  useProjectBySlug,
  default as useProjectsDefault,
} from './useProjects';

// TODO: Add other hooks as you create them
// export { useServices } from './useServices';
// export { useTeam } from './useTeam';
// export { useFAQ } from './useFAQ';
// export { useFormSubmission } from './useFormSubmission';
