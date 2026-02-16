/**
 * Application Constants
 * Global constants used throughout the application
 */

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
};

// Service Categories
export const SERVICE_CATEGORIES = [
  {
    id: 'custom-software',
    name: 'Custom Software Development',
    slug: 'custom-software-development',
  },
  {
    id: 'ai-intelligence',
    name: 'AI & Business Intelligence',
    slug: 'ai-business-intelligence',
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing & SEO',
    slug: 'digital-marketing-seo',
  },
  {
    id: 'cloud-devops',
    name: 'Cloud Infrastructure & DevOps',
    slug: 'cloud-infrastructure-devops',
  },
  {
    id: 'mobile-first',
    name: 'Mobile-First Solutions',
    slug: 'mobile-first-solutions',
  },
  {
    id: 'payment-infra',
    name: 'Payment Infrastructure',
    slug: 'payment-infrastructure',
  },
];

// Budget Ranges
export const BUDGET_RANGES = [
  { id: 'under-500', label: 'Under $500' },
  { id: '500-2000', label: '$500 – $2,000' },
  { id: '2000-10000', label: '$2,000 – $10,000' },
  { id: '10000-50000', label: '$10,000 – $50,000' },
  { id: 'over-50000', label: '$50,000+' },
  { id: 'discuss', label: "Let's Discuss" },
];

// Timeline Options
export const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'ASAP (Within 2 weeks)' },
  { id: '1-2-months', label: '1-2 Months' },
  { id: '2-6-months', label: '2-6 Months' },
  { id: '6plus-months', label: '6+ Months' },
  { id: 'exploring', label: 'Just Exploring' },
];

// How Did You Find Us Options
export const DISCOVERY_SOURCES = [
  { id: 'google', label: 'Google Search' },
  { id: 'social', label: 'Social Media' },
  { id: 'referral', label: 'Referral / Word of Mouth' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'other', label: 'Other' },
];

// Lead Status
export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  CONVERTED: 'converted',
  LOST: 'lost',
};

// FAQ Categories
export const FAQ_CATEGORIES = [
  { id: 'services', label: 'Services & Solutions' },
  { id: 'pricing', label: 'Pricing & Budgets' },
  { id: 'process', label: 'Process & Timeline' },
  { id: 'technology', label: 'Technology & Technical' },
  { id: 'african-market', label: 'African Market & Payments' },
  { id: 'support', label: 'Support & After Launch' },
];

// Form Validation
export const FORM_VALIDATION = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_MIN: 7,
  PHONE_MAX: 20,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 5000,
};

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SERVICES: 1000 * 60 * 60, // 1 hour
  PROJECTS: 1000 * 60 * 60, // 1 hour
  TEAM: 1000 * 60 * 60 * 24, // 24 hours
  FAQ: 1000 * 60 * 60 * 24, // 24 hours
};

// Debounce Delays (in milliseconds)
export const DEBOUNCE_DELAY = {
  SEARCH: 500,
  FORM_VALIDATION: 300,
  RESIZE: 200,
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  SERVICE_DETAIL: '/services/:slug',
  PORTFOLIO: '/portfolio',
  PROJECT_DETAIL: '/portfolio/:slug',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms',
  NOT_FOUND: '*',
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'contact@alphawaves.tech',
  PHONE: '+237 XXX XXX XXX',
  WHATSAPP: '+237 XXX XXX XXX',
  RESPONSE_TIME: '24 hours',
};

// Social Media Links
export const SOCIAL_MEDIA = {
  LINKEDIN: 'https://linkedin.com/company/alphawaves',
  GITHUB: 'https://github.com/alphawaves',
  TWITTER: 'https://twitter.com/alphawaves',
  FACEBOOK: 'https://facebook.com/alphawaves',
  INSTAGRAM: 'https://instagram.com/alphawaves',
};

export default {
  API_CONFIG,
  PAGINATION,
  SERVICE_CATEGORIES,
  BUDGET_RANGES,
  TIMELINE_OPTIONS,
  DISCOVERY_SOURCES,
  LEAD_STATUS,
  FAQ_CATEGORIES,
  FORM_VALIDATION,
  CACHE_DURATION,
  DEBOUNCE_DELAY,
  HTTP_STATUS,
  ROUTES,
  CONTACT_INFO,
  SOCIAL_MEDIA,
};
