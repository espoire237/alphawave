/**
 * Directus SDK Client
 * Initializes and configures the Directus client
 */

import { createDirectus, rest, authentication } from '@directus/sdk';
import { env } from '../../config/env';

// Initialize Directus client
export const directus = createDirectus(env.DIRECTUS_URL)
  .with(rest())
  .with(authentication());

/**
 * Set authentication token
 * @param {string} token - JWT token
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
    directus.setToken(token);
  }
};

/**
 * Get authentication token
 * @returns {string|null} JWT token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Clear authentication
 */
export const clearAuth = () => {
  localStorage.removeItem('auth_token');
  directus.setToken(null);
};

/**
 * Initialize auth on app startup
 */
export const initializeAuth = () => {
  const token = getAuthToken();
  if (token) {
    setAuthToken(token);
  }
};

export default directus;
