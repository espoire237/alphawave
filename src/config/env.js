/**
 * Environment Variables Configuration
 * Validates all required environment variables on startup
 */

const requiredVars = [
  'VITE_DIRECTUS_URL',
  'VITE_SITE_URL',
];

// eslint-disable-next-line no-unused-vars
const optionalVars = [
  'VITE_GOOGLE_MAPS_API',
  'VITE_RECAPTCHA_SITE_KEY',
  'VITE_ANALYTICS_ID',
];

// Check required variables
requiredVars.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  // Required variables
  DIRECTUS_URL: import.meta.env.VITE_DIRECTUS_URL,
  SITE_URL: import.meta.env.VITE_SITE_URL,

  // Optional variables
  GOOGLE_MAPS_API: import.meta.env.VITE_GOOGLE_MAPS_API || null,
  RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY || null,
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || null,

  // Environment
  NODE_ENV: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

export default env;
