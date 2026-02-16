/**
 * Services Index
 * Central export point for all services
 */

// Directus client and utilities
export { default as directus, setAuthToken, getAuthToken, clearAuth, initializeAuth } from './directus/client';
export { default as directusUtils } from './directus/utils';
export { default as directusQueries } from './directus/queries';

// Directus collections (all exported)
export {
  getAllProjects,
  getProjectBySlug,
  getProjectById,
  getFeaturedProjects,
  getProjectsByCategory,
  searchProjects,
  getRelatedProjects,
  default as projectsService,
} from './directus/collections/projects';

export {
  getAllServices,
  getServiceBySlug,
  getServiceById,
  getFeaturedServices,
  getRelatedServices,
  default as servicesService,
} from './directus/collections/services';

export {
  getAllTeamMembers,
  getTeamMemberById,
  getTeamMembersByCategory,
  getTeamLeaders,
  searchTeamMembers,
  default as teamService,
} from './directus/collections/team';

export {
  getAllFAQs,
  getFAQsByCategory,
  getFAQById,
  getFeaturedFAQs,
  searchFAQs,
  getFAQsByAllCategories,
  default as faqService,
} from './directus/collections/faq';

export {
  submitLead,
  getAllLeads,
  getLeadsByStatus,
  getLeadsByService,
  getLeadsInDateRange,
  default as leadsService,
} from './directus/collections/leads';

// Other services
export {
  sendContactFormNotification,
  sendClientConfirmation,
  sendNewsletter,
  default as emailService,
} from './email';

export {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackCTAClick,
  trackFormSubmission,
  trackServiceInquiry,
  trackPortfolioView,
  trackTimeOnPage,
  default as analyticsService,
} from './analytics';
